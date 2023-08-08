import { useState } from "react";

import Checkmark from "./Checkmark";

import { auth } from "../../utils/firebase";
import { endOfTheYear } from "../../utils/time-deadline";
import { addVistIntoDatabase } from "../../utils/addVistInDb";

import { useAuthState } from "react-firebase-hooks/auth";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, subDays, getDay, addDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import "../../styles/calendar.scss";

type Props = {
  houseId: string;
  setToggleVisitation: React.Dispatch<React.SetStateAction<boolean>>;
  confirmVisit: boolean;
  setConfirmVisit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SelectDate({
  setToggleVisitation,
  houseId,
  confirmVisit,
  setConfirmVisit,
}: Props) {
  const [startDate, setStartDate] = useState<Date>();
  const [user] = useAuthState(auth);

  function handleVisitConfirm() {
    if (startDate) {
      setConfirmVisit(true);
      addVistIntoDatabase(startDate, houseId, user);
    }

    setTimeout(() => {
      setToggleVisitation(false);
    }, 2500);
  }

  return (
    <div className="pb-16 pt-12">
      <h2 className="pb-4 text-center font-lobster text-3xl font-medium dark:text-white">
        {!confirmVisit && "Book a visitation"}
      </h2>

      <div className="flex h-full w-full flex-col items-center justify-center">
        {!confirmVisit && (
          <>
            <div className="calendar-container">
              <DatePicker
                selected={startDate}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeFormat="HH:mm"
                onChange={(date: Date) => setStartDate(date)}
                minDate={subDays(new Date(), 0)}
                maxDate={addDays(new Date(), endOfTheYear())}
                minTime={setHours(setMinutes(new Date(), 0), 10)}
                maxTime={setHours(setMinutes(new Date(), 30), 18)}
                filterDate={(date: Date) =>
                  getDay(date) !== 0 && getDay(date) !== 6
                }
                filterTime={(time) =>
                  new Date().getTime() < new Date(time).getTime()
                }
                placeholderText="Choose a suitable date"
                timeIntervals={90}
                showTimeSelect
                isClearable
                open
                readOnly
                className="w-full rounded-md text-white dark:bg-transparent"
                id="calendar"
              />
            </div>

            <button
              disabled={!startDate}
              onClick={handleVisitConfirm}
              className="rounded-full bg-baseBlue px-4 py-2 text-white"
            >
              Confirm
            </button>
            <p className="pt-2 text-sm text-black/50 dark:text-white">
              We'll send you a reminder by email
            </p>
          </>
        )}
        {confirmVisit && <Checkmark size={50} />}
      </div>
    </div>
  );
}
