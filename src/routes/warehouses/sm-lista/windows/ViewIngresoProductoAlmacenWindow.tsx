import { useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { IngresoAlmacen, IngresoProductosAlmacen, Product, User } from "../../../../interface";
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

const initialUser:User = { id:'',sucursalId:'', nombre:'', apellido:'', ci:'', imagen:'', contacto:'', deleted:false, direccion:'', password:'', UsuarioPermiso:[] };

export default function ViewIngresoProductoAlmacenWindow({ closeButton, data }: ViewIngresoProductoAlmacenWindowProp) {
  const { logo, listUsers: users } = useSelector((s: RootState) => s.Branch);
  const { products: listaProductos } = useSelector((s: RootState) => s.Products);

  const [ingresoProductos, setIngresoProductos] = useState<ProductoForDataTable[]>([]);
  const [userData, setUserData] = useState<User>(initialUser);

  useEffect(() => {
    const productosSucursal = listaProductos.reduce((acc, producto) => { acc[producto.id] = producto; return acc; }, {} as Record<string, Product>);

    const newUserData: User = users.find(u => u.id === data.usuarioId) || initialUser;

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

        codigo: productosSucursal[p.ProductoAlmacen.productoId].code,
        nombre: productosSucursal[p.ProductoAlmacen.productoId].name,
        imagen: productosSucursal[p.ProductoAlmacen.productoId].image,
        categoriaId: productosSucursal[p.ProductoAlmacen.productoId].categoryId,
        categoria: productosSucursal[p.ProductoAlmacen.productoId].Categoria.name,
        marcaId: productosSucursal[p.ProductoAlmacen.productoId].brandId,
        marca: productosSucursal[p.ProductoAlmacen.productoId].Marca.name,
        unidadMedidaId: productosSucursal[p.ProductoAlmacen.productoId].unitMeasureId,
        unidadMedidaAbreviada: productosSucursal[p.ProductoAlmacen.productoId].UnidadMedida.abbreviation,
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