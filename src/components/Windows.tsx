import React from "react";
import { IoIosClose } from "react-icons/io";

interface WindowsPropInterface{
    children: React.ReactNode;
    tittle: string;
    footer?: string;
    closeButton: () => void;
}

export default function Windows({children, tittle, footer, closeButton}:WindowsPropInterface) {
  return (
    <div className = {`bg-black/15 backdrop-blur-[2px] absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10`}>
        <div className="bg-white max-w-[80%] rounded-lg text-black overflow-hidden shadow-2xl">
            
            {/* HEADER */}
            <div className="bg-primary text-white w-full flex" >
                <span className="ms-5 uppercase" >{tittle}</span>
                <button className="ms-auto  w-5 flex justify-center items-center text-[18px] hover:bg-danger" type="button" onClick={closeButton}> <IoIosClose/> </button>
            </div>

            {/* BODY */}
            {children}
            {/* FOOTER */}
            {footer&&
              <div className="text-[10px] px-2 text-secondary border-t-[1px] border-secondary" >
                {footer}
              </div>
            }
            
        </div>
    </div>
  );
}