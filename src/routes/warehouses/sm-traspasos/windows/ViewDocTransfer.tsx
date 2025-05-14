import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { InputTextareaBlock, InputTextBlock } from "../../../../components/Input";
import { dateLocal } from "../../../../helpers";
import logos from "../../../../assets/logos";
import { useEffect, useState } from "react";
import { DocTransfer, ProductTransfer, Warehouse } from "../../../../interfaces";
import { getProductsTransferAPI } from "../../../../redux/warehouses/warehousesThunk";


interface ViewTraspasoAlmacenProp {
    closeButton: () => void;
    data: DocTransfer;
}


export default function ViewDocTransfer({ closeButton, data }: ViewTraspasoAlmacenProp) {
    const { logo } = useSelector((s: RootState) => s.Branch);
    const { warehouses } = useSelector((s: RootState) => s.Warehouses);
    const warehousesObj = warehouses.reduce((acc, a) => { acc[a.id] = a; return acc; }, {} as Record<string, Warehouse>);
    const dispatch = useDispatch<AppDispatch>();

    const [productsTransfer, setProductsTransfer] = useState<ProductTransfer[]>([])

    const getProductsTransfer = (pe: ProductTransfer[]) => {
        setProductsTransfer([...pe]);
    }

    useEffect(() => {
        if (!data.ProductTransfer) dispatch(getProductsTransferAPI(data.id, getProductsTransfer));
        else getProductsTransfer(data.ProductTransfer);
    }, [])

    return (
        <Windows closeButton={closeButton} tittle="DATOS DE TRASPASO">
            <div className="mb-3 p-2 flex items-center">
                <div className="flex items-center" >
                    <img src={logo} alt="logo-sucursal" width='300px' />
                </div>


                <div className="flex flex-col ms-auto" >
                    <InputTextBlock
                        name="almacenOrigenId"
                        placeholder="Origen:"
                        value={warehousesObj[data.originWarehouseId].name.toUpperCase()}
                    />
                    <InputTextBlock
                        name="almacenDestinoId"
                        placeholder="Destino:"
                        value={warehousesObj[data.destinationWarehouseId].name.toUpperCase()}
                    />
                </div>
                <div className="ms-auto flex flex-col" >
                    <p><span className="font-bold">Fecha: </span> {dateLocal(data.createdAt || '')} </p>
                    <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${data.User.name} ${data.User.lastName}`}</span> </p>
                    <InputTextareaBlock value={data.details || ''} name="detalle" placeholder="Detalle" />
                </div>


            </div>
            <div className="p-2 flex flex-col max-h-[75vh] overflow-y-scroll scroll-custom mb-3">
                <table className="table-fixed text-left w-full border-secondary rounded overflow-hidden">
                    <thead className="bg-secondary text-white sticky top-0">
                        <tr>
                            <th className="uppercase text-center px-2 w-[80px]">IMAGEN</th>
                            <th className="uppercase text-center px-2 w-[80px]">CODIGO</th>
                            <th className="uppercase text-center px-2 ">NOMBRE</th>
                            <th className="uppercase text-center px-2 w-[100px]">MARCA</th>
                            <th className="uppercase text-center px-2 w-[70px]">U/M</th>
                            <th className="uppercase text-center px-2 w-[100px]">TRASPASO</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productsTransfer.map(p => (
                            <tr key={p.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-center" >
                                <td className="p-1 text-center">
                                    <div className="flex justify-center"> <img src={p.Product.image || logos.logoNoImage} className="w-14" /></div>
                                </td>
                                <td className="p-1 text-center">{p.Product.code}</td>
                                <td className="p-1 text-center">{p.Product.name}</td>
                                <td>{p.Product.Brand.name}</td>
                                <td className="p-1 text-center">{p.Product.UnitMeasure.abbreviation}</td>
                                <td className="p-1 text-center">{p.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Windows>
    );
}