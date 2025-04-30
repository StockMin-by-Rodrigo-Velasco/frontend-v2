import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import LoadingModule from "../../../components/LoadingModule";
import { useEffect, useState } from "react";
import HeaderSection from "../../../components/HeaderSection";
import BodySection from "../../../components/BodySection";
import { InputDateSearch } from "../../../components/Input";
import { useForm } from "../../../hooks";
import { IoSearch } from "react-icons/io5";
import { Almacen, DocTraspasoProductoAlmacen, User } from "../../../interface";
import { FaPlus } from "react-icons/fa";
import CreateTraspasoAlmacen from "./windows/CreateTraspasoAlmacen";
import { getAllTraspasosProductosAlmacenAPI } from "../../../redux/warehouses/almacenThunks";
import { AiOutlineLoading } from "react-icons/ai";
import { dateLocalWhitTime } from '../../../helpers/dateConvert';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import ViewTraspasoAlmacen from "./windows/ViewTraspasoAlmacen";



interface DateRange {
    desde: string,
    hasta: string
}

const initDateRange: DateRange = {
    desde: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
    hasta: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split("T")[0],
}

const initialDocTraspaso: DocTraspasoProductoAlmacen = {
    id: '',
    sucursalId: '',
    almacenDestinoId: '',
    almacenOrigenId: '',
    createdAt: '',
    usuarioId: '',
    TraspasoProductoAlmacen: []
}

export default function TraspasosAlmacenes() {
    const { loadingApplication, loadingData } = useSelector((s: RootState) => s.Aplication);
    const { listaAlmacenes, historialTraspasos } = useSelector((s: RootState) => s.Almacenes);
    const { listUsers: users } = useSelector((s: RootState) => s.Branch);

    const listaAlmacenesObj = listaAlmacenes.reduce((acc, a) => { acc[a.id] = a; return acc; }, {} as Record<string, Almacen>);
    const listaUsersObj = users.reduce((acc, u) => { acc[u.id] = u; return acc; }, {} as Record<string, User>);

    const dispatch = useDispatch<AppDispatch>();

    const [traspasoSelected, setTraspasoSelected] = useState<DocTraspasoProductoAlmacen>(initialDocTraspaso);


    const [openViewTraspaso, setOpenViewTraspaso] = useState(false);
    const [openCreateTraspasoAlmacen, setOpenCreateTraspasoAlmacen] = useState(false);

    const { data: dateRange, handleInputChange } = useForm<DateRange>(initDateRange);


    const getTraspaso = (traspaso: DocTraspasoProductoAlmacen) => {
        setOpenViewTraspaso(true);
        setOpenCreateTraspasoAlmacen(false);
        setTraspasoSelected(traspaso);
    }

    const filterTraspasos = () => {
        const desdeStr = new Date(dateRange.desde);
        desdeStr.setHours(desdeStr.getHours() + 4); // Ajustamos a la hora de Bolivia
        const desde = desdeStr.getTime().toString();

        const hastaStr = new Date(dateRange.hasta);
        hastaStr.setHours(hastaStr.getHours() + 28); // Ajustamos a la hora de Bolivia
        const hasta = hastaStr.getTime().toString();

        dispatch(getAllTraspasosProductosAlmacenAPI(desde, hasta, undefined, "LOADING-APP-COMPLETE"));
    }

    useEffect(() => {
        filterTraspasos();
    }, [])

    return (
        <>
            {loadingApplication && <LoadingModule title="Cargando historial" />}
            {openCreateTraspasoAlmacen && <CreateTraspasoAlmacen closeButton={() => { setOpenCreateTraspasoAlmacen(false) }} getTraspaso={getTraspaso} />}
            {openViewTraspaso && <ViewTraspasoAlmacen closeButton={() => {setOpenViewTraspaso(false)}} traspaso={traspasoSelected} />}

            <HeaderSection>
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
                        onClick={filterTraspasos}
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
                        {historialTraspasos.map(t => (
                            <tr key={t.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                <td className="py-2 text-center"> {dateLocalWhitTime(t.createdAt)} </td>
                                <td className="py-2 text-center"> {`${listaUsersObj[t.usuarioId].nombre} ${listaUsersObj[t.usuarioId].apellido}`} </td>
                                <td className="py-2 text-center">{listaAlmacenesObj[t.almacenOrigenId].nombre}</td>
                                <td className="py-2 text-center">{listaAlmacenesObj[t.almacenDestinoId].nombre}</td>
                                <td className="text-center text-secondary" >
                                    <button type="button" onClick={() => {getTraspaso(t)}} ><BsBoxArrowInUpRight /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </BodySection>
            <button
                onClick={() => { setOpenCreateTraspasoAlmacen(true) }}
                type="button"
                className="absolute bottom-2 right-2 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[22px] hover:bg-opacity-100 w-14 h-14 rounded-full"
            >
                <FaPlus />
            </button>
        </>
    );
}