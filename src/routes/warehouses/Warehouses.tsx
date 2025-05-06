import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { useEffect } from "react";

import LoadingModule from "../../components/LoadingModule";

// import { getCategoriesAPI, getBrandsAPI, getProductsAPI } from "../../redux/products/productosThunk";

// import { getAllAlmacenesAPI } from "../../redux/warehouses/almacenThunks";

export default function Warehouses() {
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  // const { id } = useSelector((s: RootState) => s.Branch);

  // const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(getAllAlmacenesAPI("LOADING-APP-START"));
//     dispatch(getBrandsAPI());
//     dispatch(getCategoriesAPI());
//     dispatch(getProductsAPI("LOADING-APP-FINISH"));
//   }, [id])

  return (
    <>
      {loadingApplication && <LoadingModule title="Cargando la lista de almacenes…" />}
      <Outlet />
    </>
  );
}