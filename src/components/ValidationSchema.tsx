import YupPassword from "yup-password";
import * as Yup from "yup";

export default function ValidationSchema() {
  YupPassword(Yup);

  let validationSchema;
  validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Wrong email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "At least 8 characters required")
      .minLowercase(1, "At least 1 lowecase required")
      .minUppercase(1, "At least 1 uppercase required")
      .minNumbers(1, "At least 1 number")
      .minSymbols(1, "At least 1 special symbol"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password"),
  });

  return validationSchema;
}
