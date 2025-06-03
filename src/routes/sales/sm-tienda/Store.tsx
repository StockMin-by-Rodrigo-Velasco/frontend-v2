import { useDispatch, useSelector } from "react-redux";
import HeaderSection from "../../../components/HeaderSection";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
// import { CreateOpcionesVentaDto, TransactionProductoAlmacenDto, ListTransactionProductosAlmacenDto, ProductoTienda, PrecioVenta } from "../../../interface";
import { InputSearch, InputSelectSearch } from "../../../components/Input";
import BodySection from "../../../components/BodySection";
import { LuSettings } from "react-icons/lu";
import { AiOutlineLoading } from "react-icons/ai";
import { useForm } from "../../../hooks";
import { getProductsWarehouseAPI } from '../../../redux/warehouses/warehousesThunk';
import { hideNotification, showNotificationWarning } from "../../../redux/notification/notificationSlice";
import ProductCard from "./components/ProductCard";
import { initialSerchFilter, ProductStore, SearchFilter } from "../../../interfaces/formInterface";
import { TbReportAnalytics } from "react-icons/tb";
import { calculatorMultiply } from "../../../helpers/calculator";


export default function Store() {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { userData } = useSelector((s: RootState) => s.Branch);
    const { exchangeRateFavorite } = useSelector((s: RootState) => s.Sales);
    const { warehouses, productsWarehouse } = useSelector((s: RootState) => s.Warehouses);
    const { brands, categories } = useSelector((s: RootState) => s.Products);

    const dispatch = useDispatch<AppDispatch>();

    const [productsStore, setProductsStore] = useState<ProductStore[]>([]);
    // const [checkedProductos, setCheckedProductos] = useState(0);
    // const [openProformaVenta, setOpenProformaVenta] = useState(false);
    // const [openListaVentasCotizaciones, setOpenListaVentasCotizaciones] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);



    // const [filterOpciones, setFilterOpciones] = useState<CreateOpcionesVentaDto>({
    //     almacenId: opcionesVenta.almacenId,
    //     precioVentaId: opcionesVenta.precioVentaId,
    //     tipoMonedaVentaId: opcionesVenta.tipoMonedaVentaId,
    //     sucursalId
    // });

    // const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
    const { data: filter, handleInputChange } = useForm<SearchFilter>(initialSerchFilter);
    const filterProducts = (p: ProductStore) => {
        return (p.Product.Category.id === filter.category || filter.category === '') &&
            (p.Product.Brand.id === filter.brand || filter.brand === '') &&
            (p.Product.name.toLowerCase().includes(filter.search.toLowerCase()) || p.Product.code.includes(filter.search.toLocaleLowerCase()))
    }

    const toggleProduct = (productId: string) => {
        setProductsStore(products => (products.map(p => p.Product.id === productId ? { ...p, selected: !p.selected } : p)));

    }

    // const handleCheckProducto = (productoId: string) => {
    //     const index = productsWarehouse.findIndex((p) => p.productoId === productoId);
    //     if (index === -1) return;

    //     const newProductosTienda = [...productsWarehouse];
    //     newProductosTienda[index] = { ...newProductosTienda[index], check: !newProductosTienda[index].check };

    //     // if (newProductosTienda[index].check) setCheckedProductos(s => ++s);
    //     // else setCheckedProductos(s => --s);

    //     setProductsWarehouse(newProductosTienda);
    // }

    // const decrementProductos = (listDecrementProductosAlmacenDto: ListTransactionProductosAlmacenDto) => {
    //     const { productos } = listDecrementProductosAlmacenDto;
    //     const productosObj = productos.reduce((acc, p) => { acc[p.productoAlmacenId] = p; return acc; }, {} as Record<string, TransactionProductoAlmacenDto>);

    //     const newListaProductos: ProductoTienda[] = listaProductosTienda.map(p => {
    //         if (productosObj[p.productoAlmacenId]) {
    //             return { ...p, cantidad: (p.cantidad - productosObj[p.productoAlmacenId].cantidad), check: true }
    //         } else return { ...p }
    //     });
    //     setFilterProductosTienda(newListaProductos);
    // }

    // const handleOpcionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    //     const { value, name } = e.target;
    //     const newFilterOpciones: CreateOpcionesVentaDto = { ...filterOpciones, [name]: value }
    //     setFilterOpciones({ ...newFilterOpciones });

    //     const listaPrecioVentaObj = listaPrecioVenta.reduce((acc, pv) => { acc[pv.id] = pv; return acc }, {} as Record<string, PrecioVenta>)

    //     dispatch(getOpcionesVenta({
    //         id: opcionesVenta.id,
    //         almacenId: newFilterOpciones.almacenId,
    //         precioVentaId: newFilterOpciones.precioVentaId,
    //         tipoMonedaVentaId: opcionesVenta.tipoMonedaVentaId,
    //         sucursalId,
    //         TipoMonedaVenta: opcionesVenta.TipoMonedaVenta,
    //         PrecioVenta: listaPrecioVentaObj[opcionesVenta.precioVentaId] || { codigo: '', id: '', sucursalId: '', deleted: false, }
    //     }));
    //     const { precioVentaId, almacenId } = newFilterOpciones;
    //     dispatch(getAllProductosVentaAPI(precioVentaId, almacenId, setFilterProductosTienda, "LOADING-APP-COMPLETE"));
    // }


    useEffect(() => {
        if (userData.warehouseId && (userData.warehouseId !== '') && productsStore.length === 0) { //* LLama al API solo si no hay productos
            dispatch(getProductsWarehouseAPI(
                userData.warehouseId, (products) => {
                    setProductsStore(products.map(p => ({
                        ...p,
                        Product: {
                            ...p.Product,
                            price: p.Product.price ? calculatorMultiply({ num1: p.Product.price, num2: exchangeRateFavorite.rateToUSD, decimals: 2 }) : undefined
                        },
                        selected: false
                    })))
                })
            );
        } else if (productsStore.length > 0) { //* Modifica las actualizaciones de los productos
            setProductsStore(productsWarehouse.map(p => ({
                ...p,
                Product: {
                    ...p.Product,
                    price: p.Product.price ? calculatorMultiply({ num1: p.Product.price, num2: exchangeRateFavorite.rateToUSD, decimals: 2 }) : undefined
                },
                selected: false
            })));
        } else {
            if (userData.warehouseId !== '') {
                dispatch(showNotificationWarning({
                    tittle: 'TIENDA',
                    description: 'Aun no fuiste registrado como vendedor. Por favor comunicate con el administrador de tu sucursal.'
                }))
                setTimeout(() => dispatch(hideNotification()), 10000);
            }
        }
    }, [productsWarehouse])
    return (
        <>

            {/* {openProformaVenta &&
                <ProformaVenta
                    closeButton={() => { setOpenProformaVenta(false) }}
                    checkProductosTienda={filterProductosTienda.filter(p => p.check)}
                    handleCheckProducto={handleCheckProducto}
                    decrementProductos={decrementProductos}
                />
            }
            {openListaVentasCotizaciones && <ListaVentasCotizaciones closeButton={() => { setOpenListaVentasCotizaciones(false) }} decrementProductos={decrementProductos} />} */}

            <HeaderSection>
                <InputSearch
                    handleInputChange={handleInputChange}
                    name='search'
                    placeholder="Buscar"
                    value={filter.search}
                />

                <div
                    className="w-[200px] flex justify-center items-center border relative overflow-hidden border-primary text-primary rounded-lg ms-auto me-auto transition-all duration-300 cursor-pointer"
                    onClick={() => { console.log('Abrir historial') }}
                >
                    <span className="uppercase flex" >{warehouses.find(w => w.id === userData.warehouseId)?.name} <span className="ms-2 text-[20px]" ><TbReportAnalytics /></span> </span>

                    <span className="opacity-0 w-[200px] flex justify-center items-center text-white absolute top-0 bottom-0 transition-all duration-300 bg-primary text-[10px] hover:text-[14px] hover:opacity-100">
                        Ventas y cotizaciones
                        <span className="ms-2 text-[20px]"><TbReportAnalytics /></span>
                    </span>
                </div>

                <InputSelectSearch
                    value={filter.category}
                    name="category"
                    placeholder="Categoría: "
                    options={categories.map(m => ({ value: m.id, name: m.name }))}
                    optionDefault="Todas..."
                    handleInputChange={handleInputChange}
                />
                <InputSelectSearch
                    value={filter.brand}
                    className="ms-3"
                    name="brand"
                    placeholder="Marca: "
                    options={brands.map(m => ({ value: m.id, name: m.name }))}
                    optionDefault="Todas..."
                    handleInputChange={handleInputChange}
                />

                {/* <button
                    type="button"
                    disabled={productsWarehouse.filter(p => p.check).length <= 0}
                    onClick={() => { setOpenProformaVenta(true) }}
                    className="relative ms-5 w-10 rounded border-2 border-primary text-primary text-[22px] flex justify-center items-center overflow-hidden disabled:border-secondary disabled:text-secondary">
                    <MdShoppingCart />
                    {(productsWarehouse.filter(p => p.check).length > 0) &&
                        <span
                            className="bg-danger rounded-br text-white w-4 h-4 absolute top-0 left-0 text-[12px] flex justify-center items-center">
                            {productsWarehouse.filter(p => p.check).length}
                        </span>
                    }
                </button> */}
            </HeaderSection>

            <BodySection>
                {(loadingData && (productsStore.length === 0)) &&
                    <p className="text-center text-secondary mt-5" > Obteniendo productos de la tienda...</p>
                }
                <div className="flex flex-wrap justify-evenly relative pt-5">
                    {productsStore.map(p => (filterProducts(p) &&
                        <ProductCard key={p.id} product={p} toggleProduct={toggleProduct} />
                    ))}
                </div>
                {/* <div className={`${openSettings ? 'p-2 bg-white border border-secondary rounded' : 'w-0'} absolute bottom-2 right-20 overflow-hidden `} >
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
                </div> */}
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