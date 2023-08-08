// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArvM-u1xTHnOUnPNn0VgYezXDuQAB5zm0",
  authDomain: "houseit-50f0b.firebaseapp.com",
  databaseURL:
    "https://houseit-50f0b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "houseit-50f0b",
  storageBucket: "houseit-50f0b.appspot.com",
  messagingSenderId: "560936057419",
  appId: "1:560936057419:web:b717077127b0cf9884abce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestoreDb = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
