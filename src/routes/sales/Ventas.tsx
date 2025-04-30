import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllClientesVentaAPI, getAllPrecioVentaAPI, getAllTipoMonedaVentaAPI, getOpcionesVentaAPI } from "../../redux/sales/ventasThunk";
import { getAllAlmacenesAPI } from "../../redux/warehouses/almacenThunks";
import LoadingModule from "../../components/LoadingModule";
import { getAllCategoriasAPI, getAllMarcasAPI, getAllProductosAPI } from "../../redux/products/productosThunk";

export default function Ventas() {
  const { id } = useSelector((s: RootState) => s.Branch);
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();



  useEffect(() => {
    dispatch(getAllAlmacenesAPI("LOADING-APP-START"));
    
    dispatch(getOpcionesVentaAPI(navigate));
    dispatch(getAllClientesVentaAPI());
    dispatch(getAllTipoMonedaVentaAPI());
    dispatch(getAllPrecioVentaAPI());

    dispatch(getAllCategoriasAPI());
    dispatch(getAllMarcasAPI());
    dispatch(getAllProductosAPI("LOADING-APP-FINISH"));
  }, [id])

  return (
    <>
      { loadingApplication&& <LoadingModule title="Cargando datos de la tienda" />}
      <Outlet />

    </>
  );
}