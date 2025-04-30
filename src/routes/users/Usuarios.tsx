import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getUsersModuleDataAPI } from "../../redux/branch/branchThunk";
import LoadingModule from "../../components/LoadingModule";

export default function Usuarios() {
  const {id: branchId} = useSelector((s:RootState) => s.Branch);
  const {loadingModule} = useSelector((s:RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUsersModuleDataAPI(branchId));
  }, [])
  return (
    <>
      {loadingModule&& <LoadingModule title="Cargando datos de los usuarios..." />   }   
      <Outlet/>
    </>
  );
}