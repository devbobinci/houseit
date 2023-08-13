import { useRef, useState } from "react";
import { useFilterSelection } from "../../../../context/FilterUserSelection";

type Props = {
  setOpenTab: React.Dispatch<React.SetStateAction<boolean>>;
  setNewFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Area({ setOpenTab, setNewFilters }: Props) {
  const { setFilterSelection } = useFilterSelection();

  const [isChecked1Area, setIsChecked1Area] = useState<boolean>(false);
  const [isChecked2Area, setIsChecked2Area] = useState<boolean>(false);
  const [isChecked3Area, setIsChecked3Area] = useState<boolean>(false);
  const [isChecked4Area, setIsChecked4Area] = useState<boolean>(false);

  const areaOptionOne = useRef<HTMLInputElement>(null);
  const areaOptionTwo = useRef<HTMLInputElement>(null);
  const areaOptionThree = useRef<HTMLInputElement>(null);
  const areaOptionFour = useRef<HTMLInputElement>(null);

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

  return (
    <ul className="space-y-2">
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="2500-area"
          ref={areaOptionOne}
          checked={isChecked1Area}
          onChange={() => {
            handleChange1Area();
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              area: 2500,
            }));
            setOpenTab(false);
            setNewFilters(true);
          }}
        />
        <label htmlFor="2500-area" className="opacity-60 hover:opacity-80">
          &lt; 2500 m²
        </label>
      </li>
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="5000-area"
          ref={areaOptionTwo}
          checked={isChecked2Area}
          onChange={() => {
            handleChange2Area();
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              area: 5000,
            }));
            setOpenTab(false);
            setNewFilters(true);
          }}
        />
        <label htmlFor="5000-area" className="opacity-60 hover:opacity-80">
          &lt; 5000 m²
        </label>
      </li>
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="10000-area"
          ref={areaOptionThree}
          checked={isChecked3Area}
          onChange={() => {
            handleChange3Area();
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              area: 10000,
            }));
            setOpenTab(false);
            setNewFilters(true);
          }}
        />
        <label htmlFor="10000-area" className="opacity-60 hover:opacity-80">
          &lt; 10000 m²
        </label>
      </li>
      <li className="flex items-center gap-2">
        <input
          type="checkbox"
          id="10001-area"
          ref={areaOptionFour}
          checked={isChecked4Area}
          onChange={() => {
            handleChange4Area();
            setFilterSelection((prevSelection) => ({
              ...prevSelection,
              area: 10001,
            }));
            setOpenTab(false);
            setNewFilters(true);
          }}
        />
        <label htmlFor="10001-area" className="opacity-60 hover:opacity-80">
          10000+ m²
        </label>
      </li>
    </ul>
  );
}
