// import { HiOutlineInboxStack } from "react-icons/hi2";
// import { Almacen } from "../../../../interface";
// import { dateLocalWhitTime } from "../../../../helpers";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../../redux/store";
// import { selectAlmacen } from "../../../../redux/warehouses/almacenesSlice";
// import { useNavigate } from "react-router";
// import { FaEdit } from "react-icons/fa";
// import { useState } from "react";
// import UpdateAlmacenWindow from "../windows/UpdateAlmacenWindow";

// interface AlmacenCardPropsInterface {
//     almacen: Almacen
// }

// export default function AlmacenCard({ almacen }: AlmacenCardPropsInterface) {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const [openUpdateAlmacenWindow, setOpenUpdateAlmacenWindow] = useState(false);
    

//     const goToUpdateAlmacen = () => {
//         setOpenUpdateAlmacenWindow(true);
//     }
//     const goToAlmacen = () => {
//         dispatch(selectAlmacen(almacen));
//         navigate(`/main/almacenes/lista/${almacen.id}`);
//     }
//     return (
//         <>
//             {openUpdateAlmacenWindow&& <UpdateAlmacenWindow almacen={almacen} closeButton={() => {setOpenUpdateAlmacenWindow(false)}} />}
//             <div 
//                 className="overflow-hidden bg-secondary flex flex-col items-center rounded m-2 w-[250px] transition-all duration-300 text-white text-[100px] hover:text-[110px]"
//             >


//                 <div className="relative flex items-center py-1 w-full text-[16px]" >
//                     <div className="text-center w-full flex flex-col" >{almacen.nombre.toLocaleUpperCase()} 
//                         <span className="text-[10px] opacity-50" >ID: { almacen.id }</span> 
//                     </div>
//                     <button 
//                         className="absolute top-1 right-1 w-7 h-7 rounded-full flex justify-center items-center transition-all duration-200 hover:bg-white hover:text-secondary" 
//                         onClick={goToUpdateAlmacen}
//                         > 
//                         <FaEdit/> 
//                     </button>
//                 </div>
//                 <div className="w-[100px] h-[100px] flex relative items-center justify-center" >
//                 <span className="absolute"><HiOutlineInboxStack /></span>
//                 </div>
//                 <div className="w-full text-start mb-2 px-3" >
//                     <p className="text-[10px]" ><span>CREADO: </span>{dateLocalWhitTime(almacen.createdAt)}</p>
//                     <p className="text-[10px]" ><span>ULTIMA MODIFICACIÓN: </span>{dateLocalWhitTime(almacen.createdAt)}</p>
//                 </div>

//                 <button
//                     onClick={goToAlmacen}
//                     className="bg-info/80 w-full hover:bg-info text-[16px]"
//                 >ABRIR ALMACEN</button>

//             </div>
//         </>
//     );
// }