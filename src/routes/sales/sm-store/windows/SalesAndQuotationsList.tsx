import { useDispatch, useSelector } from "react-redux";
import { InputDateSearch, InputSelectSearch } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { dateLocalWhitTime } from "../../../../helpers";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { getDocSalesAPI } from "../../../../redux/sales/salesThunk";
import { DateRange, initDateRange } from "../../../../interfaces/formInterface";
import { DocSale } from "../../../../interfaces";

interface ListaVentasCotizacionesProp {
    closeButton: () => void;
}


export default function SalesAndQuotationsList({ closeButton }: ListaVentasCotizacionesProp) {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { id: branchId } = useSelector((s: RootState) => s.Branch);

    // const [listaCotizacionesVenta, setListaCotizacionesVenta] = useState<CotizacionVenta[]>([])
    const [docSales, setDocSales] = useState<DocSale[]>([])

    // const [cotizacionData, setCotizacionData] = useState<CotizacionVenta>(initialCotizacion);
    // const [openViewCotizacion, setOpenViewCotizacion] = useState(false);

    // const [ventaData, setVentaData] = useState<Venta>(initialVenta);
    // const [openViewVenta, setOpenViewVenta] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const { data: dateRange, handleInputChange } = useForm<DateRange>(initDateRange);
    const { data: dataVer, handleInputChange: verHandleChange } = useForm<{ ver: string }>({ ver: 'ventas' });

    // const getCotizacion = (data: CotizacionVenta) => {
    //     setCotizacionData(data);
    //     setOpenViewCotizacion(true);
    // }

    // const getVenta = (data: Venta) => {
    //     setVentaData(data);
    //     setOpenViewVenta(true);
    // }

    const filterDocs = () => {
        const fromStr = new Date(dateRange.from);
        fromStr.setHours(fromStr.getHours() + 4); // Ajustamos a la hora de Bolivia
        const from = fromStr.getTime().toString();

        const toStr = new Date(dateRange.to);
        toStr.setHours(toStr.getHours() + 28); // Ajustamos a la hora de Bolivia
        const to = toStr.getTime().toString();

        // dispatch(getCotizacionesVentaAPI({ desde, hasta, sucursalId }, setListaCotizacionesVenta, "LOADING-DATA-COMPLETE"));
        dispatch(getDocSalesAPI({ from, to, branchId }, setDocSales));
    }

    useEffect(() => {
        filterDocs();
    }, [])


    return (
        <Windows tittle="LISTA DE VENTAS Y COTIZACIONES" closeButton={closeButton} >

            {/* {openViewCotizacion && <ViewCotizacion
                decrementProductos={decrementProductos}
                cotizacion={cotizacionData}
                closeButton={() => { setOpenViewCotizacion(false) }}
            />}
            {openViewVenta && <ViewVenta venta={ventaData} closeButton={() => { setOpenViewVenta(false) }} />} */}

            <div className="flex m-2 ">
                <InputDateSearch
                    placeholder="Desde: "
                    name="from"
                    handleInputChange={handleInputChange}
                    value={dateRange.from}
                />
                <InputDateSearch
                    className="ms-3"
                    placeholder="Hasta: "
                    name="to"
                    handleInputChange={handleInputChange}
                    value={dateRange.to}
                />

                <div className="ms-3 flex items-center" >
                    <button
                        onClick={filterDocs}
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
                                {(docSales.length <= 0) && <tr><td colSpan={4}  className="text-center text-secondary" >No se registraron ventas en este rango de fechas.</td></tr>}
                                {docSales.map(i => (
                                    <tr key={i.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                        <td className="text-center" >{i.number}</td>
                                        <td className="text-center">{dateLocalWhitTime(i.createdAt || '')}</td>
                                        <td className="text-center">{i.customerName.toUpperCase()}</td>
                                        <td className="text-center text-secondary">
                                            <button type="button" onClick={() => {}} ><BsBoxArrowInUpRight /></button>
                                        </td>
                                    </tr>
                                ))}
                            </>
                            :
                            <>
                            <h1>Cotizaciones</h1>
                            {/* {(listaCotizacionesVenta.length <= 0) && <tr><td colSpan={4}  className="text-center text-secondary" >No se registraron cotizaciones en este rango de fechas.</td></tr>}
                                {listaCotizacionesVenta.map(i => (
                                    <tr key={i.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                        <td className="text-center" >{i.numero}</td>
                                        <td className="text-center">{dateLocalWhitTime(i.createdAt)}</td>
                                        <td className="text-center">{i.ClienteVenta.nombre} {i.ClienteVenta.apellido}</td>
                                        <td className="text-center text-secondary">
                                            <button type="button" onClick={() => { }} ><BsBoxArrowInUpRight /></button>
                                        </td>
                                    </tr>
                                ))} */}
                            </>

                        }
                    </tbody>
                </table>

            </div>


        </Windows>
    );
}