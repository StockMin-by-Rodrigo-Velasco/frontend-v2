import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { AppDispatch } from "../../redux/store";
import { getAllClientesVentaAPI } from "../../redux/ventas/ventasThunk";

export default function Ventas() {
  const dispatch = useDispatch<AppDispatch>()

  

  useEffect(() => {
    dispatch(getAllClientesVentaAPI());
    
  }, [])
  
  return (
    <>
      <Outlet/>
    </>
  );
}