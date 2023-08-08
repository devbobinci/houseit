import { useState } from "react";
import GallerySlider from "./GallerySlider";
import ClipLoader from "react-spinners/ClipLoader";
import { AnimatePresence, motion as m } from "framer-motion";

type Props = {
  mainImage: string;
  images: string[];
};

export default function EstateGallery({ mainImage, images }: Props) {
  const [toggleSlider, setToggleSlider] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [mainImage, ...images];

  const mainImageIdx = allImages.indexOf(mainImage);

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.15 }}
      className="relative "
    >
      <AnimatePresence mode="wait">
        {toggleSlider && (
          <GallerySlider
            images={allImages}
            setToggleSlider={setToggleSlider}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>

      {/* gallery */}
      <div className="h-[260px] select-none gap-2 md:flex md:h-[350px] lg:h-[480px] xl:h-[600px] xl:min-h-[600px]">
        <div
          onClick={() => {
            setCurrentImageIndex(mainImageIdx);
            setToggleSlider(true);
          }}
          className="relative z-[0] h-full w-full"
        >
          {mainImage ? (
            <img
              src={mainImage}
              alt="main image"
              className="h-full w-full rounded-2xl object-cover transition-all duration-200 hover:cursor-pointer hover:opacity-90 md:rounded-none md:rounded-l-2xl"
            />
          ) : (
            <ClipLoader size={20} />
          )}
          <span className="absolute bottom-2 right-2 cursor-pointer rounded-md bg-white/20 px-2 py-1 text-sm text-white/80 backdrop-blur-sm md:hidden">
            Show all photos
          </span>
        </div>
        {/* side images */}
        <div className="hidden h-full w-1/2 flex-wrap gap-2 md:flex">
          {images.slice(0, 2).map((image) => (
            <div
              key={image}
              className="flex h-[calc(50%-.25rem)] w-full flex-col gap-2"
            >
              {image ? (
                <div
                  onClick={() => {
                    setCurrentImageIndex(images.indexOf(image) + 1);
                    setToggleSlider(true);
                  }}
                  className="h-full"
                >
                  <img
                    src={image}
                    alt="apartment photo"
                    className="h-full w-full object-cover transition-all duration-200 hover:cursor-pointer hover:opacity-90"
                  />
                </div>
              ) : (
                <ClipLoader size={20} />
              )}
            </div>
          ))}
        </div>
        <div className="hidden h-full w-1/2 flex-wrap gap-2 xl:flex">
          {images.slice(2, 4).map((image, idx) => (
            <div
              key={image}
              className="flex h-[calc(50%-.25rem)] w-full flex-col gap-2"
            >
              <div
                onClick={() => {
                  setCurrentImageIndex(images.indexOf(image) + 1);
                  setToggleSlider(true);
                }}
                className="h-full"
              >
                {image ? (
                  <img
                    src={image}
                    alt="apartment photo"
                    className={`h-full w-full object-cover transition-all duration-200 hover:cursor-pointer hover:opacity-90 ${
                      idx === 0 ? "rounded-tr-2xl" : ""
                    } ${idx === 1 ? "rounded-br-2xl" : ""}`}
                  />
                ) : (
                  <ClipLoader size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </m.div>
  );
}
