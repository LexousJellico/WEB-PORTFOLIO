import nodemailer from "nodemailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTHS = {
  name: 80,
  email: 120,
  subject: 120,
  message: 2000,
};
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "16kb",
    },
  },
};

const toStringValue = (value = "") => String(value ?? "");

const sanitize = (value = "", maxLength = 2000) =>
  toStringValue(value).replace(/\s+/g, " ").trim().slice(0, maxLength);

const sanitizeMessage = (value = "") =>
  toStringValue(value).trim().slice(0, MAX_FIELD_LENGTHS.message);

const escapeHtml = (value = "") =>
  toStringValue(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getClientIp = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0] || "unknown";
  }

  return forwardedFor?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
};

const pruneExpiredRateLimitEntries = (now) => {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
};

const isRateLimited = (key) => {
  const now = Date.now();
  pruneExpiredRateLimitEntries(now);

  const currentEntry = rateLimitStore.get(key);

  if (!currentEntry || currentEntry.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  currentEntry.count += 1;
  rateLimitStore.set(key, currentEntry);

  return currentEntry.count > RATE_LIMIT_MAX_REQUESTS;
};

const validateRawFieldLengths = (body = {}) => {
  for (const [field, maxLength] of Object.entries(MAX_FIELD_LENGTHS)) {
    const rawValue = toStringValue(body[field]);

    if (rawValue.length > maxLength) {
      return `${field} must be ${maxLength} characters or fewer.`;
    }
  }

  return "";
};

const buildContactPayload = ({ name, email, subject, message, req }) => ({
  name,
  email,
  subject,
  message,
  submittedAt: new Date().toISOString(),
  source: "Lexus_ji portfolio contact form",
  userAgent: sanitize(req.headers["user-agent"], 300),
  ip: getClientIp(req),
});

const parseBoolean = (value, fallback = false) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
};

const getSmtpTransportConfig = () => {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const port = Number(process.env.SMTP_PORT || 465);

  if (!host || !user || !pass) {
    throw new Error(
      "Email delivery is not configured yet. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CONTACT_TO_EMAIL in your environment variables.",
    );
  }

  return {
    host,
    port,
    secure: parseBoolean(process.env.SMTP_SECURE, port === 465),
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: !parseBoolean(process.env.SMTP_TLS_ALLOW_INVALID, false),
    },
  };
};

const buildEmailHtml = (payload) => `
  <div style="font-family:Inter,Arial,sans-serif;background:#090b17;color:#f8fafc;padding:28px;border-radius:20px;line-height:1.6">
    <p style="margin:0 0 8px;color:#f13024;text-transform:uppercase;letter-spacing:0.18em;font-size:12px">New Portfolio Message</p>
    <h1 style="margin:0 0 18px;font-size:24px;color:#ffffff">${escapeHtml(payload.subject)}</h1>
    <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:18px;margin-bottom:18px">
      <p style="margin:0"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p style="margin:0"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p style="margin:0"><strong>Submitted:</strong> ${escapeHtml(payload.submittedAt)}</p>
      <p style="margin:0"><strong>Source:</strong> ${escapeHtml(payload.source)}</p>
    </div>
    <div style="white-space:pre-wrap;background:rgba(241,48,36,0.08);border:1px solid rgba(241,48,36,0.22);border-radius:16px;padding:18px;color:#f8fafc">${escapeHtml(payload.message)}</div>
  </div>
`;

const buildEmailText = (payload) => [
  "New Portfolio Message",
  "",
  `Name: ${payload.name}`,
  `Email: ${payload.email}`,
  `Subject: ${payload.subject}`,
  `Submitted: ${payload.submittedAt}`,
  `Source: ${payload.source}`,
  "",
  "Message:",
  payload.message,
].join("\n");

const sendToEmail = async (payload) => {
  const transporter = nodemailer.createTransport(getSmtpTransportConfig());
  const to = process.env.CONTACT_TO_EMAIL?.trim() || process.env.SMTP_USER?.trim();
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    `Lexus_ji Portfolio <${process.env.SMTP_USER?.trim()}>`;

  if (!to) {
    throw new Error("CONTACT_TO_EMAIL is missing.");
  }

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `Portfolio Contact: ${payload.subject}`,
    text: buildEmailText(payload),
    html: buildEmailHtml(payload),
  });

  return {
    delivered: true,
    provider: "smtp-email",
  };
};

const sendToWebhook = async (payload) => {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return null;
  }

  const parsedUrl = new URL(webhookUrl);

  if (!/^https?:$/.test(parsedUrl.protocol)) {
    throw new Error("CONTACT_WEBHOOK_URL must use http or https.");
  }

  await fetch(parsedUrl.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CONTACT_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(payload),
  });

  return {
    delivered: true,
    provider: "webhook-copy",
  };
};

const isJsonRequest = (req) => {
  const contentType = req.headers["content-type"] || "";
  const accept = req.headers.accept || "";
  return contentType.includes("application/json") || accept.includes("application/json");
};

const redirectToContact = (res, status) => {
  res.writeHead(303, {
    Location: `/contact?contact=${encodeURIComponent(status)}`,
    "Cache-Control": "no-store",
  });
  res.end();
};

const respond = (req, res, statusCode, body, redirectStatus) => {
  if (!isJsonRequest(req) && redirectStatus) {
    return redirectToContact(res, redirectStatus);
  }

  return res.status(statusCode).json(body);
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const botField = sanitize(req.body?.["bot-field"], 120);

  if (botField) {
    return respond(req, res, 200, { message: "Message accepted." }, "sent");
  }

  const rateLimitKey = getClientIp(req);

  if (isRateLimited(rateLimitKey)) {
    return respond(
      req,
      res,
      429,
      { message: "Too many contact attempts. Please wait a few minutes before trying again." },
      "rate-limited",
    );
  }

  const lengthError = validateRawFieldLengths(req.body);

  if (lengthError) {
    return respond(req, res, 400, { message: lengthError }, "invalid");
  }

  const name = sanitize(req.body?.name, MAX_FIELD_LENGTHS.name);
  const email = sanitize(req.body?.email, MAX_FIELD_LENGTHS.email).toLowerCase();
  const subject = sanitize(req.body?.subject, MAX_FIELD_LENGTHS.subject);
  const message = sanitizeMessage(req.body?.message);

  if (!name || !email || !subject || !message) {
    return respond(req, res, 400, { message: "Please complete all fields." }, "invalid");
  }

  if (!EMAIL_PATTERN.test(email)) {
    return respond(req, res, 400, { message: "Please enter a valid email address." }, "invalid");
  }

  if (message.length < 10) {
    return respond(
      req,
      res,
      400,
      { message: "Please write a message with at least 10 characters." },
      "invalid",
    );
  }

  try {
    const payload = buildContactPayload({ name, email, subject, message, req });
    const emailResult = await sendToEmail(payload);

    try {
      await sendToWebhook(payload);
    } catch {
      // Email delivery is the main requirement. Webhook copy failures should not block the user.
    }

    return respond(
      req,
      res,
      200,
      {
        delivered: true,
        provider: emailResult.provider,
        message: "Message sent successfully. I received it in my email.",
      },
      "sent",
    );
  } catch (error) {
    return respond(
      req,
      res,
      502,
      {
        message:
          error.message || "Unable to deliver the message right now. Please try again later.",
      },
      "delivery-error",
    );
  }
}
