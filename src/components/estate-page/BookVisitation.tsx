import { useRef } from "react";
import SelectDate from "./SelectDate";

import { motion as m } from "framer-motion";

type Props = {
  houseId: string;
  setToggleVisitation: React.Dispatch<React.SetStateAction<boolean>>;
  confirmVisit: boolean;
  setConfirmVisit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BookVisitation({
  setToggleVisitation,
  houseId,
  confirmVisit,
  setConfirmVisit,
}: Props) {
  const visitationContainerRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!visitationContainerRef.current?.contains(e.target as HTMLDivElement))
      setToggleVisitation(false);
    return;
  }

  return (
    <div
      onClick={handleClickOutside}
      className="fixed left-0 top-0 z-[1] flex h-screen w-full justify-center bg-black/30 transition-all duration-200 "
    >
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.3, bounce: 0.2 }}
        ref={visitationContainerRef}
        className="absolute bottom-0 w-full rounded-t-2xl bg-white px-4 dark:bg-[#333] "
      >
        <SelectDate
          setToggleVisitation={setToggleVisitation}
          houseId={houseId}
          confirmVisit={confirmVisit}
          setConfirmVisit={setConfirmVisit}
        />
      </m.div>
    </div>
  );
}
