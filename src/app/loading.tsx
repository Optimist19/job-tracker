import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  return (
    <div className="md:pl-[18vh] h-[50vh] flex justify-center items-center">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
    </div>
  );
}

export default Loading;
