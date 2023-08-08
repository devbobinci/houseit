import { useRef, useState } from "react";
import { estateData } from "../../../../static/estate-data";
import { Estate } from "../../../../../typings";

type Props = {
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  filtered?: Estate[];
  userEstates?: Estate[];
};

export default function BedsListComp({
  setFiltered,
  filtered,
  userEstates,
}: Props) {
  const [isChecked1Bed, setIsChecked1Bed] = useState<boolean>(false);
  const [isChecked2Bed, setIsChecked2Bed] = useState<boolean>(false);
  const [isChecked3Bed, setIsChecked3Bed] = useState<boolean>(false);

  const bedOptionOne = useRef<HTMLInputElement>(null);
  const bedOptionTwo = useRef<HTMLInputElement>(null);
  const bedOptionThree = useRef<HTMLInputElement>(null);

  const allEstates = userEstates?.concat(estateData);

  const handleChange1Bed = () => {
    setIsChecked1Bed(true);
    if (isChecked2Bed || isChecked3Bed) {
      setIsChecked2Bed(false);
      setIsChecked3Bed(false);
    }
  };

  const handleChange2Bed = () => {
    setIsChecked2Bed(true);
    if (isChecked1Bed || isChecked3Bed) {
      setIsChecked1Bed(false);
      setIsChecked3Bed(false);
    }
  };

  const handleChange3Bed = () => {
    setIsChecked3Bed(true);
    if (isChecked2Bed || isChecked1Bed) {
      setIsChecked2Bed(false);
      setIsChecked1Bed(false);
    }
  };

  function getAllEstates() {
    setFiltered!(userEstates?.concat(estateData)!);
  }

  function getEstatesByBeds(beds: number) {
    setFiltered!(allEstates?.filter((estate) => estate.premises.beds <= beds)!);
  }

  const filteredEqualsAllEstates =
    filtered?.length !== userEstates?.concat(estateData).length;

  console.log(filteredEqualsAllEstates);

  return (
    <ul className="space-y-2">
      <li className="group flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          id="1-bed"
          ref={bedOptionOne}
          checked={isChecked1Bed && filteredEqualsAllEstates}
          onChange={(e) => {
            handleChange1Bed();
            if (
              !e.target.checked &&
              !bedOptionTwo.current!.checked &&
              !bedOptionThree.current!.checked
            )
              getAllEstates();
            else getEstatesByBeds(2);
          }}
        />
        <label
          htmlFor="1-bed"
          className="select-none opacity-60 group-hover:opacity-80"
        >
          1-2 Beds
        </label>
      </li>
      <li className="group flex cursor-pointer items-center gap-2 text-sm">
        <input
          ref={bedOptionTwo}
          type="checkbox"
          id="2-bed"
          checked={isChecked2Bed && filteredEqualsAllEstates}
          onChange={(e) => {
            handleChange2Bed();
            if (
              !e.target.checked &&
              !bedOptionOne.current!.checked &&
              !bedOptionThree.current!.checked
            )
              getAllEstates();
            else getEstatesByBeds(4);
          }}
        />
        <label
          htmlFor="2-bed"
          className="select-none opacity-60 group-hover:opacity-80"
        >
          3-4 Beds
        </label>
      </li>
      <li className="group flex cursor-pointer items-center gap-2 text-sm">
        <input
          ref={bedOptionThree}
          type="checkbox"
          id="4-bed"
          checked={isChecked3Bed && filteredEqualsAllEstates}
          onChange={(e) => {
            handleChange3Bed();
            if (
              !e.target.checked &&
              !bedOptionOne.current!.checked &&
              !bedOptionTwo.current!.checked
            )
              getAllEstates();
            else
              setFiltered!(
                allEstates?.filter((estate) => estate.premises.beds >= 5)!
              );
          }}
        />
        <label
          htmlFor="4-bed"
          className="select-none opacity-60 group-hover:opacity-80"
        >
          5+ Beds
        </label>
      </li>
    </ul>
  );
}
