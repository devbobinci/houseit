import { useEffect, useState } from "react";

import { useUserPanelContext } from "../context/ToggleUserPanel";

import RootLayout from "../layout/RootLayout";
import { estateData } from "../static/estate-data";

import { auth, firestoreDb } from "../utils/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { Link } from "react-router-dom";

import { getAllFavorites } from "../utils/favoriteEstate";
import EstateItem from "../components/buy/EstateItem";
import { motion as m } from "framer-motion";
import { Estate } from "../../typings";
import ClipLoader from "react-spinners/ClipLoader";

import "../styles/dark-theme-bg.css";

export default function Favorites() {
  const [user, loading] = useAuthState(auth);
  const { setToggleUserPanel } = useUserPanelContext();

  const [estates, setEstates] = useState<Estate[]>([]);

  const getUploadedEstates = () => {
    const collectionRef = collection(firestoreDb, "estate");
    const q = query(collectionRef);
    onSnapshot(q, async (querySnapshot) => {
      const uploadedEstates = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        timestamp: doc.data().timestamp.toDate().getTime(),
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
      }));
      const favoriteHouses = await getAllFavorites(user);
      const allEstates = estateData.concat(uploadedEstates);
      const filteredEstates = allEstates.filter((estate) =>
        favoriteHouses?.includes(estate.id)
      );
      setEstates(filteredEstates);
    });
  };

  useEffect(() => {
    getUploadedEstates();
    if (!user && !loading) {
      setToggleUserPanel(true);
    }
  }, [user, loading]);

  return (
    <div className="dark-theme-bg faded relative mt-8 min-h-screen dark:text-white">
      <RootLayout>
        <m.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -15 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center font-lobster text-2xl font-semibold md:text-left xl:text-3xl">
            My Favorites
          </h2>
          <hr className="mt-6 w-full" />

          <div className="mt-12 grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 md:px-0 lg:grid-cols-3 xl:grid-cols-4">
            {estates?.map((estate, idx) => (
              <EstateItem key={estate?.id} estate={estate} idx={idx} />
            ))}
          </div>
          {estates.length === 0 && !loading && (
            <div className="mx-auto w-fit rounded-xl border border-dashed p-4 py-8 text-center xl:p-8">
              <h2 className="mb-4 text-lg font-medium xl:text-xl">
                You haven't liked any yet.
              </h2>
              <Link
                to="/buy"
                className="group transition-all duration-200 hover:text-lg xl:text-xl xl:hover:text-2xl"
              >
                Take <span className="text-baseBlue">a</span> look!
              </Link>
            </div>
          )}

          {estates.length === 0 && loading && (
            <div className="mx-auto text-center">
              <ClipLoader size={20} color="#60B7FF" />
              <p className="animate-pulse text-baseBlue">Loading...</p>
            </div>
          )}
        </m.div>
      </RootLayout>
    </div>
  );
}
