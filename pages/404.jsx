import Link from "next/link";
import { motion } from "framer-motion";

import ScreenFrame from "../components/ScreenFrame";
import { fadeIn } from "../variants";

const Custom404 = () => {
  return (
    <ScreenFrame className="bg-primary/30" frameClassName="text-center">
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="cyber-panel mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.035] px-6 py-10 shadow-[0_0_55px_rgba(241,48,36,0.08)] backdrop-blur-md"
      >
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-accent">
          404 error
        </p>
        <h1 className="h1 mb-4">Page not found.</h1>
        <p className="mb-8">
          The page you opened may have been moved, renamed, or removed. Return
          to the homepage to continue exploring the portfolio.
        </p>
        <Link
          href="/"
          className="btn inline-flex items-center justify-center rounded-full border border-white/50 px-8 transition-all duration-300 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Back to home
        </Link>
      </motion.div>
    </ScreenFrame>
  );
};

export default Custom404;
