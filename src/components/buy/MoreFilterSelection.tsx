import { motion as m } from "framer-motion";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import FilterSelection from "./menu/FilterSelection";

import { BiBath } from "@react-icons/all-files/bi/BiBath";
import { MdTerrain } from "@react-icons/all-files/md/MdTerrain";
import { BiBed } from "@react-icons/all-files/bi/BiBed";

type Props = {
  setOpenTab: React.Dispatch<React.SetStateAction<boolean>>;
  setNewFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MoreFilterSelection({
  setOpenTab,
  setNewFilters,
}: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={spring}
      className="absolute -right-2 top-16 z-[2] w-40 rounded-lg border border-lightBlue bg-white p-3 shadow-md dark:border-[#222] dark:bg-[#333] dark:text-white"
    >
      <span className="triangle absolute -top-3 left-1/2 block h-3 w-4 -translate-x-[50%] bg-lightBlue dark:bg-[#333]"></span>
      <button
        onClick={() => setOpenTab(false)}
        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-lg dark:border-[#222] dark:bg-[#444]"
      >
        &times;
      </button>
      {/* Options */}
      <div className="space-y-3">
        <FilterSelection
          text="Baths"
          Icon={BsChevronDown}
          Icon2={BiBath}
          setNewFilters={setNewFilters}
        />
        <FilterSelection
          text="Area"
          Icon={BsChevronDown}
          Icon2={MdTerrain}
          setNewFilters={setNewFilters}
        />
        <div className="space-y-3 lg:hidden">
          <FilterSelection
            text="Beds"
            Icon={BsChevronDown}
            Icon2={BiBed}
            setNewFilters={setNewFilters}
          />
        </div>
      </div>
    </m.div>
  );
}

const spring = {
  type: "spring",
  stiffness: 900,
  damping: 20,
};
