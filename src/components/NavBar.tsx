import { useState } from "react";
import logoMin from "../../../assets/Logo v2 white.png";
import logoMax from "../../../assets/Logo v2 - horizontal white.png";
import { CiBoxes } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";
import { FaHistory, FaPlus } from "react-icons/fa";
import { TbCar } from "react-icons/tb";
import { IoOptions } from "react-icons/io5";


const menu = [
    {
        title: 'Almacen', path: '/main/almacen', icon: <CiBoxes size='30px' />,
        subTitles: [
            { title: 'Registrar nuevo item', icon: <FaPlus size='16px' /> },
            { title: 'Ingresar items', icon: <TbCar size='16px' /> },
            { title: 'Historial de ingreso', icon: <FaHistory size='16px' /> },
            { title: 'Configuracion', icon: <IoOptions size='16px' /> }
        ]
    }
]

export default function NavBar() {
    const [activeNavbar, setActiveNavbar] = useState(false);

    return (
        <div className={`${activeNavbar ? 'w-[375px]' : 'w-[60px]'} flex flex-col bg-primary-3 rounded-[10px] p-2 me-4 items-center `} >
            <div className="cursor-pointer h-[50px] mb-20" onClick={() => setActiveNavbar(!activeNavbar)} >
                {activeNavbar ?
                    <img className="object-cover h-full " src={logoMax} alt="logoWhite" />
                    :
                    <img className="object-cover h-full " src={logoMin} alt="logoHorizontalWhite" />
                }
            </div>

            {activeNavbar ?
                <>
                    {/* MAXIMIZADO */}
                    {menu.map(i => (
                        <div key={i.title} className="w-full" >
                            <div className=" text-white bg-primary-2 p-1 px-3 rounded-[100px] flex items-center cursor-pointer">
                                {i.icon}
                                <span className="text-xl mx-4" >{ i.title }</span>
                            </div>
                            {i.subTitles.map(s => (
                                <div key={s.title} className="border-b-2 border-primary-2 text-white ms-5 me-4 px-2 flex items-center" >
                                    {s.icon}
                                    <span className="ms-3" >{s.title}</span>
                                </div>
                            ))
                            }
                        </div>
                    ))}

                    <div className="mt-auto text-white w-full flex px-3 items-center">
                        <div className="flex flex-col" >
                            <span className="text-lg font-bold" >Rodrigo Velasco</span>
                            <a href="#" className="text-sm underline" >Configuracion y privacidad</a>
                        </div>
                        <div className="bg-danger rounded-[100px] p-2 cursor-pointer ms-auto">
                            <BiLogOut size='25px'/>
                        </div>
                        
                    </div>

                </>
                :
                <>
                    {/* MINIMIZADO */}
                    {menu.map(i => (
                        <div key={i.title} className=" text-white bg-primary-2 p-1 rounded-[100px] cursor-pointer">
                            {i.icon}
                        </div>
                    ))}

                    <div className="mt-auto text-white">
                        <div className="bg-danger rounded-[100px] p-2 cursor-pointer">
                            <BiLogOut size='25px'/>
                        </div>
                        

                    </div>

                </>
            }

        </div>
    );
}