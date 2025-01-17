import { AiOutlineLoading } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoClose, IoInformationCircleOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../redux/store';
import { TiWarningOutline } from "react-icons/ti";
import { hideNotification } from "../redux/notificationSlice";



// interface PropsNotificationInterface{
//     tittle: string;
//     description: string;
// }
enum NotificationTypes{
    ERROR = "ERROR",
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    INFO = "INFO",
    NONE = "NONE",
}

function Notification() {
    const distach = useDispatch<AppDispatch>();
    const { tittle, description, type } = useSelector( (s: RootState) => s.Notification );
    const bg =  (type === NotificationTypes.ERROR && 'bg-danger') ||
                (type === NotificationTypes.LOADING && 'bg-primary-3')||
                (type === NotificationTypes.SUCCESS && 'bg-success')||
                (type === NotificationTypes.INFO && 'bg-primary-2')||
                (type === NotificationTypes.WARNING &&'bg-warning') || 'bg-primary-2';

    return (
        <div className= {`${bg} bg-opacity-20 rounded-[4px] absolute bottom-10 left-10 shadow-lg max-w-[300px] overflow-hidden`} >
        
            {/* HEADER */}
            <div className={`flex px-1 pt-1 ${bg} bg-opacity-30`}>
                <span className="font-bold ms-2 " >{tittle}</span>
                <button 
                    type="button" 
                    className={`ms-auto ${bg} bg-opacity-30 w-[18px] h-[18px] rounded flex justify-center items-center hover:bg-opacity-80 disabled:cursor-no-drop disabled:bg-opacity-30`}
                    disabled={ type === NotificationTypes.LOADING }
                    onClick={() => {distach( hideNotification())}}
                > 
                    <IoClose/> 
                </button>
            </div>

            {/* BODY */}
            <div className="flex m-2" >
                {type === NotificationTypes.ERROR && <MdErrorOutline color="#FF4141" className="h-[50px] w-[50px] mr-3 "/>}
                {type === NotificationTypes.LOADING && <AiOutlineLoading color="#093D77" className="animate-spin h-[50px] w-[50px] mr-3"/>}
                {type === NotificationTypes.SUCCESS && <FaRegCheckCircle color="#27C651" className="h-[50px] w-[50px] mr-3 "/>}
                {type === NotificationTypes.INFO && <IoInformationCircleOutline color="#21C2DA" className="h-[50px] w-[50px] mr-3 "/>}
                {type === NotificationTypes.WARNING && <TiWarningOutline color="#FEB43D" className="h-[50px] w-[50px] mr-3 "/>}
                {type === NotificationTypes.NONE && <IoInformationCircleOutline color="#21C2DA" className="h-[50px] w-[50px] mr-3 "/>}
                <p className="flex items-center text-[13px] ms-2" >
                    {description}
                </p>
            </div>

            {/* FOOTER */}
            
        </div>
    )  
}

export { Notification }