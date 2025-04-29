import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getUsersAPI, logoutBranchAPI } from "../../redux/branch/branchThunk";
import logos from "../../assets/logos";
import LoadingApplication from "../../components/LoadingApplication";

import { perfilColor, perfilImg } from "../../assets/profile";
import { TbLogout2 } from "react-icons/tb";
import LoginSuperUser from "./windows/LoginSuperUser";


export default function ListUsers() {

  const { id: branchId, logo, listUsers } = useSelector((s: RootState) => s.Branch);
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [openLoginSuperUser, setOpenLoginSuperUser] = useState(false);


  const logout = () => {
    dispatch(logoutBranchAPI());
    navigate('/');
  }

  useEffect(() => {
    dispatch(getUsersAPI(branchId));
  }, [])
  return (
    <div className="w-full h-screen bg-light flex items-center justify-center" >

      {loadingApplication&& <LoadingApplication/>}
      {openLoginSuperUser&& <LoginSuperUser  branchId={branchId} closeButton={()=>{setOpenLoginSuperUser(false)}} />}

      <div className=" max-w-[450px] rounded-[20px] bg-white flex flex-col items-center justify-center">
        <img src={logo} alt="logoEmpresa" width={'400px'} className="m-8" onDoubleClick={()=>{setOpenLoginSuperUser(true)}} />

        <div className="flex w-full px-9" >
          <p className="font-semibold">Elige tu usuario:</p>
        </div>

        <div className="flex flex-wrap justify-evenly my-5 w-full max-h-[300px] overflow-y-scroll scroll-custom">
          {listUsers.map(u => (
              <div
                key={u.id}
                style={{backgroundColor: perfilColor(u.profile.split(' ')[1])}}
                className='m-2 rounded-lg flex flex-col items-center border-2 border-transparent hover:border-primary transition-all cursor-pointer'
                onClick={() => { console.log('Open User') }}
              >
                <img src={perfilImg(u.profile.split(' ')[0])} width='100px'/>
                <p className="uppercase font-semibold" >{u.name}</p>
              </div>
          ))}
        </div>
        <div className="flex p-2 border-t-[1px] border-secondary w-full">
          <span className="ms-auto me-2 text-[12px] text-secondary" >Desde </span>
          <img className="me-3" src={logos.logoHorizontal} alt="logoStockMin" width={'80px'} />
        </div>
      </div>

      <button 
        className="absolute right-5 top-5 flex items-center text-[14px] text-white bg-danger px-2 rounded-full hover:brightness-75" 
        type="button" 
        onClick={logout}
        >Cambiar de sucursal <TbLogout2 className="ms-2"/> 
      </button>
      <Outlet />
    </div>
  );
}