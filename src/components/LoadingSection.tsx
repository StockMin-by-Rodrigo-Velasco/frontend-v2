import logos from "../assets/logos";

interface LoadingSectionPropInterface {
    title: string
}

export default function LoadingSection({ title }: LoadingSectionPropInterface) {
    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-white flex justify-center items-center flex-col z-30">
        
            <img src={logos.logoColor} width={'100px'} />
            <div className="flex mt-3 items-center" >
                <h1 className="text-secondary" >{title}...</h1>
                {/* <AiOutlineLoading className="ms-2 animate-spin h-[16px] w-[16px]" color="#909090" /> */}
            </div>
        </div>
    );
}