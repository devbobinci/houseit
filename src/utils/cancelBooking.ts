import { User } from "firebase/auth";
import { getDatabase, ref, remove } from "firebase/database";

export function handleBookingCancel(user: User | null | undefined, id: string) {
  const database = getDatabase();
  remove(
    ref(
      database,
      `users/${user?.uid.slice(0, 6)}-${user?.email?.replace(
        ".",
        "-"
      )}/bookings/house_${id}`
    )
  );
}
