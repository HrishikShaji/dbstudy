import { MdImage } from "react-icons/md";
import { useEffect, useRef } from "react";
import * as React from "react";

export type InputFileProps = {
  id: string; // Unique identifier for each InputFile instance
  fileList: File[];
  onChange: (fileList: FileList | null) => void;
};

export const InputFile = ({ id, fileList = [], onChange }: InputFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      fileList.forEach((file) => dataTransfer.items.add(file));
      inputRef.current.files = dataTransfer.files;
    }
  }, [fileList]);

  return (
    <div className="flex">
      <input
        multiple
        id={`custom-input-${id}`} // Use a unique ID for each instance
        hidden
        type="file"
        ref={inputRef}
        data-testid="uploader"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.files);
        }}
      />
      <label
        htmlFor={`custom-input-${id}`} // Match the ID with the input
        className=" p-2 cursor-pointer rounded-md bg-neutral-500"
      >
        <MdImage size={24} />
      </label>
      <div>{fileList.length}</div>
    </div>
  );
};
