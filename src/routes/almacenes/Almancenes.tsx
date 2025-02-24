import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";

import LoadingSection from "../../components/LoadingSection";

import { getAllCategoriasAPI, getAllMarcasAPI, getAllProductosAPI } from "../../redux/productos/productosThunk";

import { getAllAlmacenesAPI } from "../../redux/almacenes/almacenThunks";

export default function Almacenes() {
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  const { id } = useSelector((s: RootState) => s.Sucursal);
  // const { selectedAlmacen } = useSelector((s: RootState) => s.Almacenes);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllAlmacenesAPI());

    dispatch(getAllProductosAPI());
    dispatch(getAllMarcasAPI());
    dispatch(getAllCategoriasAPI());
  }, [id])

  return (
    <>
      {loadingApplication && <LoadingSection title="Cargando la lista de almacenes…" />}
      <Outlet />
    </>
  );
}