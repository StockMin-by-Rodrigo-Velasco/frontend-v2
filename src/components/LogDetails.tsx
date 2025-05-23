import Windows from "./Windows";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { perfilColor, perfilImg } from "../assets/profile";
import { dateLocalWhitTime } from "../helpers";
import { Log, User } from "../interfaces";
import logos from "../assets/logos";

interface LogDetailWindowsPropInterface {
    log: Log
    closeButton: () => void,
}

export default function LogDetailsWindows({ log, closeButton }: LogDetailWindowsPropInterface) {
    const {users} = useSelector((s: RootState) => s.Branch);
    const usersObj = users.reduce((acc, a) => { acc[a.id] = a; return acc; }, {} as Record<string, User>);

    return (
        <Windows tittle='DETALLES DE LA ACCION' closeButton={closeButton}>
            <div className="p-3 flex">

            <div className="rounded border-secondary border-[1px] p-3 relative overflow-hidden" >
                    <h1 className="text-center border-b-[1px] border-secondary mb-3 text-secondary" >Datos del usuario</h1>
                    <div className="w-full flex items-center justify-center">
                        <div className="flex justify-center items-center w-32 h-32 rounded mb-3"
                            style={{ backgroundColor: usersObj[log.userId]? perfilColor(usersObj[log.userId].profile.split(' ')[1]):'white' }}
                        >
                            <img src={ usersObj[log.userId]?
                                perfilImg(usersObj[log.userId].profile.split(' ')[0])
                                :
                                logos.logoNoImage
                            } width='120px' />
                        </div>
                    </div>
                    <p className="bg-secondary-1 rounded overflow-hidden mb-2" > 
                        <span className="bg-secondary px-2 text-white" >Nombre:</span> 
                        <span className="uppercase px-2" >{ usersObj[log.userId]? usersObj[log.userId].name:'desconocido'}</span>
                    </p>
                    <p className="bg-secondary-1 rounded overflow-hidden mb-2" > 
                        <span className="bg-secondary px-2 text-white" >Apellido:</span> 
                        <span className="uppercase px-2" >{ usersObj[log.userId]? usersObj[log.userId].lastName:'desconocido'}</span>
                    </p>
                    <p className="bg-secondary-1 rounded overflow-hidden mb-2" > 
                        <span className="bg-secondary px-2 text-white" >CI:</span> 
                        <span className="uppercase px-2" >{ usersObj[log.userId]? usersObj[log.userId].ci:'desconocido'}</span>
                    </p>
                </div>

                <div className="rounded border-secondary border-[1px] p-3" >
                    <h1 className="text-center border-b-[1px] border-secondary mb-3 text-secondary" >DETALLES</h1>

                    <div className="bg-secondary-1 rounded overflow-hidden mb-2 flex flex-col" > 
                        <span className="bg-secondary px-2 text-white text-[14px]" >Accion:</span> 
                        <span className="px-2" >{log.title}</span>
                    </div>
                    <div className="bg-secondary-1 rounded overflow-hidden mb-2 flex flex-col" > 
                        <span className="bg-secondary px-2 text-white text-[14px]" >Descripcion:</span> 
                        <span className="px-2" >{log.description}</span>
                    </div>
                    <div className="bg-secondary-1 rounded overflow-hidden mb-2 flex flex-col" > 
                        <span className="bg-secondary px-2 text-white text-[14px]" >Fecha:</span> 
                        <span className="uppercase px-2" >{dateLocalWhitTime(log.createdAt)}</span>
                    </div>
                </div>

            </div>
        </Windows>
    );
}