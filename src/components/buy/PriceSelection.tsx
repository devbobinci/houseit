import { useState } from "react";

import { motion as m } from "framer-motion";

import "../../styles/buy-menu.css";
import CurrencyInput from "react-currency-input-field";
import { useFilterSelection } from "../../context/FilterUserSelection";

type Props = {
  setOpenTab: React.Dispatch<React.SetStateAction<boolean>>;
  setNewFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PriceSelection({ setOpenTab, setNewFilters }: Props) {
  const [minVal, setMinVal] = useState<number>(NaN);
  const [maxVal, setMaxVal] = useState<number>(NaN);

  const { setFilterSelection } = useFilterSelection();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (minVal > 0 && isNaN(maxVal)) {
      setFilterSelection!((prevSelection) => ({
        ...prevSelection,
        price: { minVal: Number(minVal) },
      }));
      setNewFilters(true);
    }
    if (maxVal > 0 && isNaN(minVal)) {
      setFilterSelection!((prevSelection) => ({
        ...prevSelection,
        price: { maxVal: Number(maxVal) },
      }));
      setNewFilters(true);
    }
    if (maxVal > 0 && minVal > 0) {
      setFilterSelection!((prevSelection) => ({
        ...prevSelection,
        price: { minVal: Number(minVal), maxVal: Number(maxVal) },
      }));
      setNewFilters(true);
    }

    if (isNaN(minVal) && isNaN(maxVal)) {
      setFilterSelection!((prevSelection) => ({
        ...prevSelection,
        price: { minVal: NaN, maxVal: NaN },
      }));
      setNewFilters(true);
    }
    setOpenTab(false);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: -15, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -15, x: "-50%" }}
      transition={spring}
      className="absolute left-1/2 top-16 z-[2] w-40 -translate-x-[50%] rounded-lg border border-lightBlue bg-white p-3 shadow-md dark:border-[#222] dark:bg-[#333] dark:text-white"
    >
      <span className="triangle absolute -top-3 left-1/2 block h-3 w-4 -translate-x-[50%] bg-lightBlue dark:bg-[#333]"></span>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="min" className="text-sm opacity-60">
              Min
            </label>
            <CurrencyInput
              className="w-full rounded-full border p-2 pl-3 text-sm outline-baseBlue placeholder:opacity-30 hover:border-lightBlue dark:border-[#222] dark:bg-[#555] dark:placeholder:opacity-60"
              id="min"
              name="min"
              placeholder="$100 000"
              defaultValue={minVal || ""}
              decimalsLimit={2}
              onValueChange={(value) => {
                setMinVal(Number(value));
                // setFilterSelection!((prevSelection) => ({
                //   ...prevSelection,
                //   price: { minVal: Number(value) },
                // }));
              }}
              intlConfig={{ locale: "en-US", currency: "USD" }}
            />
          </div>
          <div>
            <label htmlFor="max" className="text-sm opacity-60">
              Max
            </label>
            <CurrencyInput
              className="w-full rounded-full border p-2 pl-3 text-sm outline-baseBlue placeholder:opacity-30 hover:border-lightBlue dark:border-[#222] dark:bg-[#555] dark:placeholder:opacity-60"
              id="max"
              name="max"
              placeholder="$500 000"
              defaultValue={maxVal || ""}
              decimalsLimit={2}
              onValueChange={(value) => {
                setMaxVal(Number(value));
                // setFilterSelection!((prevSelection) => ({
                //   ...prevSelection,
                //   price: { maxVal: Number(value) },
                // }));
              }}
              intlConfig={{ locale: "en-US", currency: "USD" }}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 ">
          <button
            onClick={() => handleSubmit}
            type="submit"
            className="rounded-full bg-baseBlue px-3 py-1.5 text-sm text-white"
          >
            Apply
          </button>
        </div>
      </form>
    </m.div>
  );
}

const spring = {
  type: "spring",
  stiffness: 900,
  damping: 20,
};
