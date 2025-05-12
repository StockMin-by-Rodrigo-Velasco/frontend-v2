import { useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { initialUser, Product, ProductEntry, User } from "../../../../interfaces";
import { RootState } from "../../../../redux/store";
import { dateLocal } from "../../../../helpers";
import { useEffect, useState } from "react";
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from "../../../../components/DataTable";
import { DocEntry } from "../../../../interfaces";
import { ProductWarehouseForm } from "../../../../interfaces/formInterface";



interface ViewIngresoProductoAlmacenWindowProp {
  closeButton: () => void;
  data: DocEntry
}

// const initialUser:User = { id:'',sucursalId:'', nombre:'', apellido:'', ci:'', imagen:'', contacto:'', deleted:false, direccion:'', password:'', UsuarioPermiso:[] };

export default function ViewDocEntry({ closeButton, data }: ViewIngresoProductoAlmacenWindowProp) {
  const { logo } = useSelector((s: RootState) => s.Branch);
  // const { products: listaProductos } = useSelector((s: RootState) => s.Products);

  // const [ingresoProductos, setIngresoProductos] = useState<ProductoForDataTable[]>([]);
  // const [userData, setUserData] = useState<User>(initialUser);

  // useEffect(() => {
  //   const productosSucursal = listaProductos.reduce((acc, producto) => { acc[producto.id] = producto; return acc; }, {} as Record<string, Product>);

  //   const newUserData: User = users.find(u => u.id === data.usuarioId) || initialUser;

  //   const newIngresoProductos: ProductoForDataTable[] = data.IngresoProductosAlmacen
  //     .map(p =>
  //     ({
  //       id: p.id,
  //       ingresoAlmacenId: p.ingresoAlmacenId,
  //       ProductoAlmacen: p.ProductoAlmacen,
  //       productoId: p.ProductoAlmacen.productoId,
  //       productoAlmacenId: p.productoAlmacenId,
  //       cantidad: p.cantidad,
  //       cantidadMinima: p.ProductoAlmacen.cantidadMinima,

  //       codigo: productosSucursal[p.ProductoAlmacen.productoId].code,
  //       nombre: productosSucursal[p.ProductoAlmacen.productoId].name,
  //       imagen: productosSucursal[p.ProductoAlmacen.productoId].image,
  //       categoriaId: productosSucursal[p.ProductoAlmacen.productoId].categoryId,
  //       categoria: productosSucursal[p.ProductoAlmacen.productoId].Categoria.name,
  //       marcaId: productosSucursal[p.ProductoAlmacen.productoId].brandId,
  //       marca: productosSucursal[p.ProductoAlmacen.productoId].Marca.name,
  //       unidadMedidaId: productosSucursal[p.ProductoAlmacen.productoId].unitMeasureId,
  //       unidadMedidaAbreviada: productosSucursal[p.ProductoAlmacen.productoId].UnidadMedida.abbreviation,
  //       show: true
  //     }));
  //   setIngresoProductos(newIngresoProductos);
  //   setUserData(newUserData);
  // }, [])
  return (


    <Windows tittle="ingreso" closeButton={closeButton} >
      <div className="relative  flex flex-col h-[80vh] overflow-y-scroll scroll-custom ms-2 my-2 ">

        <div className="mb-3 px-2 flex w-[60vw]" >
          <div className="flex items-center" >
            <img src={logo} alt="logo-sucursal" width='300px' />
          </div>
          <div className="ms-auto max-w-[400px]" >
            <p><span className="font-bold">Fecha: </span> {dateLocal(data.createdAt || '')} </p>
            <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${data.User.name} ${data.User.lastName}`}</span> </p>
            <p><span className="font-bold">Detalle: </span> <span >{`${data.details}`}</span> </p>
          </div>
        </div>

        {/* const columns: DataTableColumnInterface<ProductEntry>[] = [
  { name: 'CODIGO', type: DataTableColumnTypes.P, key: "code" },
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "name" },
  { name: 'MEDIDA', type: DataTableColumnTypes.P, key: "unitMeasureAbbreviation" },
  { name: 'CANTIDAD', type: DataTableColumnTypes.P, key: "quantity" },
]; */}

        <table className="table-auto w-full text-left" >
          <thead className="bg-primary text-white sticky top-0">
            <tr>
              <th className="text-center">CODIGO</th>
              <th className="text-center">NOMBRE</th>
              <th className="text-center">U/M</th>
              <th className="text-center">CANTIDAD</th>
              {/* {columns.map(c => (
                        <th key={c.name} className="uppercase text-center">{c.name}</th>
                    ))}
                    {details?.name &&
                        <th className="uppercase text-center">{details.name}</th>
                    } */}
            </tr>
          </thead>
          <tbody>
            {data.ProductEntry.map(p => (
              <tr className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                <td className="py-2 text-center"><p>{p.ProductWarehouse.Product.code}</p></td>
                <td className="py-2 text-center"><p>{p.ProductWarehouse.Product.name}</p></td>
                <td className="py-2 text-center"><p>{p.ProductWarehouse.Product.UnitMeasure.abbreviation}</p></td>
                <td className="py-2 text-center"><p>{p.quantity}</p></td>
              </tr>

            ))}
          </tbody>
        </table>


        {/* <DataTable<ProductEntry> columns={columns} data={ingresoProductos} /> */}
      </div>

    </Windows>
  );
}