import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion as m } from "framer-motion";

type Props = {
  darkMode: boolean;
};

export default function DesktopNav({ darkMode }: Props) {
  const [dotToggler, setDotToggler] = useState<string>("");

  useEffect(() => {
    if (window.location.pathname.includes("buy")) {
      setDotToggler("buy");
    } else if (window.location.pathname.includes("sell")) {
      setDotToggler("sell");
    }
  }, [window.location.pathname]);

  return (
    <div className="flex items-center gap-20">
      <Link
        to="/"
        onClick={() => setDotToggler("")}
        className="flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={`${darkMode ? "white" : "currentColor"}`}
          className="h-10 w-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
          />
        </svg>

        <span className="hidden font-lobster text-xl text-black dark:text-white md:inline">
          HouseIt
        </span>
      </Link>

      <span className="border-1 hidden h-14 border-l  border-neutral-200 transition-all duration-300 dark:border-neutral-500 md:inline-block"></span>

      <AnimatePresence mode="wait">
        <ul className="hidden gap-8 md:flex">
          <Link
            to={"/buy"}
            onClick={() => setDotToggler("buy")}
            className="relative text-lg font-medium text-black hover:underline dark:text-white"
          >
            Buy
            {dotToggler === "buy" && (
              <m.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border-4 border-baseBlue"
              ></m.span>
            )}
          </Link>
          <Link
            to={"/sell"}
            onClick={() => setDotToggler("sell")}
            className="group relative flex items-center text-lg font-medium text-black dark:text-white"
          >
            <span className="group-hover:underline">Sell</span>{" "}
            <span className="ml-2 rounded-full bg-baseBlue px-2 py-1 text-xs text-white">
              New
            </span>
            {dotToggler === "sell" && (
              <m.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute -bottom-3 left-[18%] -translate-x-1/2 rounded-full border-4 border-baseBlue"
              ></m.span>
            )}
          </Link>
        </ul>
      </AnimatePresence>
    </div>
  );
}
