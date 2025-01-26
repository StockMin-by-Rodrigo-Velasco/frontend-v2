import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Outlet, useNavigate } from "react-router";
import { verifyTokenSucursalUserByCookieAPI } from "../../redux/sucursal/sucursalThunk";
import Navbar from "./Navbar";
import { Notification } from "../../components/Notification";

export default function MainAplication() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((s:RootState) => s.Sucursal);
  const {showNotification} = useSelector((s: RootState) => s.Notification);

  useEffect(() => {
    if( userData.id === '') dispatch(verifyTokenSucursalUserByCookieAPI(navigate));  
  }, [])
  return (
    <div className="w-screen h-screen bg-light p-2 flex" >
      {showNotification&& <Notification/>}
      <Navbar/>

      <div className="w-full h-full bg-white ms-2 rounded p-2" >
        <Outlet/>
      </div>
    </div>
  );
}