import { useDispatch, useSelector } from "react-redux";
import { InputDateSearch, InputSelectSearch } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { CotizacionVenta, ListTransactionProductosAlmacenDto, Venta } from "../../../../interface";
import { getCotizacionesVentaAPI, getVentasAPI } from "../../../../redux/ventas/ventasThunk";
import { AiOutlineLoading } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { dateLocalWhitTime } from "../../../../helpers";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import ViewCotizacion from "./ViewCotizacion";
import ViewVenta from "./ViewVenta";

interface ListaVentasCotizacionesProp {
    closeButton: () => void;
    decrementProductos: (listDecrementProductosAlmacenDto: ListTransactionProductosAlmacenDto) => void;
}

interface DateRange {
    desde: string,
    hasta: string
}
const initDateRange: DateRange = {
    desde: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
    hasta: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split("T")[0],
}

const initialCotizacion: CotizacionVenta = {
    id: '',
    sucursalId: '',
    total: '',
    usuarioId: '',
    numero: 0,
    createdAt: '',
    precioVentaId: '',
    PrecioVenta: {
        id: '',
        sucursalId: '',
        codigo: '',
    },
    clienteVentaId: '',
    ClienteVenta: {
        id: '',
        sucursalId: '',
        codigo: '',
        nombre: '',
        apellido: '',
        contacto: '',
        direccion: '',
    },
    ProductoDetalleVenta: [],
}

const initialVenta: Venta = {
    ...initialCotizacion,
    almacenId: '',
}

export default function ListaVentasCotizaciones({ closeButton, decrementProductos }: ListaVentasCotizacionesProp) {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { id: sucursalId } = useSelector((s: RootState) => s.Sucursal);

    const [listaCotizacionesVenta, setListaCotizacionesVenta] = useState<CotizacionVenta[]>([])
    const [listaVenta, setListaVenta] = useState<Venta[]>([])

    const [cotizacionData, setCotizacionData] = useState<CotizacionVenta>(initialCotizacion);
    const [openViewCotizacion, setOpenViewCotizacion] = useState(false);

    const [ventaData, setVentaData] = useState<Venta>(initialVenta);
    const [openViewVenta, setOpenViewVenta] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const { data: dateRange, handleInputChange } = useForm<DateRange>(initDateRange);
    const { data: dataVer, handleInputChange: verHandleChange } = useForm<{ ver: string }>({ ver: 'ventas' });

    const getCotizacion = (data: CotizacionVenta) => {
        setCotizacionData(data);
        setOpenViewCotizacion(true);
    }

    const getVenta = (data: Venta) => {
        setVentaData(data);
        setOpenViewVenta(true);
    }

    const filterVentasAndCotizaciones = () => {
        const desdeStr = new Date(dateRange.desde);
        desdeStr.setHours(desdeStr.getHours() + 4); // Ajustamos a la hora de Bolivia
        const desde = desdeStr.getTime().toString();

        const hastaStr = new Date(dateRange.hasta);
        hastaStr.setHours(hastaStr.getHours() + 28); // Ajustamos a la hora de Bolivia
        const hasta = hastaStr.getTime().toString();

        dispatch(getCotizacionesVentaAPI({ desde, hasta, sucursalId }, setListaCotizacionesVenta));
        dispatch(getVentasAPI({ desde, hasta, sucursalId }, setListaVenta));
    }

    useEffect(() => {
        filterVentasAndCotizaciones();
    }, [])


    return (
        <Windows tittle="LISTA DE VENTAS Y COTIZACIONES" closeButton={closeButton} >

            {openViewCotizacion && <ViewCotizacion
                decrementProductos={decrementProductos}
                cotizacion={cotizacionData}
                closeButton={() => { setOpenViewCotizacion(false) }}
            />}
            {openViewVenta && <ViewVenta venta={ventaData} closeButton={() => { setOpenViewVenta(false) }} />}

            <div className="flex m-2 ">
                <InputDateSearch
                    placeholder="Desde: "
                    name="desde"
                    handleInputChange={handleInputChange}
                    value={dateRange.desde}
                />
                <InputDateSearch
                    className="ms-3"
                    placeholder="Hasta: "
                    name="hasta"
                    handleInputChange={handleInputChange}
                    value={dateRange.hasta}
                />

                <div className="ms-3 flex items-center" >
                    <button
                        onClick={filterVentasAndCotizaciones}
                        type="button"
                        disabled={loadingData}
                        className="me-2 w-7 h-7 bg-primary bg-opacity-80 text-white flex justify-center items-center rounded-full hover:bg-opacity-100 disabled:bg-secondary"
                    > {loadingData ? <AiOutlineLoading className="animate-spin" /> : <IoSearch />}</button>
                </div>

                <InputSelectSearch
                    className="ms-auto"
                    handleInputChange={verHandleChange}
                    name="ver"
                    options={[{ name: 'VENTAS', value: 'ventas' }, { name: 'COTIZACIONES', value: 'cotizaciones' }]}
                    placeholder="Ver: "
                    value={dataVer.ver}
                />

            </div>

            <div className="h-[40vh] overflow-y-scroll scroll-custom ps-2" >
                <table className=" table-fixed text-left w-full border-collapse border-secondary" >
                    <thead className="bg-secondary text-white sticky top-0 rounded-t-lg">
                        <tr>
                            <th className="uppercase text-center w-[40px]">#</th>
                            <th className="uppercase text-center w-[180px]">FECHA</th>
                            <th className="uppercase text-center">{dataVer.ver === 'ventas' ? 'CLIENTE':'DETALLE'}</th>
                            <th className="uppercase text-center w-[80px]">MAS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataVer.ver === 'ventas' ?
                            <>
                                {(listaVenta.length <= 0) && <tr><td colSpan={4}  className="text-center text-secondary" >No se registraron ventas en este rango de fechas.</td></tr>}
                                {listaVenta.map(i => (
                                    <tr key={i.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                        <td className="text-center" >{i.numero}</td>
                                        <td className="text-center">{dateLocalWhitTime(i.createdAt)}</td>
                                        <td className="text-center">{i.ClienteVenta.nombre} {i.ClienteVenta.apellido}</td>
                                        <td className="text-center text-secondary">
                                            <button type="button" onClick={() => { getVenta(i) }} ><BsBoxArrowInUpRight /></button>
                                        </td>
                                    </tr>
                                ))}
                            </>
                            :
                            <>
                            {(listaCotizacionesVenta.length <= 0) && <tr><td colSpan={4}  className="text-center text-secondary" >No se registraron cotizaciones en este rango de fechas.</td></tr>}
                                {listaCotizacionesVenta.map(i => (
                                    <tr key={i.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                        <td className="text-center" >{i.numero}</td>
                                        <td className="text-center">{dateLocalWhitTime(i.createdAt)}</td>
                                        <td className="text-center">{i.ClienteVenta.nombre} {i.ClienteVenta.apellido}</td>
                                        <td className="text-center text-secondary">
                                            <button type="button" onClick={() => { getCotizacion(i) }} ><BsBoxArrowInUpRight /></button>
                                        </td>
                                    </tr>
                                ))}
                            </>

                        }
                    </tbody>
                </table>

            </div>


        </Windows>
    );
}