import Checkmark from "../estate-page/Checkmark";

type Props = {
  setBaths: React.Dispatch<React.SetStateAction<number | undefined>>;
  setBeds: React.Dispatch<React.SetStateAction<number | undefined>>;
  setArea: React.Dispatch<React.SetStateAction<number | undefined>>;
  baths: number | undefined;
  beds: number | undefined;
  area: number | undefined;
};

export default function PremisesSelection({
  setBaths,
  setBeds,
  setArea,
  baths,
  beds,
  area,
}: Props) {
  function handleInputValueChange(
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) {
    let limit = 2;

    switch (type) {
      case "baths":
        setBaths(Number(e.target.value.slice(0, limit)));
        break;
      case "beds":
        setBeds(Number(e.target.value.slice(0, limit)));
        break;
      case "area":
        limit = 10;
        setArea(Number(e.target.value.slice(0, limit)));
        break;
    }
  }

  return (
    <div className="my-8 flex items-center gap-4">
      <div className="flex flex-col items-center space-x-2 md:flex-row">
        <label
          htmlFor="baths"
          className="flex transition-all duration-300 dark:text-white"
        >
          Baths
          {!baths ? (
            <span className="text-red-500">*</span>
          ) : (
            <Checkmark size={4} />
          )}
        </label>

        <input
          value={baths || ""}
          onChange={(e) => handleInputValueChange(e, "baths")}
          min={1}
          id="baths"
          type="number"
          placeholder="1"
          className="w-12 rounded-md border border-neutral-300 text-center text-neutral-600 shadow-sm outline-2 outline-baseBlue transition-all duration-200 placeholder:text-gray-300 hover:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-200"
        />
      </div>
      <div className="inline-block h-8 w-0.5 border border-t bg-gray-300" />
      <div className="flex flex-col items-center space-x-2 md:flex-row">
        <label
          htmlFor="beds"
          className="flex transition-all duration-300 dark:text-white"
        >
          Beds
          {!beds ? (
            <span className="text-red-500">*</span>
          ) : (
            <Checkmark size={4} />
          )}
        </label>
        <input
          value={beds || ""}
          onChange={(e) => handleInputValueChange(e, "beds")}
          min={1}
          id="beds"
          type="number"
          placeholder="1"
          className="w-12 rounded-md border border-neutral-300 text-center text-neutral-600 shadow-sm outline-2 outline-baseBlue transition-all duration-200 placeholder:text-gray-300 hover:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-200"
        />
      </div>
      <div className="inline-block h-8 w-0.5 border border-t bg-gray-300" />
      <div className="flex flex-col items-center space-x-2 md:flex-row">
        <label
          htmlFor="area"
          className="flex transition-all duration-300 dark:text-white"
        >
          Area
          {!area ? (
            <span className="text-red-500">*</span>
          ) : (
            <Checkmark size={4} />
          )}{" "}
        </label>
        <input
          value={area || ""}
          onChange={(e) => handleInputValueChange(e, "area")}
          min={1}
          id="area"
          type="number"
          placeholder="(m²)"
          className="w-24 rounded-md border border-neutral-300 py-0.5 text-center text-neutral-600 shadow-sm outline-2 outline-baseBlue transition-all duration-200 placeholder:text-gray-300 hover:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-200"
        />
      </div>
    </div>
  );
}
