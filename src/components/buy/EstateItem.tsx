import { useEffect, useState } from "react";

import { formatCurrency } from "../../utils/formatCurrency";

import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";

import { motion as m, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Skeleton from "react-loading-skeleton";
import {
  getFavorites,
  removeFavorite,
  setFavorite,
} from "../../utils/favoriteEstate";
import { Estate } from "../../../typings";

type Props = {
  estate: Estate;
  idx: number;
};

export default function EstateItem({
  estate: { id, mainImage, price, premises, address },
  idx,
}: Props) {
  const [user] = useAuthState(auth);

  const [toggleStar, setToggleStar] = useState(false);

  async function checkFavorites() {
    const favoriteHouse = await getFavorites(user, id);

    if (favoriteHouse) {
      setToggleStar(true);
    } else {
      setToggleStar(false);
    }
  }

  useEffect(() => {
    if (user) checkFavorites();
  }, [user]);

  return (
    <AnimatePresence mode="wait">
      <Link
        to={`/buy/house/${id}`}
        className="group w-full transition-all duration-300 hover:-translate-y-2"
      >
        <m.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, delay: idx / 4 }}
          className="rounded-xl shadow-md transition-all duration-300 hover:shadow-lg dark:bg-[#333]"
        >
          <div className="relative z-0">
            {mainImage ? (
              <img
                src={mainImage}
                alt={`${address.number} ${address.street} St`}
                className="z-0 h-[210px] w-full rounded-t-xl"
              />
            ) : (
              <Skeleton height={50} width={50} />
            )}
            {user && (
              <div
                onClick={() => {
                  setToggleStar((prev) => !prev);
                  !toggleStar
                    ? setFavorite(user, id)
                    : removeFavorite(user, id);
                }}
                className="group absolute right-3 top-3 cursor-pointer rounded-full bg-white/20 p-2 backdrop-blur-sm"
              >
                {!toggleStar ? (
                  <AiOutlineStar className="text-xl text-white transition-all duration-300 hover:rotate-45 group-hover:text-yellow-300" />
                ) : (
                  <AiFillStar className="text-xl text-yellow-400 transition-all duration-300 hover:-rotate-45" />
                )}
              </div>
            )}
          </div>
          <div className="p-4 dark:text-white">
            <div>
              <h6 className="text-sm font-medium group-hover:underline">{`${address.number} ${address.street} St`}</h6>
              <h5 className="text-xs text-gray-400">
                {address.city}, {address.country}
              </h5>
            </div>

            <div className="my-2 flex items-center justify-between gap-4">
              <div className="mt-2 flex justify-between gap-2 text-xs ">
                <div className="flex flex-col items-center">
                  <span className="font-medium">{premises?.beds}</span>
                  <span className="text-[11px] text-gray-400">Beds</span>
                </div>
                <span className="block h-8 w-[1px] bg-gray-200 dark:bg-neutral-500"></span>
                <div className="flex flex-col items-center">
                  <span className="font-medium">{premises?.baths}</span>
                  <span className="text-[11px] text-gray-400">Baths</span>
                </div>
                <span className="block h-8 w-[1px] bg-gray-200 dark:bg-neutral-500"></span>
                <div className="flex flex-col items-center">
                  <span className="font-medium">{premises?.area}</span>
                  <span className="text-[11px] text-gray-400">m²</span>
                </div>
              </div>

              <span className="text-base font-medium xl:text-lg 2xl:text-xl">
                {formatCurrency(price)}
              </span>
            </div>
          </div>
        </m.div>
      </Link>
    </AnimatePresence>
  );
}
