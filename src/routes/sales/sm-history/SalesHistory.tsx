import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import LoadingModule from "../../../components/LoadingModule";
import { useEffect, useState } from "react";
import HeaderSection from "../../../components/HeaderSection";
import BodySection from "../../../components/BodySection";
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from "../../../components/DataTable";
import { getLogsAPI } from "../../../redux/branch/branchThunk";
import { InputDateSearch } from "../../../components/Input";
import { useForm } from "../../../hooks";
import { IoSearch } from "react-icons/io5";
import LogDetails from "../../../components/LogDetails";
import { Log } from "../../../interfaces";

const columns: DataTableColumnInterface<Log>[] = [
  { name: 'ACCIÓN', type: DataTableColumnTypes.P, key: "title" },
  { name: 'FECHA', type: DataTableColumnTypes.DATE, key: "createdAt" },
];

interface DateRange{
  from: string,
  to: string
}

const initDateRange: DateRange = {
  from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
  to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split("T")[0],
}

export default function SalesHistory() {
  const { id: branchId } = useSelector((s: RootState) => s.Branch);
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  const { logs } = useSelector((s: RootState) => s.Sales);
  const dispatch = useDispatch<AppDispatch>();
  const [logDetails, setLogDetails] = useState<Log>({id:'', branchId:'', title:'', module:'', description:'', createdAt:'', userId:''});
  const [logDetailsWindows, setlogDetailsWindows] = useState(false);

  const { data: dateRange, handleInputChange} = useForm<DateRange>(initDateRange);

  const getLog = (log: Log) => {
    setlogDetailsWindows(true);
    setLogDetails(log);
  }

  const filterLogs = () => {
    const fromStr = new Date(dateRange.from);
    fromStr.setHours(fromStr.getHours() + 4); // Ajustamos a la hora de Bolivia
    const from = fromStr.getTime().toString();

    const toStr = new Date(dateRange.to);
    toStr.setHours(toStr.getHours() + 28); // Ajustamos a la hora de Bolivia
    const to = toStr.getTime().toString();
    
    dispatch(getLogsAPI({from, to, branchId, module:"sales"}));
  }

  useEffect(() => {
    filterLogs()
  }, [])

  return (
    <>
      {loadingApplication&& <LoadingModule title="Cargando historial" />}
      {logDetailsWindows&& <LogDetails log={logDetails} closeButton={() => {setlogDetailsWindows(false)}} />  }
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
            onClick={filterLogs}
            type="button"
            className="me-2 w-7 h-7 bg-primary bg-opacity-80 text-white flex justify-center items-center rounded-full hover:bg-opacity-100"
          ><IoSearch/></button>
        </div>
      </HeaderSection>
      <BodySection>
        <DataTable<Log> columns={columns} data={logs} details={{ name: 'MAS', action: getLog }} />
      </BodySection>
    </>
  );
}