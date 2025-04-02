import logos from "../../assets/logos";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

import { FaRegUser } from "react-icons/fa";
import { TbHistory, TbLock, TbLogout2 } from "react-icons/tb";
import { BiObjectsHorizontalLeft } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";

import { useState } from 'react';
import PerfilWindow from "./windows/PerfilWindow";
import { perfilColor, perfilImg } from "../../assets/perfil";
import { CiBoxes, CiCircleList } from "react-icons/ci";
import { logoutSucursalUserAPI } from "../../redux/sucursal/sucursalThunk";
import { LuSettings, LuWarehouse } from "react-icons/lu";
import { AiOutlineShop } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";


export default function Navbar() {
    const { pathname } = useLocation();
    const { userData, listaPermisos } = useSelector((s: RootState) => s.Sucursal);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [viewPerfil, setViewPerfil] = useState(false);

    const permisosProductos: Record<string, string> = {};
    const permisosAlmacenes: Record<string, string> = {};
    const permisosVentas: Record<string, string> = {};
    const permisosUsuarios: Record<string, string> = {};
    const permisosUsuarioSet = new Set(userData.UsuarioPermiso.map(p => p.permisoId));

    for (const p of listaPermisos) {
        if (p.modulo === 'productos') permisosProductos[p.codigo] = p.id;
        if (p.modulo === 'almacenes') permisosAlmacenes[p.codigo] = p.id;
        if (p.modulo === 'ventas') permisosVentas[p.codigo] = p.id;
        if (p.modulo === 'usuarios') permisosUsuarios[p.codigo] = p.id;
    }

    const menu = [
        {
            title: 'Productos', path: '/main/productos', icon: <BiObjectsHorizontalLeft size='20px' className="me-2" />,
            subTitles: [
                { title: 'Lista', path: '/main/productos/lista', icon: <CiCircleList size='14px' />, access: permisosUsuarioSet.has(permisosProductos['pr-01']) },
                { title: 'Opciones', path: '/main/productos/opciones', icon: <LuSettings size='14px' />, access: permisosUsuarioSet.has(permisosProductos['pr-02']) },
                { title: 'Historial', path: '/main/productos/historial', icon: <TbHistory size='14px' />, access: permisosUsuarioSet.has(permisosProductos['pr-03']) },
            ]
        },
        {
            title: 'Almacenes', path: '/main/almacenes', icon: <LuWarehouse size='20px' className="me-2" />,
            subTitles: [
                { title: 'Lista de almacenes', path: '/main/almacenes/lista', icon: <CiBoxes size='14px' />, access: permisosUsuarioSet.has(permisosAlmacenes['al-01']) },
                { title: 'Traspasos', path: '/main/almacenes/traspasos', icon: <GrTransaction size='14px' />, access: permisosUsuarioSet.has(permisosAlmacenes['al-02']) },
                { title: 'Historial', path: '/main/almacenes/historial', icon: <TbHistory size='14px' />, access: permisosUsuarioSet.has(permisosAlmacenes['al-03']) },
            ]
        },
        {
            title: 'Ventas', path: '/main/ventas', icon: <MdOutlineShoppingCart size='20px' className="me-2" />,
            subTitles: [
                { title: 'Tienda', path: '/main/ventas/tienda', icon: <AiOutlineShop size='14px' />, access: permisosUsuarioSet.has(permisosVentas['ve-01']) },
                { title: 'Clientes', path: '/main/ventas/clientes', icon: <FaRegUser size='14px' />, access: permisosUsuarioSet.has(permisosVentas['ve-02']) },
                { title: 'Opciones', path: '/main/ventas/opciones', icon: <LuSettings size='14px' />, access: permisosUsuarioSet.has(permisosVentas['ve-03']) },
                { title: 'Historial', path: '/main/ventas/historial', icon: <TbHistory size='14px' />, access: permisosUsuarioSet.has(permisosVentas['ve-04']) },
            ]
        },
        {
            title: 'Usuarios', path: '/main/usuarios', icon: <FaRegUser size='20px' className="me-2" />,
            subTitles: [
                { title: 'Lista de usuarios', path: '/main/usuarios/lista', icon: <FiUsers size='14px' />, access: permisosUsuarioSet.has(permisosUsuarios['us-01']) }
            ]
        },
    ]


    const logout = () => {
        dispatch(logoutSucursalUserAPI(navigate));
    }
    return (
        <div className="bg-primary w-[270px] flex flex-col items-center text-white rounded" >

            {viewPerfil && <PerfilWindow closeButton={() => setViewPerfil(false)} />}


            <img src={logos.logoVerticalWhite} width={'150px'} className="mt-3 mb-10" />
            {menu.map(i => (
                <div key={i.path} className="mb-2" >
                    <NavLink
                        to={i.path}
                        className={
                            ({ isActive }) => `bg-info ${isActive ? 'bg-opacity-100' : 'bg-opacity-60'} mb-2 w-[180px] px-3 py-1 rounded-full flex items-center hover:bg-opacity-100`
                        }
                    >
                        {i.icon}
                        {i.title}
                    </NavLink>
                    {(pathname.includes(i.path)) && i.subTitles.map(subI => (subI.access ?
                        <NavLink to={subI.path} key={subI.title}
                            className={({ isActive }) =>
                                `${isActive && 'bg-white bg-opacity-15'} flex font-thin text-sm ms-5 border-b-2 rounded-tl rounded-tr border-info items-center py-[2px] px-1 cursor-pointer hover:bg-white hover:bg-opacity-15`
                            }

                        >
                            {subI.icon}
                            <span className="ms-2" >{subI.title} </span>
                        </NavLink>
                        :
                        <div key={subI.title}
                            className={
                                `flex font-thin text-sm ms-5 border-b-2 rounded-tl rounded-tr border-secondary items-center py-[2px] px-1 cursor-not-allowed`
                            }
                        >
                            <TbLock/>
                            <span className="ms-2" >{subI.title} </span>                            
                        </div>
                    ))}
                </div>
            ))}

            <div className="w-full mt-auto p-2 flex items-center">
                <div className="flex justify-center items-center w-8 h-8 rounded cursor-pointer transition-all duration-300 hover:w-9 hover:h-9"
                    style={{ backgroundColor: perfilColor(userData.imagen.split(' ')[1]) }}
                    onClick={() => { setViewPerfil(true) }}
                >
                    <img src={perfilImg(userData.imagen.split(' ')[0])} width='30px' />
                </div>
                <div className="flex flex-col mx-2">
                    <span className="uppercase text-[12px]" >{userData.nombre} {userData.apellido}</span>
                    <span className="text-[11px] font-thin" >{userData.ci}</span>
                </div>
                <button
                    type="button"
                    onClick={logout}
                    className="bg-danger bg-opacity-70 h-8 rounded flex justify-center items-center px-1 ms-auto hover:bg-opacity-100">
                    <TbLogout2 />
                </button>
            </div>
        </div>
    );
}