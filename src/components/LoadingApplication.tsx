import logos from "../assets/logos";

export default function LoadingApplication() {
  return (
    <div className="top-0 right-0 left-0 bottom-0 bg-light flex items-center justify-center absolute z-30" >
      <div>
        <img src={logos.logoVertical} width='500px'/>
        <div className="w-full h-[5px] bg-secondary rounded-lg mt-2 relative overflow-hidden">
          <div className="absolute w-[400px] h-full bg-primary animate-leftToRight" >
          </div>
        </div>
      </div>
    </div>
  );
}