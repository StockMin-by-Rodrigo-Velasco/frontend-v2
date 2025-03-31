import { IoSearch } from "react-icons/io5";
import { FormTableColumn, FormTableColumnTypes } from "../../../../components/FormTable";
import Windows from "../../../../components/Windows";
import logos from "../../../../assets/logos";
import { Button, ButtonColors } from "../../../../components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { hideNotification, showNotificationInfo } from "../../../../redux/notification/notificationSlice";
import { createProductoAlmacenAPI } from '../../../../redux/almacenes/almacenThunks';

interface FormTable {
    productoId: string,
    productoAlmacenId: string,
    codigo: string,
    nombre: string,
    unidadMedidaAbreviada?: string;
    cantidad: number,
}

interface Productos {
    productoId: string;
    productoAlmacenId: string;
    codigo: string;
    nombre: string;
    imagen: string;

    categoriaId: string;
    categoria?: string;

    marcaId: string;
    marca?: string;

    unidadMedidaId: string;
    unidadMedidaAbreviada?: string;

    registered: boolean;
    selected: boolean;
    show: boolean;
}

interface ListaProductosOutAlmacenProp {
    closeButton: () => void;
    productos: Productos[]
    setProductos: React.Dispatch<React.SetStateAction<Productos[]>>;
    arrayData: FormTable[];
    replaceData: (data: FormTable[]) => void;
}

const columns: FormTableColumn<Productos>[] = [
    { name: 'IMAGEN', type: FormTableColumnTypes.IMG, key: "imagen" },
    { name: 'CODIGO', type: FormTableColumnTypes.P, key: "codigo" },
    { name: 'NOMBRE', type: FormTableColumnTypes.P, key: "nombre" },
    { name: 'MARCA', type: FormTableColumnTypes.P, key: "marca" },
    { name: 'CATEGORIA', type: FormTableColumnTypes.P, key: "categoria" },
    { name: 'SELECCIONAR', type: FormTableColumnTypes.CHECK, key: "selected" },
];

export default function ListaProductosIngresarAlmacenWindow({ closeButton, productos, setProductos, arrayData, replaceData }: ListaProductosOutAlmacenProp) {
    // const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { type: typeNotification, showNotification } = useSelector((s: RootState) => s.Notification);
    const { selectedAlmacen } = useSelector((s: RootState) => s.Almacenes);

    const dispatch = useDispatch<AppDispatch>();

    const filterProductos = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newData: Productos[] = productos.map(i => (i.nombre.includes(value) || i.codigo.includes(value)) ? { ...i, show: true } : { ...i, show: false }
        )
        setProductos([...newData]);
    }

    const handleCheck = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        let newProductos = productos;
        newProductos[index].selected = checked;
        setProductos([...newProductos]);
    }

    const pushProductos = () => {
        //Verifica los productos q ya estan en el formulario para poner sus respectivas cantidades
        const arrayDataObj = arrayData.reduce((acc, producto) => { acc[producto.productoId] = producto; return acc; }, {} as Record<string, FormTable>);

        const selectedProductos: FormTable[] = productos
            .filter(p => p.selected)
            .map(p => ({
                productoId: p.productoId,
                productoAlmacenId: p.productoAlmacenId,
                unidadMedidaAbreviada: p.unidadMedidaAbreviada,
                codigo: p.codigo,
                nombre: p.nombre,
                cantidad: arrayDataObj[p.productoId]?.cantidad || 0,
            }));
        replaceData(selectedProductos);
        closeButton();
    }

    const registrarProducto = (productoId: string) => {
        if (typeNotification === 'INFO' && showNotification) {
            dispatch(createProductoAlmacenAPI({ productoId, almacenId: selectedAlmacen.id }));
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
                            {columns.map(c => (
                                <th key={c.name} className="uppercase text-center px-2">{c.name}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map((f, indexFil) => f.show && (
                            <tr key={indexFil} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                {columns.map((c, i) => (
                                    <td key={i} className="p-1 text-center" >
                                        {c.type === FormTableColumnTypes.IMG && <div className="flex justify-center" ><img src={(f[c.key] as string) || logos.logoNoImage} className="w-14" /></div>}
                                        {c.type === FormTableColumnTypes.P &&
                                            <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{f[c.key] as string}</p>
                                        }
                                        {c.type === FormTableColumnTypes.CHECK &&
                                            <>{!f.registered ?

                                                <div className="flex justify-center" >
                                                    <button
                                                        className="flex items-center bg-white text-info border border-info rounded-full px-2 text-[12px] transition-all duration-200 hover:bg-info hover:text-white disabled:cursor-not-allowed disabled:border-secondary disabled:bg-secondary disabled:text-white"
                                                        type="button"
                                                        onClick={() => { registrarProducto(f.productoId) }}
                                                    >
                                                        Registrar
                                                    </button>
                                                </div>
                                                :
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => { handleCheck(indexFil, e) }}
                                                    name={`${c.key as string}:${indexFil}`}
                                                    id={`${c.key as string}:${indexFil}`}
                                                    checked={f[c.key] as boolean}
                                                />
                                            }</>
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center py-2" >
                <Button className="me-2 my-1" label="Aceptar" color={ButtonColors.success} onClick={pushProductos} disabled={(productos.filter(p => p.selected).length <= 0)} />
                <Button className="me-2 my-1" label="Cancelar" color={ButtonColors.danger} onClick={closeButton} />
            </div>
        </Windows>
    );
}