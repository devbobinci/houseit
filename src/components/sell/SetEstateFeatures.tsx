import Checkmark from "../estate-page/Checkmark";
import FeatureItem, { icons } from "../estate-page/FeatureItem";

type Props = {
  setSelectedFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFeatures: string[];
};

export default function SelectEstateFeatures({
  setSelectedFeatures,
  selectedFeatures,
}: Props) {
  const features = icons;

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    feature: string
  ) {
    if (e.target.checked) {
      setSelectedFeatures((prevFeatures) => [...prevFeatures, feature]);
    } else {
      const duplicatedFeature = selectedFeatures.filter((f) =>
        f === feature ? false : true
      );
      setSelectedFeatures([...duplicatedFeature]);
    }
  }

  return (
    <div className="my-6">
      <h3 className="mb-2 flex items-center text-lg font-medium transition-all duration-300 dark:text-white">
        Select house features
        {selectedFeatures.length < 3 ? (
          <span className="text-red-500">*</span>
        ) : (
          <div className="mb-1">
            <Checkmark size={4} />
          </div>
        )}
      </h3>

      <label htmlFor="title" className="mb-1 flex"></label>

      <div className="grid grid-cols-2">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-center gap-2 space-y-2">
            <input
              onChange={(e) => handleInputChange(e, feature.id)}
              type="checkbox"
              id={feature.id}
              className="accent-baseBlue"
            />
            <label
              htmlFor={feature.id}
              className="select-none transition-all duration-300 hover:text-black/70 dark:text-white"
            >
              <FeatureItem feature={feature.id} />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
