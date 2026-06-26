import { motion } from "framer-motion";

import ScreenFrame from "../../components/ScreenFrame";
import TestimonialSlider from "../../components/TestimonialSlider";
import { fadeIn } from "../../variants";

const Testimonials = () => {
  return (
    <ScreenFrame className="bg-primary/30" frameClassName="text-center">
      <div className="container desktop-safe-container relative z-10 mx-auto flex w-full flex-col justify-center px-5 sm:px-6 xl:px-0">
        <motion.p
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-3 text-xs uppercase tracking-[0.3em] text-accent"
        >
          Achievement log
        </motion.p>
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 mb-5"
        >
          Portfolio <span className="text-accent">highlights.</span>
        </motion.h2>

        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mx-auto w-full max-w-[1040px]"
        >
          <TestimonialSlider />
        </motion.div>
      </div>
    </ScreenFrame>
  );
};

export default Testimonials;
