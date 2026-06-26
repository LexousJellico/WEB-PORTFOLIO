import { motion } from "framer-motion";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import ScreenFrame from "../../components/ScreenFrame";
import ServiceSlider from "../../components/ServiceSlider";
import { fadeIn } from "../../variants";

const Services = () => {
  return (
    <ScreenFrame className="bg-primary/30" frameClassName="text-center xl:text-left">
      <Circles />
      <div className="container desktop-safe-container relative z-10 mx-auto grid w-full items-center gap-6 px-5 sm:px-6 xl:grid-cols-[minmax(280px,0.42fr)_minmax(0,1fr)] xl:gap-10 xl:px-0">
        <div className="mx-auto max-w-[520px] xl:mx-0">
          <motion.p
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-3 text-xs uppercase tracking-[0.3em] text-accent"
          >
            Loadout menu
          </motion.p>
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 glitch-text mb-3"
          >
            My services <span className="text-accent">.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mx-auto mb-4 max-w-[430px] text-sm sm:text-base xl:mx-0"
          >
            I help turn ideas into clean digital products by combining design,
            development, polishing, documentation, and deployment support.
          </motion.p>
          <motion.div
            variants={fadeIn("up", 0.48)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="screen-only-tall mx-auto grid max-w-[430px] grid-cols-3 gap-3 xl:mx-0"
          >
            {[
              ["UI", "Responsive"],
              ["Code", "Reusable"],
              ["Deploy", "Checked"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="cyber-panel rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-center backdrop-blur-sm"
              >
                <span className="block text-lg font-semibold text-white">{label}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-white/40">{value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn("down", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full"
        >
          <ServiceSlider />
        </motion.div>
      </div>
      <Bulb />
    </ScreenFrame>
  );
};

export default Services;
