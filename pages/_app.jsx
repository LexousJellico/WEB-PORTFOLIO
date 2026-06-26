import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import LoadingScreen from "../components/LoadingScreen";
import Transition from "../components/Transition";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <MotionConfig reducedMotion="user">
      <Layout>
        <LoadingScreen />
        <AnimatePresence mode="wait">
          <motion.div key={router.route} className="h-full">
            <Transition />
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </MotionConfig>
  );
}

export default MyApp;
