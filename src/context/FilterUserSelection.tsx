import { Dispatch, createContext, useContext, useState } from "react";

export type FilterSelection = {
  name: string;
  price: {
    minVal?: number;
    maxVal?: number;
  };
  sort: string;
  beds: number;
  baths: number;
  area: number;
};

export const defaultFilterSelection = {
  name: "",
  price: {
    minVal: NaN,
    maxVal: NaN,
  },
  sort: "",
  beds: NaN,
  baths: NaN,
  area: NaN,
};

type FilterUserSelection = {
  filterSelection: FilterSelection;
  setFilterSelection: Dispatch<React.SetStateAction<FilterSelection>>;
};

const FilterUserSelection = createContext({} as FilterUserSelection);

type Props = {
  children: React.ReactNode;
};

export function FilterSelectionContextProvider({ children }: Props) {
  const [filterSelection, setFilterSelection] = useState<FilterSelection>(
    defaultFilterSelection
  );

  return (
    <FilterUserSelection.Provider
      value={{
        filterSelection,
        setFilterSelection,
      }}
    >
      {children}
    </FilterUserSelection.Provider>
  );
}

export default FilterUserSelection;

export function useFilterSelection() {
  return useContext(FilterUserSelection);
}
