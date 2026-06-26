import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";

const routeChecks = [
  { path: "/", status: 200 },
  { path: "/about", status: 200 },
  { path: "/services", status: 200 },
  { path: "/work", status: 200 },
  { path: "/testimonials", status: 200 },
  { path: "/contact", status: 200 },
  { path: "/contact?contact=sent", status: 200 },
  { path: "/missing-page", status: 404 },
  { path: "/robots.txt", status: 200, includes: "Sitemap:" },
  { path: "/site.webmanifest", status: 200, includes: "Lexus_ji" },
  { path: "/sitemap.xml", status: 200, includes: "<urlset" },
];

const apiChecks = [
  {
    label: "GET /api/avatar current image",
    path: "/api/avatar",
    init: { method: "GET" },
    status: 200,
  },
  {
    label: "HEAD /api/avatar no-cache",
    path: "/api/avatar",
    init: { method: "HEAD" },
    status: 200,
  },
  {
    label: "GET /api/contact",
    path: "/api/contact",
    init: { method: "GET" },
    status: 405,
    includes: "Method not allowed",
  },
  {
    label: "POST /api/contact invalid email",
    path: "/api/contact",
    init: {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Forwarded-For": "route-check-invalid",
      },
      body: JSON.stringify({
        name: "Route Check",
        email: "not-an-email",
        subject: "Validation",
        message: "This message is long enough for validation.",
      }),
    },
    status: 400,
    includes: "valid email",
  },
  {
    label: "POST /api/contact too long",
    path: "/api/contact",
    init: {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Forwarded-For": "route-check-too-long",
      },
      body: JSON.stringify({
        name: "Route Check",
        email: "route-check@example.com",
        subject: "x".repeat(121),
        message: "This message is long enough for validation.",
      }),
    },
    status: 400,
    includes: "subject must be 120 characters or fewer",
  },
  {
    label: "POST /api/contact valid",
    path: "/api/contact",
    init: {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Forwarded-For": "route-check-valid",
      },
      body: JSON.stringify({
        name: "Route Check",
        email: "route-check@example.com",
        subject: "Production route check",
        message: "This is a valid route check message.",
      }),
    },
    status: 200,
    includes: "Message validated successfully",
  },
  {
    label: "no-JS contact fallback",
    path: "/api/contact",
    init: {
      method: "POST",
      redirect: "manual",
      headers: {
        Accept: "text/html",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Forwarded-For": "route-check-no-js",
      },
      body: new URLSearchParams({
        name: "Route Check",
        email: "route-check@example.com",
        subject: "No JS fallback",
        message: "This is a valid no JavaScript fallback route check.",
      }),
    },
    status: 303,
    location: "/contact?contact=sent",
  },
];

const getFreePort = () =>
  new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once("error", reject);
    server.listen(0, () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 3000;
      server.close(() => resolve(port));
    });
  });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForServer = async (baseUrl) => {
  const deadline = Date.now() + 30000;
  let lastError;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/robots.txt`, { cache: "no-store" });
      if (response.ok) return;
    } catch (error) {
      lastError = error;
    }

    await sleep(500);
  }

  throw new Error(`Timed out waiting for production server. ${lastError?.message || ""}`);
};

const assertResponse = async (baseUrl, check) => {
  const response = await fetch(`${baseUrl}${check.path}`, check.init || {});
  const text = await response.text();

  if (response.status !== check.status) {
    throw new Error(`${check.label || check.path} returned ${response.status}, expected ${check.status}. Body: ${text.slice(0, 160)}`);
  }

  if (check.includes && !text.includes(check.includes)) {
    throw new Error(`${check.label || check.path} did not include expected text: ${check.includes}`);
  }

  if (check.location) {
    const location = response.headers.get("location") || "";
    if (location !== check.location) {
      throw new Error(`${check.label || check.path} redirected to '${location}', expected '${check.location}'.`);
    }
  }

  console.log(`✓ ${check.label || check.path} ${response.status}`);
};

const run = async () => {
  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const nextCommand = process.platform === "win32"
    ? path.join(process.cwd(), "node_modules", ".bin", "next.cmd")
    : path.join(process.cwd(), "node_modules", ".bin", "next");
  const server = spawn(nextCommand, ["start", "-p", String(port)], {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    detached: process.platform !== "win32",
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
    },
  });

  let logs = "";
  server.stdout.on("data", (chunk) => {
    logs += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    logs += chunk.toString();
  });

  try {
    await waitForServer(baseUrl);

    for (const check of routeChecks) {
      await assertResponse(baseUrl, check);
    }

    for (const check of apiChecks) {
      await assertResponse(baseUrl, check);
    }

    console.log("Route checks passed.");
  } catch (error) {
    console.error(error.message);
    console.error("\nServer logs:\n", logs.slice(-4000));
    process.exitCode = 1;
  } finally {
    if (process.platform === "win32") {
      server.kill("SIGTERM");
    } else if (server.pid) {
      try {
        process.kill(-server.pid, "SIGTERM");
      } catch {
        server.kill("SIGTERM");
      }
    }
  }
};

run();
