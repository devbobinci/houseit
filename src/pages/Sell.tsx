import { useEffect, useState } from "react";
import DragDropImage from "../components/sell/DragDropImage";
import SellEstateInfo from "../components/sell/SellEstateInfo";

import { Listing } from "../utils/uploadEstate";
import ListEstate from "../components/sell/ListEstate";
import ConfirmedListing from "../components/sell/ConfirmedListing";
import { collection, onSnapshot, query } from "firebase/firestore";
import { firestoreDb } from "../utils/firebase";
import { Estate } from "../../typings";

import { motion as m } from "framer-motion";

import "../styles/sell-theme.css";

export default function Sell() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [confirmedListing, setConfirmedListing] = useState<boolean>(false);
  const [newListing, setNewLising] = useState<Listing | undefined>();
  const [addedListing, setAddedListing] = useState<boolean>(false);
  const [mainImageSrc, setMainImageSrc] = useState<File>(undefined!);

  const [uploadedEstate, setUpladedEstate] = useState<Estate>();

  const getUploadedEstates = () => {
    const collectionRef = collection(firestoreDb, "estate");
    const q = query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      const uploadedEstates = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        timestamp: doc.data().timestamp.toDate().getDate(),
        address: {
          country: doc.data().address.country,
          city: doc.data().address.city,
          street: doc.data().address.street,
          number: doc.data().address.number,
        },
        features: doc.data().features,
        premises: {
          baths: doc.data().premises.baths,
          beds: doc.data().premises.beds,
          area: doc.data().premises.area,
        },
        price: doc.data().price,
        mainImage: doc.data().mainImage,
        images: doc.data().images,
        description: doc.data().description,
      }));
      const estate = uploadedEstates.find(
        (estate) => estate.id === newListing?.id
      );
      setUpladedEstate(estate);
    });
  };

  useEffect(() => {
    getUploadedEstates();
  }, [addedListing]);

  return (
    <div className="sell-container-theme min-h-screen transition-all duration-200">
      <div className="mx-auto max-w-7xl px-2 py-24 md:px-8 md:py-28 xl:px-0">
        <m.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -15 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
        >
          {!addedListing ? (
            <div className="flex flex-col justify-between gap-8 xl:flex-row">
              <div className="rounded-xl border bg-white p-4 shadow-md transition-all duration-300 dark:border-gray-700 dark:bg-[#303030] xl:w-2/3 xl:p-6">
                <DragDropImage
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                  mainImageSrc={mainImageSrc!}
                  setMainImageSrc={setMainImageSrc}
                />

                <SellEstateInfo
                  mainImageSrc={mainImageSrc!}
                  setMainImageSrc={setMainImageSrc}
                  selectedImages={selectedImages}
                  setDisabledBtn={setDisabledBtn}
                  confirmedListing={confirmedListing}
                  setNewLising={setNewLising}
                />
              </div>
              <div className="right-0 top-28 h-min xl:sticky xl:w-1/3">
                <ListEstate
                  disabledBtn={disabledBtn}
                  newListing={newListing}
                  selectedImages={selectedImages}
                  setConfirmedListing={setConfirmedListing}
                  setAddedListing={setAddedListing}
                />
              </div>
            </div>
          ) : (
            <ConfirmedListing estate={uploadedEstate} />
          )}
        </m.div>
      </div>
    </div>
  );
}
