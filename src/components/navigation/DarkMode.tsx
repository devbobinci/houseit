import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineLightBulb } from "@react-icons/all-files/hi/HiOutlineLightBulb";
import { IoMdCloudyNight } from "@react-icons/all-files/Io/IoMdCloudyNight";

type Props = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export default function DarkMode({ darkMode, setDarkMode }: Props) {
  useEffect(() => {
    const darkModeinLS = localStorage.getItem("darkTheme");

    if (localStorage) {
      if (darkModeinLS) setDarkMode(true);
      if (!darkModeinLS) setDarkMode(false);
    }
  }, [darkMode]);

  return (
    <div
      className="group relative cursor-pointer rounded-full border border-lightBlue p-2 px-2.5 transition-all duration-300 hover:border-baseBlue"
      onClick={() => {
        setDarkMode((prev) => !prev);
        if (darkMode) localStorage.removeItem("darkTheme");
        else if (!darkMode) localStorage.setItem("darkTheme", "on");
      }}
    >
      <div className="flex items-center gap-4">
        <HiOutlineLightBulb className="text-xl text-black dark:text-white" />
        <IoMdCloudyNight className="text-xl text-black dark:text-white" />
        <motion.div
          layout
          transition={spring}
          className={`absolute h-6 w-6 rounded-full bg-lightBlue transition-colors duration-300 group-hover:bg-baseBlue ${
            darkMode ? "right-2" : "left-2"
          }`}
        />
      </div>
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
