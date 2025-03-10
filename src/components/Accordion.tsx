import { useState } from "react";

interface AccordionProps{
    children: React.ReactNode;
    tittle: string;
    last?: boolean;
}

export default function Accordion({ tittle, children, last}: AccordionProps) {
    const [openContent, setOpenContent] = useState(false)

  return (
    <div className={`${!last&&'border-b-[1px] border-secondary'}`} >
      <button 
      onClick={() => {setOpenContent(s=>!s)}}
        type="button" 
        className={`${openContent&& 'border-b-[1px] border-secondary bg-secondary-1'} w-full flex p-2`} 
      >{tittle} </button>
      <div className={`${openContent?'max-h-80':'max-h-0 overflow-hidden'} overflow-y-scroll transition-all duration-300 scroll-custom`}>{children}</div>
    </div>
  );
}