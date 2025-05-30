import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import LoadingModule from "../../components/LoadingModule";
import { getSalesModuleDataAPI } from "../../redux/sales/salesThunk";


export default function Sales() {
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();



  useEffect(() => {
    dispatch(getSalesModuleDataAPI(navigate));
  }, [])

  return (
    <>
      { loadingApplication&& <LoadingModule title="Cargando datos de la tienda" />}
      <Outlet />
    </>
  );
}