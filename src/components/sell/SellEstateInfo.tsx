import { useEffect, useState } from "react";

import CountryPicker, { cityOption, option } from "./CountryPicker";
import SelectEstateFeatures from "./SetEstateFeatures";
import SetEstatePrice from "./SetEstatePrice";
import PremisesSelection from "./PremisesSelection";
import EnterEstateDescription from "./EnterEstateDescription";
import Checkmark from "../estate-page/Checkmark";

import { Listing, uploadEstate } from "../../utils/uploadEstate";
import { auth } from "../../utils/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { motion as m, AnimatePresence } from "framer-motion";
import { useUserPanelContext } from "../../context/ToggleUserPanel";

type Props = {
  selectedImages: File[];
  mainImageSrc: File;
  setMainImageSrc: React.Dispatch<React.SetStateAction<File>>;
  setDisabledBtn: React.Dispatch<React.SetStateAction<boolean>>;
  confirmedListing: boolean;
  setNewLising: React.Dispatch<React.SetStateAction<Listing | undefined>>;
};

export default function EstateInfo({
  selectedImages,
  mainImageSrc,
  setDisabledBtn,
  confirmedListing,
  setNewLising,
}: Props) {
  const [user] = useAuthState(auth);

  const { setToggleUserPanel } = useUserPanelContext();

  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const [selectedCountry, setSelectedCountry] = useState<option>(null);
  const [selectedStreet, setSelectedStreet] = useState<string>("");
  const [selectedNumber, setSelectedNumber] = useState<number | undefined>();
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

  const [bathrooms, setBathrooms] = useState<number>();
  const [bedrooms, setBedrooms] = useState<number>();
  const [area, setArea] = useState<number>();

  const [estateDescription, setEstateDescription] = useState<string>("");

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const newUserListing = {
    address: {
      country: selectedCountry?.label,
      city: selectedCity?.label,
      street: selectedStreet,
      number: selectedNumber,
    },
    features: selectedFeatures,
    premises: {
      baths: bathrooms,
      beds: bedrooms,
      area: area,
    },
    description: estateDescription,
    price: selectedPrice,
  };

  useEffect(() => {
    if (confirmedListing) {
      if (user) handleEstateUpload();
      else setToggleUserPanel(true);
    }
  }, [confirmedListing]);

  const filteredImages = selectedImages.filter(
    (image) => image.name !== mainImageSrc?.name
  );

  async function handleEstateUpload() {
    await uploadEstate(filteredImages, newUserListing, user, mainImageSrc);
  }

  function validateAddListing() {
    if (
      !selectedCountry ||
      !selectedCity ||
      selectedImages.length === 0 ||
      !selectedStreet ||
      !selectedNumber ||
      !selectedPrice ||
      selectedFeatures.length <= 2 ||
      !bedrooms ||
      !bathrooms ||
      !area ||
      estateDescription.length < 50 ||
      !mainImageSrc
    )
      return setDisabledBtn(true);
    else return setDisabledBtn(false);
  }

  useEffect(() => {
    validateAddListing();
    setNewLising({
      address: {
        country: selectedCountry?.label,
        city: selectedCity?.label,
        street: selectedStreet,
        number: selectedNumber,
      },
      features: selectedFeatures,
      premises: {
        baths: bathrooms,
        beds: bedrooms,
        area: area,
      },
      price: selectedPrice,
      description: estateDescription,
    });

    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    if (
      selectedCountry ||
      selectedCity ||
      selectedImages.length >= 1 ||
      selectedStreet ||
      selectedNumber ||
      selectedPrice ||
      selectedFeatures ||
      bedrooms ||
      bathrooms ||
      area ||
      estateDescription
    ) {
      window.addEventListener("beforeunload", unloadCallback);
    }

    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [
    selectedImages,
    selectedCountry,
    selectedCity,
    selectedStreet,
    selectedNumber,
    selectedPrice,
    selectedFeatures,
    bedrooms,
    bathrooms,
    area,
    estateDescription,
    mainImageSrc,
  ]);

  return (
    <div className="">
      <form>
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <div className="space-y-4">
              <CountryPicker
                setSelectedCountry={setSelectedCountry}
                setSelectedCity={setSelectedCity}
                selectedCountry={selectedCountry}
                selectedCity={selectedCity}
              />
              <div className="space-y-4">
                {selectedCity && selectedCountry && (
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label
                      htmlFor="street"
                      className="mb-1 flex transition-all duration-300 dark:text-white"
                    >
                      Street
                      {selectedStreet.length < 3 ? (
                        <span className="text-red-500">*</span>
                      ) : (
                        <Checkmark size={4} />
                      )}
                    </label>
                    <input
                      required
                      onChange={(e) =>
                        setSelectedStreet(e.target.value.replace(/^[0-9]/, ""))
                      }
                      value={selectedStreet}
                      type="text"
                      id="street"
                      placeholder="e.g. Flopa St"
                      className="w-full rounded-md border border-neutral-300 p-1.5 pl-2.5 text-neutral-600 shadow-sm outline-2 outline-baseBlue transition-all duration-200 placeholder:text-gray-300 hover:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-200"
                    />
                  </m.div>
                )}
                {selectedStreet.length > 2 &&
                  selectedCity &&
                  selectedCountry && (
                    <m.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label
                        htmlFor="number"
                        className="mb-1 flex transition-all duration-300 dark:text-white"
                      >
                        Number
                        {!selectedNumber ? (
                          <span className="text-red-500">*</span>
                        ) : (
                          <Checkmark size={4} />
                        )}
                      </label>
                      <input
                        required
                        onChange={(e) =>
                          setSelectedNumber(Number(e.target.value))
                        }
                        value={selectedNumber || ""}
                        type="number"
                        id="number"
                        maxLength={6}
                        placeholder="eg. 30"
                        className="w-full rounded-md border border-neutral-300 p-1.5 pl-2.5 text-neutral-600 shadow-sm outline-2 outline-baseBlue transition-all duration-200 placeholder:text-gray-300 hover:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-200"
                      />
                    </m.div>
                  )}
              </div>
            </div>
          </AnimatePresence>
        </div>

        <PremisesSelection
          setBaths={setBathrooms}
          setBeds={setBedrooms}
          setArea={setArea}
          baths={bathrooms}
          beds={bedrooms}
          area={area}
        />

        <EnterEstateDescription
          estateDescription={estateDescription}
          setEstateDescription={setEstateDescription}
        />

        <SetEstatePrice
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />

        <SelectEstateFeatures
          setSelectedFeatures={setSelectedFeatures}
          selectedFeatures={selectedFeatures}
        />
      </form>
    </div>
  );
}
