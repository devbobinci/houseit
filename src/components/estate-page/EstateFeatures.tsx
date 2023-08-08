import { motion as m } from "framer-motion";

type Props = {
  premises: {
    beds: number;
    area: number;
    baths: number;
  };
};

export default function EstateFeatures({ premises }: Props) {
  const features = [
    { name: "Beds", amount: premises?.beds },
    { name: "Baths", amount: premises?.baths },
    { name: "m²", amount: premises?.area },
  ];

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.35 }}
      className="my-4 flex items-center justify-center gap-8 dark:text-white md:justify-start xl:my-8"
    >
      {features.map((feature, i) => (
        <div
          key={feature.name}
          className="flex items-center gap-2 text-sm md:text-base"
        >
          <span className="font-medium ">{feature.amount}</span>
          <span className="text-gray-400">{feature.name}</span>
          {i <= 1 && (
            <span className="ml-5 inline-block h-full w-0.5 text-gray-300">
              |
            </span>
          )}
        </div>
      ))}
    </m.div>
  );
}
