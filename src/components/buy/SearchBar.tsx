import React, { useEffect } from "react";

import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { estateData } from "../../static/estate-data";
import { Estate } from "../../../typings";

import { collection, onSnapshot, query } from "firebase/firestore";
import { firestoreDb } from "../../utils/firebase";

type Props = {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setFiltered: React.Dispatch<React.SetStateAction<Estate[]>>;
  filtered: Estate[];
  setUserEstates: React.Dispatch<React.SetStateAction<Estate[]>>;
  userEstates: Estate[];
};

export default function SearchBar({
  term,
  setTerm,
  setFiltered,
  filtered,
  setUserEstates,
  userEstates,
}: Props) {
  useEffect(() => {
    getUploadedEstates();

    if (userEstates.length >= 1) {
      setFiltered(userEstates?.concat(estateData));
    }
  }, [userEstates.length]);

  useEffect(() => {
    const filteredByName = filtered?.filter(
      (estate: Estate) =>
        estate?.address?.city?.toLowerCase().includes(term.toLowerCase()) ||
        estate?.address?.country?.toLowerCase().includes(term.toLowerCase())
    );

    if (term && term.length >= 1) setFiltered(filteredByName);
    else if (userEstates.length >= 1)
      setFiltered(userEstates?.concat(estateData));
    else setFiltered(estateData);
  }, [term]);

  const getUploadedEstates = () => {
    const collectionRef = collection(firestoreDb, "estate");
    const q = query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      const uploadedEstates = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        address: {
          city: doc.data().address.city,
          country: doc.data().address.country,
          number: doc.data().address.number,
          street: doc.data().address.street,
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
        userId: doc.data().userId,
        timestamp: doc.data().timestamp?.toDate().getTime(),
      }));
      setUserEstates(uploadedEstates);
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="relative flex w-fit min-w-[300px] items-center justify-between rounded-full border bg-white p-2 transition-all duration-300 hover:border-baseBlue dark:border-[#222] dark:bg-[#333]">
        <input
          type="text"
          className="w-full bg-transparent pl-3 outline-none placeholder:opacity-20 dark:bg-[#333] dark:text-white dark:placeholder:opacity-40"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          placeholder="Enter city name..."
        />
        <BsSearch
          onClick={(e: React.MouseEvent) => e.preventDefault()}
          className="h-8 w-8 cursor-pointer rounded-full bg-baseBlue/50 p-1.5 text-xl text-white transition-all duration-300 hover:bg-baseBlue"
        />
      </div>
    </form>
  );
}
