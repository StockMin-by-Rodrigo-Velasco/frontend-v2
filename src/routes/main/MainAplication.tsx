import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Outlet, useNavigate } from "react-router";
import { verifyTokenSucursalUserByCookieAPI } from "../../redux/sucursal/sucursalThunk";
import Navbar from "./Navbar";

export default function MainAplication() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((s:RootState) => s.Sucursal);

  useEffect(() => {
    if( userData.id === '') dispatch(verifyTokenSucursalUserByCookieAPI(navigate));  
  }, [])
  return (
    <div className="w-screen h-screen bg-primary-1 p-2 flex" >
      <Navbar/>
      <div className="w-full h-full bg-white ms-2 rounded p-2" >
        <Outlet/>
      </div>
    </div>
  );
}