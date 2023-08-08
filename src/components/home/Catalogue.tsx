import { useInView } from "react-intersection-observer";
import { motion as m } from "framer-motion";

export default function Catalogue() {
  const { ref: container, inView: containerVisible } = useInView({
    delay: 800,
    triggerOnce: true,
    threshold: 0.6,
  });

  return (
    <div
      ref={container}
      className={`${
        containerVisible ? "opacity-1 block " : "appearance-none opacity-0"
      } min-h-[60vh] transition-all duration-700`}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:pt-24 xl:px-0">
        <h2 className="text-lg font-semibold uppercase text-[#222] dark:text-white xl:text-2xl 2xl:text-3xl">
          Trust Us
        </h2>
        <p className="max-w-md py-3 text-sm text-neutral-600 dark:text-neutral-200 xl:text-base">
          In the entrire history of our agency, we have made more than 1000
          successful deals. We will find you the most modern accommodation.
        </p>

        <div className="my-8 gap-4 md:flex md:pb-0 xl:gap-12">
          <img
            src="/home/catalogue/m-h-4.jpg"
            alt=""
            className="rounded-md object-cover md:w-[55%]"
          />
          {containerVisible && (
            <div className="relative mt-2 h-[450px] w-full gap-2 overflow-hidden md:mt-0 xl:h-[600px]">
              <m.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.5 }}
                src="/home/catalogue/m-h-5.jpg"
                alt=""
                className="absolute left-4 top-4 z-0 h-[33%] w-2/3 rotate-3 rounded-md object-cover shadow-lg transition-all duration-300 hover:left-0 hover:top-1/2 hover:z-10 hover:h-2/3 hover:w-full hover:-translate-y-[75%] hover:rotate-0 md:h-[40%] md:rotate-6"
              />
              <m.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 1 }}
                src="/home/catalogue/m-h-2.jpg"
                alt=""
                className="absolute left-1/3 top-[45%] z-[1] h-[33%] w-2/3 -translate-y-1/2 rotate-3 rounded-md object-cover shadow-lg transition-all duration-300 hover:left-0 hover:top-1/2 hover:z-10 hover:h-2/3 hover:w-full hover:rotate-0 md:top-[50%] md:h-[40%] md:rotate-6"
              />
              <m.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 1.5 }}
                src="/home/catalogue/m-h-6.jpg"
                alt=""
                className="absolute bottom-[10%] left-4 z-[2] h-[33%] w-2/3 rotate-3 rounded-md object-cover shadow-lg transition-all duration-300 hover:left-0 hover:top-1/2 hover:z-10 hover:h-2/3 hover:w-full hover:-translate-y-[25%] hover:rotate-0 md:top-[58%] md:h-[40%] md:rotate-6"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
