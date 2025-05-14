import logos from "../../assets/logos";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

import { FaRegUser } from "react-icons/fa";
import { TbHistory, TbLock, TbLogout2 } from "react-icons/tb";
import { BiObjectsHorizontalLeft } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";

import { useState } from 'react';
import  UserProfile from "./windows/UserProfile";
import { perfilColor, perfilImg } from "../../assets/profile";
import { CiBoxes, CiCircleList } from "react-icons/ci";
import { logoutUserAPI } from "../../redux/branch/branchThunk";
import { LuSettings, LuWarehouse } from "react-icons/lu";
import { AiOutlineShop } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";


interface SubTitle{
    title: string;
    path: string;
    icon: JSX.Element;
    access: boolean;
}
interface Module{
    title: string;
    path: string;
    icon:JSX.Element;
    subTitles: SubTitle[];
}

export default function Navbar() {
    const { pathname } = useLocation();
    const { userData, permissions: listaPermisos } = useSelector((s: RootState) => s.Branch);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [viewPerfil, setViewPerfil] = useState(false);

    const productsModulePermissions: Record<string, string> = {};
    const warehousesPermissionsModule: Record<string, string> = {};
    const salesModulePermissions: Record<string, string> = {};
    const userModulePermissions: Record<string, string> = {};
    const userPermissionsSet = new Set(userData.UserPermission.map(p => p.permissionId));

    for (const p of listaPermisos) {
        if (p.module === 'products') productsModulePermissions[p.code] = p.id;
        if (p.module === 'warehouses') warehousesPermissionsModule[p.code] = p.id;
        if (p.module === 'sales') salesModulePermissions[p.code] = p.id;
        if (p.module === 'users') userModulePermissions[p.code] = p.id;
    }

    const modules: Module[] = [
        {
            title: 'Productos', path: '/main/products', icon: <BiObjectsHorizontalLeft size='20px' className="me-2" />,
            subTitles: [
                { 
                    title: 'Lista', 
                    path: '/main/products/list', 
                    icon: <CiCircleList size='14px'/>, 
                    access: userPermissionsSet.has(productsModulePermissions['pr-01'])
                },
                { 
                    title: 'Opciones', 
                    path: '/main/products/options', 
                    icon: <LuSettings size='14px'/>,
                    access: userPermissionsSet.has(productsModulePermissions['pr-02'])
                },   
                { 
                    title: 'Historial', 
                    path: '/main/products/history', 
                    icon: <TbHistory size='14px'/>,
                    access: userPermissionsSet.has(productsModulePermissions['pr-03'])
                },
            ]
        },
        {
            title: 'Almacenes', path: '/main/warehouses', icon: <LuWarehouse size='20px' className="me-2"/>,
            subTitles: [
                { 
                    title: 'Lista de almacenes', 
                    path: '/main/warehouses/list', 
                    icon: <CiBoxes size='14px'/>,
                    access: userPermissionsSet.has(warehousesPermissionsModule['wh-01'])

                },
                { 
                    title: 'Traspasos', 
                    path: '/main/warehouses/transfers', 
                    icon: <GrTransaction size='14px'/>,
                    access: userPermissionsSet.has(warehousesPermissionsModule['wh-02'])

                },
                { 
                    title: 'Historial', 
                    path: '/main/warehouses/history', 
                    icon: <TbHistory size='14px'/>,
                    access: userPermissionsSet.has(warehousesPermissionsModule['wh-03'])
                },
            ]
        },
        {
            title: 'Ventas', path: '/main/sales', icon: <MdOutlineShoppingCart size='20px' className="me-2"/>,
            subTitles: [
                { 
                    title: 'Tienda', 
                    path: '/main/sales/store', 
                    icon: <AiOutlineShop size='14px'/>,
                    access: false//userPermissionsSet.has(salesModulePermissions['sa-01'])

                },
                { 
                    title: 'Clientes', 
                    path: '/main/sales/customers', 
                    icon: <FaRegUser size='14px'/>,
                    access: false//userPermissionsSet.has(salesModulePermissions['sa-02'])

                },
                { 
                    title: 'Opciones', 
                    path: '/main/sales/options', 
                    icon: <LuSettings size='14px'/>,
                    access: false//userPermissionsSet.has(salesModulePermissions['sa-03'])

                },
                { 
                    title: 'Historial', 
                    path: '/main/sales/history', 
                    icon: <TbHistory size='14px'/>,
                    access: false//userPermissionsSet.has(salesModulePermissions['sa-04'])

                },
            ]
        },
        {
            title: 'Usuarios', path: '/main/users', icon: <FaRegUser size='20px' className="me-2"/>,
            subTitles: [
                { 
                    title: 'Lista de usuarios', 
                    path: '/main/users/list', 
                    icon: <FiUsers size='14px'/>,
                    access: userPermissionsSet.has(userModulePermissions['us-01'])
                }
            ]
        },
    ]


    const logout = () => {
        dispatch(logoutUserAPI(navigate));
    }
    return (
        <div className="bg-primary w-[270px] flex flex-col items-center text-white rounded" >

            {viewPerfil && <UserProfile closeButton={() => setViewPerfil(false)} />}


            <img src={logos.logoVerticalWhite} width={'150px'} className="mt-3 mb-10" />
            {modules.map(i => (
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
                    {(pathname.includes(i.path)) && i.subTitles.map(subI => (
                        subI.access?
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
                            className={`flex font-thin text-white/50 text-sm ms-5 border-b-2 rounded-tl rounded-tr border-info items-center py-[2px] px-1 cursor-not-allowed`}
                        >
                            <TbLock/>
                            <span className="ms-2" >{subI.title} </span>
                        </div>
                    ))}
                </div>
            ))}

            <div className="w-full mt-auto p-2 flex items-center">
                <div className="flex justify-center items-center w-8 h-8 rounded cursor-pointer transition-all duration-300 hover:w-9 hover:h-9"
                    style={{ backgroundColor: perfilColor(userData.profile.split(' ')[1]) }}
                    onClick={() => { setViewPerfil(true) }}
                >
                    <img src={perfilImg(userData.profile.split(' ')[0])} width='30px' />
                </div>
                <div className="flex flex-col mx-2">
                    <span className="uppercase text-[12px]" >{userData.name} {userData.lastName}</span>
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