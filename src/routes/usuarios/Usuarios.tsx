import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { AppDispatch } from "../../redux/store";
import { getAllPermisosAPI } from "../../redux/sucursal/sucursalThunk";

export default function Usuarios() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllPermisosAPI());
  }, [])
  return (
    <>
      <Outlet/>
    </>
  );
}