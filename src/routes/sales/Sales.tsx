import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { RootState } from "../../redux/store";
// import { getAllClientesVentaAPI, getAllPrecioVentaAPI, getAllTipoMonedaVentaAPI, getOpcionesVentaAPI } from "../../redux/sales/ventasThunk";
// import { getAllAlmacenesAPI } from "../../redux/warehouses/almacenThunks";
import LoadingModule from "../../components/LoadingModule";
// import { getCategoriesAPI, getBrandsAPI, getProductsAPI } from "../../redux/products/productosThunk";

export default function Sales() {
  const { id } = useSelector((s: RootState) => s.Branch);
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  // const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();



  useEffect(() => {
    // dispatch(getAllAlmacenesAPI("LOADING-APP-START"));
    
    // dispatch(getOpcionesVentaAPI(navigate));
    // dispatch(getAllClientesVentaAPI());
    // dispatch(getAllTipoMonedaVentaAPI());
    // dispatch(getAllPrecioVentaAPI());

    // dispatch(getCategoriesAPI());
    // dispatch(getBrandsAPI());
    // dispatch(getProductsAPI("LOADING-APP-FINISH"));
  }, [id])

  return (
    <>
      { loadingApplication&& <LoadingModule title="Cargando datos de la tienda" />}
      <Outlet />

    </>
  );
}