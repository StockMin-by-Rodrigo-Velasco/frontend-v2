import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import LoadingSection from "../../../components/LoadingSection";
import { useEffect, useState } from "react";
import HeaderSection from "../../../components/HeaderSection";
import BodySection from "../../../components/BodySection";
import { InputDateSearch } from "../../../components/Input";
import { useForm } from "../../../hooks";
import { IoSearch } from "react-icons/io5";
import { getLogsAlmacenesAPI } from "../../../redux/almacenes/almacenThunks";
import { DocTraspasoProductoAlmacen} from "../../../interface";
import { FaPlus } from "react-icons/fa";
import CreateTraspasoAlmacen from "./windows/CreateTraspasoAlmacen";



interface DateRange {
    desde: string,
    hasta: string
}

const initDateRange: DateRange = {
    desde: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
    hasta: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split("T")[0],
}

export default function TraspasosAlmacenes() {
    const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
    const { listaAlmacenes } = useSelector((s: RootState) => s.Almacenes);

    const dispatch = useDispatch<AppDispatch>();

    const [traspasoDetails, setTraspasoDetails] = useState<DocTraspasoProductoAlmacen>({ 
        id: '', sucursalId: '', almacenDestinoId:'', almacenOrigenId:'', createdAt:'', usuarioId:'', TraspasoProductoAlmacen:[]
    });
    const [openViewTraspaso, setOpenViewTraspaso] = useState(false);
    const [openCreateTraspasoAlmacen, setOpenCreateTraspasoAlmacen] = useState(false);

    const { data: dateRange, handleInputChange } = useForm<DateRange>(initDateRange);

    const getTraspaso = (traspaso: DocTraspasoProductoAlmacen) => {
        setOpenViewTraspaso(true);
        setTraspasoDetails(traspaso);
    }

    const filterLogs = () => {
        const desdeStr = new Date(dateRange.desde);
        desdeStr.setHours(desdeStr.getHours() + 4); // Ajustamos a la hora de Bolivia
        const desde = desdeStr.getTime().toString();

        const hastaStr = new Date(dateRange.hasta);
        hastaStr.setHours(hastaStr.getHours() + 28); // Ajustamos a la hora de Bolivia
        const hasta = hastaStr.getTime().toString();

        // dispatch(getLogsAlmacenesAPI(desde, hasta));
    }

    useEffect(() => {
        filterLogs()
    }, [])

    return (
        <>
            {loadingApplication && <LoadingSection title="Cargando historial" />}
            {openCreateTraspasoAlmacen&& <CreateTraspasoAlmacen closeButton={() => {setOpenCreateTraspasoAlmacen(false)}} />}

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
                        onClick={filterLogs}
                        type="button"
                        className="me-2 w-7 h-7 bg-primary bg-opacity-80 text-white flex justify-center items-center rounded-full hover:bg-opacity-100"
                    ><IoSearch /></button>
                </div>

            </HeaderSection>
            <BodySection>
                <table>

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