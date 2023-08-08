import { User } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";

const dbRef = ref(getDatabase());

export const getBookedVisit = async (
  user: User | null | undefined,
  houseId: string
) =>
  await get(
    child(
      dbRef,
      `users/${user?.uid.slice(0, 6)}-${user?.email?.replace(
        ".",
        "-"
      )}/bookings/house_${houseId}`
    )
  ).then((snapshot) => {
    if (snapshot.exists()) return snapshot.val();
  });
