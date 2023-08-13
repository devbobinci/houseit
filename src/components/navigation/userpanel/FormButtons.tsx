import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { motion as m } from "framer-motion";
import { auth } from "../../../utils/firebase";
import { getDatabase, ref, set } from "firebase/database";
import { Dispatch, SetStateAction } from "react";

type Values = {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type Props = {
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setToggleUserPanel: Dispatch<SetStateAction<boolean>>;
  setErrorCount: Dispatch<SetStateAction<number>>;
  setToggleRegisterUser: Dispatch<SetStateAction<boolean>>;
  toggleRegisterUser: boolean;
  errorCount: number;
  values: Values;
};

export default function FormButtons({
  setToggleUserPanel,
  setErrorCount,
  setErrorMessage,
  toggleRegisterUser,
  errorCount,
  setToggleRegisterUser,
  values,
}: Props) {
  async function registerUser() {
    const { name, surname, email, password, passwordConfirmation } = values;

    if (!name || !surname || !email || !password || !passwordConfirmation)
      return;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const db = getDatabase();
        const user = userCredential.user;

        //adding to db
        set(
          ref(db, `users/${user?.uid.slice(0, 6)}-${email.replace(".", "-")}`),
          {
            email: email,
            name: name,
            surname: surname,
          }
        );

        setToggleUserPanel(false);
      })
      .catch((err) => {
        const errorMessage = err.message;

        if (errorMessage.includes("email-already-in-use"))
          setErrorMessage("Email already in use");

        console.log("Failed to create new user" + err);
      });
  }

  async function loginUser() {
    const { email, password } = values;
    if (!email || !password) return;

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setToggleUserPanel(false);
      })
      .catch((error) => {
        setErrorCount((prev) => prev + 1);
        const errorMessage = error.message;

        console.log(errorMessage);
        if (errorMessage.includes("wrong-password"))
          setErrorMessage("Wrong Password");
        else if (errorMessage.includes("user-not-found"))
          setErrorMessage("Wrong e-mail address");
      });
  }

  return (
    <m.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="space-y-6 text-center"
    >
      <button
        onClick={() => (toggleRegisterUser ? registerUser() : loginUser())}
        type="submit"
        className="full rounded-full border border-black px-4 py-1.5 hover:border-baseBlue hover:text-baseBlue"
      >
        {!toggleRegisterUser ? "Login" : "Register"}
      </button>
      <div>
        {errorCount >= 2 && (
          <m.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="mb-2 text-center"
          >
            <button className="text-sm hover:underline">
              Forgot password?
            </button>
          </m.div>
        )}
        <p className="text-xs md:text-sm">
          {!toggleRegisterUser
            ? "You don't have an account?"
            : "Already have an account?"}
        </p>
        <button
          type="button"
          onClick={() => setToggleRegisterUser((prev) => !prev)}
          className="text-xs font-medium text-baseBlue hover:underline md:text-sm"
        >
          {!toggleRegisterUser ? "Create one" : "Log in"}
        </button>
      </div>
    </m.div>
  );
}
