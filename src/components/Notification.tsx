import { AiOutlineLoading } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoClose, IoInformationCircleOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../redux/store';
import { TiWarningOutline } from "react-icons/ti";
import { hideNotification } from "../redux/notification/notificationSlice";



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
                (type === NotificationTypes.LOADING && 'bg-secondary')||
                (type === NotificationTypes.SUCCESS && 'bg-success')||
                (type === NotificationTypes.INFO && 'bg-info')||
                (type === NotificationTypes.WARNING &&'bg-warning') || 'bg-primary';

    const bg1 = (type === NotificationTypes.ERROR && 'bg-danger-1') ||
                (type === NotificationTypes.LOADING && 'bg-secondary-1')||
                (type === NotificationTypes.SUCCESS && 'bg-success-1')||
                (type === NotificationTypes.INFO && 'bg-info-1')||
                (type === NotificationTypes.WARNING &&'bg-warning-1') || 'bg-primary';

    const border =  (type === NotificationTypes.ERROR && 'border-danger') ||
                    (type === NotificationTypes.LOADING && 'border-secondary')||
                    (type === NotificationTypes.SUCCESS && 'border-success')||
                    (type === NotificationTypes.INFO && 'border-info')||
                    (type === NotificationTypes.WARNING &&'border-warning') || 'border-primary';

    return (
        <div className= {`${bg1} rounded-[4px] absolute bottom-10 left-10 border-[1px] ${border} max-w-[300px] overflow-hidden z-30`} >
        
            {/* HEADER */}
            <div className={`flex px-1 pt-1 ${bg}`}>
                <span className="font-bold ms-2 " >{tittle}</span>
                <button 
                    type="button" 
                    className={`ms-auto ${bg} w-[18px] h-[18px] rounded flex justify-center items-center hover:brightness-75 disabled:cursor-no-drop disabled:bg-opacity-30`}
                    disabled={ type === NotificationTypes.LOADING }
                    onClick={() => {distach( hideNotification())}}
                > 
                    <IoClose/> 
                </button>
            </div>

            {/* BODY */}
            <div className="flex m-2">
                <div className="text-[50px] flex justify-center items-center " >
                    {type === NotificationTypes.ERROR && <MdErrorOutline color="#FF4141"/>}
                    {type === NotificationTypes.LOADING && <AiOutlineLoading color="#909090" className="animate-spin"/>}
                    {type === NotificationTypes.SUCCESS && <FaRegCheckCircle color="#3FC476"/>}
                    {type === NotificationTypes.INFO && <IoInformationCircleOutline color="#21C2DA"/>}
                    {type === NotificationTypes.WARNING && <TiWarningOutline color="#FEB43D"/>}
                    {type === NotificationTypes.NONE && <IoInformationCircleOutline color="#21C2DA"/>}
                </div>
                <p className="flex items-center text-[12px] ms-2" >
                    {description}
                </p>
            </div>

            {/* FOOTER */}           
        </div>
    )  
}

export { Notification }