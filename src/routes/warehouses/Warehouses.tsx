import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import LoadingModule from "../../components/LoadingModule";
import { useEffect } from "react";
import { getWarehouseModuleDataAPI } from "../../redux/warehouses/warehousesThunk";

export default function Warehouses() {
  const { loadingModule } = useSelector((s: RootState) => s.Aplication);
  const { id } = useSelector((s: RootState) => s.Branch);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getWarehouseModuleDataAPI());
  }, [id])

  return (
    <>
      {loadingModule && <LoadingModule title="Cargando la lista de almacenes…" />}
      <Outlet />
    </>
  );
}