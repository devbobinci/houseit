import { useRef } from "react";
import { handleBookingCancel } from "../../utils/cancelBooking";
import { getBookedVisit } from "../../utils/getBookedVisit";

import { User } from "firebase/auth";
import { motion as m } from "framer-motion";

type Props = {
  setToggleCancel: React.Dispatch<React.SetStateAction<boolean>>;
  bookedVisitDate: string | undefined;
  houseId: string;
  user: User | null | undefined;
  confirmVisit: boolean;
  setConfirmVisit: React.Dispatch<React.SetStateAction<boolean>>;
  bookedHouse: string | undefined;
};

export default function CancelVisitation({
  setToggleCancel,
  bookedVisitDate,
  houseId,
  user,
  setConfirmVisit,
  bookedHouse,
}: Props) {
  const cancelVisitRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!cancelVisitRef.current?.contains(e.target as HTMLDivElement))
      setToggleCancel(false);
    return;
  }

  return (
    <div
      onClick={handleClickOutside}
      className="fixed left-0 top-0 z-[1] flex h-screen w-full items-center justify-center bg-black/30 transition-all duration-200"
    >
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.2, bounce: 0.5 }}
        ref={cancelVisitRef}
        className="rounded-xl bg-white p-8 shadow-md dark:bg-[#333]"
      >
        <h2 className="max-w-xs text-center dark:text-white">
          Cancel a visitation at <br />
          <span className="font-medium">{bookedVisitDate}</span>?
        </h2>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => {
              getBookedVisit(user, houseId);
              setToggleCancel(false);
              handleBookingCancel(user, houseId);
              bookedHouse && setConfirmVisit(false);
            }}
            className="rounded-full border border-red-500 bg-red-100 px-4 py-2 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white dark:bg-red-300 hover:dark:bg-red-500"
          >
            Remove
          </button>
          <button
            onClick={() => setToggleCancel(false)}
            className="rounded-full border border-baseBlue bg-baseBlue/10 px-4 py-2 text-baseBlue transition-all duration-300 hover:bg-baseBlue hover:text-white"
          >
            Back
          </button>
        </div>
      </m.div>
    </div>
  );
}
