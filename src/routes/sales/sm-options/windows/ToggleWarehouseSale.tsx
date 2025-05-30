import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows"
import { AppDispatch, RootState } from "../../../../redux/store";
import { AiOutlineLoading } from "react-icons/ai";
import { toggleWarehouseSaleAPI } from "../../../../redux/sales/salesThunk";

interface ToggleWarehouseSaleProp {
    closeButton: () => void;
}

export default function ToggleWarehouseSale({ closeButton }: ToggleWarehouseSaleProp) {
    const dispatch = useDispatch<AppDispatch>();

    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { warehouses } = useSelector((s: RootState) => s.Warehouses);

    const toggleWarehouseSale = (warehouseId: string) => {
        dispatch(toggleWarehouseSaleAPI(warehouseId));
    }

    return (

        <Windows closeButton={closeButton} tittle="AGREGAR NUEVO ALMACÉN PARA VENTAS" >
            <div className="m-2" >
                <h1 className="font-medium uppercase text-white bg-secondary rounded px-2" >ALMACÉNES</h1>
                <p className="text-[14px] px-2 text-secondary">- Selecciona un almacén para agregarlo como almacén de ventas.</p>
                <p className="text-[14px] px-2 text-secondary">- Si necesitas quitar un almacén verifica que no tenga vendedores registrados.</p>
            </div>

            <div className="max-h-[70vh] overflow-y-scroll scroll-custom ps-2 mb-2">
                <table className="table-fixed w-full text-left  ">
                    <thead className="bg-primary text-white sticky top-0" >
                        <tr>
                            <th className="text-center w-[100px]" >NOMBRE</th>
                            <th className="text-center">DESCRIPCIÓN</th>
                            <th className="text-center w-[100px]" >ACCIÓN</th>
                        </tr>
                    </thead>

                    <tbody>
                        {warehouses.map(um => (
                            <tr key={um.id} className="hover:bg-secondary-1 border border-b-secondary" >
                                <td className="uppercase px-1">{um.name}</td>
                                <td>{um.description}</td>
                                <td>
                                    <div className="flex justify-center">
                                        {loadingData ?
                                            <AiOutlineLoading className="animate-spin" />
                                            :
                                            <button
                                                type="button"
                                                disabled={um.User.length !== 0}
                                                className={`${um.warehouseSale ?
                                                    'border-danger text-danger hover:bg-danger' :
                                                    'border-success text-success hover:bg-success'} 
                                                uppercase border rounded-full text-[12px] px-2 hover:text-white disabled:bg-secondary disabled:border-secondary disabled:text-white disabled:cursor-not-allowed` }
                                                onClick={() => { toggleWarehouseSale(um.id) }}>
                                                {um.warehouseSale ? 'quitar' : 'agregar'}
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