interface FooterSectionProp{
    children: React.ReactNode,
}


export default function FooterSection({children}:FooterSectionProp) {
  return (
    <div className="h-[40px] overflow-hidden flex mt-2 items-center" >
     {children}
    </div>
  );
}