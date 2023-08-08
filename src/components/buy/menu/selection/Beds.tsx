import { motion as m } from "framer-motion";
import { Estate } from "../../../../../typings";
import BedsListComp from "./BedsListComp";

type Props = {
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  filtered?: Estate[];
  userEstates?: Estate[];
};

export default function Beds({ setFiltered, filtered, userEstates }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: -15, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -15, x: "-50%" }}
      transition={spring}
      className="absolute left-1/2 top-16 z-[2] w-28 -translate-x-[50%] rounded-lg border border-lightBlue bg-white p-3 shadow-md dark:border-[#222] dark:bg-[#333] dark:text-white"
    >
      <span className="triangle absolute -top-3 left-1/2 block h-3 w-4 -translate-x-[50%] bg-lightBlue dark:bg-[#333]"></span>
      <BedsListComp
        setFiltered={setFiltered}
        filtered={filtered}
        userEstates={userEstates}
      />
    </m.div>
  );
}

const spring = {
  type: "spring",
  stiffness: 900,
  damping: 20,
};
