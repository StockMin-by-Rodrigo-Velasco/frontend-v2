import logos from "../../assets/logos";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";


import { FaPlus, FaRegUser } from "react-icons/fa";
import { TbCar, TbHistory, TbLogout2 } from "react-icons/tb";
import { BiObjectsHorizontalLeft } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
// import { GrScorecard } from "react-icons/gr";
import { HiOutlineInboxStack } from "react-icons/hi2";
// import { AiOutlineAudit } from "react-icons/ai";
import { useState } from 'react';
import PerfilWindow from "./windows/PerfilWindow";
import { perfilColor, perfilImg } from "../../assets/perfil";
import { CiCircleList } from "react-icons/ci";
import { logoutSucursalUserAPI } from "../../redux/sucursal/sucursalThunk";
import { LuSettings } from "react-icons/lu";

const menu = [
    {
        title: 'Productos', path: '/main/productos', icon: <BiObjectsHorizontalLeft size='20px' className="me-2" />,
        subTitles: [
            { title: 'Lista', path: '/main/productos/lista', icon: <CiCircleList size='14px' /> },
            { title: 'Opciones', path: '/main/productos/opciones', icon: <LuSettings size='14px' /> },
            { title: 'Historial', path: '/main/productos/logs', icon: <TbHistory size='14px' /> },
        ]
    },
    {
        title: 'Almacen', path: '/main/almacen', icon: <HiOutlineInboxStack size='20px' className="me-2" />,
        subTitles: [
            { title: 'Registrar Almacen', path: '/main/almacen/lista', icon: <FaPlus size='14px' /> },
        ]
    },
    // {
    //     title: 'Compras', path: '/main/compras', icon: <GrScorecard size='20px' className="me-2" />,
    //     subTitles: [
    //         { title: 'Registrar compra', path: '/main/compras/lista', icon: <FaPlus size='14px' /> },
    //     ]
    // },
    {
        title: 'Ventas', path: '/main/ventas', icon: <MdOutlineShoppingCart size='20px' className="me-2" />,
        subTitles: [
            { title: 'Registrar venta', path: '/main/ventas/lista', icon: <FaPlus size='14px' /> },
        ]
    },
    {
        title: 'Usuarios', path: '/main/usuarios', icon: <FaRegUser size='20px' className="me-2" />,
        subTitles: [
            { title: 'Registrar usuario', path: '/main/productos/lista', icon: <FaPlus size='14px' /> },
            { title: 'Permisos', path: '/main/usuarios/lista', icon: <TbCar size='14px' /> },
        ]
    },
    // {
    //     title: 'Auditoria', path: '/main/auditoria', icon: <AiOutlineAudit size='20px' className="me-2" />,
    //     subTitles: [
    //         { title: 'Registrar usuario', path: '/main/auditoria/lista', icon: <FaPlus size='14px' /> },
    //         { title: 'Permisos', path: '/main/auditoria/permisos', icon: <TbCar size='14px' /> },
    //     ]
    // }
]

export default function Navbar() {
    const {pathname} = useLocation();
    const {userData} = useSelector((s:RootState) => s.Sucursal);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [viewPerfil, setViewPerfil] = useState(false);


    const logout = () => {
        dispatch( logoutSucursalUserAPI() );    
        navigate('/login-user');
    }
    return (
        <div className="bg-primary w-[270px] flex flex-col items-center text-white rounded" >

            {viewPerfil&& <PerfilWindow closeButton={() => setViewPerfil(false)} />}


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
                {(pathname.includes(i.path))&& i.subTitles.map(subI => (
                    <NavLink to={subI.path} key={subI.title} 
                        className={({isActive}) => 
                            `${isActive&& 'bg-white bg-opacity-15'} flex font-thin text-sm ms-5 border-b-2 rounded-tl rounded-tr border-info items-center py-[2px] px-1 cursor-pointer hover:bg-white hover:bg-opacity-15`
                        }
                    >
                        {subI.icon}
                        <span className="ms-2" >{subI.title} </span>                      
                    </NavLink>
                ))}
                </div>
            ))}
            
            <div className="w-full mt-auto p-2 flex items-center">
                <div className="flex justify-center items-center w-8 h-8 rounded cursor-pointer transition-all duration-300 hover:w-9 hover:h-9"
                    style={{backgroundColor: perfilColor(userData.imagen.split(' ')[1])}}
                    onClick={() => {setViewPerfil(true)}}
                >
                    <img src={perfilImg(userData.imagen.split(' ')[0])} width='30px'/>
                </div>
                <div className="flex flex-col mx-2">
                    <span className="uppercase text-[12px]" >{userData.nombre} {userData.apellido}</span>
                    <span className="text-[11px] font-thin" >{userData.ci}</span>       
                </div>
                <button 
                    type="button"
                    onClick={ logout }
                    className="bg-danger bg-opacity-70 h-8 rounded flex justify-center items-center px-1 ms-auto hover:bg-opacity-100">
                    <TbLogout2/>
                </button>
            </div>
        </div>
    );
}