import { Link, redirect } from "react-router-dom";
import { Estate } from "../../../typings";
import Checkmark from "../estate-page/Checkmark";

import ClipLoader from "react-spinners/ClipLoader";
import { motion as m } from "framer-motion";

type Props = {
  estate: Estate | undefined;
};

export default function ConfirmedListing({ estate }: Props) {
  const { id, mainImage } = estate || {};

  if (!estate) {
    setTimeout(() => {
      redirect("/buy");
    }, 2000);
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-2 md:px-0">
      <div className="w-fit rounded-2xl bg-white p-4 text-center shadow-md dark:bg-[#333] xl:p-8">
        <Checkmark size={30} />
        <h1 className="text-2xl font-semibold dark:text-white">
          Your listing has been added
        </h1>

        {estate && (
          <Link
            className="w-fit font-medium text-baseBlue"
            to={`/buy/house/${id}`}
          >
            <div className="mx-auto mt-4 h-36 w-48 rounded-xl border border-lightBlue transition-all duration-300  hover:-translate-y-[4px] hover:border-baseBlue">
              <div className="flex h-full items-center justify-center p-2 opacity-60 transition-all duration-300 hover:opacity-100 group-hover:opacity-100 xl:p-4">
                {mainImage ? (
                  <img src={mainImage} alt={mainImage} className="rounded-md" />
                ) : (
                  <ClipLoader size={20} className="dark:text-white" />
                )}
              </div>
            </div>
          </Link>
        )}

        {estate && (
          <m.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8 dark:text-white"
          >
            Check{" "}
            {estate?.id ? (
              <Link
                className="font-medium text-baseBlue"
                to={`/buy/house/${id}`}
              >
                it
              </Link>
            ) : (
              <Link className="font-medium text-baseBlue" to={`/buy`}>
                it
              </Link>
            )}{" "}
            now
          </m.p>
        )}
      </div>
    </div>
  );
}
