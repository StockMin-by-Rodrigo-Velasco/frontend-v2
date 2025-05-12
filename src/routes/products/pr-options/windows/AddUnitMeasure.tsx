import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows"
import { AppDispatch, RootState } from "../../../../redux/store";
import { UnitMeasure } from "../../../../interface";
import { AiOutlineLoading } from "react-icons/ai";
import { toggleUnitMeasureAPI } from "../../../../redux/products/productsThunk";
import { useEffect, useState } from "react";

interface AddUnitMeasureProp {
    closeButton: () => void;
}

interface DataUnidadMedida extends UnitMeasure {
    inSucursal: boolean;
}

export default function AddUnitMeasure({closeButton}: AddUnitMeasureProp) {
    const dispatch = useDispatch<AppDispatch>();
    
    const { loadingData } = useSelector((s:RootState) => s.Aplication);
    const { id: branchId } = useSelector((s:RootState) => s.Branch);
    const { unitMeasures, unitMeasuresBranch } = useSelector((s:RootState) => s.Products);

    const [listaUnidadesMedida, setListaUnidadMedida] = useState<DataUnidadMedida[]>([])

    const toggleUnitMeasure = ( unitMeasureId: string ) => {
        dispatch(toggleUnitMeasureAPI({branchId, unitMeasureId}));
    }

    useEffect(() => {
        const unitMeasuresBranchIds = new Set(unitMeasuresBranch.map(um => um.unitMeasureId));
        
        const newListaUnidadesMedida: DataUnidadMedida[] = unitMeasures.map(um => ({...um, inSucursal: unitMeasuresBranchIds.has(um.id)}));
        setListaUnidadMedida(newListaUnidadesMedida);
    }, [unitMeasuresBranch])
    
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
                                <td className="uppercase px-1">{um.name}</td>
                                <td className="px-1 uppercase text-center">{um.abbreviation}</td>
                                <td>{um.details}</td>
                                <td>
                                    <div className="flex justify-center">
                                        {loadingData?
                                            <AiOutlineLoading className="animate-spin"/>
                                            :
                                            <button 
                                            type="button" 
                                            className={`${um.inSucursal? 'border-danger text-danger hover:bg-danger':'border-success text-success hover:bg-success'} uppercase border rounded-full text-[12px] 
                                            px-2 hover:text-white` }
                                            onClick={() => {toggleUnitMeasure(um.id)}}>
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