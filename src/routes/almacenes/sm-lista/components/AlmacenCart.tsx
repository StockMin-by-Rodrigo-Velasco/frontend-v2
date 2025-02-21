import { HiOutlineInboxStack } from "react-icons/hi2";
import { AlmacenInterface } from "../../../../interface";
import { dateLocalWhitTime } from "../../../../helpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { selectAlmacen } from "../../../../redux/almacenes/almacenesSlice";
import { useNavigate } from "react-router";

interface AlmacenCardPropsInterface {
    almacen: AlmacenInterface
}



export default function AlmacenCard({ almacen }: AlmacenCardPropsInterface) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    const goToAlmacen = () => {
        dispatch(selectAlmacen(almacen));
        navigate(`/main/almacenes/lista/${almacen.id}`);
    }
    return (
        <button 
            onClick={goToAlmacen}
            type="button" 
            className="bg-info flex flex-col justify-between items-center rounded m-2 p-3 w-[250px] h-[180px] text-white transition-all duration-300 hover:w-[255px] hover:h-[185px]">
            <h1 className="uppercase" >{almacen.nombre}</h1>
            <span className="text-[100px]" > <HiOutlineInboxStack /> </span>

            <div className="w-full text-start" >
                <p className="text-[10px]" ><span>CREADO: </span>{dateLocalWhitTime(almacen.createdAt)}</p>
                <p className="text-[10px]" ><span>ULTIMA MODIFICACIÓN: </span>{dateLocalWhitTime(almacen.createdAt)}</p>

            </div>
        </button>
    );
}