import { Link } from "react-router-dom";

type Props = {
  darkMode: boolean;
};

export default function DesktopNav({ darkMode }: Props) {
  return (
    <div className="flex items-center gap-20">
      <Link to="/" className="flex items-center gap-2">
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
      <ul className="hidden gap-8 md:flex">
        <Link
          to={"/buy"}
          className="text-lg font-medium text-black dark:text-white hover:underline"
        >
          Buy
        </Link>
        <Link
          to={"/sell"}
          className="text-lg font-medium text-black dark:text-white flex items-center group"
        >
          <span className="group-hover:underline">Sell</span>{" "}
          <span className="ml-2 rounded-full bg-baseBlue px-2 py-1 text-xs text-white">
            New
          </span>
        </Link>
      </ul>
    </div>
  );
}
