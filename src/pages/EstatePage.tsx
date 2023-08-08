import { useParams } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import { useEffect, useState } from "react";
import { estateData } from "../static/estate-data";

import { auth, firestoreDb } from "../utils/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import BookVisitation from "../components/estate-page/BookVisitation";
import { getBookings } from "../utils/getBookings";

import { AnimatePresence } from "framer-motion";

import EstateDescription from "../components/estate-page/EstateDescription";
import CancelVisitation from "../components/estate-page/CancelVisitation";
import EstateGallery from "../components/estate-page/EstateGallery";
import EstateFeatures from "../components/estate-page/EstateFeatures";
import VisitButton from "../components/estate-page/VisitButton";
import FavoriteEstate from "../components/estate-page/FavoriteEstate";
import { Estate } from "../../typings";
import { collection, onSnapshot, query } from "firebase/firestore";

import EstateLocation from "../components/estate-page/EstateLocation";

import { motion as m } from "framer-motion";
import "../styles/dark-theme-bg.css";

type Booking = {
  houseId: string | undefined;
  visitDate: string | undefined;
};

export default function EstatePage() {
  const [user] = useAuthState(auth);
  const [toggleVisitation, setToggleVisitation] = useState(false);
  const [bookings, setBookings] = useState<Booking[] | undefined>([]);

  const [estates, setEstates] = useState<Estate[]>(estateData);

  const [toggleCancel, setToggleCancel] = useState(false);
  const [confirmVisit, setConfirmVisit] = useState(false);

  let params = useParams();
  const estate = estates?.find((e) => e.id === params.id);

  const getUploadedEstates = () => {
    const collectionRef = collection(firestoreDb, "estate");
    const q = query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
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
      setEstates((prevEstates) => prevEstates.concat(uploadedEstates));
    });
  };

  useEffect(() => {
    getUploadedEstates();
  }, []);

  const {
    id,
    address,
    premises,
    price,
    features,
    mainImage,
    images,
    description,
  } = estate! || {};

  const bookedHouseIds = bookings?.map((booking: Booking) => booking.houseId);
  const bookedHouse = bookedHouseIds?.find((houseId) => houseId === id);
  const bookedVisitDate = bookings?.find(
    (booking) => booking.houseId === id
  )?.visitDate;

  useEffect(() => {
    checkUserVisitation();
  }, [user, bookings]);

  async function checkUserVisitation() {
    const bookings = await getBookings(user);
    if (bookings) {
      setBookings(Object?.values(bookings));
      if (bookedHouse) setConfirmVisit(true);
      else setConfirmVisit(false);
    }
  }

  return (
    <div className="dark-theme-bg min-h-screen">
      <RootLayout>
        <>
          <AnimatePresence mode="wait">
            {toggleVisitation && (
              <BookVisitation
                houseId={id}
                setToggleVisitation={setToggleVisitation}
                confirmVisit={confirmVisit}
                setConfirmVisit={setConfirmVisit}
              />
            )}

            {toggleCancel && (
              <CancelVisitation
                setToggleCancel={setToggleCancel}
                bookedVisitDate={bookedVisitDate}
                houseId={id}
                user={user}
                setConfirmVisit={setConfirmVisit}
                confirmVisit={confirmVisit}
                bookedHouse={bookedHouse}
              />
            )}
          </AnimatePresence>

          <div className="my-8">
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-4 flex items-center justify-between"
            >
              <h1 className="faded text-xl font-medium dark:text-white md:text-3xl">{`${address?.number} ${address?.street} St`}</h1>

              {id && <FavoriteEstate houseId={id} />}
            </m.div>

            {images && <EstateGallery mainImage={mainImage} images={images} />}

            {address && <EstateLocation address={address} />}

            {features && <EstateFeatures premises={premises} />}

            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.45 }}
              className="faded my-6 text-center dark:text-white md:text-left"
            >
              <h2 className="text-xl font-medium">Want to see this house?</h2>
              <p>Schedule a visit.</p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.55 }}
              className="mt-6 md:mt-12"
            >
              <VisitButton
                confirmVisit={confirmVisit}
                bookedHouse={bookedHouse}
                price={price}
                setToggleVisitation={setToggleVisitation}
                setToggleCancel={setToggleCancel}
                houseId={id}
              />

              <hr className="my-8" />

              <EstateDescription
                features={features}
                description={description}
              />
            </m.div>
          </div>
        </>
      </RootLayout>
    </div>
  );
}
