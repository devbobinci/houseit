import { useEffect } from "react";
import { Estate } from "../../../typings";
import { useFilterSelection } from "../../context/FilterUserSelection";
import { getAllEstates } from "../../utils/allEstates";
import {
  SelectedAreaFilter,
  SelectedBathsFilter,
  SelectedBedsFilter,
  SelectedNameFilter,
  SelectedPriceFilter,
} from "./filters/SelectedFilters";

type Props = {
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  userEstates: Estate[];
  term: string;
  userSelection: boolean;
  setUserSelection: React.Dispatch<React.SetStateAction<boolean>>;
  setNewFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FilteredByUserSelection({
  setFiltered,
  userEstates,
  term,
  userSelection,
  setUserSelection,
  setNewFilters,
}: Props) {
  const { filterSelection } = useFilterSelection();

  const { price, beds, baths, area, sort, name } = filterSelection || {};
  const allEstates = getAllEstates(userEstates);

  const noArea = isNaN(area);
  const noBeds = isNaN(beds);
  const noBaths = isNaN(baths);
  const noMinPrice = isNaN(price.minVal!);
  const noMaxPrice = isNaN(price.maxVal!);
  const noName = name === "";
  const noPrice = noMinPrice && noMaxPrice;

  useEffect(() => {
    if (userSelection) {
      applyUserSelection();
      setUserSelection(false);
    }
  }, [userSelection]);

  function applyUserSelection() {
    setNewFilters(false);
    if (noArea && noBeds && noBaths && noPrice && noName)
      setFiltered([...allEstates]);

    const priceFiltering = (estate: Estate) => {
      if (price.minVal! > 0 && isNaN(price.maxVal!)) {
        return estate.price >= price.minVal!;
      }
      if (price.maxVal! > 0 && isNaN(price.minVal!)) {
        return estate.price <= price.maxVal!;
      }
      if (price.maxVal! > 0 && price.minVal! > 0) {
        return estate.price >= price.minVal! && estate.price <= price.maxVal!;
      }
    };

    const bedsFiltering = (est: Estate) => {
      const { premises } = est;
      if (beds === 5) return premises.beds >= 5;
      else return premises.beds <= beds && premises.beds >= beds - 1;
    };
    const bathsFiltering = (est: Estate) => {
      const { premises } = est;
      if (baths === 5) return premises.baths >= 5;
      else return premises.baths <= baths && premises.baths >= baths - 1;
    };
    const areaFiltering = (est: Estate) => {
      const { premises } = est;
      if (area === 2500)
        return premises.area <= area && premises.area >= area - 0;
      else if (area === 5000)
        return premises.area <= area && premises.area >= area - 2500;
      else if (area === 10000)
        return premises.area <= area && premises.area >= area - 5000;
      else return premises.area >= area;
    };

    const nameFiltering = (est: Estate) => {
      return (
        est?.address?.city?.toLowerCase().includes(term.toLowerCase()) ||
        est?.address?.country?.toLowerCase().includes(term.toLowerCase())
      );
    };

    const allFiltersSelected = allEstates.filter(
      (est) =>
        priceFiltering(est) &&
        bedsFiltering(est) &&
        bathsFiltering(est) &&
        areaFiltering(est) &&
        nameFiltering(est)
    );

    const priceBedsBathsAreaSelected = allEstates.filter(
      (est) =>
        priceFiltering(est) &&
        bedsFiltering(est) &&
        bathsFiltering(est) &&
        areaFiltering(est)
    );
    const priceBedsBathsNameSelected = allEstates.filter(
      (est) =>
        priceFiltering(est) &&
        bedsFiltering(est) &&
        bathsFiltering(est) &&
        nameFiltering(est)
    );
    const priceBedsBathsSelected = allEstates.filter(
      (est) => priceFiltering(est) && bedsFiltering(est) && bathsFiltering(est)
    );
    const priceBedsAreaSelected = allEstates.filter(
      (est) => priceFiltering(est) && bedsFiltering(est) && areaFiltering(est)
    );
    const priceBedsNameSelected = allEstates.filter(
      (est) => priceFiltering(est) && bedsFiltering(est) && nameFiltering(est)
    );
    const priceBedsSelected = allEstates.filter(
      (est) => priceFiltering(est) && bedsFiltering(est)
    );

    const priceSelected = allEstates.filter((est) => priceFiltering(est));

    const priceBathsSelected = allEstates.filter(
      (est) => priceFiltering(est) && bathsFiltering(est)
    );

    const priceBathsAreaSelected = allEstates.filter(
      (est) => priceFiltering(est) && bathsFiltering(est) && areaFiltering(est)
    );

    const priceBathsNameSelected = allEstates.filter(
      (est) => priceFiltering(est) && bathsFiltering(est) && nameFiltering(est)
    );

    const priceAreaSelected = allEstates.filter(
      (est) => priceFiltering(est) && areaFiltering(est)
    );

    const priceNameAreaSelected = allEstates.filter(
      (est) => priceFiltering(est) && areaFiltering(est) && nameFiltering(est)
    );

    const priceNameSelected = allEstates.filter(
      (est) => priceFiltering(est) && nameFiltering(est)
    );

    const priceBedsAreaNameSelected = allEstates.filter(
      (est) =>
        priceFiltering(est) &&
        bedsFiltering(est) &&
        areaFiltering(est) &&
        nameFiltering(est)
    );

    const priceBathsAreaNameSelected = allEstates.filter(
      (est) =>
        priceFiltering(est) &&
        bathsFiltering(est) &&
        areaFiltering(est) &&
        nameFiltering(est)
    );

    //beds
    const bedsSelected = allEstates.filter((est) => bedsFiltering(est));
    const bedsBathsSelected = allEstates.filter(
      (est) => bedsFiltering(est) && bathsFiltering(est)
    );
    const bedsAreaSelected = allEstates.filter(
      (est) => bedsFiltering(est) && areaFiltering(est)
    );
    const bedsBathsAreaSelected = allEstates.filter(
      (est) => bedsFiltering(est) && bathsFiltering(est) && areaFiltering(est)
    );
    const bedsBathsAreaNameSelected = allEstates.filter(
      (est) =>
        bedsFiltering(est) &&
        bathsFiltering(est) &&
        areaFiltering(est) &&
        nameFiltering(est)
    );

    const areaSelected = allEstates.filter((est) => areaFiltering(est));

    const bathsAreaSelected = allEstates.filter(
      (est) => bathsFiltering(est) && areaFiltering(est)
    );

    const areaNameFiltering = allEstates.filter(
      (est) => nameFiltering(est) && areaFiltering(est)
    );
    const bathsAreaNameSelected = allEstates.filter(
      (est) => nameFiltering(est) && areaFiltering(est) && bathsFiltering(est)
    );
    const bedsAreaNameSelected = allEstates.filter(
      (est) => nameFiltering(est) && areaFiltering(est) && bedsFiltering(est)
    );

    const bedsNameSelected = allEstates.filter(
      (est) => nameFiltering(est) && bedsFiltering(est)
    );

    //baths
    const bathsSelected = allEstates.filter((est) => bathsFiltering(est));
    const bedsBathsNameSelected = allEstates.filter(
      (est) => bathsFiltering(est) && bedsFiltering(est) && nameFiltering(est)
    );

    const bathsNameFiltering = allEstates.filter(
      (est) => bathsFiltering(est) && nameFiltering(est)
    );

    //name
    const nameSelected = allEstates.filter((est) => nameFiltering(est));

    //! Price Filtering
    if (price.minVal! > 0 || price.maxVal! > 0) {
      if (noBeds && noBaths && noArea && noName) setFiltered(priceSelected);
      //! Price & Beds
      if (beds > 0) {
        if (noBaths && noArea && noName) setFiltered(priceBedsSelected);
        else if (baths > 0) {
          if (noArea && noName) setFiltered(priceBedsBathsSelected);
          else if (area > 0) {
            if (noName) setFiltered(priceBedsBathsAreaSelected);
            else if (name !== "") setFiltered(allFiltersSelected);
          } else if (name !== "") {
            if (noArea) setFiltered(priceBedsBathsNameSelected);
            else setFiltered(allFiltersSelected);
          }
        } else if (area > 0) {
          if (noBaths && noName) setFiltered(priceBedsAreaSelected);
          if (baths > 0) {
            if (noName) setFiltered(priceBedsAreaNameSelected);
            if (name !== "") setFiltered(allFiltersSelected);
          } else if (name !== "") {
            if (noBaths) setFiltered(priceBathsAreaNameSelected);
            else setFiltered(allFiltersSelected);
          }
        } else if (name !== "") {
          if (noArea && noBaths) setFiltered(priceBedsNameSelected);
          if (baths > 0) {
            if (noArea) setFiltered(priceBedsBathsNameSelected);
            if (area > 0) setFiltered(allFiltersSelected);
          } else if (area > 0) {
            if (noBaths) setFiltered(priceBedsAreaNameSelected);
            else setFiltered(allFiltersSelected);
          }
        }
      }
      //! Price & Baths
      if (baths > 0) {
        if (noArea && noName && noBeds) setFiltered(priceBathsSelected);
        else if (beds > 0) {
          if (noArea && noName) setFiltered(priceBedsBathsSelected);
          if (area > 0) {
            if (noName) setFiltered(priceBedsBathsAreaSelected);
            else setFiltered(allFiltersSelected);
          } else if (name !== "") {
            if (noArea) setFiltered(priceBedsBathsNameSelected);
            else setFiltered(allFiltersSelected);
          }
        } else if (area > 0) {
          if (noBeds && noName) setFiltered(priceBathsAreaSelected);
          if (beds > 0) {
            if (noName) setFiltered(priceBedsBathsAreaSelected);
            else setFiltered(allFiltersSelected);
          } else if (name !== "") {
            if (noArea) setFiltered(priceBedsBathsNameSelected);
            else setFiltered(allFiltersSelected);
          }
        } else if (name !== "") {
          if (noBeds && noArea) setFiltered(priceBathsNameSelected);
          else if (beds > 0) {
            if (noArea) setFiltered(priceBedsNameSelected);
            else setFiltered(allFiltersSelected);
          } else if (area > 0) {
            if (noBeds) setFiltered(priceNameAreaSelected);
            else setFiltered(allFiltersSelected);
          }
        }
      }
      //! Price & Area
      if (area > 0) {
        if (noBeds && noBaths && noName) setFiltered(priceAreaSelected);
        else if (beds > 0) {
          if (noBaths && noName) setFiltered(priceBedsAreaSelected);
          else if (baths > 0) {
            if (noName) setFiltered(priceBedsBathsAreaSelected);
            else setFiltered(allFiltersSelected);
          } else if (name !== "") {
            if (noBaths) setFiltered(priceBedsAreaNameSelected);
            else setFiltered(allFiltersSelected);
          }
        } else if (baths > 0) {
          if (noBeds && noName) setFiltered(priceBathsAreaSelected);
          else if (beds > 0) {
            if (noName) setFiltered(priceBedsBathsAreaSelected);
            else setFiltered(allFiltersSelected);
          } else if (name !== "") {
            if (noBeds) setFiltered(priceBathsAreaNameSelected);
            else setFiltered(allFiltersSelected);
          }
        } else if (name !== "") {
          if (noBaths && noBeds) setFiltered(priceNameAreaSelected);
          else if (beds > 0) {
            if (noBaths) setFiltered(priceBedsAreaNameSelected);
            else setFiltered(allFiltersSelected);
          } else if (baths > 0) {
            if (noBeds) setFiltered(priceBathsAreaNameSelected);
            else setFiltered(allFiltersSelected);
          }
        }
      }
      //! Price & Name
      if (name !== "") {
        if (noBeds && noBaths && noArea) setFiltered(priceNameSelected);
        else if (beds > 0) {
          if (noBaths && noArea) setFiltered(priceBedsNameSelected);
          else if (baths > 0) {
            if (noArea) setFiltered(priceBedsBathsNameSelected);
            else setFiltered(allFiltersSelected);
          }
        } else if (baths > 0) {
          if (noBeds && noArea) setFiltered(priceBedsBathsNameSelected);
          else if (beds > 0) {
            if (noArea) setFiltered(priceBedsAreaNameSelected);
            else setFiltered(allFiltersSelected);
          } else if (area > 0) {
            if (noBeds) setFiltered(priceBathsAreaNameSelected);
          }
        } else if (area > 0) {
          if (noBaths && noBeds) setFiltered(allFiltersSelected);
          else if (baths > 0) {
            if (noArea) setFiltered(priceBedsAreaNameSelected);
            else setFiltered(allFiltersSelected);
          } else if (area > 0) {
            if (noBeds) setFiltered(priceBathsAreaNameSelected);
          }
        }
      }
    }

    //! Beds filtering
    if (beds > 0) {
      if (noBaths && noArea && noPrice && noName) setFiltered(bedsSelected);
      else if (baths > 0) {
        if (noArea && noPrice && noName) setFiltered(bedsBathsSelected);
        else if (area > 0) {
          if (noPrice && noName) setFiltered(bedsBathsAreaSelected);
          else if (name !== "") setFiltered(bedsBathsAreaNameSelected);
        }
      } else if (area > 0) {
        if (noPrice && noName && noBaths) setFiltered(bedsAreaSelected);
        else if (name !== "") {
          if (noBaths && noPrice) setFiltered(bedsAreaNameSelected);
        }
      }
    }

    //! Area filtering
    if (area > 0) {
      if (noBaths && noBeds && noPrice && noName) setFiltered(areaSelected);
      else if (baths > 0) {
        if (noBeds && noPrice && noName) setFiltered(bathsAreaSelected);
        else if (name !== "") {
          if (noPrice && noBeds) setFiltered(bathsAreaNameSelected);
        }
      } else if (beds > 0) {
        if (noPrice && noName && noBaths) setFiltered(bedsAreaSelected);
        else if (name !== "") setFiltered(bedsBathsAreaNameSelected);
        else if (!noPrice) setFiltered(allFiltersSelected);
      } else if (name !== "") {
        if (noPrice && noBaths && noBeds) setFiltered(areaNameFiltering);
        else if (baths > 0 && noBeds) setFiltered(bathsAreaNameSelected);
        else if (beds > 0 && noBaths) setFiltered(bedsAreaNameSelected);
        else if (!noPrice) setFiltered(priceNameAreaSelected);
      }
    }

    //! Baths filtering
    if (baths > 0) {
      if (noArea && noBeds && noPrice && noName) setFiltered(bathsSelected);
      else if (beds > 0) {
        if (name !== "") setFiltered(bedsBathsNameSelected);
      } else if (name !== "") {
        if (noPrice && noArea && noBeds) setFiltered(bathsNameFiltering);
      }
    }

    if (name !== "") {
      if (noArea && noBeds && noPrice && noBaths) setFiltered(nameSelected);

      if (area > 0) {
        if (noBeds && noPrice && noBaths) setFiltered(areaNameFiltering);

        if (beds > 0) {
          if (noPrice && noBaths) setFiltered(bedsAreaNameSelected);
          else if (baths > 0) setFiltered(bedsBathsAreaNameSelected);
        }
        if (baths > 0) {
          if (noPrice && noBeds) setFiltered(bathsAreaNameSelected);
          else if (noPrice && beds > 0) setFiltered(bedsBathsAreaNameSelected);
        }
      }

      if (beds > 0) {
        setFiltered(bedsNameSelected);
        if (noArea && baths > 0 && noPrice) {
          setFiltered(bedsBathsNameSelected);
        } else if (area > 0 && noBaths) {
          setFiltered(bedsAreaNameSelected);
        } else if (area > 0 && baths > 0) {
          setFiltered(allFiltersSelected);
        }
      }

      //jest name, cena i
      if (!noPrice) {
        setFiltered(priceNameSelected);
        if (beds > 0) {
          setFiltered(priceBedsNameSelected);
          if (area > 0) {
            setFiltered(priceBedsAreaNameSelected);
            if (baths > 0) {
              setFiltered(allFiltersSelected);
            }
          } else if (baths > 0) {
            setFiltered(priceBedsBathsNameSelected);
            if (area > 0) {
              setFiltered(allFiltersSelected);
            }
          }
        } else if (baths > 0) {
          setFiltered(priceBathsNameSelected);
          if (area > 0) setFiltered(priceBathsAreaNameSelected);
        } else if (area > 0) {
          setFiltered(priceNameAreaSelected);
        }
      }
    }
    // ! Sortowanko
    if (sort === "asc") {
      setFiltered((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "desc") {
      setFiltered((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }

  return (
    <>
      <SelectedPriceFilter setNewFilters={setNewFilters} />
      <SelectedBedsFilter setNewFilters={setNewFilters} />
      <SelectedAreaFilter setNewFilters={setNewFilters} />
      <SelectedBathsFilter setNewFilters={setNewFilters} />
      <SelectedNameFilter setNewFilters={setNewFilters} />
    </>
  );
}
