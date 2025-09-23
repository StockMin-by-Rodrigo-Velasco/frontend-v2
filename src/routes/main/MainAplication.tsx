import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import { Notification } from "../../components/Notification";
import { getBranchModuleDataAPI } from "../../redux/branch/branchThunk";
import LoadingApplication from "../../components/LoadingApplication";
import UserProfile from "./windows/UserProfile";
import { minimizeNavbar } from "../../redux/aplication/aplicationSlice";
import HeaderMain from "../../components/HeaderMain";

export default function MainAplication() {
  const { showNotification } = useSelector((s: RootState) => s.Notification);
  const { loadingApplication, minNavbar } = useSelector((s: RootState) => s.Aplication);
  const [viewProfile, setViewProfile] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBranchModuleDataAPI(navigate));
  }, [])
  return (
    <div className="w-screen h-screen bg-light p-0 md:p-2 flex relative overflow-hidden" >
      {showNotification && <Notification />}
      {loadingApplication && <LoadingApplication />}
      <Navbar />
      <div className={`${minNavbar&&'hidden'} md:hidden bg-black/15 backdrop-blur-[2px] absolute top-0 right-0 left-0 bottom-0 z-30`} onClick={() => {dispatch(minimizeNavbar(!minNavbar))}}></div>
      <div className={`${!minNavbar && 'ms-0 md:ms-[228px]'} flex flex-col p-2 w-full h-full bg-white rounded overflow-hidden relative transition-all duration-500`} >
        {viewProfile && <UserProfile closeButton={() => setViewProfile(false)} />}
        <HeaderMain  setViewProfile={setViewProfile}/>
        <Outlet />
      </div>
    </div>
  );
}