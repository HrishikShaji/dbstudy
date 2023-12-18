"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface ImageSectionProps {
  colorId: string;
  setImages: Dispatch<SetStateAction<Record<string, any>[]>>;
}

export const ImageSection: React.FC<ImageSectionProps> = ({
  setImages,
  colorId,
}) => {
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const handleClick = () => {
    setImages((prev) => ({
      ...prev,
      [colorId]: [imageOne, imageTwo, imageThree],
    }));
  };

  return (
    <div className="flex gap-2 text-black">
      <input
        value={imageOne}
        onChange={(e) => setImageOne(e.target.value)}
        placeholder="image..."
        className="p-2 rounded-md"
      />
      <input
        value={imageTwo}
        onChange={(e) => setImageTwo(e.target.value)}
        placeholder="image..."
        className="p-2 rounded-md"
      />
      <input
        value={imageThree}
        onChange={(e) => setImageThree(e.target.value)}
        placeholder="image..."
        className="p-2 rounded-md"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        className="p-2 rounded-md bg-neutral-700"
      >
        Upload
      </button>
    </div>
  );
};
