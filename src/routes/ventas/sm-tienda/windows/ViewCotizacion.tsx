import { useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { CotizacionVenta, ListDecrementProductosAlmacenDto, ProductoTienda } from "../../../../interface";
import { RootState } from "../../../../redux/store";
import { dateLocal } from "../../../../helpers";
import { useEffect, useState } from "react";
import ProformaVentaWindow from "./ProformaVentaWindows";

interface ViewCotizacionProp {
    closeButton: () => void;
    cotizacion: CotizacionVenta;
    decrementProductos: (listDecrementProductosAlmacenDto: ListDecrementProductosAlmacenDto) => void;
}

interface ProductoDetalle {
    productoId: string;
    codigo: string;
    nombre: string;
    unidadMedida: string;
    cantidad: number;
    precio: string;
    subTotal: string;
}


export default function ViewCotizacion({ closeButton, cotizacion, decrementProductos }: ViewCotizacionProp) {
    const { logo, users } = useSelector((s: RootState) => s.Sucursal);
    const { listaProductosTienda } = useSelector((s: RootState) => s.Ventas);

    const [responsable, setResponsable] = useState('');
    const [listaProductosDetalle, setListaProductosDetalle] = useState<ProductoDetalle[]>([]);
    const [checkedProductosTienda, setCheckedProductosTienda] = useState<ProductoTienda[]>([])


    const [openProformaVenta, setOpenProformaVenta] = useState(false);


    const cotizacionToVenta = () => {
        const listaProductosTiendaObj = listaProductosTienda.reduce((acc, producto) => { acc[producto.productoId] = producto; return acc; }, {} as Record<string, ProductoTienda>);

        const productosTienda: ProductoTienda[] = cotizacion.ProductoDetalleVenta.map(p => ({
            productoId: listaProductosTiendaObj[p.productoId].productoId,
            productoAlmacenId: listaProductosTiendaObj[p.productoId].productoAlmacenId,
            Categoria: listaProductosTiendaObj[p.productoId].Categoria,
            Marca: listaProductosTiendaObj[p.productoId].Marca,
            UnidadMedida: listaProductosTiendaObj[p.productoId].UnidadMedida,
            codigo: listaProductosTiendaObj[p.productoId].codigo,
            imagen: listaProductosTiendaObj[p.productoId].imagen,
            descripcion: listaProductosTiendaObj[p.productoId].descripcion,
            nombre: listaProductosTiendaObj[p.productoId].nombre,
            cantidad: listaProductosTiendaObj[p.productoId].cantidad,
            cantidadCotizacion: p.cantidad,
            precio: p.precio,
            show: true,
            check: false
        }));

        // console.log(productosTienda);
        setCheckedProductosTienda(productosTienda);
        setOpenProformaVenta(true)
    }

    useEffect(() => {
        const usuarioResponsable = users.find(u => u.id === cotizacion.usuarioId);
        if (usuarioResponsable) setResponsable(`${usuarioResponsable.nombre} ${usuarioResponsable.apellido}`);
        const listaProductosObj = listaProductosTienda.reduce((acc, p) => { acc[p.productoId] = p; return acc; }, {} as Record<string, ProductoTienda>);

        const productosDetalle: ProductoDetalle[] = cotizacion.ProductoDetalleVenta.map(p => ({
            cantidad: p.cantidad,
            codigo: listaProductosObj[p.productoId].codigo,
            nombre: listaProductosObj[p.productoId].nombre,
            precio: p.precio,
            productoId: p.productoId,
            unidadMedida: listaProductosObj[p.productoId].UnidadMedida.abreviatura,
            subTotal: (parseFloat(p.precio) * p.cantidad).toString(),

        }))
        setListaProductosDetalle(productosDetalle);
    }, [cotizacion])


    return (
        <Windows tittle="COTIZACION" closeButton={closeButton}>

            {openProformaVenta &&
                <ProformaVentaWindow
                    decrementProductos={decrementProductos}
                    checkProductosTienda={checkedProductosTienda }
                    datosCotizacion={{ cotizacionId: cotizacion.id, Cliente: cotizacion.ClienteVenta, descuento: cotizacion.descuento || '0' }}
                    closeButton={() => { setOpenProformaVenta(false) }} />
            }

            <div className="relative  flex flex-col max-h-[80vh] overflow-y-scroll scroll-custom ms-2 my-2 ">

                <div className="mb-3 px-2 flex" >
                    <div className="flex items-center" >
                        <img src={logo} alt="logo-sucursal" width='300px' />
                    </div>

                    {cotizacion &&
                        <div className="ms-auto" >
                            <p><span className="font-bold">Fecha: </span> {dateLocal(cotizacion.createdAt)} </p>
                            <p><span className="font-bold">Cliente: </span> {cotizacion.ClienteVenta.nombre} {cotizacion.ClienteVenta.apellido}</p>
                            <p><span className="font-bold">Responsable: </span> <span className="capitalize">{responsable}</span> </p>
                        </div>
                    }
                </div>

                <table className={`table-fixed text-left w-full border-secondary rounded overflow-hidden mb-3`}>
                    <thead className="bg-secondary text-white sticky top-0" >
                        <tr>
                            <th className={`uppercase text-center px-2 w-[100px]`}>CODIGO</th>
                            <th className={`uppercase text-center px-2`}>NOMBRE</th>
                            <th className={`uppercase text-center px-2 w-[70px]`}>U/M</th>
                            <th className={`uppercase text-center px-2 w-[110px]`}>CANTIDAD</th>
                            <th className={`uppercase text-center px-2 w-[110px]`}>PRECIO</th>
                            <th className={`uppercase text-center px-2 w-[110px]`}>SUBTOTAL</th>
                        </tr>
                    </thead>
                    {cotizacion &&
                        <tbody>
                            {listaProductosDetalle.map(p => (
                                <tr key={p.productoId} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-center" >
                                    <td>{p.codigo}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.unidadMedida}</td>
                                    <td>{p.cantidad}</td>
                                    <td>{p.precio}</td>
                                    <td>{p.subTotal}</td>
                                </tr>
                            ))}
                            <tr className=" bg-secondary/50 border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-end">
                                <td colSpan={5} className="font-bold" >DESCUENTO</td>
                                <td className="text-center" >{cotizacion.descuento || 0}</td>
                            </tr>

                            <tr className=" bg-secondary/70 border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-end">
                                <td colSpan={5} className="font-bold" >TOTAL</td>
                                <td className="text-center" >{cotizacion.total}</td>
                            </tr>
                        </tbody>}
                </table>

                <div className="flex justify-center" >
                    <button
                        type="button"
                        onClick={cotizacionToVenta}
                        className="border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white"
                    >CONVERTIR A VENTA
                    </button>
                </div>
            </div>

        </Windows>
    );
}