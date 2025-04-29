import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";

import LoadingSection from "../../components/LoadingSection";

import { getAllCategoriasAPI, getAllMarcasAPI, getAllProductosAPI } from "../../redux/products/productosThunk";

import { getAllAlmacenesAPI } from "../../redux/warehouses/almacenThunks";

export default function Warehouses() {
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  const { id } = useSelector((s: RootState) => s.Branch);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllAlmacenesAPI("LOADING-APP-START"));
    dispatch(getAllMarcasAPI());
    dispatch(getAllCategoriasAPI());
    dispatch(getAllProductosAPI("LOADING-APP-FINISH"));
  }, [id])

  return (
    <>
      {loadingApplication && <LoadingSection title="Cargando la lista de almacenes…" />}
      <Outlet />
    </>
  );
}