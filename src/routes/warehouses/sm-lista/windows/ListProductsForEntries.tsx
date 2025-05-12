import { IoSearch } from "react-icons/io5";
import Windows from "../../../../components/Windows";
import logos from "../../../../assets/logos";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { hideNotification, showNotificationInfo } from "../../../../redux/notification/notificationSlice";
import { ProductWarehouseForm } from "../../../../interfaces/formInterface";
import { createProductWarehouseAPI } from "../../../../redux/warehouses/warehousesThunk";
import { FaCheckCircle } from "react-icons/fa";


interface ListaProductosOutAlmacenProp {
    closeButton: () => void;
    products: ProductWarehouseForm[]
    setProductsForm: (data: ProductWarehouseForm[]) => void;
    checkProduct: (productId: string, e?: React.ChangeEvent<HTMLInputElement>) => void
}


export default function ListProductsForEntries({ closeButton, products, setProductsForm, checkProduct }: ListaProductosOutAlmacenProp) {
    // const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { type: typeNotification, showNotification } = useSelector((s: RootState) => s.Notification);
    const { warehouseSelected } = useSelector((s: RootState) => s.Warehouses);

    const dispatch = useDispatch<AppDispatch>();

    const filterProductos = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newData: ProductWarehouseForm[] = products.map(i => (i.name.includes(value) || i.code.includes(value)) ? { ...i, show: true } : { ...i, show: false }
        )
        setProductsForm([...newData]);
    }

    const createProductWarehouse = (productId: string) => {
        if (typeNotification === 'INFO' && showNotification) {
            dispatch(createProductWarehouseAPI({ productId, warehouseId: warehouseSelected.id }));
            dispatch(hideNotification());
        } else {
            dispatch(showNotificationInfo({
                tittle: 'Registrar producto en almacén',
                description: 'Se registrará un nuevo producto en tu almacén. Si deseas continuar vuelve a presionar el botón “Registrar”, caso contrario cierra esta notificación.'
            }));
        }
    }

    return (
        <Windows tittle="Lista de productos" closeButton={closeButton} >
            <div className="flex py-2" >
                <div className="p-2 w-[300px] me-auto">
                    <div className={` flex items-center rounded-full border-[1px] border-primary px-2`}>
                        <input
                            className="w-full focus:outline-none"
                            type="search"
                            onChange={filterProductos}
                            name='buscar'
                            id='buscar'
                            placeholder='Buscar...'
                        />
                        <label
                            htmlFor='buscar'
                            className="text-primary cursor-text"
                        >
                            <IoSearch />
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-[75vh] overflow-y-scroll scroll-custom ps-2" >
                <table className="table-fixed w-full text-left border-secondary rounded overflow-hidden">
                    <thead className="bg-secondary text-white sticky top-0" >
                        <tr>
                            <th className="w-20 text-center">IMAGEN</th>
                            <th className="w-36 text-center">CODIGO</th>
                            <th className="w-40 text-center">NOMBRE</th>
                            <th className="w-20 text-center">MARCA</th>
                            <th className="w-28 text-center">CATEGORIA</th>
                            <th className="w-20" ><div className="flex justify-center"><FaCheckCircle /></div></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p, indexFil) => p.show && (
                            <tr key={indexFil} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                <td className="p-1 text-center">
                                    <div className="flex justify-center" ><img src={p.image || logos.logoNoImage} className="w-14" /></div>
                                </td>
                                <td><p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{p.code}</p></td>
                                <td><p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{p.name}</p></td>
                                <td><p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{p.brandName}</p></td>
                                <td><p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{p.categoryName}</p></td>
                                <td>
                                    {p.registered ?
                                        <div className="flex justify-center" >
                                            <input
                                                type="checkbox"
                                                onChange={(e) => { checkProduct(p.productId, e) }}
                                                name={p.productId}
                                                id={p.productId}
                                                checked={p.selected}
                                            />
                                        </div>
                                        :
                                        <div className="flex justify-center" >
                                            <button
                                                className="flex items-center bg-white text-info border border-info rounded-full px-2 text-[12px] transition-all duration-200 hover:bg-info hover:text-white disabled:cursor-not-allowed disabled:border-secondary disabled:bg-secondary disabled:text-white"
                                                type="button"
                                                onClick={() => { createProductWarehouse(p.productId) }}
                                            >
                                                Registrar
                                            </button>
                                        </div>                                        
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* <div className="flex justify-center py-2" >
                <Button className="me-2 my-1" label="Aceptar" color='success' onClick={pushProductos} disabled={(productos.filter(p => p.selected).length <= 0)} />
                <Button className="me-2 my-1" label="Cancelar" color='danger' onClick={closeButton} />
            </div> */}
        </Windows>
    );
}