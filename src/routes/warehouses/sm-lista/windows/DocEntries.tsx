import { useEffect, useState } from "react";
import Windows from "../../../../components/Windows";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { dateLocalWhitTime } from "../../../../helpers";
import { useForm } from "../../../../hooks";
import { InputDateSearch } from "../../../../components/Input";
import { IoSearch } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import { DateRange, initDateRange } from "../../../../interfaces/formInterface";
import ViewDocEntry from "./ViewDocEntry";
import { clearDocEntries } from "../../../../redux/warehouses/warehousesSlice";
import { getDocEntriesAPI } from "../../../../redux/warehouses/warehousesThunk";
import { DocEntry, initialDocEntry } from "../../../../interfaces";


interface DocEntriesProp {
  closeButton: () => void;
}


export default function DocEntries({ closeButton }: DocEntriesProp) {
  
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { warehouseSelected, docEntries } = useSelector((s: RootState) => s.Warehouses);

  const [openViewDocEntry, setOpenViewDocEntry] = useState(false);
  const [docEntry, setDocEntry] = useState<DocEntry>(initialDocEntry);

  const dispatch = useDispatch<AppDispatch>();

  const { data: dateRange, handleInputChange } = useForm<DateRange>(initDateRange);

  const getDocEntry = (data: DocEntry) => {
    setDocEntry(data);
    setOpenViewDocEntry(true);
  }

  const filterIngresos = () => {
    const desdeStr = new Date(dateRange.from);
    desdeStr.setHours(desdeStr.getHours() + 4); // Ajustamos a la hora de Bolivia
    const from = desdeStr.getTime().toString();

    const hastaStr = new Date(dateRange.to);
    hastaStr.setHours(hastaStr.getHours() + 28); // Ajustamos a la hora de Bolivia
    const to = hastaStr.getTime().toString();

    dispatch(getDocEntriesAPI({warehouseId: warehouseSelected.id, from, to}));
  }

  useEffect(() => {
    filterIngresos();
    return () => {
      dispatch(clearDocEntries());
    }
  }, [])

  return (
    <Windows tittle="HISTORIAL DE INGRESOS" closeButton={closeButton} >

      {openViewDocEntry&& 
      <ViewDocEntry 
        closeButton={() => { setOpenViewDocEntry(false) }} 
        data={docEntry}
      /> }


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
            {docEntries.map(i => (
              <tr key={i.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                <td>{dateLocalWhitTime(i.createdAt || '')}</td>
                <td>{i.details}</td>
                <td className="text-center text-secondary">
                  <button type="button" onClick={() => { getDocEntry(i) }} ><BsBoxArrowInUpRight /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>


    </Windows>
  );
}