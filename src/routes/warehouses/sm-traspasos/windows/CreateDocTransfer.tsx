import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { InputSelect, InputTextarea } from "../../../../components/Input";
import { dateLocal } from "../../../../helpers";
import { useForm, useFormArray } from "../../../../hooks";
import { useState } from "react";
import { FaCheckCircle, FaLongArrowAltRight, FaPlus, FaWarehouse } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { hideNotification, showNotificationError, showNotificationInfo, showNotificationWarning } from "../../../../redux/notification/notificationSlice";
import { LuTriangleAlert } from "react-icons/lu";
import { CreateDocTrasferDto, CreateProductTransferDto, CreateProductWarehouseDto, DocTransfer, ProductWarehouse } from "../../../../interfaces";
import { ProductWarehouseForm } from "../../../../interfaces/formInterface";
import { createDocTransferAPI, createProductWarehouseAPI, getProductsWarehouseAPI } from "../../../../redux/warehouses/warehousesThunk";
import ListOriginProducts from "./ListOriginProducts";

interface CreateTraspasoAlmacenProp {
  closeButton: () => void;
  getDocTransfer: (docTransfer: DocTransfer) => void;
}

export default function CreateDocTransfer({ closeButton, getDocTransfer }: CreateTraspasoAlmacenProp) {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { type: typeNotification, showNotification } = useSelector((s: RootState) => s.Notification);
  const { id: branchId, logo, userData } = useSelector((s: RootState) => s.Branch);
  const { warehouses } = useSelector((s: RootState) => s.Warehouses);

  const dispatch = useDispatch<AppDispatch>();

  const [warehouseAlert, setWarehouseAlert] = useState(false);
  const [openListaProductosAlmacen, setOpenListaProductosAlmacen] = useState(false);

  const [destinationReady, setDestinationReady] = useState(false);

  const { data: docTransfer, handleInputChange: onChangeTrasfer } = useForm<CreateDocTrasferDto>({
    branchId,
    userId: userData.id,
    originWarehouseId: '',
    destinationWarehouseId: '',
    details: '',
    productsTransfer: []
  });
  const { arrayData: originProducts, handleInputChange: originProductsChange, replaceData: setOriginProducts } = useFormArray<ProductWarehouseForm>([]);

  const [destinationProducts, setDestinationProducts] = useState<Record<string, { id: string, quantity: number }>>({});

  const changeOriginWarehause = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value: originWarehouseId } = e.target;
    if (originWarehouseId === '') {
      onChangeTrasfer(e);
      setOriginProducts([]);
      setDestinationProducts({});
      setDestinationReady(false);
    } else if (originWarehouseId === docTransfer.destinationWarehouseId) {
      setWarehouseAlert(true);
      setTimeout(() => { setWarehouseAlert(false); }, 5000);
    } else {
      dispatch(getProductsWarehouseAPI(originWarehouseId, generateOriginProducts));
      onChangeTrasfer(e);
    }
  }

  const changeDestination = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value: destinationWarehouseId } = e.target;
    if (destinationWarehouseId === '') {
      setDestinationReady(false);
      onChangeTrasfer(e);
    } else if (destinationWarehouseId === docTransfer.originWarehouseId) {
      setWarehouseAlert(true);
      setTimeout(() => { setWarehouseAlert(false); }, 5000);
    }
    else {
      dispatch(getProductsWarehouseAPI(destinationWarehouseId, generateDestinationProducts));
      setDestinationReady(true);
      onChangeTrasfer(e);
    }
  }

  const generateDestinationProducts = (productWarehouse: ProductWarehouse[]) => {
    const destinationProductsIdsObj = productWarehouse.reduce((acc, producto) => { acc[producto.productId] = { id: producto.id, quantity: producto.quantity }; return acc; }, {} as Record<string, { id: string, quantity: number }>);

    for (const i of originProducts) {
      destinationProductsIdsObj[i.productId] = destinationProductsIdsObj[i.productId] ?
        { id: destinationProductsIdsObj[i.productId].id, quantity: destinationProductsIdsObj[i.productId].quantity } :
        { id: '', quantity: 0 };
    }
    setDestinationProducts(destinationProductsIdsObj);
  }

  const generateOriginProducts = (productWarehouse: ProductWarehouse[]) => {
    const productsWarehouseForm: ProductWarehouseForm[] = productWarehouse.map((p: ProductWarehouse) => (
      {
        id: p.id,
        productId: p.productId,
        image: p.Product.image,
        code: p.Product.code,
        name: p.Product.name,
        brandId: p.Product.branchId,
        brandName: p.Product.Brand.name,
        categoryId: p.Product.categoryId,
        categoryName: p.Product.Category.name,
        unitMeasureId: p.Product.unitMeasureId,
        unitMeasureAbbreviation: p.Product.UnitMeasure.abbreviation,
        quantity: p.quantity.toString(),
        minQuantity: p.minQuantity.toString(),
        transferQuantity: '1',
        show: true,
        selected: false,
        registered: true,
      }));
    setOriginProducts(productsWarehouseForm);
  }

  const deleteProducto = (index: number) => {
    let newProductos = originProducts;
    newProductos[index].selected = false;
    setOriginProducts([...newProductos]);
  }

  const createProductDestinationWarehouse = (productId: string) => {
    if (typeNotification === 'INFO' && showNotification) {
      const createProductWarehouseDto: CreateProductWarehouseDto = {
        productId,
        warehouseId: docTransfer.destinationWarehouseId,
      }
      dispatch(createProductWarehouseAPI(createProductWarehouseDto, addProductDestinationWarehouse));

    } else {
      dispatch(showNotificationInfo({
        tittle: 'Registrar producto en almacén',
        description: 'Se registrará un nuevo producto en el almacén de destino. Si deseas continuar vuelve a presionar el botón “Registrar”, caso contrario cierra esta notificación.'
      }));
    }
  }

  const addProductDestinationWarehouse = (producto: ProductWarehouse) => {
    let newListDestino = destinationProducts;
    newListDestino[producto.productId] = { id: producto.id, quantity: producto.quantity }
    setDestinationProducts({ ...newListDestino });
  }

  const createDocTransfer = () => {
    const checkProductos = originProducts.filter(p => p.selected);

    if (checkProductos.length <= 0) {
      dispatch(showNotificationError({ tittle: 'REGISTRO DE TRASPASO', description: 'No se puede registrar un traspaso sin productos.' }))
      setTimeout(() => { dispatch(hideNotification()) }, 5000);
      return;
    }

    if (checkProductos.find(p => parseInt(p.quantity) < parseInt(p.transferQuantity || '0'))) {
      dispatch(showNotificationWarning({ tittle: 'REGISTRO DE TRASPASO', description: 'Existen productos con cantidades insuficiente para el traspaso.' }))
      setTimeout(() => { dispatch(hideNotification()) }, 5000);
      return;
    }

    if (checkProductos.find(p => parseInt(p.transferQuantity || '0') === 0)) {
      dispatch(showNotificationWarning({ tittle: 'REGISTRO DE TRASPASO', description: 'Se detectaron productos con 0 cantidad de traspaso.' }))
      setTimeout(() => { dispatch(hideNotification()) }, 5000);
      return;
    }

    const productsTransfer: CreateProductTransferDto[] = originProducts.filter(p => p.selected).map(p => ({
      productId: p.productId,
      productWarehouseOriginId: p.id,
      productWarehouseDestinationId: destinationProducts[p.productId].id,

      quantity: parseInt(p.transferQuantity || '0')
    }));
    const createDocTrasferDto: CreateDocTrasferDto = {
      ...docTransfer,
      productsTransfer
    }

    dispatch(createDocTransferAPI(createDocTrasferDto, getDocTransfer));
  }

  return (
    <Windows tittle="NUEVO TRASPASO" closeButton={closeButton}>

      {openListaProductosAlmacen &&
        <ListOriginProducts
          closeButton={() => { setOpenListaProductosAlmacen(false) }}
          products={originProducts}
          setOriginProducts={setOriginProducts}
          warehouseId={docTransfer.originWarehouseId} />
      }

      <div className="mb-3 p-2 flex items-center " >
        <div className="flex items-center" >
          <img src={logo} alt="logo-sucursal" width='300px' />
        </div>
        <div className="flex flex-col items-center ms-auto" >
          <div className="flex" >
            <InputSelect
              handleInputChange={changeOriginWarehause}
              name="originWarehouseId"
              options={warehouses.map(a => ({ name: a.name, value: a.id }))}
              placeholder="Origen:"
              value={docTransfer.originWarehouseId}
              optionDefault="Sin eleccion"
            />

            {loadingData && <span className="text-secondary" ><AiOutlineLoading className="animate-spin" /></span>}
            {(originProducts.length > 0 && !loadingData) && <span className="text-success" ><FaCheckCircle /></span>}

            <InputSelect
              handleInputChange={changeDestination}
              name="destinationWarehouseId"
              className="ms-2"
              disabled={originProducts.length <= 0}
              options={warehouses.map(a => ({ name: a.name, value: a.id }))}
              placeholder="Destino:"
              value={docTransfer.destinationWarehouseId}
              optionDefault="Sin eleccion"
            />
            {loadingData && <span className="text-secondary" ><AiOutlineLoading className="animate-spin" /></span>}
            {(destinationReady && !loadingData) && <span className="text-success" ><FaCheckCircle /></span>}
          </div>

          <span className={`${warehouseAlert ? '' : 'opacity-0'} mt-1 text-center text-[12px] bg-warning px-2 rounded-full`} >El origen debe ser diferente al destino.</span>
        </div>
        <div className="ms-auto flex flex-col" >
          <p><span className="font-bold">Fecha: </span> {dateLocal(Date.now())} </p>
          <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${userData.name} ${userData.lastName}`}</span> </p>
          <InputTextarea value={docTransfer.details || ''} handleInputChange={onChangeTrasfer} name="details" placeholder="Detalle" />
        </div>
      </div>

      <div className="p-2 flex flex-col max-h-[75vh] overflow-y-scroll scroll-custom" >
        <table className="table-fixed text-left w-full border-secondary rounded overflow-hidden">
          <thead className="bg-secondary text-white sticky top-0">
            <tr>
              <th className="uppercase text-center px-2 w-[200px]">CODIGO</th>
              <th className="uppercase text-center px-2 ">NOMBRE</th>
              <th className="uppercase text-center px-2 w-[70px]">U/M</th>
              <th className="uppercase text-center px-2 w-[100px]">CANTIDAD</th>
              <th className="uppercase text-center px-2 w-[150px]">RESULTADO</th>
              <th className="uppercase text-center px-2 w-[80px]">BORRAR</th>
            </tr>
          </thead>

          <tbody>
            {((originProducts.length <= 0) || !destinationReady) && <tr>
              <td colSpan={5} className="py-2 px-10 text-center text-secondary">Verifica que el almacén de origen y el destino hayan sido aprobados o estén seleccionados correctamente.
              </td>
            </tr>}

            {originProducts.map((p, i) => p.selected && (
              <tr key={p.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase" >

                <td className="p-1 text-center" >
                  <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.code} </p>
                </td>
                <td className="p-1 text-center" >
                  <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.name} </p>
                </td>
                <td className="p-1 text-center" >
                  <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.unitMeasureAbbreviation} </p>
                </td>
                <td className="p-1 text-center relative " >
                  {(parseInt(p.quantity) < parseInt(p.transferQuantity || '0')) && <span
                    className="flex justify-center items-center bg-warning absolute text-[10px] px-1 right-0 top-0 rounded-full">
                    <FaWarehouse className="me-2" />{parseInt(p.quantity)}
                  </span>}
                  {(parseInt(p.transferQuantity || '0') === 0) && <span
                    className="flex justify-center items-center bg-warning text-black w-[16px] h-[16px] absolute p-[2px] right-0 top-0 rounded-full">
                    <LuTriangleAlert />
                  </span>}
                  <input
                    onChange={originProductsChange}
                    className="border-secondary border-[1px] rounded w-full p-1 focus:outline-none"
                    type="number"
                    min={1}
                    name={`transferQuantity:${i}`}
                    id={`transferQuantity:${i}`}
                    value={p.transferQuantity || '0'} />
                </td>
                <td className="px-1" >
                  {(destinationProducts[p.productId].id !== '') ?
                    <div className="flex items-center" >
                      <span className="flex bg-secondary text-white rounded px-1 pt-1" >
                        <FaWarehouse className="me-1" /> {parseInt(p.quantity) - parseInt(p.transferQuantity || '0')}
                      </span>
                      <FaLongArrowAltRight className="mx-1 ms-auto" />
                      <span className="flex bg-success text-white rounded px-1 pt-1 ms-auto" >
                        <FaWarehouse className="me-1" /> {destinationProducts[p.productId].quantity + parseInt(p.transferQuantity || '0')}
                      </span>
                    </div>
                    :
                    <div className="flex justify-center" >
                      <button
                        type="button"
                        onClick={() => { createProductDestinationWarehouse(p.productId) }}
                        className="text-info border border-info rounded-full text-[12px] px-2 transition-all duration-200 hover:bg-info hover:text-white "
                      > Registrar
                      </button>
                    </div>
                  }
                </td>
                <td className="text-center text-secondary" >
                  <button type="button" className="bg-danger/80 p-1 rounded-full  text-white hover:bg-danger" onClick={() => { deleteProducto(i) }} ><BsFillTrashFill /></button>
                </td>
              </tr>

            ))}


          </tbody>
        </table>
        <div>
          <button
            type="button"
            disabled={(originProducts.length <= 0) || !destinationReady}
            className="flex items-center border border-secondary rounded-full text-[14px] px-3 mt-2 text-secondary transition-all duration-200 hover:bg-secondary hover:text-white disabled:opacity-70 disabled:hover:bg-white disabled:hover:text-secondary disabled:cursor-not-allowed"
            onClick={() => { setOpenListaProductosAlmacen(true) }}
          > <FaPlus /> <span className="ms-2">AGREGAR PRODUCTOS A LA LISTA</span>
          </button>
        </div>
      </div>

      <div className="p-2 border border-t-secondary flex justify-center" >
        <button
          type="button"
          disabled={loadingData}
          className="flex items-center border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white 
                    disabled:cursor-not-allowed disabled:border-secondary disabled:text-secondary disabled:bg-white"
          onClick={createDocTransfer}>REGISTRAR TRASPASO DE PRODUCTOS
          {loadingData && <AiOutlineLoading className="ms-2 animate-spin" />}
        </button>

      </div>
    </Windows>
  );
}