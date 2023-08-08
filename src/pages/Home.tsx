import { motion as m } from "framer-motion";
import Catalogue from "../components/home/Catalogue";

import HeroBanner from "../components/home/HeroBanner";
import Footer from "../components/home/Footer";

import "../styles/dark-theme-bg.css";
import Benefits from "../components/home/Benefits";

export default function Home() {
  return (
    <>
      <div className="mt-20">
        <m.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -15 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
        >
          <HeroBanner />
        </m.div>

        <div className="dark-theme-bg">
          <Catalogue />
          <hr className="mx-auto max-w-[1400px] border-neutral-200 px-4 dark:border-neutral-500 md:px-8 xl:px-0" />
          <Benefits />
          <hr className="mx-auto max-w-[1400px] border-neutral-200 px-4 dark:border-neutral-500 md:px-8 xl:px-0" />
          <Footer />
        </div>
      </div>
    </>
  );
}
