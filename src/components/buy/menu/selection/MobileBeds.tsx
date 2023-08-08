import { Estate } from "../../../../../typings";
import BedsListComp from "./BedsListComp";

type Props = {
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  filtered?: Estate[];
  userEstates?: Estate[];
};

export default function MobileBeds({
  setFiltered,
  filtered,
  userEstates,
}: Props) {
  console.log(userEstates);

  return (
    <BedsListComp
      setFiltered={setFiltered}
      filtered={filtered}
      userEstates={userEstates}
    />
  );
}
