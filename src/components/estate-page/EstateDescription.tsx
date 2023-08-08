import FeatureItem from "./FeatureItem";

type Props = {
  features: string[];
  description: string;
};

export default function EstateDescription({ features, description }: Props) {
  return (
    <div className="max-w-full">
      <div>
        <h2 className="text-lg font-medium dark:text-white md:text-xl">
          What you'll find here
        </h2>

        <ul className="my-4 grid grid-cols-2 gap-1 md:grid-cols-4 xl:grid-cols-5">
          {features &&
            features.map((feature) => (
              <FeatureItem key={feature} feature={feature} />
            ))}
        </ul>
      </div>

      <hr className="mt-8" />

      <div className="break-words py-8 dark:text-white">
        <h2 className="pb-6 text-lg font-medium xl:text-xl">
          About this house
        </h2>
        <p className="text-neutral-500 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}
