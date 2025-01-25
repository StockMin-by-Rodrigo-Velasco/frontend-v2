import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { getSucursalUsersAPI, verifyTokenSucursalUsersByCookieAPI } from "../../redux/sucursal/sucursalThunk";
import logos from "../../assets/logos";
import { selectSucursalUser, logoutSucursal } from "../../redux/sucursal/sucursalSlice";
import { ButtonLogout } from "../../components/Buttons";
import LoadingApplication from "../../components/LoadingApplication";

import { perfilColor, perfilImg } from "../../assets/perfil";


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
    dispatch(logoutSucursal());
    navigate('/');
  }

  useEffect(() => {
    if( sucursalId === '' ) dispatch(verifyTokenSucursalUsersByCookieAPI(navigate));
    else dispatch(getSucursalUsersAPI(sucursalId));
  }, [])
  return (
    <div className="w-full h-screen bg-primary-1 flex items-center justify-center" >
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
                className='me-4 rounded-lg flex flex-col items-center border-2 border-transparent hover:border-primary-3 transition-all cursor-pointer'
                onClick={() => { openSucursalLoginUser(u.id, u.sucursalId) }}
              >
                <img src={perfilImg(u.imagen.split(' ')[0])} width='100px'/>
                <p className="uppercase font-semibold" >{u.nombre}</p>
              </div>
          ))}
        </div>
        <div className="flex m-4">
          <span className="me-3 text-secondary-2" >Gracias por usar </span>
          <img src={logos.logoHorizontal} alt="logoStockMin" width={'100px'} />
        </div>
      </div>

      <ButtonLogout label="Cambiar de sucursal" className="absolute left-5 bottom-5" onClick={logout} />

      <Outlet />
    </div>
  );
}