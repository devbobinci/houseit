import { useRef, useState } from "react";

import { useFilterSelection } from "../../../../context/FilterUserSelection";

type Props = {
  setOpenTab: React.Dispatch<React.SetStateAction<boolean>>;
  setNewFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Baths({ setOpenTab, setNewFilters }: Props) {
  const { setFilterSelection } = useFilterSelection();

  const [isChecked1Bath, setIsChecked1Bath] = useState<boolean>(false);
  const [isChecked2Bath, setIsChecked2Bath] = useState<boolean>(false);
  const [isChecked3Bath, setIsChecked3Bath] = useState<boolean>(false);
  const [isChecked4Bath, setIsChecked4Bath] = useState<boolean>(false);

  const bathOptionOne = useRef<HTMLInputElement>(null);
  const bathOptionTwo = useRef<HTMLInputElement>(null);
  const bathOptionThree = useRef<HTMLInputElement>(null);
  const bathOptionFour = useRef<HTMLInputElement>(null);

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

  return (
    <ul className="space-y-2">
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="1-bath"
          ref={bathOptionOne}
          checked={isChecked1Bath}
          onChange={() => {
            handleChange1Bath();
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              baths: 1,
            }));
            setOpenTab(false);
            setNewFilters(true);
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
          checked={isChecked2Bath}
          onChange={() => {
            handleChange2Bath();
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              baths: 3,
            }));
            setOpenTab(false);
            setNewFilters(true);
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
          checked={isChecked3Bath}
          onChange={() => {
            handleChange3Bath();
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              baths: 4,
            }));
            setOpenTab(false);
            setNewFilters(true);
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
          checked={isChecked4Bath}
          onChange={() => {
            handleChange4Bath();
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              baths: 5,
            }));
            setNewFilters(true);
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
