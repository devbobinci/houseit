import { User } from "firebase/auth";

export function getBookingStatus(
  bookedHouse: string | undefined,
  loading: boolean,
  user: User | null | undefined,
  confirmVisit: boolean
) {
  let info;

  if (bookedHouse) {
    info = "Book a visit";
  } else if (!loading && !confirmVisit) {
    info = "Book a visit";
  } else if (!user && !loading && !confirmVisit) {
    info = "Book a visit";
  } else if (bookedHouse && user && !loading) {
    info = "Book a visit";
  } else if (user) {
    info = "";
  }

  return info;
}
