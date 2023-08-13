import { motion as m } from "framer-motion";
import BedsListComp from "./BedsListComp";

type Props = {
  setOpenTab: React.Dispatch<React.SetStateAction<boolean>>;
  setNewFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Beds({ setOpenTab, setNewFilters }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: -15, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -15, x: "-50%" }}
      transition={spring}
      className="absolute left-1/2 top-16 z-[2] w-28 -translate-x-[50%] rounded-lg border border-lightBlue bg-white p-3 shadow-md dark:border-[#222] dark:bg-[#333] dark:text-white"
    >
      <span className="triangle absolute -top-3 left-1/2 block h-3 w-4 -translate-x-[50%] bg-lightBlue dark:bg-[#333]"></span>
      <BedsListComp setOpenTab={setOpenTab} setNewFilters={setNewFilters} />
    </m.div>
  );
}

const spring = {
  type: "spring",
  stiffness: 900,
  damping: 20,
};
