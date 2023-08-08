import MenuSelection from "./MenuSelection";
import SearchBar from "./SearchBar";

import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { HiOutlineAdjustments } from "@react-icons/all-files/hi/HiOutlineAdjustments";
import { Estate } from "../../../typings";

type Props = {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  filtered: Estate[];
  setUserEstates: React.Dispatch<React.SetStateAction<Estate[]>>;
  userEstates: Estate[];
  setFiltering: React.Dispatch<React.SetStateAction<string>>;
  filtering: string;
};

export default function SearchMenu({
  term,
  setTerm,
  setFiltered,
  filtered,
  setUserEstates,
  userEstates,
  setFiltering,
  filtering,
}: Props) {
  return (
    <div className="sticky top-20 z-[1] mb-8 mt-2 flex flex-col justify-between gap-4 backdrop-blur-sm md:flex-row md:items-center md:gap-0">
      <div className="flex flex-wrap items-center justify-center gap-4 py-4 md:flex-row md:justify-start xl:py-8">
        <SearchBar
          term={term}
          setTerm={setTerm}
          setFiltered={setFiltered}
          filtered={filtered}
          userEstates={userEstates}
          setUserEstates={setUserEstates}
        />

        <MenuSelection
          setFiltered={setFiltered}
          userEstates={userEstates}
          text="Price"
          Icon={BsChevronDown}
        />
        <MenuSelection
          setFiltered={setFiltered}
          filtered={filtered}
          text="Sort"
          Icon={BsChevronDown}
          setFiltering={setFiltering}
          filtering={filtering}
        />
        <div className="hidden gap-4 lg:flex">
          <MenuSelection
            text="Beds"
            Icon={BsChevronDown}
            setFiltered={setFiltered}
            filtered={filtered}
            userEstates={userEstates}
          />
        </div>
        <MenuSelection
          text="More Filter"
          setFiltered={setFiltered}
          filtered={filtered}
          Icon={HiOutlineAdjustments}
          userEstates={userEstates}
        />
      </div>
    </div>
  );
}
