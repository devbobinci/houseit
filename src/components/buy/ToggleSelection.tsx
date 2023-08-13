import { useState } from "react";

import { motion as m } from "framer-motion";
import { HiOutlineTrendingDown } from "@react-icons/all-files/hi/HiOutlineTrendingDown";
import { Estate } from "../../../typings";
import { useFilterSelection } from "../../context/FilterUserSelection";

type Props = {
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
};
export default function ToggleSelection({ setFiltered }: Props) {
  const [toggleList, setToggleList] = useState(false);
  const { filterSelection, setFilterSelection } = useFilterSelection();
  const { sort } = filterSelection || {};

  return (
    <div className="group relative flex h-[52px] w-60 cursor-pointer items-center justify-between gap-4 overflow-x-hidden rounded-full border border-lightBlue bg-white px-5 transition-all duration-300 hover:border-baseBlue dark:border-[#222] dark:bg-[#333] md:w-64">
      <m.div
        layout
        transition={spring}
        className={`absolute z-0 h-[77%] w-[46%] rounded-full transition-colors duration-300 ${
          toggleList ? "right-2" : "left-2"
        } ${sort !== "" && "bg-baseBlue"}`}
      />

      <p
        onClick={() => {
          setToggleList(false);
          setFiltered((prev) => [...prev].sort((a, b) => b.price - a.price));
          setFilterSelection((prevSelection) => ({
            ...prevSelection,
            sort: "desc",
          }));
        }}
        className={`relative z-[1] inline-flex items-center gap-1 text-sm transition-all duration-300 md:text-base ${
          sort !== "" && !toggleList
            ? "text-white"
            : "opacity-30 hover:opacity-100 dark:text-gray-100"
        }`}
      >
        <span className="text-sm">High-Low</span>{" "}
        <HiOutlineTrendingDown className="rotate-12 xl:text-lg" />
      </p>
      <p
        onClick={() => {
          setToggleList(true);
          setFiltered((prev) => [...prev].sort((a, b) => a.price - b.price));
          setFilterSelection((prevSelection) => ({
            ...prevSelection,
            sort: "asc",
          }));
        }}
        className={`relative z-[1] inline-flex items-center gap-1 text-sm transition-all duration-300 md:text-base ${
          sort !== "" && toggleList
            ? "text-white"
            : "opacity-30 hover:opacity-100 dark:text-gray-100"
        }`}
      >
        <span className="text-sm">Low-High</span>{" "}
        <HiOutlineTrendingDown className="-rotate-90 xl:text-lg" />
      </p>
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
