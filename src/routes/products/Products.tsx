import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllCategoriasAPI, getAllMarcasAPI, getAllProductosAPI, getAllUnidadesMedidaAPI, getAllUnidadesMedidaSucursalAPI } from '../../redux/products/productosThunk';

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useSelector((s:RootState) => s.Branch);


  useEffect(() => {
    dispatch( getAllMarcasAPI("LOADING-APP-START"));
    dispatch( getAllCategoriasAPI());
    dispatch( getAllUnidadesMedidaAPI());
    dispatch( getAllUnidadesMedidaSucursalAPI());
    dispatch( getAllProductosAPI("LOADING-APP-FINISH"));
  }, [id])
  
  return (
    <>
      <Outlet/>
    </>
  );
}