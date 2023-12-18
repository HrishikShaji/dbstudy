import { Color } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ImageSection } from "./ImageSection";

interface ColorInputProps {
  colors: Color[];
  setColorIds: Dispatch<SetStateAction<string[]>>;
  setImages: Dispatch<SetStateAction<Record<string, any>[]>>;
}

export const ColorInput: React.FC<ColorInputProps> = ({
  colors,
  setColorIds,
  setImages,
}) => {
  const [isOpen, setIsOpen] = useState(Array(colors.length).fill(false));
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setColorIds((prevSelected) => [...prevSelected, e.target.value]);
    } else {
      setColorIds((prevSelected) =>
        prevSelected.filter((colorId) => colorId !== e.target.value),
      );
    }
  };
  return (
    <div className="flex  flex-col gap-4  w-full">
      <h1 className="text-2xl font-semibold">Select Color</h1>
      {colors?.map((color: Color, i) => (
        <div key={color.id} className="flex items-center justify-between gap-5">
          <div className="flex  gap-2 items-center justify-between w-[20%]">
            <label>
              <input
                name={color.name}
                onChange={handleColorChange}
                value={color.id}
                type="checkbox"
              />
              {color.name}
            </label>
            <button
              onClick={() => {
                const newValues = [...isOpen];
                newValues[i] = !newValues[i];
                setIsOpen(newValues);
              }}
              type="button"
              className="p-2 bg-neutral-700 rounded-md"
            >
              Add Images
            </button>
          </div>
          {isOpen[i] ? (
            <ImageSection setImages={setImages} colorId={color.id} />
          ) : null}
        </div>
      ))}
    </div>
  );
};
