import { useDispatch, useSelector } from "react-redux";
import HeaderSection from "../../../components/HeaderSection";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { CreateOpcionesVentaDto, Producto } from "../../../interface";
import { InputSearch, InputSelect, InputSelectSearch } from "../../../components/Input";
import BodySection from "../../../components/BodySection";
import ProductoCard from "./components/ProductoCard";
import ProformaVenta from "./windows/ProformaVentaWindows";
import { FaBasketShopping } from "react-icons/fa6";
import { LuSettings } from "react-icons/lu";
import { getOpcionesVenta } from "../../../redux/ventas/ventasSlice";
import { getAllProductosVentaAPI } from "../../../redux/ventas/ventasThunk";
import { AiOutlineLoading } from "react-icons/ai";


interface ProductoForDataTable extends Producto {
    unidadMedida: string;
    marca: string;
    categoria: string;
}

const dataInitialState: ProductoForDataTable = {
    id: '',
    sucursalId: '',
    codigo: '',
    nombre: '',
    descripcion: '',
    imagen: '',
    deleted: false,
    createdAt: '',
    updatedAt: '',
    categoriaId: '',
    marcaId: '',
    unidadMedidaId: '',

    Marca: { id: '', sucursalId: '', nombre: '', origen: '', deleted: false },
    Categoria: { id: '', sucursalId: '', nombre: '', detalle: '', deleted: false },
    UnidadMedida: { id: '', nombre: '', abreviatura: '', detalle: '' },

    unidadMedida: '',
    marca: '',
    categoria: '',
}

interface FilterInterface {
    buscar: string;
    categoria: string;
    marca: string;
}
const filterInitialState: FilterInterface = {
    buscar: '',
    categoria: '',
    marca: '',
}

export default function TiendaVentas() {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { id:sucursalId } = useSelector((s: RootState) => s.Sucursal);
    const { opcionesVenta, listaPrecioVenta, listaProductosTienda } = useSelector((s: RootState) => s.Ventas);
    const { listaAlmacenes } = useSelector((s: RootState) => s.Almacenes);
    const { listaProductos, listaMarcas, listaCategorias } = useSelector((s: RootState) => s.Productos);

    const dispatch = useDispatch<AppDispatch>();
    
    const [openProformaVenta, setOpenProformaVenta] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);


    const [filterOpciones, setFilterOpciones] = useState<CreateOpcionesVentaDto>({ 
        almacenId: opcionesVenta?.almacenId || '', 
        precioVentaId: opcionesVenta?.precioVentaId || '',
        sucursalId
    });

    const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
    const [filteredProducto, setFilteredProducto] = useState<ProductoForDataTable[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        const newFilter = { ...filter, [name]: value };
        const newData = listaProductos.filter(i =>
            i.Categoria.nombre?.includes(newFilter.categoria) &&
            i.Marca.nombre?.includes(newFilter.marca) &&
            (i.nombre.includes(newFilter.buscar) || i.codigo.includes(newFilter.buscar))
        );

        const newListaProductos: ProductoForDataTable[] = newData.map(p => ({
            ...p,
            unidadMedida: p.UnidadMedida.nombre,
            marca: p.Marca.nombre,
            categoria: p.Categoria.nombre
        }))
        setFilteredProducto([...newListaProductos]);
        setFilter(newFilter);
    }

    const handleOpcionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        const newFilterOpciones:CreateOpcionesVentaDto = {...filterOpciones, [name]: value}
        setFilterOpciones({...newFilterOpciones});

        const newPrecioVenta = listaPrecioVenta.find(pv => pv.id === newFilterOpciones.precioVentaId);

        if(newPrecioVenta) dispatch(getOpcionesVenta({ 
            id: opcionesVenta?.id || '' , 
            ...newFilterOpciones,
            PrecioVenta: newPrecioVenta
        }));
        const { precioVentaId, almacenId } = newFilterOpciones;
        dispatch(getAllProductosVentaAPI( precioVentaId, almacenId ));
    }


    useEffect(() => {
        if( opcionesVenta?.almacenId && opcionesVenta.precioVentaId ){
            setFilterOpciones({ 
                almacenId: opcionesVenta?.almacenId, 
                precioVentaId: opcionesVenta?.precioVentaId,
                sucursalId
            });
            dispatch(getAllProductosVentaAPI(opcionesVenta?.precioVentaId, opcionesVenta?.almacenId ));
        }
    }, [opcionesVenta])
    return (
        <>

            {openProformaVenta && <ProformaVenta closeButton={() => { setOpenProformaVenta(false) }} />}
            <HeaderSection>
                <InputSearch
                    handleInputChange={handleChange}
                    name='buscar'
                    placeholder="Buscar"
                    value={filter.buscar}
                />
                <InputSelectSearch
                    value={filter.categoria}
                    className="ms-auto"
                    name="categoria"
                    placeholder="Categoría: "
                    options={listaCategorias.map(m => ({ value: m.nombre, name: m.nombre }))}
                    optionDefault="Todas..."
                    handleInputChange={handleChange}
                />
                <InputSelectSearch
                    value={filter.marca}
                    className="ms-3"
                    name="marca"
                    placeholder="Marca: "
                    options={listaMarcas.map(m => ({ value: m.nombre, name: m.nombre }))}
                    optionDefault="Todas..."
                    handleInputChange={handleChange}
                />

                <button
                    type="button"
                    onClick={() => { setOpenProformaVenta(true) }}
                    className="relative ms-5 w-10 rounded border-2 border-success text-success text-[22px] flex justify-center items-center overflow-hidden">
                    <FaBasketShopping />
                    <span className="bg-danger rounded-br text-white w-4 h-4 absolute top-0 left-0 text-[12px] flex justify-center items-center">4</span>
                </button>
            </HeaderSection>

            <BodySection>
                <div className="flex flex-wrap justify-evenly relative pt-5">

                    {listaProductosTienda.map(p => (
                        <ProductoCard key={p.productoId} producto={p} />
                    ))}

                </div>
                <div className={`${!openSettings && 'w-0'} absolute bottom-2 right-20 overflow-hidden`} >
                    <InputSelect
                        value={filterOpciones.almacenId}
                        className="mb-2"
                        name="almacenId"
                        placeholder="Almacen de venta: "
                        options={listaAlmacenes.map(a => ({ value: a.id, name: a.nombre }))}
                        handleInputChange={handleOpcionChange}
                        required
                        disabled={loadingData}
                    />
                    <InputSelect
                        value={filterOpciones.precioVentaId}
                        name="precioVentaId"
                        placeholder="Tipo de precio: "
                        options={listaPrecioVenta.map(pv => ({ value: pv.id, name: pv.codigo }))}
                        handleInputChange={handleOpcionChange}
                        required
                        disabled={loadingData}
                    />
                </div>
                <button
                    onClick={() => { setOpenSettings(s => !s) }}
                    type="button"
                    disabled={loadingData}
                    className={`${openSettings && 'rotate-[135deg]'} absolute bottom-2 right-2 transition-all duration-300 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[30px] hover:bg-opacity-100 w-14 h-14 rounded-full disabled:bg-secondary`}
                >
                    {loadingData? <AiOutlineLoading className="animate-spin"/> : <LuSettings /> }

                </button>
            </BodySection>
        </>
    );
}