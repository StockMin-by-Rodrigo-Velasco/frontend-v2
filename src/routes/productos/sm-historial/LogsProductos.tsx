import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import LoadingSection from "../../../components/LoadingSection";
import { useEffect, useState } from "react";
import HeaderSection from "../../../components/HeaderSection";
import BodySection from "../../../components/BodySection";
import DataTable, {DataTableColumnInterface, DataTableColumnTypes} from "../../../components/DataTable";
// import { getAllLogsAPI } from "../../../redux/productos/productosThunk";
import { HiRefresh } from "react-icons/hi";
import { getAllLogsAPI } from "../../../redux/productos/productosThunk";

interface DataInterface {
  id: string;
  sucursalId: string;
  userId: string;
  titulo: string;
  descripcion: string;
  createdAt: number;
}
const columns: DataTableColumnInterface<DataInterface>[] = [
    { name: 'ACCIÓN', type: DataTableColumnTypes.P, key: "titulo"},
    { name: 'FECHA', type: DataTableColumnTypes.DATE , key: "createdAt"},    
  ];

export default function LogsProductos() {
  const {loadingApplication} = useSelector((s:RootState)=>s.Aplication);
  const { listaLogs } = useSelector((s:RootState)=>s.Productos);
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<DataInterface[]>([...listaLogs])

  const getData = (log: DataInterface) => {
    console.log(log);
  }

  const refreshLogs = () => {
    dispatch(getAllLogsAPI());
  }

  useEffect(() => {
    setData(listaLogs);
  }, [listaLogs])
  
  return (
    <>
      {loadingApplication&& <LoadingSection title="Cargando historial"/>}
      <HeaderSection>
        <button
          onClick={refreshLogs}
          type="button" 
          className=" ms-auto me-2 w-7 h-7 text-primary flex justify-center items-center rounded-full hover:bg-secondary-1"
        ><HiRefresh/></button>
      </HeaderSection>
      <BodySection>
        <DataTable<DataInterface> columns={columns} data={data} details={{name: 'MAS', action:getData}} />
      </BodySection>
    </>
  );
}