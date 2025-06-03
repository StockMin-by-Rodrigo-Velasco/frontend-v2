interface BodySectionProp{
    children: React.ReactNode,
}


export default function BodySection({children}:BodySectionProp) {
  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll scroll-custom ps-2" >
      {children}
    </div>
  );
}