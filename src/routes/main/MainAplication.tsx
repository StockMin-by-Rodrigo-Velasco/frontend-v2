import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import { Notification } from "../../components/Notification";
import { getBranchModuleDataAPI } from "../../redux/branch/branchThunk";
import LoadingApplication from "../../components/LoadingApplication";

export default function MainAplication() {
  const { id: branchId } = useSelector((s: RootState) => s.Branch);
  const { showNotification } = useSelector((s: RootState) => s.Notification);
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (branchId === '') dispatch(getBranchModuleDataAPI(navigate));
  }, [])
  return (
    <div className="w-screen h-screen bg-light p-2 flex" >
      {showNotification && <Notification />}
      {loadingApplication && <LoadingApplication />}
      <Navbar />
      <div className="flex flex-col p-2 w-full h-full bg-white ms-2 rounded overflow-hidden relative" >
        <Outlet />
      </div>
    </div>
  );
}