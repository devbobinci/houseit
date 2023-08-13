import BedsListComp from "./BedsListComp";

type Props = {
  setOpenTab: React.Dispatch<React.SetStateAction<boolean>>;
  setNewFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileBeds({ setOpenTab, setNewFilters }: Props) {
  return <BedsListComp setOpenTab={setOpenTab} setNewFilters={setNewFilters} />;
}
