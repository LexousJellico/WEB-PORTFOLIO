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

const buildContactPayload = ({ name, email, subject, message, req }) => ({
  name,
  email,
  subject,
  message,
  submittedAt: new Date().toISOString(),
  source: "Lexus_ji portfolio contact form",
  userAgent: sanitize(req.headers["user-agent"], 300),
});

const getWebhookUrl = () => {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return "";
  }

  try {
    const parsedUrl = new URL(webhookUrl);

    if (!/^https?:$/.test(parsedUrl.protocol)) {
      throw new Error("CONTACT_WEBHOOK_URL must use http or https.");
    }

    return parsedUrl.toString();
  } catch {
    throw new Error("CONTACT_WEBHOOK_URL is not a valid http(s) URL.");
  }
};

const sendToWebhook = async (payload) => {
  const webhookUrl = getWebhookUrl();

  if (!webhookUrl) {
    return { delivered: false, provider: "local-validation" };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CONTACT_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Contact delivery provider rejected the message.");
  }

  return { delivered: true, provider: "webhook" };
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

const validateRawFieldLengths = (body = {}) => {
  for (const [field, maxLength] of Object.entries(MAX_FIELD_LENGTHS)) {
    const rawValue = toStringValue(body[field]);

    if (rawValue.length > maxLength) {
      return `${field} must be ${maxLength} characters or fewer.`;
    }
  }

  return "";
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const botField = sanitize(req.body?.["bot-field"], 120);

  if (botField) {
    return respond(
      req,
      res,
      200,
      { message: "Message accepted." },
      "sent",
    );
  }

  const rateLimitKey = getClientIp(req);

  if (isRateLimited(rateLimitKey)) {
    return respond(
      req,
      res,
      429,
      {
        message:
          "Too many contact attempts. Please wait a few minutes before trying again.",
      },
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
    return respond(
      req,
      res,
      400,
      { message: "Please complete all fields." },
      "invalid",
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return respond(
      req,
      res,
      400,
      { message: "Please enter a valid email address." },
      "invalid",
    );
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
    const result = await sendToWebhook(payload);

    return respond(
      req,
      res,
      200,
      {
        delivered: result.delivered,
        provider: result.provider,
        message: result.delivered
          ? "Message sent successfully. Thank you for reaching out."
          : "Message validated successfully. Add CONTACT_WEBHOOK_URL in your environment when you are ready for live delivery.",
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
          error.message ||
          "Unable to deliver the message right now. Please try again later.",
      },
      "delivery-error",
    );
  }
}
