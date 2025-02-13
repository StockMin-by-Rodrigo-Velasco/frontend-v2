import logos from "../assets/logos";

export default function LoadingApplication() {
  return (
    <div className="w-screen h-screen bg-light flex items-center justify-center absolute z-10" >
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