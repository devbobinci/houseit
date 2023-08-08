import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestoreDb, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { User } from "firebase/auth";

export type Listing = {
  id?: string;
  address: {
    country: string | undefined;
    city: string | undefined;
    street: string;
    number: number | undefined;
  };
  features: string[];
  premises: {
    baths: number | undefined;
    beds: number | undefined;
    area: number | undefined;
  };
  description: string;
  price: number | undefined;
  userId?: string;
};

export const uploadEstate = async (
  selectedImages: File[],
  newListing: Listing,
  user: User | null | undefined,
  mainImage: File
) => {
  const docRef = await addDoc(collection(firestoreDb, "estate"), {
    userId: user?.uid,
    timestamp: serverTimestamp(),
    ...newListing,
  });
  const mainImageRef = ref(storage, `estate/${docRef.id}/${mainImage.name}`);

  uploadBytes(mainImageRef, mainImage as File).then(async () => {
    const downloadURL = await getDownloadURL(mainImageRef);
    await updateDoc(doc(firestoreDb, "estate", docRef.id), {
      mainImage: downloadURL,
    });
  });

  const uploadedImages = await Promise.all(
    selectedImages.map((image) => {
      const imageRef = ref(storage, `estate/${docRef.id}/${image?.name}`);

      uploadBytes(imageRef, image).then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(firestoreDb, "estate", docRef.id), {
          images: arrayUnion(downloadURL),
        });
      });
    })
  );
  return uploadedImages;
};
