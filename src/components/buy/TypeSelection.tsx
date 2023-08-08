import { useEffect, useRef, useState } from "react";

import { motion as m } from "framer-motion";

export default function TypeSelection() {
  const [apartmentSelection, setApartmentSelection] = useState<boolean>(false);
  const [houseSelection, setHouseSelection] = useState<boolean>(false);
  const [garageSelection, setGarageSelection] = useState<boolean>(false);

  const apartmentRef = useRef(null);
  const houseRef = useRef(null);
  const garageRef = useRef(null);

  const [typeSelection, setTypeSelection] = useState<string>("");

  // const { userSelection, setUserSelection } = useUserSelectionContext();

  // useEffect(() => {
  //   setUserSelection({
  //     ...userSelection,
  //     apartment: apartmentSelection,
  //     house: houseSelection,
  //     garage: garageSelection,
  //   });
  // }, [apartmentSelection, houseSelection, garageSelection]);

  useEffect(() => {
    switch (typeSelection) {
      case "apartment":
        setHouseSelection(false);
        setGarageSelection(false);
        break;
      case "house":
        setApartmentSelection(false);
        setGarageSelection(false);
        break;
      case "garage":
        setApartmentSelection(false);
        setHouseSelection(false);
        break;
      default:
        setApartmentSelection(false);
        setHouseSelection(false);
        setGarageSelection(false);
        break;
    }

    console.log(typeSelection);
  }, [typeSelection]);

  //todo: po zmianie selection z PropertyType zmienia sie na ikonke wybranego(animated)

  return (
    <m.div
      initial={{ opacity: 0, y: -15, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -15, x: "-50%" }}
      transition={spring}
      className="absolute left-1/2 top-16 z-[2] w-40 -translate-x-[50%] rounded-lg border border-lightBlue bg-white p-3 shadow-md dark:border-[#222] dark:bg-[#333] dark:text-white"
    >
      <span className="triangle absolute -top-3 left-1/2 block h-3 w-4 -translate-x-[50%] bg-lightBlue"></span>
      <div className="space-y-4">
        <div
          onClick={() => setTypeSelection("apartment")}
          className="group flex items-center gap-2 text-sm "
        >
          <input
            ref={apartmentRef}
            onChange={(e) => setApartmentSelection(e.target.checked)}
            id="apartment"
            type="checkbox"
            aria-checked={!houseSelection || !garageSelection}
          />
          <label
            htmlFor="apartment"
            className="cursor-pointer select-none opacity-60 group-hover:opacity-80"
          >
            Apartment
          </label>
        </div>
        <div
          onClick={() => setTypeSelection("house")}
          className="group flex items-center gap-2 text-sm"
        >
          <input
            ref={houseRef}
            onChange={(e) => setHouseSelection(e.target.checked)}
            id="house"
            type="checkbox"
            aria-checked={!apartmentSelection || !garageSelection}
          />
          <label
            htmlFor="house"
            className=" cursor-pointer select-none opacity-60 group-hover:opacity-80"
          >
            House
          </label>
        </div>
        <div
          onClick={() => setTypeSelection("garage")}
          className="group flex items-center gap-2 text-sm"
        >
          <input
            ref={garageRef}
            onChange={(e) => setGarageSelection(e.target.checked)}
            aria-checked={!apartmentSelection || !houseSelection}
            id="garage"
            type="checkbox"
          />
          <label
            htmlFor="garage"
            className="cursor-pointer select-none  opacity-60 group-hover:opacity-80"
          >
            Garage
          </label>
        </div>
      </div>
    </m.div>
  );
}

const spring = {
  type: "spring",
  stiffness: 900,
  damping: 20,
};
