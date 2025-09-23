import NavbarButton from "../routes/main/components/NavbarButton";
import logoHorizontal from '../assets/logos/logo-horizontal.png';
import { perfilColor, perfilImg } from "../assets/profile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { TbLogout2 } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router";
import { logoutUserAPI } from "../redux/branch/branchThunk";
import { useEffect, useState } from "react";

interface HeaderMainProps {
    setViewProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderMain({ setViewProfile }: HeaderMainProps) {
    const { userData } = useSelector((s: RootState) => s.Branch);
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [currentModule, setCurrentModule] = useState('');

    useEffect(() => {
        const {pathname} = location
        if (pathname.includes('products')) setCurrentModule('productos')
        else if (pathname.includes('warehouses')) setCurrentModule('almacenes')
        else if (pathname.includes('sales')) setCurrentModule('ventas')
        else if (pathname.includes('users')) setCurrentModule('usuarios')
        else setCurrentModule('')        
    }, [location])
    

    return (
        <div className="flex justify-between items-center px-2 pb-2" >
            <div className="flex" >
                <NavbarButton />
                <img src={logoHorizontal} alt="Logo Stockmin" className="h-5" />
                <div>
                    <span className="bg-primary text-white rounded-full px-2 ms-2 text-[9px]" >V 1.3</span>
                </div>
            </div>

            <h1 className="uppercase text-secondary" >{currentModule}</h1>

            <div className="relative">
                {/* MODAL */}
                {openModal&& <div className="absolute top-9 right-9 z-10 bg-primary text-white rounded shadow-lg w-48 overflow-hidden">
                    <div className="flex items-center p-2" > {/* DATOS DE PERFIL */}
                        <div className="flex justify-center items-center w-9 h-9 rounded cursor-pointer transition-all duration-300"
                            style={{ backgroundColor: perfilColor(userData.profile.split(' ')[1]) }}
                        >
                            <img src={perfilImg(userData.profile.split(' ')[0])} width='30px' />
                        </div>
                        <div className="flex flex-col mx-2">
                            <span className="uppercase text-[12px] font-semibold" >{userData.name} {userData.lastName}</span>
                            <span className="text-[11px]" >{userData.ci}</span>
                        </div>
                    </div>
                    <button className="border-white border-t w-full p-1 px-2 hover:bg-white/20" onClick={() => { setOpenModal(false); setViewProfile(true) }}>
                        <span className="flex items-center text-sm" ><LuSettings className="me-2" />Configuración</span>
                    </button>
                    <button className="border-white border-t w-full p-1 px-2 hover:bg-white/20" onClick={() => {dispatch(logoutUserAPI(navigate))}}>
                        <span className="flex items-center text-sm" ><TbLogout2 className="me-2" />Cerrar sesión</span>
                    </button>
                </div>}
                {/* MODAL */}

                <div className="flex justify-center items-center w-8 h-8 rounded cursor-pointer transition-all duration-300"
                    style={{ backgroundColor: perfilColor(userData.profile.split(' ')[1]) }}
                    onClick={() => { setOpenModal(!openModal) }}
                >
                    <img src={perfilImg(userData.profile.split(' ')[0])} width='30px' />
                </div>
            </div>
        </div>
    );
}