import { User } from "firebase/auth";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";

const database = getDatabase();

export function setFavorite(user: User | null | undefined, houseId: string) {
  set(
    ref(
      database,
      `users/${user?.uid.slice(0, 6)}-${user?.email?.replace(
        ".",
        "-"
      )}/favorites/house_${houseId}`
    ),
    houseId
  );
}

export function removeFavorite(user: User | null | undefined, houseId: string) {
  remove(
    ref(
      database,
      `users/${user?.uid.slice(0, 6)}-${user?.email?.replace(
        ".",
        "-"
      )}/favorites/house_${houseId}`
    )
  );
}

const dbRef = ref(database);

export const getFavorites = async (
  user: User | null | undefined,
  houseId: string
) =>
  await get(
    child(
      dbRef,
      `users/${user?.uid.slice(0, 6)}-${user?.email?.replace(
        ".",
        "-"
      )}/favorites/house_${houseId}`
    )
  ).then((snapshot) => {
    if (snapshot.exists()) {
      if (snapshot.val() === houseId) return snapshot.val();
    }
  });

export const getAllFavorites = async (user: User | null | undefined) =>
  await get(
    child(
      dbRef,
      `users/${user?.uid.slice(0, 6)}-${user?.email?.replace(
        ".",
        "-"
      )}/favorites`
    )
  ).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
  });
