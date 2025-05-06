// import { useDispatch, useSelector } from "react-redux";
// import Windows from "../../../../components/Windows";
// import { AppDispatch, RootState } from "../../../../redux/store";
// import { InputSelect, InputTextarea } from "../../../../components/Input";
// import { dateLocal } from "../../../../helpers";
// import { useForm, useFormArray } from "../../../../hooks";
// import { useState } from "react";
// import { CreateDocTraspasoAlmacenDto, CreateProductoAlmacenDto, CreateTraspasoProductoAlmacenDto, DocTraspasoProductoAlmacen, Product, ProductoAlmacen, TransactionProductoAlmacenDto } from "../../../../interface";
// import { getProductosOneAlmacenAPI, createOneProductoAlmacenAPI, createTraspasoProductosAlmacenAPI, decrementProdutosAlmacenAPI, incrementProdutosAlmacenAPI } from '../../../../redux/warehouses/almacenThunks';
// import { FaCheckCircle, FaLongArrowAltRight, FaPlus, FaWarehouse } from "react-icons/fa";
// import { AiOutlineLoading } from "react-icons/ai";
// import ListaProductosAlmacen from "./ListaProductosAlmacen";
// import { BsFillTrashFill } from "react-icons/bs";
// import { hideNotification, showNotificationError, showNotificationInfo, showNotificationWarning } from "../../../../redux/notification/notificationSlice";
// import { LuTriangleAlert } from "react-icons/lu";


// interface CreateTraspasoAlmacenProp {
//   closeButton: () => void;
//   getTraspaso: (traspaso: DocTraspasoProductoAlmacen) => void;
// }

// interface DataForm {
//   sucursalId: string;
//   usuarioId: string;
//   almacenOrigenId: string;
//   almacenDestinoId: string;
//   detalle: string;
// }

// interface ArrayForm {
//   id: string;
//   productoId: string;

//   imagen: string;
//   codigo: string;
//   nombre: string;
//   marca: string;
//   categoria: string;

//   unidadMedidaAbreviada: string;
//   cantidad: string,
//   cantidadTraspaso: string,
//   show: boolean,
//   check: boolean
// }


// export default function CreateTraspasoAlmacen({ closeButton, getTraspaso }: CreateTraspasoAlmacenProp) {
//   const { loadingData } = useSelector((s: RootState) => s.Aplication);
//   const { type: typeNotification, showNotification } = useSelector((s: RootState) => s.Notification);
//   const { id: sucursalId, logo, userData } = useSelector((s: RootState) => s.Branch);
//   const { listaAlmacenes } = useSelector((s: RootState) => s.Almacenes);
//   const { products: listaProductos } = useSelector((s: RootState) => s.Products);

//   const dispatch = useDispatch<AppDispatch>();

//   const [almacenesAlert, setAlmacenesAlert] = useState(false);
//   const [openListaProductosAlmacen, setOpenListaProductosAlmacen] = useState(false);

//   const [destinoReady, setDestinoReady] = useState(false);

//   const { data: formTraspaso, handleInputChange: onChangeTraspaso } = useForm<DataForm>({ sucursalId, usuarioId: userData.id, almacenOrigenId: '', almacenDestinoId: '', detalle: '' });
//   const { arrayData: listOrigen, handleInputChange: listOrigenChange, replaceData: listOrigenReplace } = useFormArray<ArrayForm>([]);

//   const [listDestino, setListDestino] = useState<Record<string, { id: string, cantidad: number }>>({});


//   const changeAlmacenDestino = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { value } = e.target;
//     if (value === '') {
//       setDestinoReady(false);
//       onChangeTraspaso(e);
//     } else if (value === formTraspaso.almacenOrigenId) {
//       setAlmacenesAlert(true);
//       setTimeout(() => { setAlmacenesAlert(false); }, 5000);
//     }
//     else {
//       dispatch(getProductosOneAlmacenAPI(value, generateListProductosDestino, "LOADING-DATA-COMPLETE"));
//       setDestinoReady(true);
//       onChangeTraspaso(e);
//     }

//   }

//   const generateListProductosDestino = (listaAlmacen: ProductoAlmacen[]) => {
//     const listDestinoIdsObj = listaAlmacen.reduce((acc, producto) => { acc[producto.productoId] = { id: producto.id, cantidad: producto.cantidad }; return acc; }, {} as Record<string, { id: string, cantidad: number }>);

//     for (const i of listOrigen) {
//       listDestinoIdsObj[i.productoId] = listDestinoIdsObj[i.productoId] ? { id: listDestinoIdsObj[i.productoId].id, cantidad: listDestinoIdsObj[i.productoId].cantidad } : { id: '', cantidad: 0 };
//     }
//     setListDestino(listDestinoIdsObj);
//   }

//   const changeAlmacenOrigen = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { value } = e.target;
//     if (value === '') {
//       onChangeTraspaso(e);
//       listOrigenReplace([]);
//       setListDestino({});
//       setDestinoReady(false);

//     } else if (value === formTraspaso.almacenDestinoId) {
//       setAlmacenesAlert(true);
//       setTimeout(() => { setAlmacenesAlert(false); }, 5000);
//     } else {
//       dispatch(getProductosOneAlmacenAPI(value, generateListProductosOrigen));
//       onChangeTraspaso(e);
//     }
//   }

//   const generateListProductosOrigen = (listaAlmacen: ProductoAlmacen[]) => {
//     //* Genera una lista de productos con los campos nesesarios para el ArrayForm
//     const listaProductosObj = listaProductos.reduce((acc, p) => { acc[p.id] = p; return acc }, {} as Record<string, Product>)
//     const productosAlmacenDetallado: ArrayForm[] = listaAlmacen.map((p: ProductoAlmacen) => (
//       {
//         id: p.id,
//         productoId: p.productoId,
//         imagen: listaProductosObj[p.productoId].image,
//         codigo: listaProductosObj[p.productoId].code,
//         nombre: listaProductosObj[p.productoId].name,
//         marca: listaProductosObj[p.productoId].Marca.name,
//         categoria: listaProductosObj[p.productoId].Categoria.name,
//         unidadMedidaAbreviada: listaProductosObj[p.productoId].UnidadMedida.abbreviation,
//         cantidad: p.cantidad.toString(),
//         cantidadTraspaso: '1',
//         show: true,
//         check: false
//       }));
//     listOrigenReplace(productosAlmacenDetallado);
//   }

//   const deleteProducto = (index: number) => {
//     let newProductos = listOrigen;
//     newProductos[index].check = false;
//     listOrigenReplace([...newProductos]);
//   }

//   const createOneProductoDestino = (productoId: string) => {

//     if (typeNotification === 'INFO' && showNotification) {
//       const almacenNombre = listaAlmacenes.find(a => a.id === formTraspaso.almacenDestinoId)?.nombre || '';
//       const data: CreateProductoAlmacenDto = {
//         almacenId: formTraspaso.almacenDestinoId,
//         productoId
//       }
//       dispatch(createOneProductoAlmacenAPI(data, almacenNombre, registrarProductoDestino));

//     } else {
//       dispatch(showNotificationInfo({
//         tittle: 'Registrar producto en almacén',
//         description: 'Se registrará un nuevo producto en el almacén de destino. Si deseas continuar vuelve a presionar el botón “Registrar”, caso contrario cierra esta notificación.'
//       }));
//     }
//   }

//   const registrarProductoDestino = (producto: ProductoAlmacen) => {
//     let newListDestino = listDestino;
//     newListDestino[producto.productoId] = { id: producto.id, cantidad: producto.cantidad }
//     setListDestino({ ...newListDestino });
//   }

//   const registrarTraspaso = () => {
//     const checkProductos = listOrigen.filter(p => p.check);

//     if (checkProductos.length <= 0) {
//       dispatch(showNotificationError({ tittle: 'REGISTRO DE TRASPASO', description: 'No se puede registrar un traspaso sin productos.' }))
//       setTimeout(() => { dispatch(hideNotification()) }, 5000);
//       return;
//     }

//     if (checkProductos.find(p => parseInt(p.cantidad) < parseInt(p.cantidadTraspaso))) {
//       dispatch(showNotificationWarning({ tittle: 'REGISTRO DE TRASPASO', description: 'Existen productos con cantidades insuficiente para el traspaso.' }))
//       setTimeout(() => { dispatch(hideNotification()) }, 5000);
//       return;
//     }

//     if (checkProductos.find(p => parseInt(p.cantidadTraspaso) === 0)) {
//       dispatch(showNotificationWarning({ tittle: 'REGISTRO DE TRASPASO', description: 'Se detectaron productos con 0 cantidad de traspaso.' }))
//       setTimeout(() => { dispatch(hideNotification()) }, 5000);
//       return;
//     }

//     const listProductosIncrement:TransactionProductoAlmacenDto[] = [];
//     const listProductosDecrement:TransactionProductoAlmacenDto[] = [];

//     for (const producto of checkProductos) {
//       if (listDestino[producto.productoId].id === '') {
//         dispatch(showNotificationWarning({ tittle: 'REGISTRO DE TRASPASO', description: 'El destino tiene 1 o mas productos sin registrar para su traspaso.' }))
//         setTimeout(() => { dispatch(hideNotification()) }, 5000);
//         return;
//       }else{
//         listProductosIncrement.push({productoAlmacenId: listDestino[producto.productoId].id, cantidad: parseInt(producto.cantidadTraspaso)});
//         listProductosDecrement.push({productoAlmacenId: producto.id, cantidad: parseInt(producto.cantidadTraspaso)});
//       }
//     }

//     const traspasoProductosAlmacen: CreateTraspasoProductoAlmacenDto[] = listOrigen.filter(p => p.check).map(p => ({ productoId: p.productoId, cantidad: parseInt(p.cantidadTraspaso) }));
//     const docTraspaso: CreateDocTraspasoAlmacenDto = {
//       ...formTraspaso,
//       traspasoProductosAlmacen
//     }

//     dispatch(createTraspasoProductosAlmacenAPI(docTraspaso, getTraspaso, "LOADING-DATA-COMPLETE"));
//     dispatch(decrementProdutosAlmacenAPI({productos: listProductosDecrement}));
//     dispatch(incrementProdutosAlmacenAPI({productos: listProductosIncrement}));
//   }


//   return (
//     <Windows tittle="NUEVO TRASPASO" closeButton={closeButton}>

//       {openListaProductosAlmacen &&
//         <ListaProductosAlmacen closeButton={() => { setOpenListaProductosAlmacen(false) }} productos={listOrigen} replaceData={listOrigenReplace} almacenId={formTraspaso.almacenOrigenId} />
//       }


//       <div className="mb-3 p-2 flex items-center " >
//         <div className="flex items-center" >
//           <img src={logo} alt="logo-sucursal" width='300px' />
//         </div>
//         <div className="flex flex-col items-center ms-auto" >
//           <div className="flex" >
//             <InputSelect
//               handleInputChange={changeAlmacenOrigen}
//               name="almacenOrigenId"
//               options={listaAlmacenes.map(a => ({ name: a.nombre, value: a.id }))}
//               placeholder="Origen:"
//               value={formTraspaso.almacenOrigenId}
//               optionDefault="Sin eleccion"
//             />

//             {loadingData && <span className="text-secondary" ><AiOutlineLoading className="animate-spin" /></span>}
//             {(listOrigen.length > 0 && !loadingData) && <span className="text-success" ><FaCheckCircle /></span>}

//             <InputSelect
//               handleInputChange={changeAlmacenDestino}
//               name="almacenDestinoId"
//               className="ms-2"
//               disabled={listOrigen.length <= 0}
//               options={listaAlmacenes.map(a => ({ name: a.nombre, value: a.id }))}
//               placeholder="Destino:"
//               value={formTraspaso.almacenDestinoId}
//               optionDefault="Sin eleccion"
//             />
//             {loadingData && <span className="text-secondary" ><AiOutlineLoading className="animate-spin" /></span>}
//             {(destinoReady && !loadingData) && <span className="text-success" ><FaCheckCircle /></span>}
//           </div>

//           <span className={`${almacenesAlert ? '' : 'opacity-0'} mt-1 text-center text-[12px] bg-warning px-2 rounded-full`} >El origen debe ser diferente al destino.</span>
//         </div>
//         <div className="ms-auto flex flex-col" >
//           <p><span className="font-bold">Fecha: </span> {dateLocal(Date.now())} </p>
//           <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${userData.nombre} ${userData.apellido}`}</span> </p>
//           <InputTextarea value={formTraspaso.detalle} handleInputChange={onChangeTraspaso} name="detalle" placeholder="Detalle" />
//         </div>
//       </div>

//       <div className="p-2 flex flex-col max-h-[75vh] overflow-y-scroll scroll-custom" >
//         <table className="table-fixed text-left w-full border-secondary rounded overflow-hidden">
//           <thead className="bg-secondary text-white sticky top-0">
//             <tr>
//               <th className="uppercase text-center px-2 w-[200px]">CODIGO</th>
//               <th className="uppercase text-center px-2 ">NOMBRE</th>
//               <th className="uppercase text-center px-2 w-[70px]">U/M</th>
//               <th className="uppercase text-center px-2 w-[100px]">CANTIDAD</th>
//               <th className="uppercase text-center px-2 w-[150px]">RESULTADO</th>
//               <th className="uppercase text-center px-2 w-[80px]">BORRAR</th>
//             </tr>
//           </thead>

//           <tbody>
//             {((listOrigen.length <= 0) || !destinoReady) && <tr>
//               <td colSpan={5} className="py-2 px-10 text-center text-secondary">Verifica que el almacén de origen y el destino hayan sido aprobados o estén seleccionados correctamente.
//               </td>
//             </tr>}

//             {listOrigen.map((p, i) => p.check && (
//               <tr key={p.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase" >

//                 <td className="p-1 text-center" >
//                   <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.codigo} </p>
//                 </td>
//                 <td className="p-1 text-center" >
//                   <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.nombre} </p>
//                 </td>
//                 <td className="p-1 text-center" >
//                   <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.unidadMedidaAbreviada} </p>
//                 </td>
//                 <td className="p-1 text-center relative " >
//                   {(parseInt(p.cantidad) < parseInt(p.cantidadTraspaso)) && <span
//                     className="flex justify-center items-center bg-warning absolute text-[10px] px-1 right-0 top-0 rounded-full">
//                     <FaWarehouse className="me-2" />{parseInt(p.cantidad)}
//                   </span>}
//                   {(parseInt(p.cantidadTraspaso) === 0) && <span
//                     className="flex justify-center items-center bg-warning text-black w-[16px] h-[16px] absolute p-[2px] right-0 top-0 rounded-full">
//                     <LuTriangleAlert />
//                   </span>}
//                   <input
//                     onChange={listOrigenChange}
//                     className="border-secondary border-[1px] rounded w-full p-1 focus:outline-none"
//                     type="number"
//                     min={1}
//                     name={`cantidadTraspaso:${i}`}
//                     id={`cantidadTraspaso:${i}`}
//                     value={p.cantidadTraspaso} />
//                 </td>
//                 <td className="px-1" >
//                   {(listDestino[p.productoId].id !== '') ?
//                     <div className="flex items-center" >
//                       <span className="flex bg-secondary text-white rounded px-1 pt-1" ><FaWarehouse className="me-1" /> {parseInt(p.cantidad) - parseInt(p.cantidadTraspaso)}</span>
//                       <FaLongArrowAltRight className="mx-1 ms-auto" />
//                       <span className="flex bg-success text-white rounded px-1 pt-1 ms-auto" ><FaWarehouse className="me-1" /> {listDestino[p.productoId].cantidad + parseInt(p.cantidadTraspaso)}</span>
//                     </div>
//                     :
//                     <div className="flex justify-center" >
//                       <button
//                         type="button"
//                         onClick={() => { createOneProductoDestino(p.productoId) }}
//                         className="text-info border border-info rounded-full text-[12px] px-2 transition-all duration-200 hover:bg-info hover:text-white "
//                       > Registrar
//                       </button>
//                     </div>
//                   }
//                 </td>
//                 <td className="text-center text-secondary" >
//                   <button type="button" className="bg-danger/80 p-1 rounded-full  text-white hover:bg-danger" onClick={() => { deleteProducto(i) }} ><BsFillTrashFill /></button>
//                 </td>
//               </tr>

//             ))}


//           </tbody>
//         </table>
//         <div>
//           <button
//             type="button"
//             disabled={(listOrigen.length <= 0) || !destinoReady}
//             className="flex items-center border border-secondary rounded-full text-[14px] px-3 mt-2 text-secondary transition-all duration-200 hover:bg-secondary hover:text-white disabled:opacity-70 disabled:hover:bg-white disabled:hover:text-secondary disabled:cursor-not-allowed"
//             onClick={() => { setOpenListaProductosAlmacen(true) }}
//           > <FaPlus /> <span className="ms-2">AGREGAR PRODUCTOS A LA LISTA</span>
//           </button>
//         </div>
//       </div>

//       <div className="p-2 border border-t-secondary flex justify-center" >
//         <button
//           type="button"
//           disabled={loadingData}
//           className="flex items-center border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white 
//                     disabled:cursor-not-allowed disabled:border-secondary disabled:text-secondary disabled:bg-white"
//           onClick={registrarTraspaso}>REGISTRAR TRASPASO DE PRODUCTOS
//           {loadingData&& <AiOutlineLoading className="ms-2 animate-spin"/>}
//         </button>

//       </div>
//     </Windows>
//   );
// }