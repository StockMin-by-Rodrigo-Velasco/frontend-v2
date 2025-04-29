
import Windows from "../../../../components/Windows";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { perfilColor, perfilImg } from "../../../../assets/profile";
import { Log } from "../../../../interface";
import { dateLocalWhitTime } from "../../../../helpers";
import logos from "../../../../assets/logos";

interface LogDetailWindowsPropInterface {
    log: Log
    closeButton: () => void,
}

export default function LogDetailsWindows({ log, closeButton }: LogDetailWindowsPropInterface) {
    const { listUsersObj } = useSelector((s: RootState) => s.Branch);

    return (
        <Windows tittle='DETALLES DE LA ACCION' closeButton={closeButton}>
            <div className="p-3 flex">

                <div className="rounded border-secondary border-[1px] p-3 relative overflow-hidden" >
                    <h1 className="text-center border-b-[1px] border-secondary mb-3 text-secondary" >Datos del usuario</h1>
                    <div className="w-full flex items-center justify-center">
                        <div className="flex justify-center items-center w-32 h-32 rounded mb-3"
                            style={{ backgroundColor: listUsersObj[log.userId]? perfilColor(listUsersObj[log.userId].imagen.split(' ')[1]):'white' }}
                        >
                            <img src={ listUsersObj[log.userId]?
                                perfilImg(listUsersObj[log.userId].imagen.split(' ')[0])
                                :
                                logos.logoNoImage
                            } width='120px' />
                        </div>
                    </div>
                    <p className="bg-secondary-1 rounded overflow-hidden mb-2" > 
                        <span className="bg-secondary px-2 text-white" >Nombre:</span> 
                        <span className="uppercase px-2" >{ listUsersObj[log.userId]? listUsersObj[log.userId].nombre:'desconocido'}</span>
                    </p>
                    <p className="bg-secondary-1 rounded overflow-hidden mb-2" > 
                        <span className="bg-secondary px-2 text-white" >Apellido:</span> 
                        <span className="uppercase px-2" >{ listUsersObj[log.userId]? listUsersObj[log.userId].apellido:'desconocido'}</span>
                    </p>
                    <p className="bg-secondary-1 rounded overflow-hidden mb-2" > 
                        <span className="bg-secondary px-2 text-white" >CI:</span> 
                        <span className="uppercase px-2" >{ listUsersObj[log.userId]? listUsersObj[log.userId].ci:'desconocido'}</span>
                    </p>
                </div>

                <div className="rounded border-secondary border-[1px] p-3" >
                    <h1 className="text-center border-b-[1px] border-secondary mb-3 text-secondary" >DETALLES</h1>

                    <div className="bg-secondary-1 rounded overflow-hidden mb-2 flex flex-col" > 
                        <span className="bg-secondary px-2 text-white text-[14px]" >Accion:</span> 
                        <span className="px-2" >{log.titulo}</span>
                    </div>
                    <div className="bg-secondary-1 rounded overflow-hidden mb-2 flex flex-col" > 
                        <span className="bg-secondary px-2 text-white text-[14px]" >Descripcion:</span> 
                        <span className="px-2" >{log.descripcion}</span>
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