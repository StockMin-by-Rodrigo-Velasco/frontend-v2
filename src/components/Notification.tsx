import { AiOutlineLoading } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoClose, IoInformationCircleOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";


interface PropsNotificationInterface{
    tittle: string;
    description: string;
}


function LoadingNotification( { tittle, description }: PropsNotificationInterface ) {
    return (

        <div className="bg-primary-3 bg-opacity-20 rounded-[4px] absolute bottom-10 left-10 shadow-lg max-w-[300px] overflow-hidden" >

            {/* HEADER */}
            <div className="flex px-1 pt-1 bg-primary-3 bg-opacity-30">
                <span className="font-bold ms-2 " >{tittle}</span>
                <button 
                    type="button" 
                    className="ms-auto bg-primary-3 bg-opacity-30 w-[18px] h-[18px] rounded flex justify-center items-center disabled:cursor-no-drop"
                    disabled
                > 
                    <IoClose/> 
                </button>
            </div>

            {/* BODY */}
            <div className="flex m-2" >
                <AiOutlineLoading className="animate-spin h-[50px] w-[50px] mr-3" color="#093D77" />
                <p className="text-[13px] ms-2" >
                    {description}
                </p>
            </div>

            {/* FOOTER */}
            
        </div>
    )  
}

function ErrorNotification( { tittle, description }: PropsNotificationInterface ) {
    return (

        <div className="bg-danger bg-opacity-20 rounded-[4px] absolute bottom-10 left-10 shadow-lg max-w-[300px] overflow-hidden" >

            {/* HEADER */}
            <div className="flex px-1 pt-1 bg-danger bg-opacity-30">
                <span className="font-bold ms-2 " >{tittle}</span>
                <button 
                    type="button" 
                    className="ms-auto bg-danger bg-opacity-30 w-[18px] h-[18px] rounded flex justify-center items-center hover:bg-opacity-70 cursor-pointer"
                    disabled
                > 
                    <IoClose/> 
                </button>
            </div>

            {/* BODY */}
            <div className="flex m-2" >
                <MdErrorOutline color="#FF4141" className="h-[50px] w-[50px] mr-3 " />
                <p className="text-[13px] ms-2" >
                    {description}
                </p>
            </div>

            {/* FOOTER */}
            
        </div>
    )  
}

function SuccessNotification( { tittle, description }: PropsNotificationInterface ) {
    return (

        <div className="bg-success bg-opacity-20 rounded-[4px] absolute bottom-10 left-10 shadow-lg max-w-[300px] overflow-hidden" >

            {/* HEADER */}
            <div className="flex px-1 pt-1 bg-success bg-opacity-30">
                <span className="font-bold ms-2 " >{tittle}</span>
                <button 
                    type="button" 
                    className="ms-auto bg-success bg-opacity-30 w-[18px] h-[18px] rounded flex justify-center items-center hover:bg-opacity-80 cursor-pointer"
                    disabled
                > 
                    <IoClose/> 
                </button>
            </div>

            {/* BODY */}
            <div className="flex m-2" >
                <FaRegCheckCircle color="#27C651" className="h-[50px] w-[50px] mr-3 " />
                <p className="text-[13px] ms-2" >
                    {description}
                </p>
            </div>

            {/* FOOTER */}
            
        </div>
    )  
}

function InfoNotification( { tittle, description }: PropsNotificationInterface ) {
    return (

        <div className="bg-primary-2 bg-opacity-20 rounded-[4px] absolute bottom-10 left-10 shadow-lg max-w-[300px] overflow-hidden" >

            {/* HEADER */}
            <div className="flex px-1 pt-1 bg-primary-2 bg-opacity-30">
                <span className="font-bold ms-2 " >{tittle}</span>
                <button 
                    type="button" 
                    className="ms-auto bg-primary-2 bg-opacity-30 w-[18px] h-[18px] rounded flex justify-center items-center hover:bg-opacity-80 cursor-pointer"
                    disabled
                > 
                    <IoClose/> 
                </button>
            </div>

            {/* BODY */}
            <div className="flex m-2" >
                <IoInformationCircleOutline color="#21C2DA" className="h-[50px] w-[50px] mr-3 " />
                <p className="text-[13px] ms-2" >
                    {description}
                </p>
            </div>

            {/* FOOTER */}
            
        </div>
    )  
}



export { LoadingNotification, ErrorNotification, SuccessNotification, InfoNotification}