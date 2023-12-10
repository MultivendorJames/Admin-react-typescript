import React from "react";


interface errorProps {
    children:React.ReactNode
}
export default function ErrorWrapper({children}: errorProps) {
  return (
    <p className="text-red-600 text-[15px] shadow-md  leading-loose italic  py-2 px-14 rounded-md bg-[#982f2f36]">
      {children}
    </p>
  );
}
