import { Outlet } from "react-router";
import LoadingSection from "../../components/LoadingSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getAllAlmacenesAPI } from "../../redux/almacenes/almacenThunks";

export default function Almacenes() {
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  const { id } = useSelector((s: RootState) => s.Sucursal);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllAlmacenesAPI());
  }, [id])
  
  return (
    <>
      {loadingApplication&& <LoadingSection title="Cargando la lista de almacenes…" />}
      <Outlet/>
    </>
  );
}