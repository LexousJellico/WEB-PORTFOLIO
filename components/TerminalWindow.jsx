import { motion, useReducedMotion } from "framer-motion";

const terminalLines = [
  { command: "npm run verify", response: "routes checked · api secure · build ready" },
  { command: "scan portfolio --ux", response: "responsive layout optimized for every device" },
  { command: "deploy --mode production", response: "Lexus_ji interface online" },
];

const TerminalWindow = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="cyber-panel terminal-window mx-auto w-full max-w-[680px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070810]/70 text-left shadow-[0_0_70px_rgba(47,132,255,0.12)] backdrop-blur-xl xl:mx-0"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.96 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.42, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-5 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.8)]" />
          <span className="h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_14px_rgba(250,204,21,0.55)]" />
          <span className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.8)]" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/35">
          system-console.exe
        </span>
      </div>

      <div className="space-y-4 p-5 font-mono text-xs leading-relaxed sm:text-sm">
        {terminalLines.map((line, index) => (
          <motion.div
            key={line.command}
            initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.48, delay: 0.64 + index * 0.16, ease: "easeOut" }}
          >
            <div className="text-white/80">
              <span className="text-accent">lexus_ji@portfolio</span>
              <span className="text-white/35">:~$ </span>
              <span>{line.command}</span>
              {index === 0 && <span className="terminal-caret" aria-hidden="true" />}
            </div>
            <div className="mt-1 pl-4 text-white/45">↳ {line.response}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TerminalWindow;
