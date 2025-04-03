import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows"
import { AppDispatch, RootState } from "../../../../redux/store";
import { UnidadMedida } from "../../../../interface";
import { AiOutlineLoading } from "react-icons/ai";
import { handleUnidadMedidaAPI } from "../../../../redux/productos/productosThunk";
import { useEffect, useState } from "react";

interface CreateUnidadMedidaProp {
    closeButton: () => void;
}

interface DataUnidadMedida extends UnidadMedida {
    inSucursal: boolean;
}

export default function CreateUnidadMedida({closeButton}: CreateUnidadMedidaProp) {
    const dispatch = useDispatch<AppDispatch>();
    
    const { listaUnidadesMedida:listaUM, listaUnidadesMedidaSucursal } = useSelector((s:RootState) => s.Productos);
    const { loadingData } = useSelector((s:RootState) => s.Aplication);

    const [listaUnidadesMedida, setListaUnidadMedida] = useState<DataUnidadMedida[]>([])

    const handleUnidadMedida = ( um: UnidadMedida ) => {
        dispatch(handleUnidadMedidaAPI(um.id, "LOADING-DATA-COMPLETE"));
    }

    useEffect(() => {
        const unidadesMedidaSucursalIds = new Set(listaUnidadesMedidaSucursal.map(um => um.unidadMedidaId));
        
        const newListaUnidadesMedida: DataUnidadMedida[] = listaUM.map(um => ({...um, inSucursal: unidadesMedidaSucursalIds.has(um.id)}));
        setListaUnidadMedida(newListaUnidadesMedida);
    }, [listaUnidadesMedidaSucursal])
    
  return (

        <Windows closeButton={closeButton} tittle="agregar nueva unidad de medida" >
            <div className="m-2" >
                <h1 className="font-medium uppercase text-white bg-secondary rounded px-2" >Lista de unidades de medidas global</h1>
                <p className="text-[14px] px-2 text-secondary">-Selecciona las unidades de medidas que utilizaras en tu sucursal</p>
            </div>

            <div className="max-h-[70vh] overflow-y-scroll scroll-custom ps-2 mb-2">
                <table className="table-fixed w-full text-left  ">
                    <thead className="bg-primary text-white sticky top-0" >
                        <tr>
                            <th className="text-center w-[100px]" >NOMBRE</th>
                            <th className="text-center w-[125px] " >ABREVIATURA</th>
                            <th className="text-center" >DESCRIPCIÓN</th>
                            <th className="text-center w-[100px]" >ACCIÓN</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaUnidadesMedida.map(um => (
                            <tr key={um.id} className="hover:bg-secondary-1 border border-b-secondary" >
                                <td className="uppercase px-1">{um.nombre}</td>
                                <td className="px-1 uppercase text-center">{um.abreviatura}</td>
                                <td>{um.detalle}</td>
                                <td>
                                    <div className="flex justify-center">
                                        {loadingData?
                                            <AiOutlineLoading className="animate-spin"/>
                                            :
                                            <button 
                                            type="button" 
                                            className={`${um.inSucursal? 'border-danger text-danger hover:bg-danger':'border-success text-success hover:bg-success'} uppercase border rounded-full text-[12px] 
                                            px-2 hover:text-white` }
                                            onClick={() => {handleUnidadMedida(um)}}>
                                                {um.inSucursal? 'quitar':'agregar'}
                                            </button>
                                        }
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Windows>

  );
}