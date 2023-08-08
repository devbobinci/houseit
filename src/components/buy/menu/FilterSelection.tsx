import { useState } from "react";
import { IconType } from "react-icons";
import Baths from "./selection/Baths";
import Area from "./selection/Area";

import { motion as m } from "framer-motion";
import MobileBeds from "./selection/MobileBeds";
import { Estate } from "../../../../typings";

type Props = {
  text: string;
  Icon: IconType;
  Icon2: IconType;
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  filtered: Estate[];
  userEstates?: Estate[];
};

export default function FilterSelection({
  text,
  Icon,
  Icon2,
  setFiltered,
  filtered,
  userEstates,
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
            <Baths
              setFiltered={setFiltered}
              filtered={filtered}
              userEstates={userEstates}
            />
          )}
          {text === "Beds" && openTab && (
            <MobileBeds
              setFiltered={setFiltered}
              filtered={filtered}
              userEstates={userEstates}
            />
          )}
          {text === "Area" && openTab && (
            <Area
              setFiltered={setFiltered}
              filtered={filtered}
              userEstates={userEstates}
            />
          )}
        </m.div>
      )}
    </div>
  );
}
