import { getDatabase, ref, set } from "firebase/database";
import { User } from "firebase/auth";

export function addVistIntoDatabase(
  date: Date,
  houseId: string,
  user: User | undefined | null
) {
  const database = getDatabase();

  set(
    ref(
      database,
      `users/${user?.uid.slice(0, 6)}-${user?.email?.replace(
        ".",
        "-"
      )}/bookings/house_${houseId}`
    ),
    {
      houseId: houseId,
      visitDate: date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        weekday: "long",
      }),
    }
  );
}
