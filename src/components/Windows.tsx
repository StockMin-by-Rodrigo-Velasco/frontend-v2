import React from "react";
import { IoIosClose } from "react-icons/io";

interface WindowsPropInterface{
    children: React.ReactNode,
    tittle: string,
    closeButton: () => void
}

export default function Windows({children, tittle, closeButton}:WindowsPropInterface) {
  return (
    <div className="bg-black/25 backdrop-blur-[2px] absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
        <div className="bg-white max-w-[80%] rounded-lg text-black overflow-hidden">
            
            {/* HEADER */}
            <div className="bg-primary-3 text-white w-full flex" >
                <span className="ms-5 uppercase" >{tittle}</span>
                <button className="ms-auto bg-danger bg-opacity-60 w-5 flex justify-center items-center text-[18px] hover:bg-opacity-100" type="button" onClick={closeButton}> <IoIosClose/> </button>
            </div>

            {/* BODY */}
            {children}
            {/* FOOTER */}
        </div>
    </div>
  );
}