import { useDispatch, useSelector } from "react-redux";
import HeaderSection from "../../../components/HeaderSection";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { CreateOpcionesVentaDto, TransactionProductoAlmacenDto, ListTransactionProductosAlmacenDto, ProductoTienda, PrecioVenta } from "../../../interface";
import { InputSearch, InputSelect, InputSelectSearch } from "../../../components/Input";
import BodySection from "../../../components/BodySection";
import ProductoCard from "./components/ProductoCard";
import ProformaVenta from "./windows/ProformaVentaWindows";
import { LuSettings } from "react-icons/lu";
import { getOpcionesVenta } from "../../../redux/sales/ventasSlice";
import { getAllProductosVentaAPI } from "../../../redux/sales/ventasThunk";
import { AiOutlineLoading } from "react-icons/ai";
import { MdShoppingCart } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import ListaVentasCotizaciones from "./windows/ListaVentasCotizaciones";


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
    const { id: sucursalId } = useSelector((s: RootState) => s.Branch);
    const { opcionesVenta, listaPrecioVenta, listaProductosTienda } = useSelector((s: RootState) => s.Ventas);
    const { listaAlmacenes } = useSelector((s: RootState) => s.Almacenes);
    const { brands: listaMarcas, categories: listaCategorias } = useSelector((s: RootState) => s.Products);

    const dispatch = useDispatch<AppDispatch>();

    const [filterProductosTienda, setFilterProductosTienda] = useState<ProductoTienda[]>([]);
    // const [checkedProductos, setCheckedProductos] = useState(0);
    const [openProformaVenta, setOpenProformaVenta] = useState(false);
    const [openListaVentasCotizaciones, setOpenListaVentasCotizaciones] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);



    const [filterOpciones, setFilterOpciones] = useState<CreateOpcionesVentaDto>({
        almacenId: opcionesVenta.almacenId,
        precioVentaId: opcionesVenta.precioVentaId,
        tipoMonedaVentaId: opcionesVenta.tipoMonedaVentaId,
        sucursalId
    });

    const [filter, setFilter] = useState<FilterInterface>(filterInitialState);

    const filterProductos = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        const newFilter = { ...filter, [name]: value };

        const newListaProductosTienda = filterProductosTienda.map(p => {
            if (
                p.Categoria.nombre?.includes(newFilter.categoria) &&
                p.Marca.nombre?.includes(newFilter.marca) &&
                (p.nombre.includes(newFilter.buscar) || p.codigo.includes(newFilter.buscar))
            ) return { ...p, show: true };
            else return { ...p, show: false };
        }
        );

        setFilterProductosTienda(newListaProductosTienda);
        setFilter(newFilter);
    }

    const handleCheckProducto = (productoId: string) => {
        const index = filterProductosTienda.findIndex((p) => p.productoId === productoId);
        if (index === -1) return;

        const newProductosTienda = [...filterProductosTienda];
        newProductosTienda[index] = { ...newProductosTienda[index], check: !newProductosTienda[index].check };

        // if (newProductosTienda[index].check) setCheckedProductos(s => ++s);
        // else setCheckedProductos(s => --s);

        setFilterProductosTienda(newProductosTienda);
    }

    const decrementProductos = (listDecrementProductosAlmacenDto: ListTransactionProductosAlmacenDto) => {
        const { productos } = listDecrementProductosAlmacenDto;
        const productosObj = productos.reduce((acc, p) => { acc[p.productoAlmacenId] = p; return acc; }, {} as Record<string, TransactionProductoAlmacenDto>);

        const newListaProductos: ProductoTienda[] = listaProductosTienda.map(p => {
            if (productosObj[p.productoAlmacenId]) {
                return { ...p, cantidad: (p.cantidad - productosObj[p.productoAlmacenId].cantidad), check: true }
            } else return { ...p }
        });
        setFilterProductosTienda(newListaProductos);
    }

    const handleOpcionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        const newFilterOpciones: CreateOpcionesVentaDto = { ...filterOpciones, [name]: value }
        setFilterOpciones({ ...newFilterOpciones });

        const listaPrecioVentaObj = listaPrecioVenta.reduce((acc, pv) => { acc[pv.id] = pv; return acc }, {} as Record<string, PrecioVenta>)

        dispatch(getOpcionesVenta({
            id: opcionesVenta.id,
            almacenId: newFilterOpciones.almacenId,
            precioVentaId: newFilterOpciones.precioVentaId,
            tipoMonedaVentaId: opcionesVenta.tipoMonedaVentaId,
            sucursalId,
            TipoMonedaVenta: opcionesVenta.TipoMonedaVenta,
            PrecioVenta: listaPrecioVentaObj[opcionesVenta.precioVentaId] || { codigo: '', id: '', sucursalId: '', deleted: false, }
        }));
        const { precioVentaId, almacenId } = newFilterOpciones;
        dispatch(getAllProductosVentaAPI(precioVentaId, almacenId, setFilterProductosTienda, "LOADING-APP-COMPLETE"));
    }


    useEffect(() => {
        setFilterOpciones({
            almacenId: opcionesVenta.almacenId,
            precioVentaId: opcionesVenta.precioVentaId,
            tipoMonedaVentaId: opcionesVenta.tipoMonedaVentaId,
            sucursalId
        });
        dispatch(getAllProductosVentaAPI(opcionesVenta.precioVentaId, opcionesVenta.almacenId, setFilterProductosTienda, "LOADING-APP-COMPLETE"));
        // setCheckedProductos(0);

    }, [opcionesVenta])
    return (
        <>

            {openProformaVenta &&
                <ProformaVenta
                    closeButton={() => { setOpenProformaVenta(false) }}
                    checkProductosTienda={filterProductosTienda.filter(p => p.check)}
                    handleCheckProducto={handleCheckProducto}
                    decrementProductos={decrementProductos}
                />
            }
            {openListaVentasCotizaciones && <ListaVentasCotizaciones closeButton={() => { setOpenListaVentasCotizaciones(false) }} decrementProductos={decrementProductos} />}

            <HeaderSection>
                <InputSearch
                    handleInputChange={filterProductos}
                    name='buscar'
                    placeholder="Buscar"
                    value={filter.buscar}
                />

                <button
                    type="button"
                    className="ms-auto me-5 w-10 rounded border-2 border-primary text-primary text-[22px] flex justify-center items-center transition-all duration-200 hover:bg-primary hover:text-white"
                    onClick={() => { setOpenListaVentasCotizaciones(true) }}
                >
                    <IoDocumentsOutline />
                </button>

                <InputSelectSearch
                    value={filter.categoria}
                    name="categoria"
                    placeholder="Categoría: "
                    options={listaCategorias.map(m => ({ value: m.name, name: m.name }))}
                    optionDefault="Todas..."
                    handleInputChange={filterProductos}
                />
                <InputSelectSearch
                    value={filter.marca}
                    className="ms-3"
                    name="marca"
                    placeholder="Marca: "
                    options={listaMarcas.map(m => ({ value: m.name, name: m.name }))}
                    optionDefault="Todas..."
                    handleInputChange={filterProductos}
                />

                <button
                    type="button"
                    disabled={filterProductosTienda.filter(p => p.check).length <= 0}
                    onClick={() => { setOpenProformaVenta(true) }}
                    className="relative ms-5 w-10 rounded border-2 border-primary text-primary text-[22px] flex justify-center items-center overflow-hidden disabled:border-secondary disabled:text-secondary">
                    <MdShoppingCart />
                    {(filterProductosTienda.filter(p => p.check).length > 0) &&
                        <span
                            className="bg-danger rounded-br text-white w-4 h-4 absolute top-0 left-0 text-[12px] flex justify-center items-center">
                            {filterProductosTienda.filter(p => p.check).length}
                        </span>
                    }
                </button>
            </HeaderSection>

            <BodySection>
                <div className="flex flex-wrap justify-evenly relative pt-5">

                    {filterProductosTienda.filter(p => p.show).map(p => (
                        <ProductoCard key={p.productoId} producto={p} checkProducto={handleCheckProducto} setLista={setFilterProductosTienda} />
                    ))}

                </div>
                <div className={`${openSettings ? 'p-2 bg-white border border-secondary rounded' : 'w-0'} absolute bottom-2 right-20 overflow-hidden `} >
                    <InputSelect
                        value={filterOpciones.almacenId}
                        className="mb-2"
                        name="almacenId"
                        placeholder="Almacen: "
                        options={listaAlmacenes.map(a => ({ value: a.id, name: a.nombre }))}
                        handleInputChange={handleOpcionChange}
                        required
                        disabled={loadingData}
                    />
                    <InputSelect
                        value={filterOpciones.precioVentaId}
                        name="precioVentaId"
                        placeholder="Precio: "
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
                    {loadingData ? <AiOutlineLoading className="animate-spin" /> : <LuSettings />}

                </button>
            </BodySection>
        </>
    );
}