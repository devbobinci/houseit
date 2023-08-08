import { MdErrorOutline } from "@react-icons/all-files/md/MdErrorOutline";
import { Listing } from "../../utils/uploadEstate";

type Props = {
  selectedImages: File[];
  newListing: Listing | undefined;
};

export default function ListingErrorMessages({
  selectedImages,
  newListing,
}: Props) {
  const { address, premises, description, price, features } = newListing || {};

  return (
    <div className="flex flex-col gap-3">
      {selectedImages.length === 0 && (
        <span className="inline-flex items-center gap-2 text-sm text-red-400">
          <MdErrorOutline className="text-xl text-red-500/80" />
          Add photos
        </span>
      )}
      {selectedImages.length >= 1 && !address?.country && (
        <span className="inline-flex items-center gap-2 text-sm text-red-400">
          <MdErrorOutline className="text-xl text-red-500/80" />
          Enter a country
        </span>
      )}
      {selectedImages.length >= 1 && address?.country && !address?.city && (
        <span className="inline-flex items-center gap-2 text-sm text-red-400">
          <MdErrorOutline className="text-xl text-red-500/80" />
          Enter a city
        </span>
      )}
      {selectedImages.length >= 1 &&
      address?.country &&
      address?.city &&
      !address?.street ? (
        <span className="inline-flex items-center gap-2 text-sm text-red-400">
          <MdErrorOutline className="text-xl text-red-500/80" />
          Enter the street name
        </span>
      ) : null}
      {selectedImages.length >= 1 &&
      address?.country &&
      address?.city &&
      address?.street &&
      !address.number ? (
        <span className="inline-flex items-center gap-2 text-sm text-red-400">
          <MdErrorOutline className="text-xl text-red-500/80" />
          Enter the house number
        </span>
      ) : null}
      {selectedImages.length >= 1 &&
      address?.country &&
      address?.city &&
      address?.street &&
      address?.number &&
      !premises?.baths ? (
        <span className="inline-flex items-center gap-2 text-sm text-red-400">
          <MdErrorOutline className="text-xl text-red-500/80" />
          Enter the number of bathrooms
        </span>
      ) : null}

      {selectedImages.length >= 1 &&
      address?.country &&
      address?.city &&
      address?.street &&
      address?.number &&
      premises?.baths &&
      !premises?.beds ? (
        <span className="inline-flex items-center gap-2 text-sm text-red-400">
          <MdErrorOutline className="text-xl text-red-500/80" />
          Enter the number of bedrooms
        </span>
      ) : null}

      {selectedImages.length >= 1 &&
      address?.country &&
      address?.city &&
      address?.street &&
      address?.number &&
      premises?.baths &&
      premises?.beds &&
      !premises?.area ? (
        <span className="inline-flex items-center gap-2 text-sm text-red-400">
          <MdErrorOutline className="text-xl text-red-500/80" />
          Enter the area of the property
        </span>
      ) : null}
      {selectedImages.length >= 1 &&
      address?.country &&
      address?.city &&
      address?.street &&
      address?.number &&
      premises?.baths &&
      premises?.beds &&
      premises?.area &&
      description!.length <= 50 ? (
        <span className="inline-flex items-center gap-2 text-sm text-red-400">
          <MdErrorOutline className="text-xl text-red-500/80" />
          Enter the house description
        </span>
      ) : null}
      {selectedImages.length >= 1 &&
      address?.country &&
      address?.city &&
      address?.street &&
      premises?.baths &&
      premises?.beds &&
      premises?.area &&
      description!.length >= 50 &&
      !price ? (
        <span className="inline-flex items-center gap-2 text-sm text-red-400">
          <MdErrorOutline className="text-xl text-red-500/80" />
          Enter the house price
        </span>
      ) : null}

      {selectedImages.length >= 1 &&
      address?.country &&
      address?.street &&
      address?.number &&
      premises?.baths &&
      premises?.area &&
      description!.length >= 50 &&
      price &&
      features?.length! <= 2 ? (
        <>
          <span className="inline-flex items-center gap-2 text-sm text-red-400">
            <MdErrorOutline className="text-xl text-red-500/80" />
            Select house features
          </span>
          <span className="text-xs italic text-gray-300">
            if there are more-mention them in the description
          </span>
        </>
      ) : null}
    </div>
  );
}
