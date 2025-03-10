import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllCategoriasAPI, getAllMarcasAPI, getAllProductosAPI, getAllUnidadesMedidaAPI, getAllUnidadesMedidaSucursalAPI } from '../../redux/productos/productosThunk';

export default function Productos() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useSelector((s:RootState) => s.Sucursal);


  useEffect(() => {
    dispatch( getAllProductosAPI());
    dispatch( getAllMarcasAPI());
    dispatch( getAllCategoriasAPI());
    dispatch( getAllUnidadesMedidaAPI());
    dispatch( getAllUnidadesMedidaSucursalAPI());
  }, [id])
  
  return (
    <>
      <Outlet/>
    </>
  );
}