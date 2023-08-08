import { useState } from "react";
import RootLayout from "../layout/RootLayout";
import SearchMenu from "../components/buy/SearchMenu";
import Estates from "../components/buy/Estates";
import { Estate } from "../../typings";

import { motion as m } from "framer-motion";

import "../styles/dark-theme-bg.css";

export default function Buy() {
  const [filtered, setFiltered] = useState<Estate[]>([]);
  const [term, setTerm] = useState<string>("");
  const [userEstates, setUserEstates] = useState<Estate[]>([]);

  const [filtering, setFiltering] = useState<string>("");

  return (
    <div className="dark-theme-bg min-h-screen">
      <RootLayout>
        <m.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -15 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
        >
          <SearchMenu
            term={term}
            setTerm={setTerm}
            setFiltered={setFiltered}
            filtered={filtered}
            setUserEstates={setUserEstates}
            userEstates={userEstates}
            setFiltering={setFiltering}
            filtering={filtering}
          />

          <Estates
            setTerm={setTerm}
            filtered={filtered}
            setFiltered={setFiltered}
            userEstates={userEstates}
          />
        </m.div>
      </RootLayout>
    </div>
  );
}
