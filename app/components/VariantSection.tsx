import { Dispatch, SetStateAction, useState } from "react";
import { InputFile } from "./InputFile";

interface VariantSectionProps {
  setVariants: Dispatch<SetStateAction<any[]>>;
  index: number;
}

export const VariantSection: React.FC<VariantSectionProps> = ({
  setVariants,
  index,
}) => {
  const [images, setImages] = useState<FileList | null>(null);
  const onImageSelect = (images: FileList | null) => {
    setImages(images);
  };
  return (
    <div className="flex justify-between w-full">
      <InputFile
        id={`variant-${index}`}
        fileList={[]}
        onChange={onImageSelect}
      />
      {images?.length}
      <button type="button">Add</button>
    </div>
  );
};
