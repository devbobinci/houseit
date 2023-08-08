import Dropzone from "./dropzone/Dropzone";
import DroppedImages from "./dropzone/DroppedImages";

export type SelectedImagesProps = {
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  mainImageSrc: File;
  setMainImageSrc: React.Dispatch<React.SetStateAction<File>>;
};

export default function DragDropImage({
  selectedImages,
  setSelectedImages,
  mainImageSrc,
  setMainImageSrc,
}: SelectedImagesProps) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-medium transition-all duration-300 dark:text-white">
        Add your own listing
      </h2>
      <div>
        <Dropzone
          selectedImages={selectedImages}
          setMainImageSrc={setMainImageSrc}
          mainImageSrc={mainImageSrc}
          setSelectedImages={setSelectedImages}
        />

        <DroppedImages
          selectedImages={selectedImages}
          mainImageSrc={mainImageSrc}
          setMainImageSrc={setMainImageSrc}
          setSelectedImages={setSelectedImages}
        />
      </div>
    </div>
  );
}
