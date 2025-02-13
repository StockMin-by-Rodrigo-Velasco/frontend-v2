import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getSucursalUsersAPI, logoutSucursalAPI, verifyTokenSucursalUsersByCookieAPI } from "../../redux/sucursal/sucursalThunk";
import logos from "../../assets/logos";
import { selectSucursalUser } from "../../redux/sucursal/sucursalSlice";
import LoadingApplication from "../../components/LoadingApplication";

import { perfilColor, perfilImg } from "../../assets/perfil";
import { TbLogout2 } from "react-icons/tb";


export default function SucursalUsers() {

  const dispatch = useDispatch<AppDispatch>();
  const { id: sucursalId, logo, users } = useSelector((s: RootState) => s.Sucursal);
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  const navigate = useNavigate();

  const openSucursalLoginUser = (id: string, sucursalId: string) => {
    dispatch(selectSucursalUser({ id, sucursalId }));
    navigate(id);
  }

  const logout = () => {
    dispatch(logoutSucursalAPI());
    navigate('/');
  }

  useEffect(() => {
    if( sucursalId === '' ) dispatch(verifyTokenSucursalUsersByCookieAPI(navigate));
    else dispatch(getSucursalUsersAPI(sucursalId));
  }, [])
  return (
    <div className="w-full h-screen bg-light flex items-center justify-center" >
      {loadingApplication&& <LoadingApplication/>}
      <div className="rounded-[20px] bg-white flex flex-col items-center justify-center">
        <img src={logo} alt="logoEmpresa" width={'400px'} className="m-8" />

        <div className="flex w-full px-9" >
          <p className="font-semibold">Elige tu usuario:</p>
        </div>

        <div className="flex my-5">
          {users?.map(u => (
              <div
                key={u.id}
                style={{backgroundColor: perfilColor(u.imagen.split(' ')[1])}}
                className='me-4 rounded-lg flex flex-col items-center border-2 border-transparent hover:border-primary transition-all cursor-pointer'
                onClick={() => { openSucursalLoginUser(u.id, u.sucursalId) }}
              >
                <img src={perfilImg(u.imagen.split(' ')[0])} width='100px'/>
                <p className="uppercase font-semibold" >{u.nombre}</p>
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