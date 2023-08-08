import { useEffect } from "react";
import { useRef } from "react";

import { BsChevronCompactLeft } from "@react-icons/all-files/bs/BsChevronCompactLeft";
import { BsChevronCompactRight } from "@react-icons/all-files/bs/BsChevronCompactRight";

import { AnimatePresence, motion as m } from "framer-motion";

type Props = {
  images: string[];
  setToggleSlider: React.Dispatch<React.SetStateAction<boolean>>;
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function GallerySlider({
  images,
  setToggleSlider,
  currentImageIndex,
  setCurrentImageIndex,
}: Props) {
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const prevSlide = () => {
    const isFirstSlide = currentImageIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentImageIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentImageIndex(slideIndex);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToggleSlider(false);
      } else if (event.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      } else if (event.key === "ArrowLeft") {
        // dziala
        setCurrentImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (
      !galleryContainerRef.current?.contains(e.target as HTMLDivElement) &&
      !galleryRef.current?.contains(e.target as HTMLDivElement)
    )
      setToggleSlider(false);
    return;
  }

  return (
    <div
      onClick={handleClickOutside}
      className="fixed left-0 top-0 z-10 h-screen w-full bg-black/30"
    >
      {/* slider container */}
      <m.div
        initial={{ opacity: 0, y: "-50%", x: "-50%", scale: 0 }}
        animate={{ opacity: 1, y: "-50%", x: "-50%", scale: 1 }}
        exit={{ opacity: 0, y: "-50%", x: "-50%", scale: 0 }}
        transition={{ duration: 0.3 }}
        ref={galleryRef}
        className="relative left-1/2 top-1/2 z-10 w-[90%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="group relative mx-auto flex w-full flex-col items-center xl:w-[85%] 3xl:w-[90%]">
          <AnimatePresence>
            <div className="relative">
              <button
                onClick={() => setToggleSlider(false)}
                className="absolute right-2 top-4 z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-3xl text-white"
              >
                &times;
              </button>
              <m.img
                key={currentImageIndex}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 8 }}
                src={`${images[currentImageIndex]}`}
                className="h-[400px] md:h-[600px] xl:h-[550px] 2xl:h-[700px] 3xl:h-[750px]"
                alt="image of the house"
              />
              <div className="absolute left-2 top-1/2 -translate-y-[50%] cursor-pointer rounded-full bg-black/40 p-2 text-xl text-white group-hover:block">
                <BsChevronCompactLeft onClick={prevSlide} size={25} />
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-[50%] cursor-pointer rounded-full bg-black/40 p-2 text-xl text-white group-hover:block">
                <BsChevronCompactRight onClick={nextSlide} size={25} />
              </div>
            </div>
          </AnimatePresence>

          {/* dots */}
          <m.div
            ref={galleryRef}
            className="my-4 flex h-24 w-fit items-center justify-start gap-2 overflow-auto rounded-xl p-2 backdrop-blur-sm md:bottom-44 md:overflow-auto xl:backdrop-blur-none"
          >
            {images.map((slide, slideIndex) => (
              <m.img
                key={slide}
                src={slide}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(slideIndex)}
                className={`m-auto h-20 w-20 cursor-pointer select-none rounded-md object-cover text-2xl text-white outline-none ${
                  currentImageIndex === slideIndex &&
                  "border-2 border-lightBlue"
                }`}
              />
            ))}
          </m.div>
        </div>
      </m.div>
    </div>
  );
}
