import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Field from "./Field";
import { useFormik } from "formik";
import RegisterValidationSchema from "../../RegisterValidationSchema";
import ValidationSchema from "../../ValidationSchema";
import FormButtons from "./FormButtons";

type Props = {
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setToggleUserPanel: Dispatch<SetStateAction<boolean>>;
};

export default function Form({ setErrorMessage, setToggleUserPanel }: Props) {
  const [toggleRegisterUser, setToggleRegisterUser] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: toggleRegisterUser
      ? RegisterValidationSchema()
      : ValidationSchema(),
    onSubmit: () => {},
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = formik;

  const nameLabelRef = useRef<HTMLLabelElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const surnameLabelRef = useRef<HTMLLabelElement>(null);
  const surnameInputRef = useRef<HTMLInputElement>(null);

  const emailLabelRef = useRef<HTMLLabelElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const passwordLabelRef = useRef<HTMLLabelElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const confirmPasswordLabelRef = useRef<HTMLLabelElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const allInputs = [
    nameInputRef.current,
    surnameInputRef.current,
    emailInputRef.current,
    passwordInputRef.current,
    confirmPasswordInputRef.current,
  ];

  useEffect(() => {
    resetForm();

    allInputs.map((input) => {
      input?.nextElementSibling?.classList.add("default-label-position");
      input?.nextElementSibling?.classList.remove("toggle-input");
    });

    setErrorMessage("");
    setErrorCount(0);
  }, [toggleRegisterUser]);

  setTimeout(() => {
    allInputs.map((input) => {
      if (input?.matches("*:-webkit-autofill")) {
        input.nextElementSibling?.classList.remove("default-label-position");
        input.nextElementSibling?.classList.add("toggle-input");
      }
    });
  }, 5);

  return (
    <div className="overflow-x-hidden">
      <form className="mt-8" name="user" onSubmit={handleSubmit}>
        {toggleRegisterUser && (
          <>
            {/* Register Name Input */}
            <div className="flex justify-between gap-2">
              <Field
                type="text"
                fieldFor="name"
                inputRef={nameInputRef}
                labelRef={nameLabelRef}
                labelValue={"Name"}
                value={values.name}
                onChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.name}
                touched={touched.name}
              />
              {/* Surname Input */}
              <Field
                type="text"
                fieldFor="surname"
                inputRef={surnameInputRef}
                labelRef={surnameLabelRef}
                labelValue={"Surname"}
                value={values.surname}
                onChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.surname}
                touched={touched.surname}
              />
            </div>
            <div className="flex justify-between gap-2 px-2">
              {errors.name && touched.name && (
                <p className="text-xs font-medium text-red-500">
                  {errors.name}
                </p>
              )}
              {errors.surname && touched.surname && (
                <p className="text-xs font-medium text-red-500">
                  {errors.surname}
                </p>
              )}
            </div>
            <br />
          </>
        )}
        {/* Login: Email Input */}
        <Field
          type="text"
          fieldFor="email"
          inputRef={emailInputRef}
          labelRef={emailLabelRef}
          labelValue={"Email "}
          value={values.email}
          onChange={handleChange}
          handleBlur={handleBlur}
          errors={errors.email}
          touched={touched.email}
          errorBox={true}
        />
        <br />
        <Field
          type="password"
          fieldFor="password"
          inputRef={passwordInputRef}
          labelRef={passwordLabelRef}
          labelValue={"Password"}
          value={values.password}
          onChange={handleChange}
          handleBlur={handleBlur}
          errors={errors.password}
          touched={touched.password}
          errorBox={true}
        />
        <br />
        {toggleRegisterUser && values.password.length >= 3 && (
          <>
            <Field
              type="password"
              fieldFor="passwordConfirmation"
              inputRef={confirmPasswordInputRef}
              labelRef={confirmPasswordLabelRef}
              labelValue={"Confirm password"}
              value={values.passwordConfirmation}
              onChange={handleChange}
              handleBlur={handleBlur}
              errors={errors.passwordConfirmation}
              touched={touched.passwordConfirmation}
              errorBox={true}
            />
            <br />
          </>
        )}

        {/* // Form Buttons */}

        <FormButtons
          setToggleUserPanel={setToggleUserPanel}
          setToggleRegisterUser={setToggleRegisterUser}
          setErrorCount={setErrorCount}
          setErrorMessage={setErrorMessage}
          toggleRegisterUser={toggleRegisterUser}
          errorCount={errorCount}
          values={values}
        />
      </form>
    </div>
  );
}
