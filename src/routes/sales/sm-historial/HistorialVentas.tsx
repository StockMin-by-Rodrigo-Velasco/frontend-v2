// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../redux/store";
// import LoadingModule from "../../../components/LoadingModule";
// import { useEffect, useState } from "react";
// import HeaderSection from "../../../components/HeaderSection";
// import BodySection from "../../../components/BodySection";
// import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from "../../../components/DataTable";
// import { InputDateSearch } from "../../../components/Input";
// import { useForm } from "../../../hooks";
// import { IoSearch } from "react-icons/io5";
// import LogDetailsWindows from "./windows/LogDetailsWindows";
// import { getLogsVentasAPI } from "../../../redux/sales/ventasThunk";
// import { Log } from "../../../interface";


// const columns: DataTableColumnInterface<Log>[] = [
//   { name: 'ACCIÓN', type: DataTableColumnTypes.P, key: "titulo" },
//   { name: 'FECHA', type: DataTableColumnTypes.DATE, key: "createdAt" },
// ];

// interface DateRange{
//   desde: string,
//   hasta: string
// }

// const initDateRange: DateRange = {
//   desde: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
//   hasta: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split("T")[0],
// }

// export default function HistorialVentas() {
//   const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
//   const { listaLogs } = useSelector((s: RootState) => s.Ventas);
//   const dispatch = useDispatch<AppDispatch>();
//   const [logDetails, setLogDetails] = useState<Log>({id:'', sucursalId:'', titulo:'', descripcion:'', createdAt:'', userId:''});
//   const [logDetailsWindows, setlogDetailsWindows] = useState(false);

//   const { data: dateRange, handleInputChange} = useForm<DateRange>(initDateRange);

//   const getLog = (log: Log) => {
//     setlogDetailsWindows(true);
//     setLogDetails(log);
//   }

//   const filterLogs = () => {
//     const desdeStr = new Date(dateRange.desde);
//     desdeStr.setHours(desdeStr.getHours() + 4); // Ajustamos a la hora de Bolivia
//     const desde = desdeStr.getTime().toString();

//     const hastaStr = new Date(dateRange.hasta);
//     hastaStr.setHours(hastaStr.getHours() + 28); // Ajustamos a la hora de Bolivia
//     const hasta = hastaStr.getTime().toString();   
//     dispatch(getLogsVentasAPI(desde, hasta, "LOADING-APP-COMPLETE"));
//   }

//   useEffect(() => {
//     filterLogs();
//   }, [])

//   return (
//     <>
//       {loadingApplication&& <LoadingModule title="Cargando historial" />}
//       {logDetailsWindows&& <LogDetailsWindows log={logDetails} closeButton={() => {setlogDetailsWindows(false)}} />  }
//       <HeaderSection>
//         <InputDateSearch 
//           placeholder="Desde: " 
//           name="desde"
//           handleInputChange={handleInputChange}
//           value={dateRange.desde}
//         />
//         <InputDateSearch 
//           className="ms-3"
//           placeholder="Hasta: " 
//           name="hasta"
//           handleInputChange={handleInputChange}
//           value={dateRange.hasta}
//         />

//         <div className="ms-3 flex items-center" >
//           <button
//             onClick={filterLogs}
//             type="button"
//             className="me-2 w-7 h-7 bg-primary bg-opacity-80 text-white flex justify-center items-center rounded-full hover:bg-opacity-100"
//           ><IoSearch/></button>
//         </div>
//       </HeaderSection>
//       <BodySection>
//         <DataTable<Log> columns={columns} data={listaLogs} details={{ name: 'MAS', action: getLog }} />
//       </BodySection>
//     </>
//   );
// }