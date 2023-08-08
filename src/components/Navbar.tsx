import { useEffect, useState } from "react";

import UserPanel from "./navigation/UserPanel";
import DesktopNav from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import DarkMode from "./navigation/DarkMode";
import UserOptions from "./navigation/UserOptions";

import { useUserPanelContext } from "../context/ToggleUserPanel";

import { auth } from "../utils/firebase";
import { getUserData } from "../utils/getUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { AnimatePresence, motion as m } from "framer-motion";

type Props = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ darkMode, setDarkMode }: Props) {
  const [user, loading] = useAuthState(auth);
  const { toggleUserPanel, setToggleUserPanel } = useUserPanelContext();
  const [username, setUsername] = useState("");
  const [userPanel, setUserPanel] = useState<boolean>(false);

  useEffect(() => {
    async function getUser() {
      const userData = await getUserData(user);
      const username = `${userData?.name} ${userData?.surname}`;
      setUsername(username);
    }
    getUser();
  }, [user, loading]);

  return (
    <nav className="relative">
      <m.div
        layout
        className="fixed left-0 top-0 z-10 h-20 w-full bg-white shadow-md transition-all duration-300 dark:bg-[#222] 2xl:h-24"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between p-4 xl:px-0">
          <DesktopNav darkMode={darkMode} />

          <div className="flex items-center gap-4">
            {/* darkMode */}
            <div className="flex">
              <DarkMode setDarkMode={setDarkMode} darkMode={darkMode} />
            </div>

            {/* UserPanel */}
            <div className="relative flex items-center gap-4">
              <UserOptions
                userPanel={userPanel}
                setUserPanel={setUserPanel}
                user={user}
              />

              {user ? (
                <>
                  <p className="text-sm font-medium text-black dark:text-white md:mr-0 md:hidden">
                    {username.slice(0, 3) + ".."}
                  </p>
                  <p className="hidden text-sm font-medium text-black dark:text-white md:inline">
                    {username}
                  </p>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setToggleUserPanel(true)}
                    className="mr-16 rounded-full border border-black px-4 py-2 transition-all duration-300 hover:border-baseBlue hover:text-baseBlue dark:border-white dark:text-white dark:hover:border-baseBlue dark:hover:text-baseBlue md:mr-0"
                  >
                    Log In
                  </button>
                </>
              )}

              {user && (
                <img
                  onClick={() => setUserPanel((prev) => !prev)}
                  src="/navigation/default-user-icon.jpg"
                  className="mr-14 h-10 w-10 cursor-pointer rounded-full bg-lightBlue md:mr-0"
                  alt="ziomeczek fotka"
                />
              )}

              <div className="right-0">
                <MobileNav />
              </div>

              {toggleUserPanel && (
                <div
                  onClick={() => setToggleUserPanel(false)}
                  className="fixed left-0 top-0 z-0 h-screen w-full bg-black/20 transition-all duration-200"
                />
              )}

              <AnimatePresence mode="wait">
                {toggleUserPanel && <UserPanel />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </m.div>
    </nav>
  );
}
