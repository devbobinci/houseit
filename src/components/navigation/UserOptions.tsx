import { useRef } from "react";
import { Link } from "react-router-dom";

import { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";

import { BsCardList } from "@react-icons/all-files/bs/BsCardList";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { MdOutlineWavingHand } from "react-icons/md";
import { motion as m, AnimatePresence } from "framer-motion";

import styled from "styled-components";

type Props = {
  userPanel: boolean;
  setUserPanel: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null | undefined;
};

export default function UserOptions({ userPanel, setUserPanel, user }: Props) {
  const userPanelRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!userPanelRef.current?.contains(e.target as HTMLDivElement))
      closeUserPanel();
  }

  function closeUserPanel() {
    setUserPanel((prev) => !prev);
  }

  return (
    <AnimatePresence mode="wait">
      {userPanel && user && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClickOutside}
            className="fixed left-0 top-0 -z-[1] h-full w-full bg-black/20"
          />
          <m.div
            ref={userPanelRef}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute right-3 top-16 flex flex-col items-center md:items-end"
          >
            <Triangle className="h-3 w-4 bg-lightBlue transition-all duration-200 dark:bg-[#444] md:mr-4" />
            <div className="min-w-[160px] rounded-md bg-white p-4 transition-all duration-200 dark:bg-[#444] dark:text-white md:min-w-[180px]">
              <ul className="space-y-3">
                <Link
                  to={`/listings/${user?.uid}`}
                  onClick={closeUserPanel}
                  className="flex items-center gap-2 text-sm text-neutral-600 hover:underline dark:text-gray-300 dark:hover:text-white md:text-base"
                >
                  <BsCardList className="text-lg" />
                  My Lisitings
                </Link>
                <Link
                  to={`/favorites/${user?.uid}`}
                  onClick={closeUserPanel}
                  className="flex items-center gap-2 text-sm text-neutral-600 hover:underline dark:text-gray-300 dark:hover:text-white md:text-base"
                >
                  <AiOutlineStar className="text-lg" />
                  My Favorites
                </Link>
                <li
                  onClick={closeUserPanel}
                  className="text-sm text-neutral-600 hover:underline dark:text-gray-300 dark:hover:text-white md:text-base"
                >
                  <span
                    onClick={() => signOut(auth)}
                    className=" flex items-center gap-2 "
                  >
                    <MdOutlineWavingHand />
                    Sign Out
                  </span>
                </li>
              </ul>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}

const Triangle = styled.div`
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`;
