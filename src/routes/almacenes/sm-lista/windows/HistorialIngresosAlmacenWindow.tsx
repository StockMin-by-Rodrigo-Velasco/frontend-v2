import { useEffect, useState } from "react";
import Windows from "../../../../components/Windows";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { getAllIngresosProductosAlmacenAPI } from '../../../../redux/almacenes/almacenThunks';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { dateLocalWhitTime } from "../../../../helpers";
import { IngresoAlmacen } from "../../../../interface";
import { useForm } from "../../../../hooks";
import { InputDateSearch } from "../../../../components/Input";
import { IoSearch } from "react-icons/io5";
import { clearIngresosProductosAlmacen } from "../../../../redux/almacenes/almacenesSlice";
import { AiOutlineLoading } from "react-icons/ai";
import ViewIngresoProductoAlmacenWindow from "./ViewIngresoProductoAlmacenWindow";


interface HistorialIngresosAlmacenWindowProp {
  closeButton: () => void;
}

interface DateRange {
  desde: string,
  hasta: string
}

const initDateRange: DateRange = {
  desde: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
  hasta: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split("T")[0],
}

const initialStateIngresoAlmacen: IngresoAlmacen = {
  id:'',
  almacenId:'',
  detalle: '',
  usuarioId: '',
  IngresoProductosAlmacen: [],
  createdAt:''
}


export default function HistorialIngresosAlmacenWindow({ closeButton }: HistorialIngresosAlmacenWindowProp) {
  
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { historialIngresosAlmacen } = useSelector((s: RootState) => s.Almacenes);

  const [openViewIngresoProductoAlmacenWindow, setOpenViewIngresoProductoAlmacenWindow] = useState(false);
  const [ingresosData, setIngresosData] = useState<IngresoAlmacen>(initialStateIngresoAlmacen)

  const dispatch = useDispatch<AppDispatch>();

  const { data: dateRange, handleInputChange } = useForm<DateRange>(initDateRange);

  const getIngreso = (data: IngresoAlmacen) => {
    // console.log(data);
    setIngresosData(data);
    setOpenViewIngresoProductoAlmacenWindow(true);
  }

  const filterIngresos = () => {
    const desdeStr = new Date(dateRange.desde);
    desdeStr.setHours(desdeStr.getHours() + 4); // Ajustamos a la hora de Bolivia
    const desde = desdeStr.getTime().toString();

    const hastaStr = new Date(dateRange.hasta);
    hastaStr.setHours(hastaStr.getHours() + 28); // Ajustamos a la hora de Bolivia
    const hasta = hastaStr.getTime().toString();

    dispatch(getAllIngresosProductosAlmacenAPI(desde, hasta, "LOADING-DATA-COMPLETE"));
  }

  useEffect(() => {
    filterIngresos();
    return () => {
      dispatch(clearIngresosProductosAlmacen());
    }
  }, [])

  return (
    <Windows tittle="HISTORIAL DE INGRESOS" closeButton={closeButton} >

      {openViewIngresoProductoAlmacenWindow&& 
      <ViewIngresoProductoAlmacenWindow 
        closeButton={() => { setOpenViewIngresoProductoAlmacenWindow(false) }} 
        data={ingresosData}
      /> }


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
            onClick={filterIngresos}
            type="button"
            disabled={loadingData}
            className="me-2 w-7 h-7 bg-primary bg-opacity-80 text-white flex justify-center items-center rounded-full hover:bg-opacity-100 disabled:bg-secondary"
          > {loadingData? <AiOutlineLoading className="animate-spin"/> : <IoSearch/>}</button>
        </div>

      </div>

      <div className="h-[40vh] overflow-y-scroll scroll-custom ps-2" >
        <table className=" table-fixed text-left w-full border-collapse border-secondary" >
          <thead className="bg-secondary text-white sticky top-0 rounded-t-lg">
            <tr>
              <th className="uppercase text-center w-[180px]">FECHA</th>
              <th className="uppercase text-center">DETALLE</th>
              <th className="uppercase text-center w-[80px]">MAS</th>
            </tr>
          </thead>
          <tbody>
            {historialIngresosAlmacen.map(i => (
              <tr key={i.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                <td>{dateLocalWhitTime(i.createdAt)}</td>
                <td>{i.detalle}</td>
                <td className="text-center text-secondary">
                  <button type="button" onClick={() => { getIngreso(i) }} ><BsBoxArrowInUpRight /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>


    </Windows>
  );
}