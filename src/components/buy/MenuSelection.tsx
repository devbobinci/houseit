import { useState } from "react";

import PriceSelection from "./PriceSelection";

import MoreFilterSelection from "./MoreFilterSelection";
import Beds from "./menu/selection/Beds";

import { IconType } from "react-icons";
import { AnimatePresence } from "framer-motion";
import { useFilterSelection } from "../../context/FilterUserSelection";
import { BiBath } from "@react-icons/all-files/bi/BiBath";
import { MdTerrain } from "@react-icons/all-files/md/MdTerrain";
import { BiBed } from "@react-icons/all-files/bi/BiBed";

type Props = {
  text: string;
  Icon: IconType;
  setNewFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuSelection({ text, Icon, setNewFilters }: Props) {
  const [openTab, setOpenTab] = useState(false);
  const { filterSelection } = useFilterSelection();
  const { beds, baths, area } = filterSelection || {};

  return (
    <div className="relative">
      <div
        onClick={() => setOpenTab((prev) => !prev)}
        className="flex cursor-pointer select-none items-center gap-2 rounded-full border bg-white px-4 py-3 text-sm dark:border-[#222] dark:bg-[#333] dark:text-white/70 md:text-base"
      >
        {text}
        <Icon />
      </div>
      <AnimatePresence mode="wait">
        {text === "Price" && openTab && (
          <PriceSelection
            setOpenTab={setOpenTab}
            setNewFilters={setNewFilters}
          />
        )}
        {text === "More Filter" && (
          <>
            {openTab && (
              <MoreFilterSelection
                setOpenTab={setOpenTab}
                setNewFilters={setNewFilters}
              />
            )}
            {baths > 0 && (
              <div className="absolute -top-3 left-1 flex min-h-[10px] min-w-[10px] items-center gap-1 rounded-full border bg-white px-2 py-1 text-sm dark:border-[#222] dark:bg-[#333]">
                <BiBath className="dark:text-white" />
              </div>
            )}
            {area > 0 && (
              <div className="absolute -top-3 left-10 flex min-h-[10px] min-w-[10px] items-center gap-1 rounded-full border bg-white px-2 py-1 text-sm dark:border-[#222] dark:bg-[#333]">
                <MdTerrain className="dark:text-white" />
              </div>
            )}

            <div className="lg:hidden">
              {beds > 0 && (
                <div className="absolute -top-3 left-[77px] flex min-h-[10px] min-w-[10px] items-center gap-1 rounded-full border bg-white px-2 py-1 text-sm dark:border-[#222] dark:bg-[#333]">
                  <BiBed className="dark:text-white" />
                </div>
              )}
            </div>
          </>
        )}
        {text === "Beds" && (
          <>
            {openTab && (
              <Beds setOpenTab={setOpenTab} setNewFilters={setNewFilters} />
            )}

            {beds > 0 && (
              <div className="absolute -top-3 left-16 flex min-h-[10px] min-w-[10px] items-center gap-1 rounded-full border bg-white px-2 py-1 text-sm dark:border-[#222] dark:bg-[#333]">
                <BiBed className="dark:text-white" />
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
