import Marquee from "react-fast-marquee";
import { estateData } from "../../static/estate-data";
import EstateItem from "../buy/EstateItem";
import { useInView } from "react-intersection-observer";

export default function Footer() {
  const { ref: container, inView: containerVisible } = useInView({
    delay: 800,
    triggerOnce: false,
    threshold: 0.6,
  });

  return (
    <div
      ref={container}
      className={`relative py-8 ${
        containerVisible ? "opacity-100" : "opacity-0"
      } transition-all duration-700`}
    >
      <div className="absolute left-0 top-1/2 z-[2] w-10 -translate-y-1/2 rounded-r-xl bg-white/20 backdrop-blur-sm dark:bg-black/20 md:w-16 xl:h-full xl:w-24 2xl:w-32"></div>
      <div className="absolute right-0 top-1/2 z-[2] w-10 -translate-y-1/2 rounded-l-xl bg-white/20 backdrop-blur-sm dark:bg-black/20 md:w-16 xl:h-full xl:w-24 2xl:w-32"></div>
      <Marquee direction="right" autoFill pauseOnHover className="my-4">
        <div className="flex gap-4">
          {estateData.map((estate, idx) => (
            <EstateItem key={estate.id} estate={estate} idx={idx}></EstateItem>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
