import { Size } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SizeInputProps {
  sizes: Size[];
  setSizeIds: Dispatch<SetStateAction<string[]>>;
}

export const SizeInput: React.FC<SizeInputProps> = ({ sizes, setSizeIds }) => {
  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSizeIds((prevSelected) => [...prevSelected, e.target.value]);
    } else {
      setSizeIds((prevSelected) =>
        prevSelected.filter((sizeId) => sizeId !== e.target.value),
      );
    }
  };
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-semibold">Select Size</h1>
      {sizes?.map((size: Size, i) => (
        <div key={size.id} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <label key={size.id}>
              <input
                name={size.name}
                onChange={handleSizeChange}
                value={size.id}
                type="checkbox"
              />
              {size.name}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};
