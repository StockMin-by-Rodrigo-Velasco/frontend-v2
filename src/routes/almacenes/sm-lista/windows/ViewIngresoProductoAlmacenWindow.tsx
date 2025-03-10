import { useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { IngresoAlmacen, IngresoProductosAlmacen, Producto, User } from "../../../../interface";
import { RootState } from "../../../../redux/store";
import { dateLocal } from "../../../../helpers";
import { useEffect, useState } from "react";
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from "../../../../components/DataTable";


// interface Productos {
//   productoId: string;
//   productoAlmacenId: string;
//   codigo: string;
//   nombre: string;
//   cantidad: number;
//   cantidadMinima: number;

//   categoriaId: string;
//   categoria?: string;

//   marcaId: string;
//   marca?: string;

//   unidadMedidaId: string;
//   unidadMedidaAbreviada?: string;

//   show: boolean;
// }

// interface User {
//   sucursalId: string;
//   nombre: string;
//   apellido: string;
//   ci: string;
// }

interface ProductoForDataTable extends IngresoProductosAlmacen {
  codigo: string;
  nombre: string;
  imagen: string;
  
  cantidad: number;

  categoriaId: string;
  categoria: string;

  marcaId: string;
  marca: string;
  
  unidadMedidaId: string;
  unidadMedidaAbreviada?: string;

  show: boolean;
}

const columns: DataTableColumnInterface<ProductoForDataTable>[] = [
  { name: 'CODIGO', type: DataTableColumnTypes.P, key: "codigo" },
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
  { name: 'MEDIDA', type: DataTableColumnTypes.P, key: "unidadMedidaAbreviada" },
  { name: 'CANTIDAD', type: DataTableColumnTypes.P, key: "cantidad" },
];


interface ViewIngresoProductoAlmacenWindowProp {
  closeButton: () => void;
  data: IngresoAlmacen
}

export default function ViewIngresoProductoAlmacenWindow({ closeButton, data }: ViewIngresoProductoAlmacenWindowProp) {
  const { logo, users } = useSelector((s: RootState) => s.Sucursal);
  const { listaProductos } = useSelector((s: RootState) => s.Productos);

  const [ingresoProductos, setIngresoProductos] = useState<ProductoForDataTable[]>([]);
  const [userData, setUserData] = useState<User>({ id:'',sucursalId:'', nombre:'', apellido:'', ci:'', imagen:'' });

  useEffect(() => {
    const productosSucursal = listaProductos.reduce((acc, producto) => { acc[producto.id] = producto; return acc; }, {} as Record<string, Producto>);

    const newUserData: User = users.find(u => u.id === data.usuarioId) || { id:'',sucursalId:'', nombre:'', apellido:'', ci:'', imagen:'' };

    const newIngresoProductos: ProductoForDataTable[] = data.IngresoProductosAlmacen
      .map(p =>
      ({
        id: p.id,
        ingresoAlmacenId: p.ingresoAlmacenId,
        ProductoAlmacen: p.ProductoAlmacen,
        productoId: p.ProductoAlmacen.productoId,
        productoAlmacenId: p.productoAlmacenId,
        cantidad: p.cantidad,
        cantidadMinima: p.ProductoAlmacen.cantidadMinima,

        codigo: productosSucursal[p.ProductoAlmacen.productoId].codigo,
        nombre: productosSucursal[p.ProductoAlmacen.productoId].nombre,
        imagen: productosSucursal[p.ProductoAlmacen.productoId].imagen,
        categoriaId: productosSucursal[p.ProductoAlmacen.productoId].categoriaId,
        categoria: productosSucursal[p.ProductoAlmacen.productoId].Categoria.nombre,
        marcaId: productosSucursal[p.ProductoAlmacen.productoId].marcaId,
        marca: productosSucursal[p.ProductoAlmacen.productoId].Marca.nombre,
        unidadMedidaId: productosSucursal[p.ProductoAlmacen.productoId].unidadMedidaId,
        unidadMedidaAbreviada: productosSucursal[p.ProductoAlmacen.productoId].UnidadMedida.abreviatura,
        show: true
      }));
    setIngresoProductos(newIngresoProductos);
    setUserData(newUserData);
  }, [])
  return (


    <Windows tittle="ingreso" closeButton={closeButton} >
      <div className="relative  flex flex-col h-[80vh] overflow-y-scroll scroll-custom ms-2 my-2 ">

        <div className="mb-3 px-2 flex w-[60vw]" >
          <div className="flex items-center" >
            <img src={logo} alt="logo-sucursal" width='300px' />
          </div>
          <div className="ms-auto max-w-[400px]" >
            <p><span className="font-bold">Fecha: </span> {dateLocal(data.createdAt)} </p>
            <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${userData.nombre} ${userData.apellido}`}</span> </p>
            <p><span className="font-bold">Detalle: </span> <span >{`${data.detalle}`}</span> </p>
          </div>
        </div>


        <DataTable<ProductoForDataTable> columns={columns} data={ingresoProductos} />
      </div>

    </Windows>
  );
}