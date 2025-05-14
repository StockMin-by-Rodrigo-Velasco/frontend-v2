import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getUsersModuleDataAPI } from "../../redux/branch/branchThunk";
import LoadingModule from "../../components/LoadingModule";

export default function Usuarios() {
  const {loadingModule} = useSelector((s:RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsersModuleDataAPI(navigate));
  }, [])
  return (
    <>
      {loadingModule&& <LoadingModule title="Cargando datos de los usuarios..." />   }   
      <Outlet/>
    </>
  );
}