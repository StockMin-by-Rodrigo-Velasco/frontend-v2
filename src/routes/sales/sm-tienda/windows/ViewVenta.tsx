import { useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { Product, Venta } from "../../../../interface";
import { RootState } from "../../../../redux/store";
import { dateLocal } from "../../../../helpers";
import { useEffect, useRef, useState } from "react";
import { generateCotizacionVentaPdf } from "../../../../helpers/cotizacion-venta-pdf";
import { FaRegFilePdf } from "react-icons/fa";

interface ViewVentaProp {
    closeButton: () => void;
    venta: Venta;
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


export default function ViewVenta({ closeButton, venta }: ViewVentaProp) {
    const tableRef = useRef<HTMLTableElement | null>(null);
    const { logo, listUsers: users, data } = useSelector((s: RootState) => s.Branch);
    const { products: listaProductos } = useSelector((s: RootState) => s.Products);
    const { opcionesVenta } = useSelector((s: RootState) => s.Ventas);

    const [responsable, setResponsable] = useState('');
    const [listaProductosDetalle, setListaProductosDetalle] = useState<ProductoDetalle[]>([])

    const descargarPdf = () => {
        const tableId = tableRef.current?.id;

        generateCotizacionVentaPdf({
            fileName: `VENTA Nº${ venta.numero }-${venta.createdAt}`,
            contacto: data.contacto,
            direccion: data.direccion,
            type: 'VENTA',
            cliente: `${venta.ClienteVenta.nombre.toUpperCase()} ${venta.ClienteVenta.apellido.toUpperCase()}`,
            responsable: responsable.toUpperCase(),
            numero: venta.numero.toString(),
            detalle: venta.detalle || '',
            fecha: dateLocal(venta.createdAt),
            tableId,
            logo,
        });
    }

    useEffect(() => {
        const usuarioResponsable = users.find(u => u.id === venta?.usuarioId);
        if (usuarioResponsable) setResponsable(`${usuarioResponsable.nombre} ${usuarioResponsable.apellido}`);
        const listaProductosObj = listaProductos.reduce((acc, p) => { acc[p.id] = p; return acc; }, {} as Record<string, Product>);

        if (venta) {
            const productosDetalle: ProductoDetalle[] = venta.ProductoDetalleVenta.map(p => ({
                cantidad: p.cantidad,
                codigo: listaProductosObj[p.productoId].code,
                nombre: listaProductosObj[p.productoId].name,
                precio: p.precio,
                productoId: p.productoId,
                unidadMedida: listaProductosObj[p.productoId].UnidadMedida.abbreviation,
                subTotal: (parseFloat(p.precio) * p.cantidad).toString(),

            }))
            setListaProductosDetalle(productosDetalle);
        }
    }, [venta])


    return (
        <Windows tittle="VENTA" closeButton={closeButton}>

            <div className="relative  flex flex-col max-h-[80vh] overflow-y-scroll scroll-custom ms-2 my-2 ">

                <div className="mb-3 px-2 flex" >
                    <div className="flex items-center" >
                        <img src={logo} alt="logo-sucursal" width='300px' />
                    </div>

                    {venta &&
                        <div className="ms-auto" >
                            <p className="mb-3 text-[22px] "> <span className="font-bold">N°:</span> {venta.numero} </p>
                            <p><span className="font-bold">Fecha: </span> {dateLocal(venta.createdAt as string)} </p>
                            <p><span className="font-bold">Cliente: </span> {venta.ClienteVenta.nombre} {venta.ClienteVenta.apellido}</p>
                            <p><span className="font-bold">Responsable: </span> <span className="capitalize">{responsable}</span> </p>
                        </div>
                    }
                </div>
                <p className="p-2" ><span className="font-bold">Detalle:</span> {venta.detalle} </p>

                <table className={`table-fixed text-left w-full border-secondary rounded overflow-hidden mb-3`} id="tableViewVenta" ref={tableRef}>
                    <thead className="bg-secondary text-white sticky top-0" >
                        <tr>
                            <th className={`uppercase text-center px-2 w-[100px]`}>CODIGO</th>
                            <th className={`uppercase text-center px-2`}>NOMBRE</th>
                            <th className={`uppercase text-center px-2 w-[70px]`}>U/M</th>
                            <th className={`uppercase text-center px-2 w-[110px]`}>CANTIDAD</th>
                            <th className={`uppercase text-center px-2 w-[110px]`}>PRECIO</th>
                            <th className={`uppercase text-center px-2 w-[180px]`}>SUBTOTAL</th>
                        </tr>
                    </thead>
                    {venta &&
                        <tbody>
                            {listaProductosDetalle.map(p => (
                                <tr key={p.productoId} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-center" >
                                    <td>{p.codigo.toUpperCase()}</td>
                                    <td>{p.nombre.toUpperCase()}</td>
                                    <td>{p.unidadMedida.toUpperCase()}</td>
                                    <td>{p.cantidad}</td>
                                    <td>{p.precio}</td>
                                    <td className="text-end pe-2" >{parseFloat(p.subTotal || '0').toFixed(2)} <span>{opcionesVenta.TipoMonedaVenta.abreviatura.toUpperCase()}</span></td>
                                </tr>
                            ))}
                        </tbody>}

                        <tfoot>
                            <tr className=" bg-secondary/50 border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-end">
                                <td colSpan={5} className="font-bold" >DESCUENTO</td>
                                <td className="text-end pe-2" >{parseFloat(venta.descuento || '0').toFixed(2)} <span>{opcionesVenta.TipoMonedaVenta.abreviatura.toUpperCase()}</span></td>
                            </tr>

                            <tr className=" bg-secondary/70 border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-end">
                                <td colSpan={5} className="font-bold" >TOTAL</td>
                                <td className="text-end pe-2" >{parseFloat(venta.total).toFixed(2) } <span>{opcionesVenta.TipoMonedaVenta.abreviatura.toUpperCase()}</span></td>
                            </tr>
                        </tfoot>
                </table>

                <div className="flex justify-center" >
                    <button
                        type="button"
                        onClick={descargarPdf}
                        className="ms-2 flex items-center border border-danger rounded-full text-danger px-3 transition-all duration-200 hover:bg-danger hover:text-white"
                    >DESCARGAR <FaRegFilePdf className="ms-2" />
                    </button>
                </div>
            </div>
        </Windows>
    );
}