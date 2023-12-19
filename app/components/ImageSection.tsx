"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface ImageSectionProps {
  setImages: Dispatch<SetStateAction<string[]>>;
}

export const ImageSection: React.FC<ImageSectionProps> = ({ setImages }) => {
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const handleClick = () => {
    setImages([imageThree, imageTwo, imageOne]);
  };

  return (
    <div className="flex gap-2 text-black flex-col">
      <h1 className="text-2xl font-semibold text-white">Select Images</h1>
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
