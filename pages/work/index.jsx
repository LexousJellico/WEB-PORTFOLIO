import { motion } from "framer-motion";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import ScreenFrame from "../../components/ScreenFrame";
import WorkSlider from "../../components/WorkSlider";
import { projectItems } from "../../data/projects";
import { fadeIn } from "../../variants";

const Work = () => {
  return (
    <ScreenFrame className="overflow-hidden bg-primary/30" frameClassName="text-center xl:text-left">
      <Circles />
      <div className="container desktop-safe-container relative z-10 mx-auto grid w-full items-center gap-5 px-5 sm:px-6 xl:grid-cols-[minmax(270px,0.34fr)_minmax(0,1fr)] xl:gap-8 xl:px-0">
        <div className="mx-auto flex max-w-[520px] flex-col xl:mx-0">
          <motion.p
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-3 text-xs uppercase tracking-[0.32em] text-accent"
          >
            Selected projects
          </motion.p>
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 glitch-text mb-3"
          >
            My work <span className="text-accent">.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mx-auto mb-4 max-w-[430px] text-sm sm:text-base xl:mx-0"
          >
            A mission-board style project hub. The page stays screen-fit while
            the project list scrolls inside its own panel for better control.
          </motion.p>
          <motion.div
            variants={fadeIn("up", 0.48)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mx-auto grid w-full max-w-[430px] grid-cols-3 gap-3 xl:mx-0"
          >
            <div className="cyber-panel rounded-2xl border border-white/10 bg-white/[0.035] p-3 backdrop-blur-sm">
              <span className="block text-xl font-semibold text-white sm:text-2xl">{projectItems.length}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-white/40">Works</span>
            </div>
            <div className="cyber-panel rounded-2xl border border-white/10 bg-white/[0.035] p-3 backdrop-blur-sm">
              <span className="block text-xl font-semibold text-white sm:text-2xl">5+</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-white/40">Stacks</span>
            </div>
            <div className="cyber-panel rounded-2xl border border-white/10 bg-white/[0.035] p-3 backdrop-blur-sm">
              <span className="block text-xl font-semibold text-white sm:text-2xl">100%</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-white/40">Focus</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn("down", 0.55)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="min-w-0"
        >
          <WorkSlider />
        </motion.div>
      </div>
      <Bulb />
    </ScreenFrame>
  );
};

export default Work;
