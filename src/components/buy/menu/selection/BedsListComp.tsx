import { useEffect, useRef, useState } from "react";
import { useFilterSelection } from "../../../../context/FilterUserSelection";

type Props = {
  setOpenTab: React.Dispatch<React.SetStateAction<boolean>>;
  setNewFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BedsListComp({ setOpenTab, setNewFilters }: Props) {
  const { filterSelection, setFilterSelection } = useFilterSelection();

  const [isChecked1Bed, setIsChecked1Bed] = useState<boolean>(false);
  const [isChecked2Bed, setIsChecked2Bed] = useState<boolean>(false);
  const [isChecked3Bed, setIsChecked3Bed] = useState<boolean>(false);

  const bedOptionOne = useRef<HTMLInputElement>(null);
  const bedOptionTwo = useRef<HTMLInputElement>(null);
  const bedOptionThree = useRef<HTMLInputElement>(null);

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

  function unCheckCheckboxes() {
    setIsChecked2Bed(false);
    setIsChecked1Bed(false);
    setIsChecked3Bed(false);
  }

  useEffect(() => {
    if (isNaN(filterSelection.beds)) unCheckCheckboxes();
  }, [filterSelection.beds]);

  return (
    <ul className="space-y-2">
      <li className="group flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          id="1-bed"
          ref={bedOptionOne}
          checked={isChecked1Bed}
          onChange={() => {
            handleChange1Bed();
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              beds: 2,
            }));
            setOpenTab(false);
            setNewFilters(true);
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
          checked={isChecked2Bed}
          onChange={() => {
            handleChange2Bed();
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              beds: 4,
            }));
            setOpenTab(false);
            setNewFilters(true);
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
          checked={isChecked3Bed}
          onChange={() => {
            handleChange3Bed();
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              beds: 5,
            }));
            setOpenTab(false);
            setNewFilters(true);
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
