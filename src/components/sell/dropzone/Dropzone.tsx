import { useCallback, useEffect } from "react";

import { useDropzone } from "react-dropzone";

type Props = {
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  mainImageSrc: File;
  setMainImageSrc: React.Dispatch<React.SetStateAction<File>>;
};

export default function Dropzone({
  selectedImages,
  setSelectedImages,
  mainImageSrc,
  setMainImageSrc,
}: Props) {
  useEffect(() => {
    if (selectedImages.length >= 1 && !mainImageSrc) {
      setMainImageSrc(selectedImages[0]);
    }
  }, [selectedImages]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const duplicated = selectedImages.find((img) => img.name === file.name);
        if (duplicated) {
          setSelectedImages([...selectedImages]);
        } else {
          setSelectedImages((prevState) => [...prevState, file]);
        }
      });
    },
    [selectedImages]
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: true,
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
        "image/webp": [".webp"],
      },
      maxSize: 5 * 1024 * 1024,
      maxFiles: 10,
    });

  return (
    <div
      {...getRootProps()}
      className={`h-52 cursor-pointer rounded-md border-2 border-dashed border-gray-300 focus:outline-none xl:h-80 ${
        isDragAccept ? "border-emerald-500" : ""
      } ${isDragReject ? "border-red-500" : ""}`}
    >
      <input {...getInputProps()} />

      <div className="flex h-full flex-col items-center justify-center space-y-3 rounded-xl">
        <img src="/sell/add.png" alt="folder" className="h-16 w-16" />

        {isDragReject ? (
          <p className="text-center text-red-400">
            Sorry, only png, jpg images are supported
          </p>
        ) : (
          <>
            <p className="dark:text-white xl:hidden">
              {selectedImages.length > 0
                ? "Add more images"
                : "Select from library"}
            </p>
            <p className="hidden transition-all duration-300 dark:text-white xl:inline">
              Select or Drag & drop
            </p>
            <p className="mt-2 text-base text-gray-400">
              Only .jpeg, .png, .jpg
            </p>
          </>
        )}
      </div>
    </div>
  );
}
