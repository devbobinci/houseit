import "../../styles/dark-theme-bg.css";
import { estateData } from "../../static/estate-data";
import { useEffect, useState } from "react";
import RootLayout from "../../layout/RootLayout";
import { Estate } from "../../../typings";

import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark";

import { Link } from "react-router-dom";

export default function BannerEstate() {
  const [estate, setEstate] = useState<Estate>();
  //todo: random estate Data

  function getRandomEstate() {
    const randomEstate =
      estateData[Math.floor(Math.random() * estateData.length)];
    setEstate(randomEstate);
    return randomEstate;
  }

  useEffect(() => {
    getRandomEstate();
  }, []);

  const { mainImage, address, premises } = estate || {};

  const estateTitle = `${address?.city} ${address?.number} ${address?.street} St`;

  return (
    <div className="dark-theme-bg min-h-screen">
      <hr />
      <RootLayout>
        <>
          <div className="gap-8 md:flex 2xl:gap-12">
            <img
              src={mainImage}
              alt={`Main Image of ${estateTitle} house`}
              className="h-64 w-full rounded-md object-cover shadow-xl md:h-[400px] md:w-2/3 xl:h-[500px]"
            />
            <div className="p-2">
              <h3 className="border-b border-dashed pb-2 text-lg font-medium text-neutral-600 dark:text-neutral-200 xl:text-xl">
                {estateTitle}
              </h3>

              <div className="mb-8 space-y-2 border-b border-dashed py-2 md:space-y-6 xl:py-6">
                <p className="text-sm text-neutral-500 dark:text-neutral-200">
                  <FcCheckmark className="mr-1 inline pb-1 text-lg" />
                  Bedrooms: {premises?.beds}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-200">
                  <FcCheckmark className="mr-1 inline pb-1 text-lg" />
                  Bathrooms: {premises?.baths}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-200">
                  <FcCheckmark className="mr-1 inline pb-1 text-lg" />
                  Area: {premises?.area}m²
                </p>
              </div>

              <Link
                to="/buy"
                className="mt-8 rounded-md bg-red-500/80 px-2.5 py-1.5 text-sm text-white opacity-80 transition-all duration-200 hover:bg-red-500 hover:opacity-100 md:px-3 md:py-2 md:text-base xl:text-lg"
              >
                Check now!
              </Link>
            </div>
          </div>
        </>
      </RootLayout>
    </div>
  );
}
