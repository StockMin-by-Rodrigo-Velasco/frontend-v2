import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import LoadingModule from "../../../components/LoadingModule";
import { useEffect, useState } from "react";
import HeaderSection from "../../../components/HeaderSection";
import BodySection from "../../../components/BodySection";
import { InputDateSearch } from "../../../components/Input";
import { useForm } from "../../../hooks";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import CreateDocTransfer from "./windows/CreateDocTransfer";
import { AiOutlineLoading } from "react-icons/ai";
import { dateLocalWhitTime } from '../../../helpers/dateConvert';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { DateRange, initDateRange } from "../../../interfaces/formInterface";
import { DocTransfer, GetDocTransfersDto, initialDocTransfer, Warehouse } from "../../../interfaces";
import { getDocTransfersAPI } from "../../../redux/warehouses/warehousesThunk";
import ViewDocTransfer from "./windows/ViewDocTransfer";
import FooterSection from "../../../components/FooterSection";

export default function Transfers() {
    const { loadingApplication, loadingData } = useSelector((s: RootState) => s.Aplication);
    const { warehouses, docTransfers } = useSelector((s: RootState) => s.Warehouses);
    const { id: branchId } = useSelector((s: RootState) => s.Branch);

    const warehousesObj = warehouses.reduce((acc, a) => { acc[a.id] = a; return acc; }, {} as Record<string, Warehouse>);

    const dispatch = useDispatch<AppDispatch>();

    const [traspasoSelected, setTraspasoSelected] = useState<DocTransfer>(initialDocTransfer);


    const [openViewDocTransfer, setOpenViewDocTransfer] = useState(false);
    const [openCreateDocTransfer, setOpenCreateDocTransfer] = useState(false);

    const { data: dateRange, handleInputChange } = useForm<DateRange>(initDateRange);


    const getDocTransfer = (traspaso: DocTransfer) => {
        setOpenViewDocTransfer(true);
        setOpenCreateDocTransfer(false);
        setTraspasoSelected(traspaso);
    }

    const filterDocTransfers = () => {
        const desdeStr = new Date(dateRange.from);
        desdeStr.setHours(desdeStr.getHours() + 4); // Ajustamos a la hora de Bolivia
        const from = desdeStr.getTime().toString();

        const hastaStr = new Date(dateRange.to);
        hastaStr.setHours(hastaStr.getHours() + 28); // Ajustamos a la hora de Bolivia
        const to = hastaStr.getTime().toString();

        const getTraspasosAlmacenDto: GetDocTransfersDto = { branchId, from, to };
        dispatch(getDocTransfersAPI(getTraspasosAlmacenDto));
    }

    useEffect(() => {
        filterDocTransfers();
    }, [])

    return (
        <>
            {loadingApplication && <LoadingModule title="Cargando historial" />}
            {openCreateDocTransfer && <CreateDocTransfer closeButton={() => { setOpenCreateDocTransfer(false) }} getDocTransfer={getDocTransfer} />}
            {openViewDocTransfer && <ViewDocTransfer closeButton={() => { setOpenViewDocTransfer(false) }} data={traspasoSelected} />}

            <HeaderSection>
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
                        onClick={filterDocTransfers}
                        type="button"
                        disabled={loadingData}
                        className={`${loadingData ? 'bg-secondary' : 'bg-primary'} me-2 w-7 h-7 bg-opacity-80 text-white flex justify-center items-center rounded-full hover:bg-opacity-100 disabled:bg-opacity-80`}
                    >{loadingData ? <AiOutlineLoading className="animate-spin" /> : <IoSearch />}</button>
                </div>

            </HeaderSection>
            <BodySection>
                <table className="table-auto w-full text-left">
                    <thead className="bg-primary text-white sticky top-0">
                        <tr>
                            <th className="uppercase text-center">FECHA</th>
                            <th className="uppercase text-center">RESPONSABLE</th>
                            <th className="uppercase text-center">ORIGEN</th>
                            <th className="uppercase text-center">DESTNO</th>
                            <th className="uppercase text-center">MAS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {docTransfers.map(t => (
                            <tr key={t.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                <td className="py-2 text-center"> {dateLocalWhitTime(t.createdAt || '')} </td>
                                <td className="py-2 text-center"> {`${t.User.name} ${t.User.lastName}`} </td>
                                <td className="py-2 text-center">{warehousesObj[t.originWarehouseId].name}</td>
                                <td className="py-2 text-center">{warehousesObj[t.destinationWarehouseId].name}</td>
                                <td className="text-center text-secondary" >
                                    <button type="button" onClick={() => { getDocTransfer(t) }} ><BsBoxArrowInUpRight /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </BodySection>

            <FooterSection>
                <span className="bg-secondary text-white text-[12px] px-2 rounded-full" > {docTransfers.length} Traspasos</span>
                <button
                    onClick={() => { setOpenCreateDocTransfer(true) }}
                    type="button"
                    className="ms-auto py-1 px-2 rounded-full flex justify-center items-center bg-primary bg-opacity-80 text-white hover:bg-opacity-100"
                >
                    <FaPlus className="me-2" /> Agregar
                </button>
            </FooterSection>
        </>
    );
}