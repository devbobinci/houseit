import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import {
  getFavorites,
  removeFavorite,
  setFavorite,
} from "../../utils/favoriteEstate";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";

type Props = {
  houseId: string;
};

export default function FavoriteEstate({ houseId }: Props) {
  const [user] = useAuthState(auth);
  const [toggleStar, setToggleStar] = useState(false);

  async function checkFavorites() {
    const favoriteHouse = await getFavorites(user, houseId);

    if (favoriteHouse) {
      setToggleStar(true);
    } else {
      setToggleStar(false);
    }
  }

  useEffect(() => {
    if (user) checkFavorites();
  }, [user]);

  return (
    <div
      onClick={() => {
        setToggleStar((prev) => !prev);
        !toggleStar
          ? setFavorite(user, houseId)
          : removeFavorite(user, houseId);
      }}
      className="group right-4 top-4 cursor-pointer rounded-full bg-gray-200/60 p-2.5 backdrop-blur-sm"
    >
      {!toggleStar ? (
        <AiOutlineStar className="text-xl text-white transition-all duration-300 hover:rotate-45 group-hover:text-yellow-300" />
      ) : (
        <AiFillStar className="text-xl text-yellow-400 transition-all duration-300 hover:-rotate-45" />
      )}
    </div>
  );
}
