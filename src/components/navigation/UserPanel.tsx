import { useState } from "react";

import Form from "./userpanel/Form";
import { useUserPanelContext } from "../../context/ToggleUserPanel";

import { motion as m } from "framer-motion";
import { BiMessageRoundedError } from "@react-icons/all-files/bi/BiMessageRoundedError";

import "../../styles/user-panel.css";

export default function UserPanel() {
  const { setToggleUserPanel } = useUserPanelContext();

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <m.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="absolute -left-[100%] top-[160%] z-[] w-[300px] rounded-md border border-gray-300 bg-white p-4 py-8 shadow-xl md:-left-[220%]"
    >
      <div className="triangle absolute -top-6 left-3/4 z-10 h-6 w-4 -translate-x-1/2 bg-white md:left-[90%]" />
      <button
        onClick={() => setToggleUserPanel(false)}
        className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border bg-white/20 text-3xl text-gray-500 backdrop-blur-sm hover:bg-white/40"
      >
        &times;
      </button>
      <m.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 15, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex items-center gap-4"
      >
        <span className="h-[1px] w-full rounded-full bg-gray-100"></span>
        <h3 className="text-lg">Welcome</h3>
        <span className="h-[1px] w-full rounded-full bg-gray-100"></span>
      </m.div>

      {errorMessage && (
        <p className="flex items-center justify-center gap-1 text-sm font-medium text-red-500">
          {errorMessage} <BiMessageRoundedError />
        </p>
      )}

      <Form
        setErrorMessage={setErrorMessage}
        setToggleUserPanel={setToggleUserPanel}
      />
    </m.div>
  );
}
