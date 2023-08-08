import Checkmark from "../estate-page/Checkmark";

import { Country, City } from "country-state-city";
import Select from "react-select";
import { motion as m } from "framer-motion";

import "../../styles/react-select.css";

export type option = {
  value: {
    isoCode: string;
  };
  label: string;
} | null;

export type cityOption = {
  value: {
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

type Props = {
  selectedCity: cityOption;
  selectedCountry: option;
  setSelectedCity: React.Dispatch<React.SetStateAction<cityOption>>;
  setSelectedCountry: React.Dispatch<React.SetStateAction<option>>;
};

export default function CountryPicker({
  selectedCountry,
  selectedCity,
  setSelectedCity,
  setSelectedCountry,
}: Props) {
  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
  };

  const options = Country.getAllCountries().map((country) => ({
    value: {
      isoCode: country.isoCode,
    },
    label: country.name,
  }));

  const cityOptions = (country: option) =>
    City.getCitiesOfCountry(country!.value.isoCode)?.map((state) => ({
      value: {
        countryCode: state.countryCode,
        name: state.name,
        stateCode: state.stateCode,
      },
      label: state.name,
    }));

  return (
    <div className="space-y-4">
      <m.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <label
          htmlFor="title"
          className="mb-1 flex transition-all duration-300 dark:text-white"
        >
          Country
          {!selectedCountry ? (
            <span className="text-red-500">*</span>
          ) : (
            <Checkmark size={4} />
          )}
        </label>
        <Select
          required
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
          placeholder={"Select country..."}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "#60B7FF" : "",
            }),
          }}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </m.div>

      {selectedCountry && (
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <label
            htmlFor="title"
            className="mb-1 flex transition-all duration-300 dark:text-white"
          >
            City
            {!selectedCity ? (
              <span className="text-red-500">*</span>
            ) : (
              <Checkmark size={4} />
            )}
          </label>
          <Select
            required
            value={selectedCity}
            onChange={handleSelectedCity}
            options={cityOptions(selectedCountry)}
            placeholder={"Select city..."}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#60B7FF" : "",
              }),
            }}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </m.div>
      )}
    </div>
  );
}
