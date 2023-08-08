import { RefObject, useState } from "react";

import { motion as m } from "framer-motion";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import { AiOutlineEyeInvisible } from "@react-icons/all-files/ai/AiOutlineEyeInvisible";

type Props = {
  type: string;
  fieldFor: string;
  labelValue: string;
  inputRef: RefObject<HTMLInputElement>;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  labelRef: RefObject<HTMLLabelElement>;
  handleBlur: (e: React.ChangeEvent<any>) => void;
  errors: string | undefined;
  touched: boolean | undefined;
  errorBox?: boolean;
};

export default function Field({
  type,
  fieldFor,
  labelValue,
  inputRef,
  value,
  onChange,
  labelRef,
  handleBlur,
  errors,
  touched,
  errorBox,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  function handleInputFocus(
    label: RefObject<HTMLSpanElement>,
    input: RefObject<HTMLInputElement>
  ) {
    if (input) {
      label.current?.classList.add("toggle-input");
      label.current?.classList.remove("default-label-position");
    }
  }

  function handleInputBlur(label: RefObject<HTMLSpanElement>, input: string) {
    if (!input) {
      label.current?.classList.remove("toggle-input");
      label.current?.classList.add("default-label-position");
    }
  }

  return (
    <>
      <m.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.25, type: "spring" }}
        className="relative"
      >
        <input
          ref={inputRef}
          value={value}
          onChange={onChange}
          onFocus={() => handleInputFocus(labelRef, inputRef)}
          onBlur={(e) => {
            handleInputBlur(labelRef, value);
            handleBlur(e);
          }}
          type={showPassword ? "text" : type}
          id={fieldFor}
          autoComplete="on"
          className={`input-base  ${
            errors && touched
              ? "border-red-500 outline-red-500"
              : "hover:border-lightBlue"
          }`}
        />

        <label
          ref={labelRef}
          htmlFor={fieldFor}
          className="label-base default-label-position"
        >
          {labelValue}
        </label>
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-200 hover:text-gray-300"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {type === "password" && value.length > 4 && (
            <>{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</>
          )}
        </span>
      </m.div>
      {errorBox && errors && touched && (
        <p className="pl-2 text-xs font-medium text-red-500">{errors}</p>
      )}
    </>
  );
}
