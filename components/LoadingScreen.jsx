import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { siteConfig } from "../data/siteConfig";

const LOADING_TIME = 1450;
const REDUCED_LOADING_TIME = 450;
const SPLIT_TIME = 950;

const panelTransition = {
  duration: 0.85,
  ease: [0.76, 0, 0.24, 1],
};

const LoadingScreen = () => {
  const [phase, setPhase] = useState("loading");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const loadDelay = prefersReducedMotion ? REDUCED_LOADING_TIME : LOADING_TIME;
    const splitDelay = prefersReducedMotion ? 120 : SPLIT_TIME;

    const revealTimer = window.setTimeout(() => {
      setPhase("reveal");
    }, loadDelay);

    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
    }, loadDelay + splitDelay);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
    };
  }, [prefersReducedMotion]);

  const isRevealing = phase === "reveal";

  return (
    <AnimatePresence>
      {phase !== "hidden" && (
        <motion.div
          className="fixed inset-0 z-[999] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
          role="status"
          aria-live="polite"
          aria-label={`Loading ${siteConfig.name} portfolio`}
        >
          <motion.div
            className="loading-panel loading-panel-top absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-[#050509]"
            animate={isRevealing && !prefersReducedMotion ? { y: "-103%" } : { y: 0 }}
            transition={panelTransition}
          >
            <div className="loading-panel-grid" />
            <div className="loading-panel-glow loading-panel-glow-top" />
          </motion.div>

          <motion.div
            className="loading-panel loading-panel-bottom absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-[#050509]"
            animate={isRevealing && !prefersReducedMotion ? { y: "103%" } : { y: 0 }}
            transition={panelTransition}
          >
            <div className="loading-panel-grid" />
            <div className="loading-panel-glow loading-panel-glow-bottom" />
          </motion.div>

          <motion.div
            className="loading-split-line absolute left-0 top-1/2 z-20 h-px w-full -translate-y-1/2"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { scaleX: 0, opacity: 0 }
                : isRevealing
                  ? { scaleX: 1, opacity: [0.35, 1, 0] }
                  : { scaleX: 1, opacity: 0.7 }
            }
            transition={{ duration: isRevealing ? 0.75 : 0.9, ease: "easeInOut" }}
          />

          <motion.div
            className="relative z-30 flex h-full items-center justify-center px-6"
            initial={prefersReducedMotion ? false : { scale: 0.88, opacity: 0 }}
            animate={
              isRevealing
                ? { scale: prefersReducedMotion ? 1 : 0.86, opacity: 0, filter: "blur(10px)" }
                : { scale: 1, opacity: 1, filter: "blur(0px)" }
            }
            transition={{ duration: isRevealing ? 0.42 : 0.7, ease: "easeOut" }}
          >
            <div className="relative flex flex-col items-center justify-center gap-6">
              <motion.div
                className="relative h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64"
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.04, 1] }}
                transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full border border-red-500/25"
                  animate={prefersReducedMotion ? undefined : { rotate: 360, scale: [1, 1.08, 1] }}
                  transition={{ duration: 4.2, repeat: prefersReducedMotion ? 0 : Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border border-blue-500/25"
                  animate={prefersReducedMotion ? undefined : { rotate: -360, scale: [1, 0.94, 1] }}
                  transition={{ duration: 5.4, repeat: prefersReducedMotion ? 0 : Infinity, ease: "linear" }}
                />
                <div className="absolute inset-3 rounded-[36px] bg-red-500/20 blur-3xl" />
                <div className="absolute inset-3 rounded-[36px] bg-blue-500/20 blur-3xl mix-blend-screen" />
                <Image
                  src="/logo-mark.webp"
                  alt="Lexus_ji LJ logo"
                  fill
                  priority
                  sizes="(max-width: 640px) 160px, 256px"
                  className="relative object-contain"
                />
              </motion.div>

              <div className="relative h-1 w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 via-white to-blue-500"
                  initial={{ x: "-100%" }}
                  animate={prefersReducedMotion ? { x: "0%" } : { x: ["-100%", "100%"] }}
                  transition={{ duration: 1.15, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
                />
              </div>

              <div className="flex items-center gap-2 text-center text-xs uppercase tracking-[0.45em] text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
                {isRevealing ? "System Ready" : "Loading Portfolio"}
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
