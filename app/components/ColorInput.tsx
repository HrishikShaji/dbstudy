import { Color } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface ColorInputProps {
  colors: Color[];
  setColorIds: Dispatch<SetStateAction<string[]>>;
}

export const ColorInput: React.FC<ColorInputProps> = ({
  colors,
  setColorIds,
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
    <div className="flex  flex-col gap-4  ">
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
          </div>
        </div>
      ))}
    </div>
  );
};
