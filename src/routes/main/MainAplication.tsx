import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Outlet, useNavigate } from "react-router";
// import { verifyTokenSucursalUserByCookieAPI } from "../../redux/branch/branchThunk";
import Navbar from "./Navbar";
import { Notification } from "../../components/Notification";
import { getPermissionsAPI } from "../../redux/branch/branchThunk";

export default function MainAplication() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((s:RootState) => s.Branch);
  const {showNotification} = useSelector((s: RootState) => s.Notification);

  useEffect(() => {
    dispatch(getPermissionsAPI());
  }, [])
  return (
    <div className="w-screen h-screen bg-light p-2 flex" >
      {showNotification&& <Notification/>}
      <Navbar/>

      <div className="flex flex-col p-2 w-full h-full bg-white ms-2 rounded overflow-hidden relative" >
        <Outlet/>
      </div>
    </div>
  );
}