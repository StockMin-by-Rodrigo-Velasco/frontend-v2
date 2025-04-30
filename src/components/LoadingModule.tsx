import logos from "../assets/logos";

interface LoadingSectionPropInterface {
    title: string
}

export default function LoadingModule({ title }: LoadingSectionPropInterface) {
    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-white flex justify-center items-center flex-col z-20">
        
            <img src={logos.logoColor} width={'100px'} />
            <div className="flex mt-3 items-center" >
                <h1 className="text-secondary" >{title}...</h1>
            </div>
        </div>
    );
}