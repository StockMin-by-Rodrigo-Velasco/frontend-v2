import { useEffect } from "react";
import Windows from "../../../../components/Windows";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { getOneSucursalUserAPI } from "../../../../redux/sucursal/sucursalThunk";
import { perfilColor, perfilImg } from "../../../../assets/perfil";
import { AiOutlineLoading } from "react-icons/ai";

interface LogInterface {
    id: string;
    sucursalId: string;
    userId: string;
    titulo: string;
    descripcion: string;
    createdAt: number;
}

interface LogDetailWindowsPropInterface {
    log: LogInterface
    closeButton: () => void,
}

export default function LogDetailsWindows({ log, closeButton }: LogDetailWindowsPropInterface) {
    const { logUserData } = useSelector((s: RootState) => s.Sucursal);
    const { loadingData } = useSelector((s: RootState) => s.Aplication)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getOneSucursalUserAPI(log.userId));
    }, [])

    return (
        <Windows tittle='DETALLES DE LA ACCION' closeButton={closeButton}>
            <div className="p-3 flex">

                <div className="rounded border-secondary border-[1px] p-3 relative overflow-hidden" >
                    {loadingData&& 
                        <div className="absolute top-0 right-0 left-0 bottom-0 bg-white flex justify-center items-center text-[50px] text-secondary" >
                            <AiOutlineLoading className="ms-2 animate-spin"/>
                        </div>
                    }
                    <h1 className="text-center border-b-[1px] border-secondary mb-3 text-secondary" >Datos del usuario</h1>
                    <div className="w-full flex items-center justify-center">
                        <div className="flex justify-center items-center w-32 h-32 rounded mb-3"
                            style={{ backgroundColor: perfilColor(logUserData.imagen.split(' ')[1]) }}
                        >
                            <img src={perfilImg(logUserData.imagen.split(' ')[0])} width='120px' />
                        </div>
                    </div>
                    <p className="bg-secondary-1 rounded overflow-hidden mb-2" > 
                        <span className="bg-secondary px-2 text-white" >Nombre:</span> 
                        <span className="uppercase px-2" >{logUserData.nombre}</span>
                    </p>
                    <p className="bg-secondary-1 rounded overflow-hidden mb-2" > 
                        <span className="bg-secondary px-2 text-white" >Apellido:</span> 
                        <span className="uppercase px-2" >{logUserData.apellido}</span>
                    </p>
                    <p className="bg-secondary-1 rounded overflow-hidden mb-2" > 
                        <span className="bg-secondary px-2 text-white" >CI:</span> 
                        <span className="uppercase px-2" >{logUserData.ci}</span>
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
                        <span className="uppercase px-2" >{new Date(log.createdAt).toLocaleDateString("es-ES", {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute: '2-digit', second:'2-digit', hour12: false})}</span>
                    </div>
                </div>

            </div>
        </Windows>
    );
}