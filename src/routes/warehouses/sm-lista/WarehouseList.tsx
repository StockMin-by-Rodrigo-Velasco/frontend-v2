import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import WarehouseCard from "./components/WarehouseCard";
import BodySection from "../../../components/BodySection";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import CreateWarehouse from "./windows/CreateWarehouse";
import { getProductsWarehouseAPI } from "../../../redux/warehouses/warehousesThunk";
import FooterSection from "../../../components/FooterSection";

export default function WarehouseList() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { warehouses, warehouseSelected } = useSelector((s: RootState) => s.Warehouses);
  const [openCreateAlmacenWindow, setOpenCreateAlmacenWindow] = useState(false);

  useEffect(() => {
    if (warehouseSelected.id !== '') {
      dispatch(getProductsWarehouseAPI());
      navigate(`/main/warehouses/list/${warehouseSelected.id}`);
    }
  }, [warehouseSelected.id])

  return (warehouseSelected.id ?
    <>
      <Outlet />
    </>
    :
    <>
      {openCreateAlmacenWindow && <CreateWarehouse closeButton={() => { setOpenCreateAlmacenWindow(false) }} />}

      <BodySection>
        <h1 className="text-[30px] text-secondary border-b-2 border-secondary mb-5" >ALMACENES</h1>
        <div className="flex flex-wrap justify-evenly" >
          {warehouses.map(a => (
            <WarehouseCard key={a.id} warehouse={a} />
          ))}
        </div>
      </BodySection>
      <FooterSection>
        <span className="bg-secondary text-white text-[12px] px-2 rounded-full" > {warehouses.length} Almacenes</span>
        <button
          onClick={() => { setOpenCreateAlmacenWindow(true) }}
          type="button"
          className="ms-auto py-1 px-2 rounded-full flex justify-center items-center bg-primary bg-opacity-80 text-white hover:bg-opacity-100"
        >
          <FaPlus className="me-2" /> Agregar
        </button>
      </FooterSection>

    </>
  );
}