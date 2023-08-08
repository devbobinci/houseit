import { User } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";

const db = getDatabase();
const dbRef = ref(db);

export const getUserData = async (user: User | null | undefined) =>
  await get(
    child(
      dbRef,
      `users/${user?.uid.slice(0, 6)}-${user?.email?.replace(".", "-")}`
    )
  )
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
    })
    .catch((error) => {
      return console.error(error);
    });
