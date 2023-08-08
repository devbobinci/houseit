import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark";
import { Listing } from "../../utils/uploadEstate";
import ListingErrorMessages from "./ListingErrorMessages";

type Props = {
  disabledBtn: boolean;
  newListing: Listing | undefined;
  selectedImages: File[];
  setConfirmedListing: React.Dispatch<React.SetStateAction<boolean>>;
  setAddedListing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ListEstate({
  disabledBtn,
  newListing,
  selectedImages,
  setConfirmedListing,
  setAddedListing,
}: Props) {
  return (
    <div className="group rounded-xl border bg-white p-3 shadow-md transition-all duration-300 dark:border-gray-700 dark:bg-[#303030] xl:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium dark:text-white">
          List your estate
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="h-14 w-14 stroke-baseBlue/40 transition-all duration-200 group-hover:stroke-baseBlue/100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
          />
        </svg>
      </div>

      <ListingErrorMessages
        selectedImages={selectedImages}
        newListing={newListing}
      />

      <ul className="my-8 space-y-3">
        <li className="flex cursor-default items-start gap-2 text-xl">
          <FcCheckmark className="mt-0.5" />{" "}
          <span className="text-sm dark:text-white">
            Interested parties will arrange a meeting at a convenient time
          </span>
        </li>
        <li className="flex cursor-default items-start gap-2 text-xl">
          <FcCheckmark className="mt-0.5" />{" "}
          <span className="text-sm dark:text-white">
            Interested parties will arrange a meeting at a convenient time
          </span>
        </li>
        <li className="flex cursor-default items-start gap-2 text-xl">
          <FcCheckmark className="mt-0.5" />{" "}
          <span className="text-sm dark:text-white">
            Interested parties will arrange a meeting at a convenient time
          </span>
        </li>
      </ul>

      <button
        onClick={() => {
          setConfirmedListing(true);
          setTimeout(() => setAddedListing(true), 1000);
        }}
        disabled={disabledBtn}
        className={`rounded-full bg-baseBlue px-4 py-2 text-white ${
          disabledBtn ? "cursor-not-allowed bg-baseBlue/40 opacity-70" : ""
        }`}
      >
        Confirm
      </button>
    </div>
  );
}
