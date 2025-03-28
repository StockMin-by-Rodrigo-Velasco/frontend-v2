import { useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { Producto, Venta } from "../../../../interface";
import { RootState } from "../../../../redux/store";
import { dateLocal } from "../../../../helpers";
import { useEffect, useState } from "react";

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
    const { logo, users } = useSelector((s: RootState) => s.Sucursal);
    const { listaProductos } = useSelector((s: RootState) => s.Productos);


    const [responsable, setResponsable] = useState('');
    const [listaProductosDetalle, setListaProductosDetalle] = useState<ProductoDetalle[]>([])


    useEffect(() => {
        const usuarioResponsable = users.find(u => u.id === venta?.usuarioId);
        if (usuarioResponsable) setResponsable(`${usuarioResponsable.nombre} ${usuarioResponsable.apellido}`);
        const listaProductosObj = listaProductos.reduce((acc, p) => { acc[p.id] = p; return acc; }, {} as Record<string, Producto>);

        if (venta) {
            const productosDetalle: ProductoDetalle[] = venta.ProductoDetalleVenta.map(p => ({
                cantidad: p.cantidad,
                codigo: listaProductosObj[p.productoId].codigo,
                nombre: listaProductosObj[p.productoId].nombre,
                precio: p.precio,
                productoId: p.productoId,
                unidadMedida: listaProductosObj[p.productoId].UnidadMedida.abreviatura,
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
                            <p><span className="font-bold">Detalle:</span> {venta.detalle} </p>
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
                    {venta &&
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
                                <td className="text-center" >{venta.descuento || 0}</td>
                            </tr>

                            <tr className=" bg-secondary/70 border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-end">
                                <td colSpan={5} className="font-bold" >TOTAL</td>
                                <td className="text-center" >{venta.total}</td>
                            </tr>
                        </tbody>}
                </table>
            </div>
        </Windows>
    );
}