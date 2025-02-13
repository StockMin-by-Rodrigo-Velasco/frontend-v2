import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllCategoriasAPI, getAllMarcasAPI, getAllProductosAPI } from "../../redux/productos/productosThunk";
import LoadingSection from "../../components/LoadingSection";

export default function Productos() {
  const dispatch = useDispatch<AppDispatch>();
  const { loadingApplication } = useSelector((s:RootState) => s.Aplication);
  const { id } = useSelector((s:RootState) => s.Sucursal);


  useEffect(() => {
    dispatch( getAllProductosAPI() );
    dispatch( getAllMarcasAPI() );
    dispatch( getAllCategoriasAPI() );
  }, [id])
  
  return (
    <>
      {loadingApplication&& <LoadingSection title="Cargando productos"/>}
      <Outlet/>
    </>
  );
}