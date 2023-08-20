import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { collection, onSnapshot, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestoreDb } from "../utils/firebase";

import CancelListing from "../components/user-listings/CancelListing";
import { useUserPanelContext } from "../context/ToggleUserPanel";
import { Estate } from "../../typings";
import RootLayout from "../layout/RootLayout";

import ClipLoader from "react-spinners/ClipLoader";
import { motion as m, AnimatePresence } from "framer-motion";
import moment from "moment";

import "../styles/dark-theme-bg.css";

export default function Listings() {
  const [user, loading] = useAuthState(auth);
  const { setToggleUserPanel } = useUserPanelContext();

  const [estates, setEstates] = useState<Estate[]>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [currentEstate, setCurrentEstate] = useState<{
    id: string;
    name: string;
  }>({
    id: "",
    name: "",
  });
  const params = useParams();

  const userEstates = estates?.filter((e) => e.userId === params.id);

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
      setEstates(uploadedEstates);
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
      <AnimatePresence mode="wait">
        {deleteModal && (
          <CancelListing
            setDeleteModal={setDeleteModal}
            estate={currentEstate}
          />
        )}
      </AnimatePresence>

      <RootLayout>
        <m.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -15 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center font-lobster text-2xl font-semibold md:text-left xl:text-3xl">
            My Listings
          </h2>
          <hr className="mt-6 w-full" />

          <div className="mt-12 grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 md:px-0 lg:grid-cols-3 xl:grid-cols-4">
            {user &&
              userEstates.length > 0 &&
              userEstates?.map((estate, idx) => {
                const { address } = estate || {};
                const estateAddress = `${address.street} St, ${address.city} ${address.number}`;
                return (
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx / 2 }}
                    key={estate?.id}
                    className="rounded-md shadow-md dark:bg-[#333]"
                  >
                    <img
                      src={estate?.mainImage}
                      alt={address.city + "house"}
                      className="h-52 w-full rounded-t-md object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xs text-neutral-500 underline dark:text-neutral-400 xl:text-sm">
                        {estateAddress}
                      </h3>

                      <div className="flex items-center justify-between space-y-2 py-2">
                        <h3 className="md:text-md md:text-md text-sm font-medium text-neutral-600">
                          <p className="text-neutral-300">Added : </p>
                          <span className="text-baseBlue">
                            {moment(estate.timestamp).fromNow()}
                          </span>
                        </h3>
                        <button
                          onClick={() => {
                            setDeleteModal(true);
                            setCurrentEstate({
                              id: estate?.id,
                              name: estateAddress,
                            });
                          }}
                          className="md:text-md cursor-pointer rounded-md border border-red-500 bg-red-200 px-3 py-1.5 text-sm text-red-500"
                        >
                          Cancel listing
                        </button>
                      </div>
                    </div>
                  </m.div>
                );
              })}
          </div>

          {userEstates.length === 0 && !loading && (
            <div className="mx-auto w-fit rounded-xl border border-dashed p-4 py-8 text-center xl:p-8">
              <h2 className="mb-4 text-lg font-medium xl:text-xl">
                You haven't added any yet.
              </h2>
              <Link
                to="/sell"
                className="group transition-all duration-200 hover:text-lg xl:text-xl xl:hover:text-2xl"
              >
                <img
                  src="/sell/add.png"
                  alt=""
                  className="mx-auto h-8 w-8 transition-all duration-200 group-hover:scale-125 xl:h-12 xl:w-12"
                />
                Do <span className="text-baseBlue">it</span> now!
              </Link>
            </div>
          )}

          {userEstates.length === 0 && loading && (
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
