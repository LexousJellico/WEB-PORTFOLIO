import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nextBin = process.platform === "win32"
  ? path.join(root, "node_modules", ".bin", "next.cmd")
  : path.join(root, "node_modules", ".bin", "next");

const requiredBuildFiles = [
  ".next/BUILD_ID",
  ".next/routes-manifest.json",
  ".next/prerender-manifest.json",
  ".next/required-server-files.json",
  ".next/server/pages-manifest.json",
  ".next/server/pages/index.html",
  ".next/server/pages/500.html",
];

const maxAttempts = 3;
const hardAttemptLimitMs = 65000;
const stalledAfterStaticMs = 4200;

const hasCompleteServerBuild = () =>
  requiredBuildFiles.every((file) => fs.existsSync(path.join(root, file)));

const cleanBuildOutput = () => {
  fs.rmSync(path.join(root, ".next"), { recursive: true, force: true });
};

const runAttempt = (attempt) => new Promise((resolve) => {
  let sawTraceStep = false;
  let sawStaticStart = false;
  let sawStaticDone = false;
  let resolved = false;
  let lastOutputAt = Date.now();
  let outputBuffer = "";
  const startedAt = Date.now();

  console.log(`\nSafe build guard: starting Next production build attempt ${attempt}/${maxAttempts}.`);

  const child = spawn(nextBin, ["build", "--webpack"], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
    },
  });

  const finish = (result) => {
    if (resolved) return;
    resolved = true;
    clearInterval(watchdog);
    try {
      child.kill("SIGTERM");
    } catch {
      // Child may already be gone.
    }
    resolve(result);
  };

  const handleOutput = (chunk, stream) => {
    const text = chunk.toString();
    lastOutputAt = Date.now();
    stream.write(text);
    outputBuffer = `${outputBuffer}${text}`.slice(-4000);

    if (outputBuffer.includes("Collecting build traces")) {
      sawTraceStep = true;
    }

    if (outputBuffer.includes("Generating static pages")) {
      sawStaticStart = true;
    }

    if (outputBuffer.includes("Generating static pages") && outputBuffer.includes("(7/7)")) {
      sawStaticDone = true;
    }
  };

  child.stdout.on("data", (chunk) => handleOutput(chunk, process.stdout));
  child.stderr.on("data", (chunk) => handleOutput(chunk, process.stderr));

  child.on("exit", (code) => {
    if (resolved) return;
    clearInterval(watchdog);

    if (code === 0) {
      resolve({ ok: true, reason: "Next exited normally." });
      return;
    }

    if (hasCompleteServerBuild()) {
      resolve({ ok: true, reason: "Production output completed before Next exited." });
      return;
    }

    resolve({ ok: false, reason: `Next exited with code ${code}.` });
  });

  const watchdog = setInterval(() => {
    if (hasCompleteServerBuild() && (sawTraceStep || sawStaticDone)) {
      return finish({ ok: true, reason: "Runnable production output is complete." });
    }

    const idleMs = Date.now() - lastOutputAt;
    const attemptMs = Date.now() - startedAt;

    if (sawStaticDone && idleMs > stalledAfterStaticMs) {
      return finish({ ok: false, retryable: true, reason: "Build stalled after static generation before writing all server files." });
    }

    if (sawStaticStart && idleMs > 7000) {
      return finish({ ok: false, retryable: true, reason: "Build stalled during static generation." });
    }

    if (attemptMs > hardAttemptLimitMs) {
      return finish({ ok: false, retryable: true, reason: "Build attempt timed out." });
    }
  }, 800);
});

const run = async () => {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (attempt > 1) {
      cleanBuildOutput();
    }

    const result = await runAttempt(attempt);

    if (result.ok) {
      console.log(`\nSafe build guard: ${result.reason}`);
      process.exit(0);
    }

    console.warn(`\nSafe build guard: ${result.reason}`);

    if (!result.retryable || attempt === maxAttempts) {
      console.error("Safe build guard: Next build did not produce complete production output.");
      process.exit(1);
    }
  }
};

run();
