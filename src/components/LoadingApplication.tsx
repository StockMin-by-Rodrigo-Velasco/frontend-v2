import logos from "../assets/logos";

export default function LoadingApplication() {
  return (
    <div className="w-full h-screen bg-primary-1 flex items-center justify-center absolute z-10" >

      <div>
        <img src={logos.logoVertical} width='500px'/>
        <div className="w-full h-[5px] bg-primary-3 rounded-lg mt-2 relative overflow-hidden">
          <div className="absolute w-[400px] h-full bg-primary-2 animate-leftToRight" >
          </div>

        </div>
      </div>
      

    </div>
  );
}