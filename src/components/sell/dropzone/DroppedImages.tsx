import { useEffect } from "react";
import { motion as m, AnimatePresence } from "framer-motion";

type Props = {
  selectedImages: File[];
  mainImageSrc: File;
  setMainImageSrc: React.Dispatch<React.SetStateAction<File>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function DroppedImages({
  selectedImages,
  mainImageSrc,
  setMainImageSrc,
  setSelectedImages,
}: Props) {
  function deleteImage(image: File, index: number) {
    setSelectedImages([
      ...selectedImages.filter((img) => img.name !== image.name),
    ]);

    const isMainImage = image.name === mainImageSrc?.name;
    const firstImage = index === 0;
    const lastImage = index === selectedImages.length - 1;
    const onlyImage = selectedImages.length === 1;

    const setMainImage = (idx: number) => {
      return selectedImages.find(
        (image) => selectedImages.indexOf(image) === idx
      );
    };

    if (isMainImage) {
      if (firstImage) {
        setMainImageSrc(setMainImage(index + 1)!);
      } else if (lastImage) {
        setMainImageSrc(setMainImage(index - 1)!);
      } else if (onlyImage) {
        setMainImageSrc(setMainImage(0)!);
      } else {
        console.log("this");
        if (!lastImage && !firstImage) {
          setMainImageSrc(setMainImage(index - 1)!);
        } else {
          setMainImageSrc(setMainImage(index + 1)!);
        }
      }
    }
  }

  useEffect(() => {
    if (selectedImages.length === 0) setMainImageSrc(undefined!);
  }, [selectedImages]);

  const itemVaritans = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="my-8 flex flex-wrap gap-2 md:gap-4">
      {selectedImages.length > 0 &&
        selectedImages.map((image, index) => (
          <AnimatePresence key={image?.name} mode="wait">
            <m.div
              key={image?.name}
              variants={itemVaritans}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="relative cursor-pointer "
            >
              <span
                onClick={() => deleteImage(image, index)}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border bg-white text-xl"
              >
                &times;
              </span>
              <m.img
                onClick={() => setMainImageSrc(image)}
                src={`${URL.createObjectURL(image)}`}
                alt={image?.name}
                className={`h-[72px] w-[72px] rounded-md border md:h-20 md:w-20 xl:h-24 xl:w-24 ${
                  image?.name === mainImageSrc?.name
                    ? "border-2 border-baseBlue"
                    : ""
                }`}
              />
              {image?.name === mainImageSrc?.name && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white/20 p-2 text-center text-sm font-medium text-white backdrop-blur-sm">
                  Main photo
                </span>
              )}
            </m.div>
          </AnimatePresence>
        ))}
    </div>
  );
}
