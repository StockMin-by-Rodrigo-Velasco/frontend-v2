interface BodySectionPropInterface{
    children: React.ReactNode,
}


export default function BodySection({children}:BodySectionPropInterface) {
  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll scroll-custom" >
      {children}
    </div>
  );
}