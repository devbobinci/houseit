import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark";
import { FcCalendar } from "@react-icons/all-files/fc/FcCalendar";
import { useInView } from "react-intersection-observer";
import { motion as m } from "framer-motion";

export default function Benefits() {
  const { ref: container, inView: containerVisible } = useInView({
    delay: 800,
    triggerOnce: false,
    threshold: 0.4,
  });

  return (
    <div
      ref={container}
      className={`${
        containerVisible ? "opacity-1 block " : "appearance-none opacity-0"
      } min-h-[50vh] overflow-x-hidden transition-all duration-700`}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:pt-24 xl:px-0">
        <div className="mb-12 flex flex-col items-center">
          <h2 className="text-lg font-semibold uppercase text-[#222] dark:text-white md:text-xl xl:text-2xl 2xl:text-3xl">
            Many Advantages
          </h2>

          <p className="max-w-md py-3 text-sm text-neutral-600 dark:text-neutral-200 xl:text-base">
            Our service provides many benefits, such as:
          </p>

          {containerVisible && (
            <ul className="relative my-4 space-y-4 md:space-y-6">
              <m.li
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.5 }}
                className="relative flex w-fit items-center gap-1 text-sm dark:text-neutral-300 md:gap-2 md:text-base"
              >
                <FcCheckmark className="text-lg md:text-xl" />
                New listings every week
                <FcCalendar
                  size={40}
                  className="absolute -right-12 -top-[10%] rotate-12 opacity-30"
                />
              </m.li>
              <m.li
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 1 }}
                className="relative flex w-fit items-center gap-1 text-sm dark:text-neutral-300 md:gap-2 md:text-base"
              >
                <FcCheckmark className="text-lg md:text-xl" />
                Display for sale your property
                <img
                  src="/home/benefits/payment.png"
                  alt="payment"
                  className="absolute -right-16 h-[45px] -rotate-12 opacity-30 transition-all duration-300 md:h-[50px]"
                />
              </m.li>
              <m.li
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 1.5 }}
                className="relative flex w-fit items-center gap-1 text-sm dark:text-neutral-300 md:gap-2 md:text-base"
              >
                <FcCheckmark className="text-lg md:text-xl" />
                Book a visit in house you are interested in
                <img
                  src="/home/benefits/places-to-visit.png"
                  alt="payment"
                  className="absolute -right-8 h-[45px] rotate-12 opacity-30 transition-all duration-300 md:-right-14 md:h-[50px]"
                />
              </m.li>
              <m.li
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 2 }}
                className="relative flex w-fit items-center gap-1 text-sm dark:text-neutral-300 md:gap-2 md:text-base"
              >
                <FcCheckmark className="text-lg md:text-xl" />
                Save in favorites and check it at any time
                <m.img
                  src="/home/benefits/favorite.png"
                  alt="payment"
                  className="absolute -right-10 -top-1 h-[45px] -rotate-12 opacity-30 transition-all duration-300 md:-right-12 md:h-[50px]"
                />
              </m.li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
