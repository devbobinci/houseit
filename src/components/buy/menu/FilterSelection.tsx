import { useState } from "react";
import { IconType } from "react-icons";
import Baths from "./selection/Baths";
import Area from "./selection/Area";

import { motion as m } from "framer-motion";
import MobileBeds from "./selection/MobileBeds";

type Props = {
  text: string;
  Icon: IconType;
  Icon2: IconType;
  setNewFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FilterSelection({
  text,
  Icon,
  Icon2,
  setNewFilters,
}: Props) {
  const [openTab, setOpenTab] = useState<boolean>(false);

  return (
    <div className="flex cursor-pointer select-none flex-col gap-2 text-sm">
      <div
        onClick={() => setOpenTab((prev) => !prev)}
        className="flex cursor-pointer items-center gap-2 opacity-80"
      >
        <Icon2 /> {text} <Icon />
      </div>

      {openTab && (
        <m.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="ml-2"
        >
          {text === "Baths" && openTab && (
            <Baths setOpenTab={setOpenTab} setNewFilters={setNewFilters} />
          )}
          {text === "Beds" && openTab && (
            <MobileBeds setOpenTab={setOpenTab} setNewFilters={setNewFilters} />
          )}
          {text === "Area" && openTab && (
            <Area setOpenTab={setOpenTab} setNewFilters={setNewFilters} />
          )}
        </m.div>
      )}
    </div>
  );
}
