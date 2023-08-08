import { useState } from "react";

import { IconType } from "react-icons";
import PriceSelection from "./PriceSelection";

import { AnimatePresence } from "framer-motion";
import MoreFilterSelection from "./MoreFilterSelection";
import Beds from "./menu/selection/Beds";
import { Estate } from "../../../typings";
import Sort from "./menu/selection/Sort";

type Props = {
  text: string;
  Icon: IconType;
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  userEstates?: Estate[];
  filtered?: Estate[];
  setFiltering?: React.Dispatch<React.SetStateAction<string>>;
  filtering?: string;
};

export default function MenuSelection({
  text,
  Icon,
  setFiltered,
  userEstates,
  filtered,
  setFiltering,
  filtering,
}: Props) {
  const [openTab, setOpenTab] = useState(false);

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
            setFiltered={setFiltered}
            userEstates={userEstates!}
            setOpenTab={setOpenTab}
          />
        )}
        {text === "More Filter" && openTab && (
          <MoreFilterSelection
            setFiltered={setFiltered}
            filtered={filtered}
            userEstates={userEstates}
          />
        )}
        {text === "Beds" && openTab && (
          <Beds
            setFiltered={setFiltered}
            filtered={filtered}
            userEstates={userEstates}
          />
        )}
        {text === "Sort" && openTab && (
          <Sort
            setFiltering={setFiltering!}
            filtering={filtering!}
            setFiltered={setFiltered}
            filtered={filtered!}
            setOpenTab={setOpenTab}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
