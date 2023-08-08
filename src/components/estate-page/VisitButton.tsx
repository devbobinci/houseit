import { Dispatch, useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import ClipLoader from "react-spinners/ClipLoader";

import { useUserPanelContext } from "../../context/ToggleUserPanel";
import { getBookingStatus } from "../../utils/getBookingStatus";
import { formatCurrency } from "../../utils/formatCurrency";
import { getBookedVisit } from "../../utils/getBookedVisit";

import "../../styles/dark-theme-bg.css";

type Props = {
  confirmVisit: boolean;
  bookedHouse: string | undefined;
  price: number;
  setToggleCancel: Dispatch<React.SetStateAction<boolean>>;
  setToggleVisitation: Dispatch<React.SetStateAction<boolean>>;
  houseId: string;
};

export default function VisitButton({
  confirmVisit,
  bookedHouse,
  price,
  setToggleCancel,
  setToggleVisitation,
  houseId,
}: Props) {
  const [user, loading] = useAuthState(auth);
  const { setToggleUserPanel } = useUserPanelContext();

  const [visitDate, setVisitDate] = useState<Date | undefined>();

  useEffect(() => {
    checkHouseVisit();
  }, [bookedHouse]);

  async function checkHouseVisit() {
    const bookedVisitDate = await getBookedVisit(user, houseId);
    bookedVisitDate && setVisitDate(bookedVisitDate?.visitDate);
  }

  return (
    <div className="relative flex items-center justify-between">
      <div className="flex items-center gap-1">
        {!confirmVisit ? (
          <button
            onClick={() =>
              user ? setToggleVisitation(true) : setToggleUserPanel(true)
            }
            className="text-md rounded-full border-2 border-indigo-500 px-5 py-2.5 font-medium text-indigo-500 transition-all duration-300 hover:bg-indigo-500 hover:text-white md:text-lg"
          >
            {getBookingStatus(bookedHouse, loading, user, confirmVisit)}
            {loading && <ClipLoader size={10} color="blue" />}
          </button>
        ) : (
          <button
            onClick={() => setToggleCancel(true)}
            className="group flex items-center justify-center gap-2 rounded-full border-2 border-red-500/10 bg-red-500/70 px-4 py-2 text-lg text-white transition-all duration-300 hover:bg-red-500/90"
          >
            Cancel visit
          </button>
        )}
      </div>

      <h3 className="faded text-2xl font-medium dark:text-white md:text-3xl">
        {formatCurrency(price)}
      </h3>
      {bookedHouse && (
        <span className="faded absolute -bottom-5 left-2 text-xs opacity-50 dark:text-gray-100 md:bottom-1/2 md:left-36 md:translate-y-1/2">
          {visitDate?.toString()}
        </span>
      )}
    </div>
  );
}
