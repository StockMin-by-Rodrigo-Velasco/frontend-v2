import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllCategoriasAPI, getAllLogsAPI, getAllMarcasAPI, getAllProductosAPI, getAllUnidadesMedidaAPI } from "../../redux/productos/productosThunk";

export default function Productos() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useSelector((s:RootState) => s.Sucursal);


  useEffect(() => {
    dispatch( getAllProductosAPI());
    dispatch( getAllMarcasAPI());
    dispatch( getAllCategoriasAPI());
    dispatch( getAllLogsAPI());
    dispatch( getAllUnidadesMedidaAPI() );
  }, [id])
  
  return (
    <>
      <Outlet/>
    </>
  );
}