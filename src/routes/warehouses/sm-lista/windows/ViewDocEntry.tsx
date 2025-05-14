import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { ProductEntry } from "../../../../interfaces";
import { AppDispatch, RootState } from "../../../../redux/store";
import { dateLocal } from "../../../../helpers";
import { useEffect, useState } from "react";
import { DocEntry } from "../../../../interfaces";
import { getProductsEntryAPI } from "../../../../redux/warehouses/warehousesThunk";
import { AiOutlineLoading } from "react-icons/ai";

interface ViewIngresoProductoAlmacenWindowProp {
  closeButton: () => void;
  data: DocEntry
}

export default function ViewDocEntry({ closeButton, data }: ViewIngresoProductoAlmacenWindowProp) {
  const { logo } = useSelector((s: RootState) => s.Branch);
  
  const [productsEntry, setProductsEntry] = useState<ProductEntry[]>([])

  const dispatch = useDispatch<AppDispatch>();
  
  const getProductsEntry = (pe:ProductEntry[]) => {
    setProductsEntry([...pe]);
  }
  
  useEffect(() => {
    if(!data.ProductEntry) dispatch(getProductsEntryAPI(data.id, getProductsEntry));
    else getProductsEntry(data.ProductEntry);
  }, [])
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
        <table className="table-auto w-full text-left" >
          <thead className="bg-primary text-white sticky top-0">
            <tr>
              <th className="text-center">CODIGO</th>
              <th className="text-center">NOMBRE</th>
              <th className="text-center">MARCA</th>
              <th className="text-center">U/M</th>
              <th className="text-center">CANTIDAD</th>
            </tr>
          </thead>
          <tbody>
            {productsEntry.length === 0 &&<tr><td colSpan={5} ><div className="flex justify-center py-2" ><AiOutlineLoading className="ms-2 animate-spin"/></div></td></tr>}
            {productsEntry.map(p => (
              <tr key={p.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                <td className="py-2 text-center"><p>{p.ProductWarehouse.Product.code}</p></td>
                <td className="py-2 text-center"><p>{p.ProductWarehouse.Product.name}</p></td>
                <td className="py-2 text-center"><p>{p.ProductWarehouse.Product.Brand.name}</p></td>
                <td className="py-2 text-center"><p>{p.ProductWarehouse.Product.UnitMeasure.abbreviation}</p></td>
                <td className="py-2 text-center"><p>{p.quantity}</p></td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>

    </Windows>
  );
}