import { useRef, useState } from "react";
import { Estate } from "../../../../../typings";
import { estateData } from "../../../../static/estate-data";

type Props = {
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  filtered: Estate[];
  userEstates?: Estate[];
};

export default function Area({ setFiltered, filtered, userEstates }: Props) {
  const [isChecked1Area, setIsChecked1Area] = useState<boolean>(false);
  const [isChecked2Area, setIsChecked2Area] = useState<boolean>(false);
  const [isChecked3Area, setIsChecked3Area] = useState<boolean>(false);
  const [isChecked4Area, setIsChecked4Area] = useState<boolean>(false);

  const areaOptionOne = useRef<HTMLInputElement>(null);
  const areaOptionTwo = useRef<HTMLInputElement>(null);
  const areaOptionThree = useRef<HTMLInputElement>(null);
  const areaOptionFour = useRef<HTMLInputElement>(null);

  const allEstates = userEstates?.concat(estateData);

  console.log(userEstates);

  const handleChange1Area = () => {
    setIsChecked1Area(true);
    if (isChecked2Area || isChecked3Area || isChecked4Area) {
      setIsChecked2Area(false);
      setIsChecked3Area(false);
      setIsChecked4Area(false);
    }
  };

  const handleChange2Area = () => {
    setIsChecked2Area(true);
    if (isChecked1Area || isChecked3Area || isChecked4Area) {
      setIsChecked1Area(false);
      setIsChecked3Area(false);
      setIsChecked4Area(false);
    }
  };

  const handleChange3Area = () => {
    setIsChecked3Area(true);
    if (isChecked2Area || isChecked1Area || isChecked4Area) {
      setIsChecked2Area(false);
      setIsChecked1Area(false);
      setIsChecked4Area(false);
    }
  };
  const handleChange4Area = () => {
    setIsChecked4Area(true);
    if (isChecked2Area || isChecked1Area || isChecked3Area) {
      setIsChecked2Area(false);
      setIsChecked1Area(false);
      setIsChecked3Area(false);
    }
  };

  function getAllEstates() {
    setFiltered!(userEstates?.concat(estateData)!);
  }

  function getEstatesByArea(area: number) {
    setFiltered!(allEstates?.filter((estate) => estate.premises.area <= area)!);
  }

  const filteredEqualsAllEstates =
    filtered?.length !== userEstates?.concat(estateData).length;

  return (
    <ul className="space-y-2">
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="2500-area"
          ref={areaOptionOne}
          checked={isChecked1Area && filteredEqualsAllEstates}
          onChange={(e) => {
            handleChange1Area();
            if (
              !e.target.checked &&
              !areaOptionTwo.current!.checked &&
              !areaOptionThree.current!.checked &&
              !areaOptionFour.current!.checked
            )
              getAllEstates();
            else getEstatesByArea(2500);
          }}
        />
        <label htmlFor="2500-area" className="opacity-60 hover:opacity-80">
          2500 m²
        </label>
      </li>
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="5000-area"
          ref={areaOptionTwo}
          checked={isChecked2Area && filteredEqualsAllEstates}
          onChange={(e) => {
            handleChange2Area();
            if (
              !e.target.checked &&
              !areaOptionTwo.current!.checked &&
              !areaOptionThree.current!.checked &&
              !areaOptionFour.current!.checked
            )
              getAllEstates();
            else getEstatesByArea(5000);
          }}
        />
        <label htmlFor="5000-area" className="opacity-60 hover:opacity-80">
          5000 m²
        </label>
      </li>
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="10000-area"
          ref={areaOptionThree}
          checked={isChecked3Area && filteredEqualsAllEstates}
          onChange={(e) => {
            handleChange3Area();
            if (
              !e.target.checked &&
              !areaOptionTwo.current!.checked &&
              !areaOptionThree.current!.checked &&
              !areaOptionFour.current!.checked
            )
              getAllEstates();
            else getEstatesByArea(10000);
          }}
        />
        <label htmlFor="10000-area" className="opacity-60 hover:opacity-80">
          10000 m²
        </label>
      </li>
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="20000-area"
          ref={areaOptionFour}
          checked={isChecked4Area && filteredEqualsAllEstates}
          onChange={(e) => {
            handleChange4Area();
            if (
              !e.target.checked &&
              !areaOptionTwo.current!.checked &&
              !areaOptionThree.current!.checked &&
              !areaOptionFour.current!.checked
            )
              getAllEstates();
            else
              setFiltered!(
                allEstates?.filter((estate) => estate.premises.area >= 20000)!
              );
          }}
        />
        <label htmlFor="20000-area" className="opacity-60 hover:opacity-80">
          20000+ m²
        </label>
      </li>
    </ul>
  );
}
