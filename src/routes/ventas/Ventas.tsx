import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllClientesVentaAPI, getAllPrecioVentaAPI, getAllTipoMonedaVentaAPI, getOpcionesVentaAPI } from "../../redux/ventas/ventasThunk";
import { getAllAlmacenesAPI } from "../../redux/almacenes/almacenThunks";
import LoadingSection from "../../components/LoadingSection";
import { getAllCategoriasAPI, getAllMarcasAPI, getAllProductosAPI } from "../../redux/productos/productosThunk";

export default function Ventas() {
  const { id } = useSelector((s: RootState) => s.Sucursal);
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();



  useEffect(() => {
    dispatch(getAllProductosAPI());
    dispatch(getAllCategoriasAPI());
    dispatch(getAllMarcasAPI());

    dispatch(getAllAlmacenesAPI());

    dispatch(getOpcionesVentaAPI(navigate));
    dispatch(getAllClientesVentaAPI());
    dispatch(getAllTipoMonedaVentaAPI());
    dispatch(getAllPrecioVentaAPI());
  }, [id])

  return (
    <>
      { loadingApplication&& <LoadingSection title="Cargando datos de la tienda" />}
      <Outlet />

    </>
  );
}