import CurrencyInput from "react-currency-input-field";
import Checkmark from "../estate-page/Checkmark";

type Props = {
  selectedPrice: number | undefined;
  setSelectedPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function SetEstatePrice({
  selectedPrice,
  setSelectedPrice,
}: Props) {
  return (
    <div>
      <label
        htmlFor="price"
        className="mb-1 flex transition-all duration-300 dark:text-white"
      >
        Price
        {!selectedPrice ? (
          <span className="text-red-500">*</span>
        ) : (
          <Checkmark size={4} />
        )}
      </label>
      <CurrencyInput
        className="w-full rounded-md border border-neutral-300 p-2 text-neutral-600 shadow-sm outline-2 outline-baseBlue transition-all duration-200 placeholder:text-gray-300 hover:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-200"
        id="price"
        name="price"
        placeholder="Please enter a number"
        defaultValue={selectedPrice || ""}
        decimalsLimit={2}
        onValueChange={(value) => setSelectedPrice(Number(value))}
        intlConfig={{ locale: "en-US", currency: "USD" }}
        required
      />
    </div>
  );
}
