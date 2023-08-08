import { useRef, useState } from "react";
import { Estate } from "../../../../../typings";
import { estateData } from "../../../../static/estate-data";

type Props = {
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  filtered: Estate[];
  userEstates?: Estate[];
};

export default function Baths({ setFiltered, filtered, userEstates }: Props) {
  const [isChecked1Bath, setIsChecked1Bath] = useState<boolean>(false);
  const [isChecked2Bath, setIsChecked2Bath] = useState<boolean>(false);
  const [isChecked3Bath, setIsChecked3Bath] = useState<boolean>(false);
  const [isChecked4Bath, setIsChecked4Bath] = useState<boolean>(false);

  const bathOptionOne = useRef<HTMLInputElement>(null);
  const bathOptionTwo = useRef<HTMLInputElement>(null);
  const bathOptionThree = useRef<HTMLInputElement>(null);
  const bathOptionFour = useRef<HTMLInputElement>(null);

  const allEstates = userEstates?.concat(estateData);

  const handleChange1Bath = () => {
    setIsChecked1Bath(true);
    if (isChecked2Bath || isChecked3Bath || isChecked4Bath) {
      setIsChecked2Bath(false);
      setIsChecked3Bath(false);
      setIsChecked4Bath(false);
    }
  };

  const handleChange2Bath = () => {
    setIsChecked2Bath(true);
    if (isChecked1Bath || isChecked3Bath || isChecked4Bath) {
      setIsChecked1Bath(false);
      setIsChecked3Bath(false);
      setIsChecked4Bath(false);
    }
  };

  const handleChange3Bath = () => {
    setIsChecked3Bath(true);
    if (isChecked2Bath || isChecked1Bath || isChecked4Bath) {
      setIsChecked2Bath(false);
      setIsChecked1Bath(false);
      setIsChecked4Bath(false);
    }
  };
  const handleChange4Bath = () => {
    setIsChecked4Bath(true);
    if (isChecked2Bath || isChecked1Bath || isChecked3Bath) {
      setIsChecked2Bath(false);
      setIsChecked1Bath(false);
      setIsChecked3Bath(false);
    }
  };

  function getAllEstates() {
    setFiltered!(userEstates?.concat(estateData)!);
  }

  function getEstatesByBaths(baths: number) {
    setFiltered!(
      allEstates?.filter((estate) => estate.premises.baths <= baths)!
    );
  }

  const filteredEqualsAllEstates =
    filtered?.length !== userEstates?.concat(estateData).length;

  return (
    <ul className="space-y-2">
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="1-bath"
          ref={bathOptionOne}
          checked={isChecked1Bath && filteredEqualsAllEstates}
          onChange={(e) => {
            handleChange1Bath();
            if (
              !e.target.checked &&
              !bathOptionTwo.current!.checked &&
              !bathOptionThree.current!.checked &&
              !bathOptionFour.current!.checked
            )
              getAllEstates();
            else getEstatesByBaths(1);
          }}
        />
        <label
          htmlFor="1-bath"
          className="select-none opacity-60 hover:opacity-80"
        >
          1 Bath
        </label>
      </li>
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="2-bath"
          ref={bathOptionTwo}
          checked={isChecked2Bath && filteredEqualsAllEstates}
          onChange={(e) => {
            handleChange2Bath();
            if (
              !e.target.checked &&
              !bathOptionOne.current!.checked &&
              !bathOptionThree.current!.checked &&
              !bathOptionFour.current!.checked
            )
              getAllEstates();
            else getEstatesByBaths(3);
          }}
        />
        <label
          htmlFor="2-bath"
          className="select-none opacity-60 hover:opacity-80"
        >
          2-3 Baths
        </label>
      </li>
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="3-bath"
          ref={bathOptionThree}
          checked={isChecked3Bath && filteredEqualsAllEstates}
          onChange={(e) => {
            handleChange3Bath();
            if (
              !e.target.checked &&
              !bathOptionOne.current!.checked &&
              !bathOptionThree.current!.checked &&
              !bathOptionFour.current!.checked
            )
              getAllEstates();
            else getEstatesByBaths(4);
          }}
        />
        <label
          htmlFor="3-bath"
          className="select-none opacity-60 hover:opacity-80"
        >
          3-4 Baths
        </label>
      </li>
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="4-bath"
          ref={bathOptionFour}
          checked={isChecked4Bath && filteredEqualsAllEstates}
          onChange={(e) => {
            handleChange4Bath();
            if (
              !e.target.checked &&
              !bathOptionOne.current!.checked &&
              !bathOptionThree.current!.checked &&
              !bathOptionTwo.current!.checked
            )
              getAllEstates();
            else
              setFiltered!(
                allEstates?.filter((estate) => estate.premises.baths >= 5)!
              );
          }}
        />
        <label
          htmlFor="4-bath"
          className="select-none opacity-60 hover:opacity-80"
        >
          5+ Baths
        </label>
      </li>
    </ul>
  );
}
