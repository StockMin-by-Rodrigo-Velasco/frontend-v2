interface HeaderSectionPropInterface{
    children: React.ReactNode,
}

export default function HeaderSection({children}: HeaderSectionPropInterface) {
  return (
    <div className="h-[40px] overflow-hidden flex mb-2 " >
      {children}
    </div>
  );
}