import { motion, useReducedMotion } from "framer-motion";
import { BsTrophyFill } from "react-icons/bs";

const AchievementToast = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.aside
      className="achievement-toast pointer-events-none fixed bottom-[6.5rem] left-4 right-4 z-40 mx-auto hidden max-w-[360px] rounded-3xl border border-white/10 bg-black/35 p-3 text-left shadow-[0_0_50px_rgba(241,48,36,0.16)] backdrop-blur-xl sm:left-auto sm:right-6 sm:mx-0 xl:bottom-8 xl:right-8 xl:block"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
      animate={prefersReducedMotion ? undefined : { opacity: [0, 1, 1, 0], y: [24, 0, 0, 10], scale: [0.96, 1, 1, 0.98] }}
      transition={{ duration: 6.8, times: [0, 0.18, 0.78, 1], ease: "easeOut", delay: 1.25 }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent shadow-[0_0_25px_rgba(241,48,36,0.2)]">
          <BsTrophyFill aria-hidden="true" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-accent">Achievement unlocked</p>
          <p className="mt-1 text-sm font-semibold text-white/80">Responsive developer portfolio loaded</p>
        </div>
      </div>
    </motion.aside>
  );
};

export default AchievementToast;
