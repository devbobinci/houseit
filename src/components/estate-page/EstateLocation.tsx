import { VscLocation } from "@react-icons/all-files/vsc/VscLocation";
import { motion as m } from "framer-motion";

type Props = {
  address: {
    city: string;
    street: string;
    number: number;
    country: string;
  };
};

export default function EstateLocation({ address }: Props) {
  const { country, city, street, number } = address || {};

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.25 }}
      className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400 md:text-base"
    >
      <VscLocation className="text-xl" />{" "}
      <p className="underline">
        {country}, {city}, {street} St {number}
      </p>
    </m.div>
  );
}
