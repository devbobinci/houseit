import EstateItem from "./EstateItem";

import { Estate } from "../../../typings";

import { AnimatePresence, motion as m } from "framer-motion";
import { estateData } from "../../static/estate-data";

import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import {
  defaultFilterSelection,
  useFilterSelection,
} from "../../context/FilterUserSelection";

type Props = {
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  filtered: Estate[];
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  userEstates: Estate[];
};

export default function Estates({
  setTerm,
  filtered,
  setFiltered,
  userEstates,
}: Props) {
  const { setFilterSelection } = useFilterSelection();

  return (
    <div>
      <AnimatePresence mode="wait">
        {filtered?.length !== userEstates?.concat(estateData).length && (
          <m.button
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-2 py-1.5 text-sm transition-all duration-200 hover:bg-neutral-100 dark:border-[#222] dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 xl:px-3 xl:py-2 xl:text-base"
            onClick={() => {
              setFiltered(userEstates.concat(estateData));
              setTerm("");
              setFilterSelection(defaultFilterSelection);
            }}
          >
            <LiaLongArrowAltLeftSolid className="text-2xl" /> Return
          </m.button>
        )}
      </AnimatePresence>

      <m.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{
          duration: 0.25,
        }}
        className="my-8 grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:place-items-baseline md:gap-7 lg:grid-cols-3 xl:grid-cols-4 xl:gap-9 "
      >
        {filtered?.length > 0 ? (
          filtered?.map((estate, idx) => (
            <EstateItem key={estate.id} estate={estate} idx={idx} />
          ))
        ) : (
          <div className="ml-4 dark:text-white">
            <h2 className="pb-4 text-xl font-medium">
              We find 0 results, sorry
            </h2>
          </div>
        )}
      </m.div>
    </div>
  );
}
