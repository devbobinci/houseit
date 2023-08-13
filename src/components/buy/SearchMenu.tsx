import MenuSelection from "./MenuSelection";
import SearchBar from "./SearchBar";

import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { HiOutlineAdjustments } from "@react-icons/all-files/hi/HiOutlineAdjustments";
import { Estate } from "../../../typings";
import {
  defaultFilterSelection,
  useFilterSelection,
} from "../../context/FilterUserSelection";
import ToggleSelection from "./ToggleSelection";
import { useEffect, useState } from "react";
import { getAllEstates } from "../../utils/allEstates";
import FilteredByUserSelection from "./FilteredByUserSelection";
import { BsChevronCompactDown } from "@react-icons/all-files/bs/BsChevronCompactDown";

type Props = {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  filtered: Estate[];
  setUserEstates: React.Dispatch<React.SetStateAction<Estate[]>>;
  userEstates: Estate[];
};

export default function SearchMenu({
  term,
  setTerm,
  setFiltered,
  setUserEstates,
  userEstates,
}: Props) {
  const { filterSelection, setFilterSelection } = useFilterSelection();
  const { price, beds, baths, area, name, sort } = filterSelection || {};

  const [userSelection, setUserSelection] = useState<boolean>(false);
  const [mobileFiltering, setMobileFiltering] = useState<boolean>(true);
  const [newFilters, setNewFilters] = useState<boolean>(false);

  const noArea = isNaN(area);
  const noBeds = isNaN(beds);
  const noBaths = isNaN(baths);
  const noMinPrice = isNaN(price.minVal!);
  const noMaxPrice = isNaN(price.maxVal!);
  const noName = name === "";
  const noPrice = noMinPrice && noMaxPrice;

  const noFilters = noPrice && noBeds && noBaths && noArea && noName;

  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = 200;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (noFilters) {
      if (sort === "") {
        setFilterSelection(defaultFilterSelection); //
        setFiltered(getAllEstates(userEstates));
      }
    }
  }, [filterSelection]);

  const defaultFiltering =
    !noPrice || !noBeds || !noBaths || !noArea || !noName;

  return (
    <div
      className={`sticky left-0 z-[1] mb-8 mt-2 w-full gap-4 backdrop-blur-sm transition-all duration-500 md:gap-0 xl:pb-0 ${
        height > 200 && "pb-8"
      } ${
        mobileFiltering
          ? `-top-32 md:-top-14 lg:top-0 xl:top-[70px] 2xl:top-20`
          : "top-20 md:top-[70px] lg:top-[75px]"
      }`}
    >
      {height > 200 && (
        <BsChevronCompactDown
          className={`absolute bottom-0 left-1/2 z-[2] -translate-x-1/2 text-4xl opacity-50 drop-shadow-sm transition-all duration-300 hover:translate-y-1 hover:scale-105 hover:opacity-100 dark:text-white xl:hidden ${
            !mobileFiltering && "rotate-180"
          }`}
          onClick={() => setMobileFiltering((prev) => !prev)}
        />
      )}
      <div>
        <div className="flex flex-col items-center gap-4 py-4 pb-4 md:flex-row md:items-start md:justify-between md:gap-0 xl:pt-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:flex-row md:justify-start">
            <SearchBar
              setTerm={setTerm}
              setFiltered={setFiltered}
              userEstates={userEstates}
              setUserEstates={setUserEstates}
              setNewFilters={setNewFilters}
            />

            <MenuSelection
              text="Price"
              Icon={BsChevronDown}
              setNewFilters={setNewFilters}
            />
            <div className="hidden gap-4 lg:flex">
              <MenuSelection
                text="Beds"
                Icon={BsChevronDown}
                setNewFilters={setNewFilters}
              />
            </div>
            <MenuSelection
              text="More Filter"
              Icon={HiOutlineAdjustments}
              setNewFilters={setNewFilters}
            />
          </div>

          <ToggleSelection setFiltered={setFiltered} />
        </div>

        <div className="flex items-center gap-2">
          {defaultFiltering && (
            <>
              <button
                disabled={!newFilters}
                onClick={() => setUserSelection(true)}
                className="rounded-full bg-baseBlue/80 px-3 py-1.5 text-sm text-white hover:bg-baseBlue disabled:bg-baseBlue/30 md:px-4 md:py-2 md:text-base"
              >
                Apply
              </button>
              <div className="flex w-full flex-wrap items-center gap-4">
                <FilteredByUserSelection
                  setFiltered={setFiltered}
                  userEstates={userEstates}
                  term={term}
                  userSelection={userSelection}
                  setUserSelection={setUserSelection}
                  setNewFilters={setNewFilters}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
