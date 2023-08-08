import { useRef } from "react";

import { deleteDoc, doc } from "firebase/firestore";
import { firestoreDb } from "../../utils/firebase";

import { motion as m } from "framer-motion";

type Props = {
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  estate: { name: string; id: string };
};

export default function CancelListing({ setDeleteModal, estate }: Props) {
  const cancelListingRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!cancelListingRef.current?.contains(e.target as HTMLDivElement))
      setDeleteModal(false);
    return;
  }

  async function removeLisiting(id: string) {
    await deleteDoc(doc(firestoreDb, "estate", id));
  }

  return (
    <div
      onClick={handleClickOutside}
      className="fixed left-0 top-0 z-[1] flex h-screen w-full items-center justify-center bg-black/30 transition-all duration-200"
    >
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.25, bounce: 0.4 }}
        ref={cancelListingRef}
        className="rounded-xl bg-white p-8 shadow-md dark:bg-[#333]"
      >
        <h2 className="max-w-xs text-center dark:text-white">
          Cancel a listing at <br />
          <span className="font-medium">{estate?.name}</span>?
        </h2>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setDeleteModal(false);
              removeLisiting(estate?.id);
            }}
            className="rounded-full border border-red-500 bg-red-100 px-4 py-2 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white dark:bg-red-200 hover:dark:bg-red-500"
          >
            Remove
          </button>
          <button
            onClick={() => setDeleteModal(false)}
            className="rounded-full border border-baseBlue bg-baseBlue/10 px-4 py-2 text-baseBlue transition-all duration-300 hover:bg-baseBlue hover:text-white"
          >
            Back
          </button>
        </div>
      </m.div>
    </div>
  );
}
