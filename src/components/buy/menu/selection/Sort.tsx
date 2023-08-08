import { BsGraphUp } from "@react-icons/all-files/bs/BsGraphUp";
import { BsGraphDown } from "@react-icons/all-files/bs/BsGraphDown";
import { motion as m } from "framer-motion";
import { Estate } from "../../../../../typings";

type Props = {
  setFiltering: React.Dispatch<React.SetStateAction<string>>;
  filtering: string;
  filtered: Estate[];
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  setOpenTab: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sort({
  setFiltering,
  filtering,
  filtered,
  setFiltered,
  setOpenTab,
}: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: -15, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -15, x: "-50%" }}
      transition={spring}
      className="absolute left-1/2 top-16 z-[2] w-48 -translate-x-[50%] rounded-lg border border-lightBlue bg-white p-3 shadow-md dark:border-[#222] dark:bg-[#333] dark:text-white"
    >
      <span className="triangle absolute -top-3 left-1/2 block h-3 w-4 -translate-x-[50%] bg-lightBlue dark:bg-[#333]"></span>
      <ul className="space-y-4">
        <li
          onClick={() => {
            setFiltering("asc");
            setFiltered(filtered?.sort((a, b) => a?.price - b?.price));
            setOpenTab(false);
          }}
          className="group group flex cursor-pointer items-center justify-between gap-2 text-sm"
        >
          Price:
          <span className={`${filtering === "asc" && "text-baseBlue"}`}>
            ascending
          </span>
          <BsGraphUp className="text-lg transition-all group-hover:text-baseBlue" />
        </li>
        <li
          onClick={() => {
            setFiltering("desc");
            setFiltered(filtered?.sort((a, b) => b?.price - a?.price));
            setOpenTab(false);
          }}
          className="group group flex cursor-pointer items-center justify-between gap-2 text-sm"
        >
          Price:
          <span className={`${filtering === "desc" && "text-baseBlue"}`}>
            descending
          </span>
          <BsGraphDown className="text-lg transition-all group-hover:text-baseBlue" />
        </li>
      </ul>
    </m.div>
  );
}

const spring = {
  type: "spring",
  stiffness: 900,
  damping: 20,
};
