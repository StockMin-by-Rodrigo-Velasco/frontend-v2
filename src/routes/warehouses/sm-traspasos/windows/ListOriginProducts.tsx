import { useEffect, useState } from "react";
import logos from "../../../../assets/logos";
import { InputSearch } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from "../../../../hooks";
import { Button } from "../../../../components/Buttons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { ProductWarehouseForm } from "../../../../interfaces/formInterface";

interface ListaProductosAlmacenProp {
    closeButton: () => void;
    products: ProductWarehouseForm[],
    warehouseId: string;
    setOriginProducts: (data: ProductWarehouseForm[]) => void;
}

export default function ListOriginProducts({ closeButton, products, warehouseId, setOriginProducts }: ListaProductosAlmacenProp) {
    const { warehouses } = useSelector((s: RootState) => s.Warehouses);

    const { data, handleInputChange } = useForm<{ buscar: string }>({ buscar: '' });
    const [almacenOrigen, setAlmacenOrigen] = useState('')

    const filterProductos = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        const newData: ProductWarehouseForm[] = products.map(i => (i.name.includes(value) || i.code.includes(value)) ? { ...i, show: true } : { ...i, show: false }
        )
        setOriginProducts([...newData]);
        handleInputChange(e);
    }

    const handleCheck = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        let newProductos = products;
        newProductos[index].selected = checked;
        setOriginProducts([...newProductos]);
    }

    useEffect(() => {
        setOriginProducts([...products.map(p => ({ ...p, show: true }))]);
        const almacenSelected = warehouses.find(a => a.id === warehouseId);
        setAlmacenOrigen(almacenSelected?.name || '');
    }, [])


    return (
        <Windows tittle={`Lista de productos - ${almacenOrigen}`} closeButton={closeButton} >

            <div className="p-2 flex" >
                <InputSearch
                    handleInputChange={filterProductos}
                    name="buscar"
                    placeholder="Buscar..."
                    value={data.buscar}
                />
            </div>

            <div className="p-2 flex flex-col max-h-[75vh] overflow-y-scroll scroll-custom">
                <table className="table-fixed text-left w-full border-secondary rounded overflow-hidden">
                    <thead className="bg-secondary text-white sticky top-0" >
                        <tr>
                            <th className="uppercase text-center px-2 w-20 ">IMAGEN</th>
                            <th className="uppercase text-center px-2 w-36 ">CODIGO</th>
                            <th className="uppercase text-center px-2">NOMBRE</th>
                            <th className="uppercase text-center px-2 w-20 ">MARCA</th>
                            <th className="uppercase text-center px-2 w-20 ">U/M</th>
                            <th className="uppercase text-center px-2 w-20 ">CANT.</th>
                            <th className="uppercase text-center px-2 w-20">ACCION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p, i) => p.show && (
                            <tr key={p.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase" >
                                <td className="p-1 text-center">
                                    <div className="flex justify-center" ><img src={p.image || logos.logoNoImage} className="w-14" /></div>
                                </td>
                                <td className="p-1 text-center" >
                                    <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.code} </p>
                                </td>
                                <td className="p-1 text-center" >
                                    <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.name} </p>
                                </td>
                                <td className="p-1 text-center" >
                                    <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.brandName} </p>
                                </td>
                                <td className="p-1 text-center" >
                                    <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.unitMeasureAbbreviation} </p>
                                </td>
                                <td className="p-1 text-center" >
                                    <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.quantity} </p>
                                </td>
                                <td className="p-1 text-center" >
                                    <input
                                        type="checkbox"
                                        disabled={parseInt(p.quantity) <= 0}
                                        onChange={(e) => { handleCheck(i, e) }}
                                        checked={p.selected}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center py-2" >
                <Button className="me-2 my-1" label="Aceptar" color='success' onClick={closeButton} />
            </div>
        </Windows>
    );
}