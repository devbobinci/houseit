import { PiTrashLight } from "react-icons/pi";
import { useFilterSelection } from "../../../context/FilterUserSelection";
import { formatCurrency } from "../../../utils/formatCurrency";
import { BiBed } from "@react-icons/all-files/bi/BiBed";
import { BiBath } from "@react-icons/all-files/bi/BiBath";
import { MdTerrain } from "@react-icons/all-files/md/MdTerrain";

type Props = {
  setNewFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SelectedPriceFilter({ setNewFilters }: Props) {
  const { filterSelection, setFilterSelection } = useFilterSelection();
  const { price } = filterSelection || {};

  //todo: funkcja sprawdzajaca jaka wartosc zostala zmieniona przez uzytkownika i filtrownaie na jej podstawie estatów

  if (price.minVal! > 0 || price.maxVal! > 0) {
    if (price.minVal! > 0 && isNaN(price.maxVal!)) {
      return (
        <div className="flex items-center gap-2 rounded-full bg-lightBlue/50 px-2 py-1 text-sm dark:text-gray-200">
          &gt; {formatCurrency(Number(price.minVal))}
          <span className="border-1 h-6 border-l-[1px] dark:border-neutral-400"></span>{" "}
          <PiTrashLight
            onClick={() => {
              setFilterSelection((prevSelection) => ({
                ...prevSelection,
                price: { minVal: NaN },
              }));
              setNewFilters(true);
            }}
            className="cursor-pointer text-base transition-all hover:text-baseBlue dark:text-gray-200"
          />
        </div>
      );
    } else if (price.maxVal! > 0 && isNaN(price.minVal!)) {
      return (
        <div className="flex items-center gap-2 rounded-full bg-lightBlue/50 px-2 py-1 text-sm dark:text-gray-200">
          &lt; {formatCurrency(Number(price.maxVal))}
          <span className="border-1 h-4 border-l-[1px] dark:border-neutral-400"></span>{" "}
          <PiTrashLight
            onClick={() => {
              // setOpenTab(true);
              setFilterSelection((prevSelection) => ({
                ...prevSelection,
                price: { maxVal: NaN },
              }));
              // getAllEstates();
            }}
            className="cursor-pointer text-base transition-all hover:text-baseBlue dark:text-gray-200"
          />
        </div>
      );
    } else if (price.maxVal! > 0 && price.minVal! > 0) {
      return (
        <div className="flex items-center gap-2 rounded-full bg-lightBlue/50 px-2 py-1 text-sm">
          <div className="flex flex-col dark:text-gray-200">
            <span>&lt; {formatCurrency(Number(price.minVal))}</span>
            <span>&gt; {formatCurrency(Number(price.maxVal))}</span>
          </div>
          <span className="border-1 h-4 border-l-[1px] dark:border-neutral-400"></span>{" "}
          <PiTrashLight
            onClick={() => {
              // setOpenTab(true);
              setFilterSelection((prevSelection) => ({
                ...prevSelection,
                price: { minVal: NaN, maxVal: NaN },
              }));
              // getAllEstates();
            }}
            className="cursor-pointer text-base transition-all hover:text-baseBlue dark:text-gray-200"
          />
        </div>
      );
    }
  }
}

export function SelectedBedsFilter({ setNewFilters }: Props) {
  const { filterSelection, setFilterSelection } = useFilterSelection();
  const { beds } = filterSelection || {};
  if (beds > 0) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-lightBlue/50 px-2 py-1 text-sm">
        <span className="inline-flex items-center gap-1 dark:text-gray-200">
          {beds === 5 ? (
            <>{beds}+</>
          ) : (
            <>
              {beds - 1}-{beds}
            </>
          )}
          <BiBed />
        </span>
        <span className="border-1 h-4 border-l-[1px] dark:border-neutral-400"></span>{" "}
        <PiTrashLight
          onClick={() => {
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              beds: NaN,
            }));
            setNewFilters(true);
          }}
          className="cursor-pointer text-base transition-all hover:text-baseBlue dark:text-gray-200"
        />
      </div>
    );
  }
}

export function SelectedAreaFilter({ setNewFilters }: Props) {
  const { filterSelection, setFilterSelection } = useFilterSelection();
  const { area } = filterSelection || {};

  if (area > 0) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-lightBlue/50 px-2 py-1 text-sm">
        <span className="inline-flex items-center gap-1 dark:text-gray-200">
          {area === 10001 ? <>&gt; {area - 1}m²</> : <>&lt;{area}m²</>}
          <MdTerrain />
        </span>
        <span className="border-1 h-4 border-l-[1px] dark:border-neutral-400"></span>{" "}
        <PiTrashLight
          onClick={() => {
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              area: NaN,
            }));
            setNewFilters(true);
          }}
          className="cursor-pointer text-base transition-all hover:text-baseBlue dark:text-gray-200"
        />
      </div>
    );
  }
}

export function SelectedBathsFilter({ setNewFilters }: Props) {
  const { filterSelection, setFilterSelection } = useFilterSelection();
  const { baths } = filterSelection || {};

  if (baths > 0) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-lightBlue/50 px-2 py-1 text-sm">
        <span className="inline-flex items-center gap-1 dark:text-gray-200">
          {baths === 5 && <>+{baths}</>}
          {baths === 1 ? (
            <>{baths}</>
          ) : (
            <>
              {baths !== 5 && (
                <>
                  {baths - 1}-{baths}
                </>
              )}
            </>
          )}
          <BiBath />
        </span>
        <span className="border-1 h-4 border-l-[1px] dark:border-neutral-400"></span>{" "}
        <PiTrashLight
          onClick={() => {
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              baths: NaN,
            }));
            setNewFilters(true);
          }}
          className="cursor-pointer text-base transition-all hover:text-baseBlue dark:text-gray-200"
        />
      </div>
    );
  }
}

export function SelectedNameFilter({ setNewFilters }: Props) {
  const { filterSelection, setFilterSelection } = useFilterSelection();
  const { name } = filterSelection || {};

  if (name) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-lightBlue/50 px-2 py-1 text-sm">
        <span className="inline-flex items-center gap-1 dark:text-gray-200">
          {name}
        </span>
        <span className="border-1 h-4 border-l-[1px] dark:border-neutral-400"></span>{" "}
        <PiTrashLight
          onClick={() => {
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              name: "",
            }));
            setNewFilters(true);
          }}
          className="cursor-pointer text-base transition-all hover:text-baseBlue dark:text-gray-200"
        />
      </div>
    );
  }
}
