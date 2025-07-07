import { useDispatch, useSelector } from "react-redux";
import { InputDateSearch, InputSelectSearch } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { IoCloseCircle, IoSearch } from "react-icons/io5";
import { dateLocalWhitTime } from "../../../../helpers";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { getDocQuotationsAPI, getDocSalesAPI } from "../../../../redux/sales/salesThunk";
import { DateRange, initDateRange } from "../../../../interfaces/formInterface";
import { DocQuotation, DocSale } from "../../../../interfaces";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { TiWarning } from "react-icons/ti";

interface ListaVentasCotizacionesProp {
    closeButton: () => void;
    openDocSale: (doc: DocSale) => void;
    openDocQuotation: (doc: DocQuotation) => void;
    docSales: DocSale[];
    setDocSales: React.Dispatch<React.SetStateAction<DocSale[]>>;
    docQuotations: DocQuotation[];
    setDocQuotations: React.Dispatch<React.SetStateAction<DocQuotation[]>>
}


export default function SalesAndQuotationsList({ closeButton, openDocSale, openDocQuotation, docSales, setDocSales, docQuotations, setDocQuotations }: ListaVentasCotizacionesProp) {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { id: branchId } = useSelector((s: RootState) => s.Branch);

    // const [docSales, setDocSales] = useState<DocSale[]>([]);
    // const [docQuotations, setDocQuotations] = useState<DocQuotation[]>([]);

    const dispatch = useDispatch<AppDispatch>();

    const { data: dateRange, handleInputChange } = useForm<DateRange>(initDateRange);
    const { data: dataView, handleInputChange: verHandleChange } = useForm<{ ver: string }>({ ver: 'ventas' });

    const filterDocs = () => {
        const fromStr = new Date(dateRange.from);
        fromStr.setHours(fromStr.getHours() + 4); // Ajustamos a la hora de Bolivia
        const from = fromStr.getTime().toString();

        const toStr = new Date(dateRange.to);
        toStr.setHours(toStr.getHours() + 28); // Ajustamos a la hora de Bolivia
        const to = toStr.getTime().toString();

        dispatch(getDocSalesAPI({ from, to, branchId }, setDocSales));
        dispatch(getDocQuotationsAPI({ from, to, branchId }, setDocQuotations));
    }

    useEffect(() => {
        filterDocs();
    }, [])

    return (
        <Windows tittle="LISTA DE VENTAS Y COTIZACIONES" closeButton={closeButton} >

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
                    value={dataView.ver}
                />

            </div>

            <div className="h-[40vh] overflow-y-scroll scroll-custom ps-2" >
                <table className=" table-fixed text-left w-full border-collapse border-secondary" >
                    <thead className="bg-secondary text-white sticky top-0 rounded-t-lg">
                        {dataView.ver === 'ventas' ?
                            <tr>
                                <th className="uppercase text-center w-[40px]">#</th>
                                <th className="uppercase text-center w-[180px]">FECHA</th>
                                <th className="uppercase text-center">CLIENTE</th>
                                <th className="uppercase text-center w-[100px]">ESTADO</th>
                                <th className="uppercase text-center w-[80px]">MAS</th>
                            </tr>
                            :
                            <tr>
                                <th className="uppercase text-center w-[40px]">#</th>
                                <th className="uppercase text-center w-[180px]">FECHA</th>
                                <th className="uppercase text-center w-[200px]">CLIENTE</th>
                                <th className="uppercase text-center">DETALLE</th>
                                <th className="uppercase text-center w-[80px]">MAS</th>
                            </tr>
                        }
                    </thead>
                    <tbody>
                        {dataView.ver === 'ventas' ?
                            <>
                                {(docSales.length <= 0) && <tr><td colSpan={4} className="text-center text-secondary" >No se registraron ventas en este rango de fechas.</td></tr>}
                                {docSales.map(doc => (
                                    <tr key={doc.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                        <td className="text-center" >{doc.number}</td>
                                        <td className="text-center">{dateLocalWhitTime(doc.createdAt || '')}</td>
                                        <td className="text-center">{doc.customerName.toUpperCase()}</td>
                                        <td className="text-center">
                                            {(doc.isPaid && !doc.canceled) &&
                                                <span className="rounded-full px-2 bg-success/80 text-[12px] flex items-center "><IoIosCheckmarkCircle className="me-auto" /> PAGADO</span>
                                            }
                                            {(!doc.isPaid && !doc.canceled) &&
                                                <span className="rounded-full px-2 bg-warning text-[12px] flex items-center"><TiWarning className="me-auto" />POR PAGAR</span>
                                            }
                                            {doc.canceled &&
                                                <span className="rounded-full px-2 bg-danger text-[12px] flex items-center"><IoCloseCircle className="me-auto" />ANULADO</span>
                                            }
                                        </td>
                                        <td className="text-center text-secondary">
                                            <button type="button" onClick={() => { openDocSale(doc) }} ><BsBoxArrowInUpRight /></button>
                                        </td>
                                    </tr>
                                ))}
                            </>
                            :
                            <>
                                {(docQuotations.length <= 0) && <tr><td colSpan={4} className="text-center text-secondary" >No se registraron cotizaciones en este rango de fechas.</td></tr>}
                                {docQuotations.map(doc => (
                                    <tr key={doc.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                        <td className="text-center" >{doc.number}</td>
                                        <td className="text-center">{dateLocalWhitTime(doc.createdAt || '')}</td>
                                        <td className="text-center">{doc.customerName.toUpperCase()}</td>
                                        <td className="text-center">{doc.details ? doc.details.toUpperCase() : ''}</td>
                                        <td className="text-center text-secondary">
                                            <button type="button" onClick={() => { openDocQuotation(doc) }} ><BsBoxArrowInUpRight /></button>
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