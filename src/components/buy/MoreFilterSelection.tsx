import { motion as m } from "framer-motion";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import FilterSelection from "./menu/FilterSelection";

import { BiBath } from "@react-icons/all-files/bi/BiBath";
import { MdTerrain } from "@react-icons/all-files/md/MdTerrain";
import { BiBed } from "@react-icons/all-files/bi/BiBed";
import { Estate } from "../../../typings";

type Props = {
  setFiltered?: React.Dispatch<React.SetStateAction<Estate[]>>;
  filtered?: Estate[];
  userEstates?: Estate[];
};

export default function MoreFilterSelection({
  setFiltered,
  filtered,
  userEstates,
}: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={spring}
      className="absolute right-0 top-16 z-[2] w-40 rounded-lg border border-lightBlue bg-white p-3 shadow-md dark:border-[#222] dark:bg-[#333] dark:text-white"
    >
      <span className="triangle absolute -top-3 left-1/2 block h-3 w-4 -translate-x-[50%] bg-lightBlue dark:bg-[#333]"></span>
      {/* Options */}
      <div className="space-y-3">
        <FilterSelection
          text="Baths"
          setFiltered={setFiltered!}
          filtered={filtered!}
          Icon={BsChevronDown}
          Icon2={BiBath}
          userEstates={userEstates}
        />
        <FilterSelection
          text="Area"
          setFiltered={setFiltered!}
          filtered={filtered!}
          Icon={BsChevronDown}
          Icon2={MdTerrain}
          userEstates={userEstates}
        />
        <div className="space-y-3 lg:hidden">
          <FilterSelection
            text="Beds"
            setFiltered={setFiltered!}
            filtered={filtered!}
            Icon={BsChevronDown}
            Icon2={BiBed}
            userEstates={userEstates}
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
