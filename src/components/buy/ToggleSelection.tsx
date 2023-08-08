import { useState } from "react";

import { motion as m } from "framer-motion";
import { HiOutlineMenuAlt2 } from "@react-icons/all-files/hi/HiOutlineMenuAlt2";
import { HiOutlineLocationMarker } from "@react-icons/all-files/hi/HiOutlineLocationMarker";

export default function ToggleSelection() {
  const [toggleList, setToggleList] = useState(false);

  return (
    <div className="px-5 border self-center border-lightBlue hover:border-baseBlue rounded-full relative cursor-pointer flex justify-between items-center transition-all duration-300 group w-44 h-[52px]">
      <m.div
        layout
        transition={spring}
        className={`w-[45%] h-[80%] rounded-full transition-colors duration-300 bg-baseBlue absolute z-0 ${
          toggleList ? "right-2" : "left-2"
        }`}
      />

      <p
        onClick={() => setToggleList(false)}
        className={`inline-flex text-sm md:text-base items-center gap-1 relative z-[1] transition-all duration-300 ${
          !toggleList ? "text-white" : ""
        }`}
      >
        <HiOutlineMenuAlt2 className="text-lg" /> List
      </p>
      <p
        onClick={() => setToggleList(true)}
        className={`inline-flex text-sm md:text-base items-center gap-1 relative z-[1] transition-all duration-300 ${
          toggleList ? "text-white" : ""
        }`}
      >
        <HiOutlineLocationMarker className="text-lg" />
        Map
      </p>
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
