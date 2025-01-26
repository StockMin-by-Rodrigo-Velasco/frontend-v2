import logos from "../../assets/logos";
import { FaPlus, FaRegUser } from "react-icons/fa";
import { TbCar, TbLogout2 } from "react-icons/tb";
import { IoOptions } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";


import { logoutSucursalUser } from "../../redux/sucursal/sucursalSlice";
import { BiObjectsHorizontalLeft } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GrScorecard } from "react-icons/gr";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { AiOutlineAudit } from "react-icons/ai";
import { useState } from 'react';
import PerfilWindow from "./windows/PerfilWindow";
import { perfilColor, perfilImg } from "../../assets/perfil";

const menu = [
    {
        title: 'Items', path: '/main/items', icon: <BiObjectsHorizontalLeft size='20px' className="me-2" />,
        subTitles: [
            { title: 'Registrar item', icon: <FaPlus size='14px' /> },
            { title: 'Configuracion', icon: <IoOptions size='14px' /> },
        ]
    },
    {
        title: 'Almacen', path: '/main/almacen', icon: <HiOutlineInboxStack size='20px' className="me-2" />,
        subTitles: [
            { title: 'Registrar Almacen', icon: <FaPlus size='14px' /> },
        ]
    },
    {
        title: 'Compras', path: '/main/compras', icon: <GrScorecard size='20px' className="me-2" />,
        subTitles: [
            { title: 'Registrar compra', icon: <FaPlus size='14px' /> },
        ]
    },
    {
        title: 'Ventas', path: '/main/ventas', icon: <MdOutlineShoppingCart size='20px' className="me-2" />,
        subTitles: [
            { title: 'Registrar venta', icon: <FaPlus size='14px' /> },
        ]
    },
    {
        title: 'Usuarios', path: '/main/usuarios', icon: <FaRegUser size='20px' className="me-2" />,
        subTitles: [
            { title: 'Registrar usuario', icon: <FaPlus size='14px' /> },
            { title: 'Permisos', icon: <TbCar size='14px' /> },
        ]
    },
    {
        title: 'Auditoria', path: '/main/auditoria', icon: <AiOutlineAudit size='20px' className="me-2" />,
        subTitles: [
            { title: 'Registrar usuario', icon: <FaPlus size='14px' /> },
            { title: 'Permisos', icon: <TbCar size='14px' /> },
        ]
    }
]

export default function Navbar() {
    const {pathname} = useLocation();
    const {userData} = useSelector((s:RootState) => s.Sucursal);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [viewPerfil, setViewPerfil] = useState(false);


    const logout = () => {
        dispatch( logoutSucursalUser() );    
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
                {(pathname === i.path)&& i.subTitles.map(subI => (
                    <div key={subI.title} 
                        className="flex font-thin text-sm ms-5 border-b-2 rounded-tl rounded-tr border-info items-center py-[2px] px-1 cursor-pointer hover:bg-white hover:bg-opacity-15" 
                    >
                        {subI.icon}
                        <span className="ms-2" >{subI.title} </span>                      
                    </div>
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