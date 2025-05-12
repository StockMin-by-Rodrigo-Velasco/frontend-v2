import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import WarehouseCard from "./components/WarehouseCard";
import BodySection from "../../../components/BodySection";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import CreateWarehouse from "./windows/CreateWarehouse";
import { getProductsWarehouseAPI } from "../../../redux/warehouses/warehousesThunk";

export default function WarehouseList() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { warehouses, warehouseSelected } = useSelector((s: RootState) => s.Warehouses);
  const [openCreateAlmacenWindow, setOpenCreateAlmacenWindow] = useState(false);

  useEffect(() => {
    if(warehouseSelected.id !== '') {
      dispatch(getProductsWarehouseAPI());
      navigate(`/main/warehouses/list/${warehouseSelected.id}`);
    }
  }, [warehouseSelected.id])
  
  return ( warehouseSelected.id?
    <>
        <Outlet/>
    </>
    :
    <>
      {openCreateAlmacenWindow&& <CreateWarehouse closeButton={() => {setOpenCreateAlmacenWindow(false)}}/>}

      <BodySection>
        <h1 className="text-[30px] text-secondary border-b-2 border-secondary mb-5" >ALMACENES</h1>
        <div className="flex flex-wrap justify-evenly" >
          {warehouses.map(a => (
            <WarehouseCard key={a.id} warehouse={a} />
          ))}
        </div>
      </BodySection>

      <button
        onClick={() => { setOpenCreateAlmacenWindow(true) }}
        type="button"
        className="absolute bottom-2 right-2 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[22px] hover:bg-opacity-100 w-14 h-14 rounded-full"
      >
        <FaPlus />
      </button>
    </>
  );
}