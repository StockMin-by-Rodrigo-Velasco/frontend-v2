import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import LoadingSection from "../../../components/LoadingSection";
import { useEffect, useState } from "react";
import HeaderSection from "../../../components/HeaderSection";
import BodySection from "../../../components/BodySection";
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from "../../../components/DataTable";
import { getLogsAPI } from "../../../redux/productos/productosThunk";
import { InputDateSearch } from "../../../components/Input";
import { useForm } from "../../../hooks";
import { IoSearch } from "react-icons/io5";
import LogDetailsWindows from "./windows/LogDetailsWindows";

interface LogInterface {
  id: string;
  sucursalId: string;
  userId: string;
  titulo: string;
  descripcion: string;
  createdAt: number;
}
const columns: DataTableColumnInterface<LogInterface>[] = [
  { name: 'ACCIÓN', type: DataTableColumnTypes.P, key: "titulo" },
  { name: 'FECHA', type: DataTableColumnTypes.DATE, key: "createdAt" },
];

interface DateRange{
  desde: string,
  hasta: string
}

const initDateRange: DateRange = {
  desde: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
  hasta: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split("T")[0],
}

export default function HistorialProductos() {
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  const { listaLogs } = useSelector((s: RootState) => s.Productos);
  const dispatch = useDispatch<AppDispatch>();
  const [logDetails, setLogDetails] = useState<LogInterface>({id:'', sucursalId:'', titulo:'', descripcion:'', createdAt:0, userId:''});
  const [logDetailsWindows, setlogDetailsWindows] = useState(false);

  const { data: dateRange, handleInputChange} = useForm<DateRange>(initDateRange);

  const getLog = (log: LogInterface) => {
    setlogDetailsWindows(true);
    setLogDetails(log);
  }

  const filterLogs = () => {
    const desdeStr = new Date(dateRange.desde);
    desdeStr.setHours(desdeStr.getHours() + 4); // Ajustamos a la hora de Bolivia
    const desdeNum = desdeStr.getTime();

    const hastaStr = new Date(dateRange.hasta);
    hastaStr.setHours(hastaStr.getHours() + 28); // Ajustamos a la hora de Bolivia
    const hastaNum = hastaStr.getTime();

    // const fechaDesde = new Date(desdeNum).toLocaleDateString("es-ES", {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute: '2-digit', second:'2-digit', hour12: false});
    // const fechaHasta = new Date(hastaNum).toLocaleDateString("es-ES", {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute: '2-digit', second:'2-digit', hour12: false});
    // console.log('desde',fechaDesde);
    // console.log('hasta',fechaHasta);
    // console.log( desdeNum, hastaNum );

    dispatch(getLogsAPI(desdeNum, hastaNum));
  }

  useEffect(() => {
    filterLogs()
  }, [])

  return (
    <>
      {loadingApplication&& <LoadingSection title="Cargando historial" />}
      {logDetailsWindows&& <LogDetailsWindows log={logDetails} closeButton={() => {setlogDetailsWindows(false)}} />  }
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
          ><IoSearch/></button>
        </div>

        {/* <button
          onClick={refreshLogs}
          type="button"
          className=" ms-auto me-2 w-7 h-7 text-primary flex justify-center items-center rounded-full hover:bg-secondary-1"
        ><HiRefresh /></button> */}
      </HeaderSection>
      <BodySection>
        <DataTable<LogInterface> columns={columns} data={listaLogs} details={{ name: 'MAS', action: getLog }} />
      </BodySection>
    </>
  );
}