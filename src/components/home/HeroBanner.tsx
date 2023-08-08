import AnimatedText from "../../components/home/AnimatedText";

import { motion as m } from "framer-motion";
import RootLayout from "../../layout/RootLayout";
import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <div
      className="flex h-[35vh] max-h-screen w-full items-center bg-cover bg-center md:h-[45vh] xl:h-[calc(100vh-80px)] 3xl:h-[95vh]"
      style={{ backgroundImage: "url('/home/home-bg-red.jpg')" }}
    >
      <RootLayout>
        <div className="">
          <div className="mb-4 xl:mb-8">
            <AnimatedText
              text="HouseIt is a place where you can find your dream house"
              color="white"
              tabletFontSize="text-4xl"
              bold="semibold"
            />
          </div>
          <m.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              bounce: 0.3,
              stiffness: 700,
              delay: 3.5,
            }}
          >
            <Link
              to="/buy"
              className="rounded-md bg-red-500/80 px-2.5 py-1.5 text-xs text-white opacity-80 transition-all duration-200 hover:bg-red-500 hover:opacity-100 md:px-3 md:py-2 md:text-base xl:text-lg"
            >
              Check now!
            </Link>
          </m.div>
        </div>
      </RootLayout>
    </div>
  );
}
