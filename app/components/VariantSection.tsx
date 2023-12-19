import { Dispatch, SetStateAction, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { ColorInput } from "./ColorInput";
import { ImageSection } from "./ImageSection";
import { SizeInput } from "./SizeInput";

interface VariantSectionProps {
  setVariants: Dispatch<SetStateAction<any[]>>;
}

export const VariantSection: React.FC<VariantSectionProps> = ({
  setVariants,
}) => {
  const { colors, sizes } = useGetProducts();
  const [sizeIds, setSizeIds] = useState<string[] | []>([]);
  const [colorIds, setColorIds] = useState<string[] | []>([]);
  const [images, setImages] = useState<string[]>([]);
  const addVariant = () => {
    console.log(sizeIds, colorIds, images);
    setVariants((prev) => [
      ...prev,
      { sizeId: parseInt(sizeIds[0]), colorId: parseInt(colorIds[0]) },
    ]);
  };
  return (
    <div className="flex justify-between w-full">
      <ColorInput colors={colors} setColorIds={setColorIds} />
      <SizeInput sizes={sizes} setSizeIds={setSizeIds} />
      <ImageSection setImages={setImages} />
      <button onClick={addVariant} type="button">
        Add
      </button>
    </div>
  );
};
