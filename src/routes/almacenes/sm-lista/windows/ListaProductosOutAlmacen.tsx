import { IoSearch } from "react-icons/io5";
import { FormTableColumn, FormTableColumnTypes } from "../../../../components/FormTable";
import Windows from "../../../../components/Windows";
// import { useFormArray } from "../../../../hooks";
import logos from "../../../../assets/logos";


interface ProductosOutAlmacen {
    id: string;
    codigo: string;
    nombre: string;
    imagen: string;

    categoriaId: string;
    categoria?: string;

    marcaId: string;
    marca?: string;

    unidadMedidaId: string;
    unidadMedidaAbreviada?: string;

    selected: boolean;
    show: boolean;
}

interface ListaProductosOutAlmacenProp {
    closeButton: () => void;
    productos: ProductosOutAlmacen[]
    setProductos: React.Dispatch<React.SetStateAction<ProductosOutAlmacen[]>>;
}

const columns: FormTableColumn<ProductosOutAlmacen>[] = [
    { name: 'IMAGEN', type: FormTableColumnTypes.IMG, key: "imagen" },
    { name: 'CODIGO', type: FormTableColumnTypes.P, key: "codigo" },
    { name: 'NOMBRE', type: FormTableColumnTypes.P, key: "nombre" },
    { name: 'MARCA', type: FormTableColumnTypes.P, key: "marca" },
    { name: 'CATEGORIA', type: FormTableColumnTypes.P, key: "categoria" },
    { name: 'SELECCIONAR', type: FormTableColumnTypes.CHECK, key: "selected" },
];

export default function ListaProductosOutAlmacen({ closeButton, productos, setProductos }: ListaProductosOutAlmacenProp) {
    const filterProductos = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newData: ProductosOutAlmacen[] = productos.map(i => (i.nombre.includes(value) || i.codigo.includes(value)) ? { ...i, show: true } : { ...i, show: false }
        )
        setProductos([...newData]);
    }

    const handleCheck = (index:number , e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.target;
        let newProductos = productos;
        newProductos[index].selected = checked;
        setProductos([...newProductos]);
    }  
    return (
        <Windows tittle="Productos disponibles" closeButton={closeButton} >
            <div className="p-2 w-[300px]">
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
            <div className="flex flex-col h-[80vh] overflow-y-scroll scroll-custom ps-2" >
                <table className="table-auto text-left w-full border-secondary rounded overflow-hidden">
                    <thead className="bg-secondary text-white sticky top-0" >
                        <tr>
                            {columns.map(c => (
                                <th key={c.name} className="uppercase text-center px-2">{c.name}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map((f, indexFil) => f.show&&(
                            <tr key={indexFil} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                {columns.map((c, i) => (
                                    <td key={i} className="p-1 text-center" >
                                        {c.type === FormTableColumnTypes.IMG && <div className="flex justify-center" ><img src={(f[c.key] as string) || logos.logoNoImage} className="w-14" /></div>}
                                        {c.type === FormTableColumnTypes.P &&
                                            <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{f[c.key] as string}</p>
                                        }
                                        {c.type === FormTableColumnTypes.CHECK &&
                                            <input 
                                                type="checkbox" 
                                                onChange={(e) => {handleCheck(indexFil, e)}} 
                                                name={`${c.key as string}:${indexFil}`} 
                                                id={`${c.key as string}:${indexFil}`} 
                                                checked={f[c.key] as boolean} />
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>


        </Windows>
    );
}