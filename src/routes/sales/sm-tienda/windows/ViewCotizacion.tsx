// import { useSelector } from "react-redux";
// import Windows from "../../../../components/Windows";
// import { CotizacionVenta, ListTransactionProductosAlmacenDto, ProductoTienda } from "../../../../interface";
// import { RootState } from "../../../../redux/store";
// import { dateLocal } from "../../../../helpers";
// import { useEffect, useRef, useState } from "react";
// import ProformaVentaWindow from "./ProformaVentaWindows";
// import { FaRegFilePdf } from "react-icons/fa";
// import { generateCotizacionVentaPdf } from "../../../../helpers/cotizacion-venta-pdf";

// interface ViewCotizacionProp {
//     closeButton: () => void;
//     cotizacion: CotizacionVenta;
//     decrementProductos: (listDecrementProductosAlmacenDto: ListTransactionProductosAlmacenDto) => void;
// }

// interface ProductoDetalle {
//     productoId: string;
//     codigo: string;
//     nombre: string;
//     unidadMedida: string;
//     cantidad: number;
//     precio: string;
//     subTotal: string;
// }


// export default function ViewCotizacion({ closeButton, cotizacion, decrementProductos }: ViewCotizacionProp) {
//     const tableRef = useRef<HTMLTableElement | null>(null);

//     const { logo, listUsers: users, data } = useSelector((s: RootState) => s.Branch);
//     const { listaProductosTienda, opcionesVenta } = useSelector((s: RootState) => s.Ventas);

//     const [responsable, setResponsable] = useState('');
//     const [listaProductosDetalle, setListaProductosDetalle] = useState<ProductoDetalle[]>([]);
//     const [checkedProductosTienda, setCheckedProductosTienda] = useState<ProductoTienda[]>([])


//     const [openProformaVenta, setOpenProformaVenta] = useState(false);


//     const cotizacionToVenta = () => {
//         const listaProductosTiendaObj = listaProductosTienda.reduce((acc, producto) => { acc[producto.productoId] = producto; return acc; }, {} as Record<string, ProductoTienda>);

//         const productosTienda: ProductoTienda[] = cotizacion.ProductoDetalleVenta.map(p => ({
//             id: p.id,
//             productoId: listaProductosTiendaObj[p.productoId].productoId,
//             productoAlmacenId: listaProductosTiendaObj[p.productoId].productoAlmacenId,
//             Categoria: listaProductosTiendaObj[p.productoId].Categoria,
//             Marca: listaProductosTiendaObj[p.productoId].Marca,
//             UnidadMedida: listaProductosTiendaObj[p.productoId].UnidadMedida,
//             codigo: listaProductosTiendaObj[p.productoId].codigo,
//             imagen: listaProductosTiendaObj[p.productoId].imagen,
//             descripcion: listaProductosTiendaObj[p.productoId].descripcion,
//             nombre: listaProductosTiendaObj[p.productoId].nombre,
//             cantidad: listaProductosTiendaObj[p.productoId].cantidad,
//             cantidadCotizacion: p.cantidad,
//             precio: p.precio,
//             show: true,
//             check: false
//         }));

//         // console.log(productosTienda);
//         setCheckedProductosTienda(productosTienda);
//         setOpenProformaVenta(true)
//     }

//     const descargarPdf = () => {
//         const tableId = tableRef.current?.id;

//         generateCotizacionVentaPdf({
//             fileName: `COTIZACION Nº${ cotizacion.numero }-${cotizacion.createdAt}`,
//             type: 'COTIZACION',
//             contacto: data.contacto,
//             direccion: data.direccion,
//             cliente: `${cotizacion.ClienteVenta.nombre.toUpperCase()} ${cotizacion.ClienteVenta.apellido.toUpperCase()}`,
//             responsable: responsable.toUpperCase(),
//             numero: cotizacion.numero.toString(),
//             detalle: cotizacion.detalle || '',
//             fecha: dateLocal(cotizacion.createdAt),
//             tableId,
//             logo,
//         });
//     }

//     useEffect(() => {
//         const usuarioResponsable = users.find(u => u.id === cotizacion.usuarioId);
//         if (usuarioResponsable) setResponsable(`${usuarioResponsable.nombre} ${usuarioResponsable.apellido}`);
//         const listaProductosObj = listaProductosTienda.reduce((acc, p) => { acc[p.productoId] = p; return acc; }, {} as Record<string, ProductoTienda>);

//         const productosDetalle: ProductoDetalle[] = cotizacion.ProductoDetalleVenta.map(p => ({
//             cantidad: p.cantidad,
//             codigo: listaProductosObj[p.productoId].codigo.toUpperCase(),
//             nombre: listaProductosObj[p.productoId].nombre.toUpperCase(),
//             precio: p.precio,
//             productoId: p.productoId,
//             unidadMedida: listaProductosObj[p.productoId].UnidadMedida.abreviatura.toUpperCase(),
//             subTotal: (parseFloat(p.precio) * p.cantidad).toString(),

//         }))
//         setListaProductosDetalle(productosDetalle);
//     }, [cotizacion])


//     return (
//         <Windows tittle="COTIZACION" closeButton={closeButton}>

//             {openProformaVenta &&
//                 <ProformaVentaWindow
//                     decrementProductos={decrementProductos}
//                     checkProductosTienda={checkedProductosTienda}
//                     datosCotizacion={{ cotizacionId: cotizacion.id, Cliente: cotizacion.ClienteVenta, descuento: cotizacion.descuento || '0' }}
//                     closeButton={() => { setOpenProformaVenta(false) }} />
//             }

//             <div className="relative  flex flex-col max-h-[80vh] overflow-y-scroll scroll-custom ms-2 my-2 ">

//                 <div className="mb-3 px-2 flex" >
//                     <div className="flex items-center" >
//                         <img src={logo} alt="logo-sucursal" width='300px' />
//                     </div>

//                     {cotizacion &&
//                         <div className="ms-auto" >
//                             <p className="mb-3 text-[22px] "> <span className="font-bold">N°:</span> {cotizacion.numero} </p>
//                             <p><span className="font-bold">Fecha: </span> {dateLocal(cotizacion.createdAt)} </p>
//                             <p><span className="font-bold">Cliente: </span> {cotizacion.ClienteVenta.nombre} {cotizacion.ClienteVenta.apellido}</p>
//                             <p><span className="font-bold">Responsable: </span> <span className="capitalize">{responsable}</span> </p>
//                         </div>
//                     }
//                 </div>
//                 <p className="p-2" ><span className="font-bold">Detalle:</span> {cotizacion.detalle} </p>

//                 <table className={`table-fixed text-left w-full border-secondary rounded overflow-hidden mb-3`} id="tableViewCotizacion" ref={tableRef} >
//                     <thead className="bg-secondary text-white sticky top-0" >
//                         <tr>
//                             <th className={`uppercase text-center px-2 w-[100px]`}>CODIGO</th>
//                             <th className={`uppercase text-center px-2`}>NOMBRE</th>
//                             <th className={`uppercase text-center px-2 w-[70px]`}>U/M</th>
//                             <th className={`uppercase text-center px-2 w-[110px]`}>CANTIDAD</th>
//                             <th className={`uppercase text-center px-2 w-[110px]`}>PRECIO</th>
//                             <th className={`uppercase text-center px-2 w-[180px]`}>SUBTOTAL</th>
//                         </tr>
//                     </thead>
//                     {cotizacion &&
//                         <tbody>
//                             {listaProductosDetalle.map(p => (
//                                 <tr key={p.productoId} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-center" >
//                                     <td>{p.codigo}</td>
//                                     <td>{p.nombre}</td>
//                                     <td>{p.unidadMedida}</td>
//                                     <td>{p.cantidad}</td>
//                                     <td>{p.precio}</td>
//                                     <td className="text-end pe-2" >{parseFloat(p.subTotal).toFixed(2)} <span>{opcionesVenta.TipoMonedaVenta.abreviatura.toUpperCase()}</span></td>
//                                 </tr>
//                             ))}
//                         </tbody>}

//                     <tfoot>
//                         <tr className=" bg-secondary/50 border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-end">
//                             <td colSpan={5} className="font-bold" >DESCUENTO</td>
//                             <td className="text-end pe-2" >{parseFloat(cotizacion.descuento || '0').toFixed(2)} <span>{opcionesVenta.TipoMonedaVenta.abreviatura.toUpperCase()}</span></td>
//                         </tr>

//                         <tr className=" bg-secondary/70 border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-end">
//                             <td colSpan={5} className="font-bold" >TOTAL</td>
//                             <td className="text-end pe-2" >{cotizacion.total} <span>{opcionesVenta.TipoMonedaVenta.abreviatura.toUpperCase()}</span></td>
//                         </tr>
//                     </tfoot>
//                 </table>

//                 <div className="flex justify-center" >
//                     <button
//                         type="button"
//                         onClick={cotizacionToVenta}
//                         className="border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white"
//                     >CONVERTIR A VENTA
//                     </button>

//                     <button
//                         type="button"
//                         onClick={descargarPdf}
//                         className="ms-2 flex items-center border border-danger rounded-full text-danger px-3 transition-all duration-200 hover:bg-danger hover:text-white"
//                     >DESCARGAR <FaRegFilePdf className="ms-2" />
//                     </button>
//                 </div>
//             </div>

//         </Windows>
//     );
// }