import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getProductModuleDataAPI } from "../../redux/products/productsThunk";
import LoadingModule from "../../components/LoadingModule";

export default function Products() {
  const {loadingModule} = useSelector((s:RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductModuleDataAPI(navigate));
  }, [])
  
  return (
    <>
      {loadingModule&& <LoadingModule title="Cargando datos de productos..." />}
      <Outlet/>
    </>
  );
}