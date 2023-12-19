"use client";

import { useState } from "react";

const Page = () => {
  const [noOfVariants, setNoOfVariants] = useState(1);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col">
        <button onClick={() => setNoOfVariants((prev) => prev + 1)}>
          Add Variant
        </button>
        {Array.from({ length: noOfVariants }).map((item, i) => {
          console.log(i);
          return <input className="p-2 rounded-md text-black" key={i} />;
        })}
      </div>
    </div>
  );
};

export default Page;
