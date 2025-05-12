import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from 'react';
import ListProductsOutWarehouse from "./ListProductsOutWarehouse";
import { FaPlus } from "react-icons/fa";
import { CreateProductWarehouseDto } from "../../../../interface";
import { AiOutlineLoading } from "react-icons/ai";
import { createManyProductsWarehouseAPI } from "../../../../redux/warehouses/warehousesThunk";
import { BsFillTrashFill } from "react-icons/bs";

interface CreateManyProductsWarehouseProp {
  closeButton: () => void;
}

interface ProductForm {
  productId: string;
  code: string;
  name: string;
  image?: string;
  quantity: string;
  minQuantity: string;

  categoryId: string;
  categoryName?: string;

  brandId: string;
  brandName?: string;

  unitMeasureId: string;
  unitMeasureAbbreviation?: string;

  registered: boolean;
  selected: boolean;
  show: boolean;
}


export default function CreateManyProductsWarehouse({ closeButton }: CreateManyProductsWarehouseProp) {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { warehouseSelected, productsWarehouse } = useSelector((s: RootState) => s.Warehouses);
  const { products } = useSelector((s: RootState) => s.Products);

  const dispatch = useDispatch<AppDispatch>();

  const [productsForm, setProductsForm] = useState<ProductForm[]>([]);

  const [openListaProductosRegistrarAlmacenWindow, setOpenListaProductosRegistrarAlmacenWindow] = useState(false);

  const createManyProducts = () => {
    const productsWarehouse: CreateProductWarehouseDto[] = productsForm.filter(p=>p.selected).map(p => {
      const quantityInt = typeof p.quantity !== 'number' ? parseInt(p.quantity) : p.quantity;
      const minQuantityInt = typeof p.minQuantity !== 'number' ? parseInt(p.minQuantity) : p.minQuantity;
      return {
        productId: p.productId,
        warehouseId: warehouseSelected.id,
        quantity: isNaN(quantityInt) ? 0 : quantityInt,
        minQuantity: isNaN(minQuantityInt) ? 0 : minQuantityInt
      }
    }
    );
    dispatch(createManyProductsWarehouseAPI({ warehouseId: warehouseSelected.id, productsWarehouse }));
  }

  const checkProduct = (productId: string, e?: React.ChangeEvent<HTMLInputElement>,) => {
    if (e?.target.checked) setProductsForm(pro => pro.map(p => (p.productId === productId) ? { ...p, selected: true } : p));
    else setProductsForm(pro => pro.map(p => (p.productId === productId) ? { ...p, selected: false, quantity: '0', minQuantity: '0' } : p));
  }

  const changeMinQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;
    const prop = name.split(':')[0]; // Nombre de la propiedad del objeto
    const index = parseInt(name.split(':')[1]); // Lugar del objeto en el array

    let newProductsForm = productsForm;
    newProductsForm[index] = { ...newProductsForm[index], [prop]: (value === '' && type === 'number') ? '0' : value };
    setProductsForm([...newProductsForm]);
  }

  useEffect(() => {
    const idsRegistered = new Set(productsWarehouse.map(p => p.productId));

    const newProductsOutWarehouse: ProductForm[] = products
      .map(p => ({
        productId: p.id,
        code: p.code,
        name: p.name,
        image: (p.image === '') ? undefined : p.image,
        quantity: '0',
        minQuantity: '0',
        categoryId: p.Category.id,
        categoryName: p.Category.name,
        brandId: p.brandId,
        brandName: p.Brand.name,
        unitMeasureId: p.unitMeasureId,
        unitMeasureAbbreviation: p.UnitMeasure.abbreviation,
        registered: idsRegistered.has(p.id),
        selected: false,
        show: true
      }));
    setProductsForm(newProductsOutWarehouse);
  }, [])

  return (
    <Windows tittle="REGISTRAR NUEVOS PRODUCTOS EN EL ALMACÉN" closeButton={closeButton}>
      {openListaProductosRegistrarAlmacenWindow &&
        <ListProductsOutWarehouse
          closeButton={() => { setOpenListaProductosRegistrarAlmacenWindow(false) }}
          products={productsForm}
          setProducts={setProductsForm}
          checkProduct={checkProduct}
        />
      }
      <div className="relative  flex flex-col h-[80vh] overflow-y-scroll scroll-custom ms-2 my-2 ">


        {loadingData && <div className="bg-black/30 backdrop-blur-[2px] rounded absolute top-0 left-0 right-0 bottom-0 text-white z-10 flex flex-col justify-center items-center">
          <span className="text-[50px] mb-5" > <AiOutlineLoading className="ms-2 animate-spin" /> </span>
          Registrando productos en tu almacén...
        </div>}

        <table className="table-fixed w-full text-left border-secondary rounded overflow-hidden">
          <thead className="bg-secondary text-white sticky top-0" >
            <tr>
              <th className="text-center px-2 w-36">CODIGO</th>
              <th className="text-center px-2">NOMBRE</th>
              <th className="text-center px-2 w-16">U/M</th>
              <th className="text-center px-2 w-24">C/MIN</th>
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
                    onChange={changeMinQuantity}
                    className="border-secondary border-[1px] rounded max-w-[100px] p-1 focus:outline-none"
                    type="number"
                    name={`minQuantity:${i}`}
                    id={`minQuantity:${i}`}
                    value={p.minQuantity} />
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
            onClick={() => { setOpenListaProductosRegistrarAlmacenWindow(true) }}
          > <FaPlus /> <span className="ms-2">AGREGAR PRODUCTOS A LA LISTA</span></button>
        </div>
      </div>

      <div className="p-2 border border-t-secondary flex justify-center" >
        <button
          type="button"
          className="border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white"
          onClick={createManyProducts}>REGISTRAR LOS PRODUCTOS EN EL ALMACÉN</button>
      </div>
    </Windows>
  );
}