import { child, get, getDatabase, ref } from "firebase/database";
import { User } from "firebase/auth";

const dbRef = ref(getDatabase());

export const getBookings = async (user: User | null | undefined) =>
  await get(
    child(
      dbRef,
      `users/${user?.uid.slice(0, 6)}-${user?.email?.replace(
        ".",
        "-"
      )}/bookings`
    )
  ).then((snapshot) => {
    if (snapshot.exists()) return snapshot.val();
  });
