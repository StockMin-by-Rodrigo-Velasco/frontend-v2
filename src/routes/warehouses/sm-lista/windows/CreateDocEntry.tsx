import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { useForm, useFormArray } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { dateLocal } from "../../../../helpers";
import { InputTextarea } from "../../../../components/Input";
import { ProductWarehouseForm } from "../../../../interfaces/formInterface";

import { BsFillTrashFill } from "react-icons/bs";
import ListProductsForEntries from './ListProductsForEntries';
import { createDocEntryAPI } from "../../../../redux/warehouses/warehousesThunk";
import { CreateProductEntryDto, DocEntry, initialDocEntry } from "../../../../interfaces";
import ViewDocEntry from "./ViewDocEntry";

interface CreateDocEntryProp {
  closeButton: () => void;
}

interface DataDoc {
  userId: string;
  warehouseId: string;
  details?: string;
}

export default function CreateDocEntry({ closeButton }: CreateDocEntryProp) {
  const { logo, userData } = useSelector((s: RootState) => s.Branch);
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { products } = useSelector((s: RootState) => s.Products);
  const { warehouseSelected, productsWarehouse } = useSelector((s: RootState) => s.Warehouses);

  const [docEntry, setDocEntry] = useState<DocEntry>(initialDocEntry);
  
  const [openListProductsForEntries, setOpenListProductsForEntries] = useState(false);
  const [openViewDocEntry, setOpenViewDocEntry] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { data: formEntry, handleInputChange: changeFormEntry } = useForm<DataDoc>({
    userId: userData.id,
    warehouseId: warehouseSelected.id,
    details: ''
  });
  const { arrayData: productsForm, handleInputChange, replaceData: setProductsForm } = useFormArray<ProductWarehouseForm>([]);

  const checkProduct = (productId: string, e?: React.ChangeEvent<HTMLInputElement>,) => {
    if (e?.target.checked) {
      const newProductsForm = productsForm.map(p => (p.productId === productId) ? { ...p, selected: true } : p)
      setProductsForm(newProductsForm);
    }
    else {
      const newProductsForm = productsForm.map(p => (p.productId === productId) ? { ...p, selected: false, quantity: '0', minQuantity: '0' } : p);
      setProductsForm(newProductsForm);
    }
  }

  const createDoc = () => {
    const productsEntry:CreateProductEntryDto[] = productsForm.filter(p => p.selected).map(p => {
        const quantityInt = typeof p.quantity !== 'number'? parseInt(p.quantity): p.quantity;
        return {
          productWarehouseId: p.id, 
          quantity: isNaN(quantityInt)? 0: quantityInt, 
      }}
    );

    dispatch (createDocEntryAPI({...formEntry, productsEntry}, getDocEntry));
  }

  const getDocEntry = (data: DocEntry) => {
      setDocEntry(data);
      setOpenViewDocEntry(true);
    }

  useEffect(() => {
    const productsWarehouseIds = productsWarehouse.reduce((acc, p) => { acc[p.productId] = p.id; return acc; }, {} as Record<string, string>);
    const productsFormIds = productsForm.filter(p=>p.selected).reduce((acc, p) => { acc[p.productId] = p.quantity; return acc; }, {} as Record<string, string>);
    const idsRegistered = new Set(productsWarehouse.map(p => p.productId)); 

    const newProductWarehouseForm: ProductWarehouseForm[] = products
      .map(p => ({
        id: productsWarehouseIds[p.id],
        productId: p.id,
        code: p.code,
        name: p.name,
        image: p.image,
        quantity: productsFormIds[p.id]||'0',
        minQuantity: '0',
        categoryId: p.Category.id,
        categoryName: p.Category.name,
        brandId: p.brandId,
        brandName: p.Brand.name,
        unitMeasureId: p.unitMeasureId,
        unitMeasureAbbreviation: p.UnitMeasure.abbreviation,
        registered: idsRegistered.has(p.id),
        selected: p.id in productsFormIds,
        show: true
      }));
    setProductsForm(newProductWarehouseForm);
  }, [productsWarehouse])

  return (
    <Windows tittle="REGISTRAR INGRESO DE PRODUCTOS EN EL ALMACÉN" closeButton={closeButton}>
      {openListProductsForEntries &&
        <ListProductsForEntries
          products={productsForm}
          setProductsForm={setProductsForm}
          checkProduct={checkProduct}
          closeButton={() => { setOpenListProductsForEntries(false) }}
        />}
      {openViewDocEntry&& <ViewDocEntry closeButton={() => setOpenViewDocEntry(false)} data={docEntry} />}

      <div className="relative  flex flex-col h-[80vh] overflow-y-scroll scroll-custom ms-2 my-2 ">
        {loadingData && <div className="bg-black/30 backdrop-blur-[2px] rounded absolute top-0 left-0 right-0 bottom-0 text-white z-10 flex flex-col justify-center items-center">
          <span className="text-[50px] mb-5" > <AiOutlineLoading className="ms-2 animate-spin" /> </span>
          Registrando ingreso de productos en tu almacén...
        </div>}

        <div className="mb-3 px-2 flex" >
          <div className="flex items-center" >
            <img src={logo} alt="logo-sucursal" width='300px' />
          </div>
          <div className="ms-auto" >
            <p><span className="font-bold">Fecha: </span> {dateLocal(Date.now())} </p>
            <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${userData.name} ${userData.lastName}`}</span> </p>

            <InputTextarea value={formEntry.details || ''} handleInputChange={changeFormEntry} name="details" placeholder="Detalle" />
          </div>
        </div>

        <table className="table-fixed w-full text-left border-secondary rounded overflow-hidden">
          <thead className="bg-secondary text-white sticky top-0" >
            <tr>
              <th className="text-center px-2 w-36">CODIGO</th>
              <th className="text-center px-2">NOMBRE</th>
              <th className="text-center px-2 w-16">U/M</th>
              <th className="text-center px-2 w-24">CANTIDAD</th>
              <th className="text-center px-2 w-14"><div className="flex justify-center"><BsFillTrashFill /></div></th>
            </tr>
          </thead>

          <tbody>
            {productsForm.map((p, i) => p.selected && (
              <tr key={p.productId} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                <td className="p-1 text-center">
                  <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{p.code}</p>
                </td>
                <td className="p-1 text-center">
                  <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{p.name}</p>
                </td>
                <td className="p-1 text-center">
                  <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{p.unitMeasureAbbreviation}</p>
                </td>
                <td className="p-1 text-center">
                  <input
                    onChange={handleInputChange}
                    className="border-secondary border-[1px] rounded max-w-[100px] p-1 focus:outline-none"
                    type="number"
                    name={`quantity:${i}`}
                    id={`quantity:${i}`}
                    value={p.quantity} />
                </td>
                <td className="text-center text-secondary" >
                  <button
                    type="button"
                    className="bg-danger/80 p-1 rounded-full  text-white hover:bg-danger"
                    onClick={() => { checkProduct(p.productId) }} >
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            type="button"
            className="flex items-center border border-secondary rounded-full text-[14px] px-3 mt-2 text-secondary transition-all duration-200 hover:bg-secondary hover:text-white"
            onClick={() => { setOpenListProductsForEntries(true) }}
          > <FaPlus /> <span className="ms-2">AGREGAR PRODUCTOS A LA LISTA</span></button>
        </div>
      </div>

      <div className="p-2 border border-t-secondary flex justify-center" >
        <button
          type="button"
          className="border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white"
          onClick={createDoc}>REGISTRAR INGRESO DE PRODUCTOS EN EL ALMACÉN</button>
      </div>

    </Windows>
  );
}