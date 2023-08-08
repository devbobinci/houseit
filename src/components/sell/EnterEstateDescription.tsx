import Checkmark from "../estate-page/Checkmark";

type Props = {
  estateDescription: string;
  setEstateDescription: React.Dispatch<React.SetStateAction<string>>;
};

export default function EnterEstateDescription({
  estateDescription,
  setEstateDescription,
}: Props) {
  return (
    <div className="my-4">
      <h3 className="mb-2 flex items-center text-lg font-medium transition-all duration-300 dark:text-white">
        {" "}
        Enter house description
        {estateDescription?.length < 50 ? (
          <span className="text-red-500">*</span>
        ) : (
          <div className="mb-1">
            <Checkmark size={4} />
          </div>
        )}
      </h3>
      <div>
        <textarea
          placeholder="This house is really big and fancy..."
          value={estateDescription || ""}
          onChange={(e) => setEstateDescription(e.target.value)}
          className="hover: h-40 w-full rounded-md border border-neutral-300 p-2 text-neutral-600 shadow-sm outline-2 outline-baseBlue transition-all duration-200 placeholder:text-gray-300 hover:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 xl:p-4"
        ></textarea>
      </div>
    </div>
  );
}
