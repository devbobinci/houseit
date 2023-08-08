import { useState } from "react";

import Navbar from "./components/Navbar";
import Pages from "./components/Pages";
import { UserPanelContextProvider } from "./context/ToggleUserPanel";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div className={darkMode ? `dark` : ""}>
      <UserPanelContextProvider>
        <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
        <Pages />
      </UserPanelContextProvider>
    </div>
  );
}
