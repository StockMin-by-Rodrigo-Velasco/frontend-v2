import { useDispatch, useSelector } from "react-redux";
import FormTable, { FormTableColumn, FormTableColumnTypes } from "../../../../components/FormTable";
import Windows from "../../../../components/Windows";
import { useForm, useFormArray } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from 'react';
import { ClienteVenta, ProductoTienda } from "../../../../interface";
import { dateLocal } from "../../../../helpers";
import { InputNumber, InputTextarea, InputTextBlock } from "../../../../components/Input";
import ListaClientes from "./ListaClientes";
import { BsFillTrashFill } from "react-icons/bs";

interface CreateManyProductosAlmacenProp {
  closeButton: () => void;
  checkProductosTienda: ProductoTienda[];
  handleCheckProducto: (productoId: string) => void;
}

interface FormTable {
  productoId: string,
  productoAlmacenId: string,
  codigo: string,
  nombre: string,
  unidadMedidaAbreviada?: string;
  cantidadAlmacen: number;
  cantidad: number,
  precio: string,
  subtotal: string
}

const columns: FormTableColumn<FormTable>[] = [
  { name: 'CODIGO', type: FormTableColumnTypes.P, key: "codigo", width: 'w-[100px]' },
  { name: 'NOMBRE', type: FormTableColumnTypes.P, key: "nombre" },
  { name: 'U/M', type: FormTableColumnTypes.P, key: "unidadMedidaAbreviada", width: 'w-[70px]' },
  { name: 'CANTIDAD', type: FormTableColumnTypes.INPUTNUM, key: "cantidad", width: 'w-[110px]' },
  { name: 'PRECIO', type: FormTableColumnTypes.INPUTNUM, key: "precio", width: 'w-[110px]' },
  { name: 'SUBTOTAL', type: FormTableColumnTypes.P, key: "subtotal", width: 'w-[110px]' }
];

export default function ProformaVentaWindow({ closeButton, checkProductosTienda, handleCheckProducto }: CreateManyProductosAlmacenProp) {
  const { id: sucursalId, logo, userData } = useSelector((s: RootState) => s.Sucursal);
  const { opcionesVenta } = useSelector((s: RootState) => s.Ventas);
  
  const dispatch = useDispatch<AppDispatch>();

  const [clienteSelected, setClienteSelected] = useState<ClienteVenta>({ id: '', apellido: '', codigo: '', nombre: '', sucursalId });

  const [openListaClientes, setOpenListaClientes] = useState(false);

  const { data: formIngreso, handleInputChange: onChangeIngreso } = useForm<{ detalle: string, descuento: string }>({ detalle: '', descuento: '0' });
  const { arrayData, handleInputChange, replaceData, removeData } = useFormArray<FormTable>([]);

  const removeProducto = ( productoId: string, index: number ) => {
    handleCheckProducto(productoId);
    removeData(index);
  }
  
  const createCotizacion = () => {
    console.log(arrayData);
  }


  useEffect(() => {
    const selectedProductos: FormTable[] = checkProductosTienda
      .map(p => ({
        productoId: p.productoId,
        productoAlmacenId: p.productoAlmacenId,
        unidadMedidaAbreviada: p.UnidadMedida.abreviatura,
        codigo: p.codigo,
        nombre: p.nombre,
        cantidadAlmacen: p.cantidad,
        cantidad: 1,
        precio: p.precio,
        subtotal: p.precio,
      }));
    replaceData(selectedProductos);
  }, [])

  return (
    <Windows tittle="REGISTRAR NUEVA VENTA" closeButton={closeButton}>

      {openListaClientes && <ListaClientes closeButton={() => { setOpenListaClientes(false) }} setClienteSelected={setClienteSelected} />}


      <div className="relative  flex flex-col h-[80vh] overflow-y-scroll scroll-custom ms-2 my-2 ">

        <div className="mb-3 px-2 flex" >
          <div className="flex items-center" >
            <img src={logo} alt="logo-sucursal" width='300px' />
          </div>

          <div className="mx-3" >
            <InputTextBlock
              name="cliente"
              placeholder="Cliente: "
              value={`${clienteSelected.nombre.toUpperCase()} ${clienteSelected.apellido.toUpperCase()}`}
            />
            <span className="text-info text-[12px] cursor-pointer" onClick={() => { setOpenListaClientes(true) }} >Buscar cliente...</span>

            <InputTextarea value={formIngreso.detalle} handleInputChange={onChangeIngreso} name="detalle" placeholder="Detalle" />
          </div>


          <div className="ms-auto" >
            <p><span className="font-bold">Fecha: </span> {dateLocal(Date.now())} </p>
            <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${userData.nombre} ${userData.apellido}`}</span> </p>
            <InputNumber className="mt-[82px]" value={formIngreso.descuento.toString()} handleInputChange={onChangeIngreso} name="descuento" placeholder="Descuento:" />
          </div>
        </div>


        <div className="bg-success mb-3 text-white text-end px-8 text-[22px]" >
          <span className="me-2" >Total:</span>
          {arrayData.reduce((acc, p) => acc + (p.cantidad * parseFloat(p.precio)), 0) - parseFloat(formIngreso.descuento || '0')} 
          <span className="ms-2 uppercase" >{opcionesVenta?.PrecioVenta.TipoMonedaVenta?.abreviatura}</span>  
        </div>

        <table className={`table-fixed text-left w-full border-secondary rounded overflow-hidden`}>
          <thead className="bg-secondary text-white sticky top-0" >
            <tr>
              {columns.map(c => (
                <th key={c.name} className={`${c.width ? c.width : ''} uppercase text-center px-2`}>{c.name}</th>
              ))}
              <th className={`w-[85px] uppercase text-center px-2`}>BORRAR</th>
            </tr>
          </thead>

          <tbody>
            {arrayData.map((f, indexFil) => (
              <tr key={f.productoId} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                <td className="p-1 text-center">
                  <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{f.codigo}</p>
                </td>
                <td className="p-1 text-center">
                  <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{f.nombre.toUpperCase()}</p>
                </td>
                <td className="p-1 text-center">
                  <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{f.unidadMedidaAbreviada?.toUpperCase()}</p>
                </td>
                <td className="p-1 text-center">
                  <input
                    onChange={handleInputChange}
                    className="border-secondary border-[1px] rounded max-w-[100px] p-1 focus:outline-none"
                    type="number"
                    name={`cantidad:${indexFil}`}
                    id={`cantidad:${indexFil}`}
                    value={f.cantidad}
                  />
                </td>
                <td className="p-1 text-center">
                  <input
                    onChange={handleInputChange}
                    className="border-secondary border-[1px] rounded max-w-[100px] p-1 focus:outline-none"
                    type="number"
                    name={`precio:${indexFil}`}
                    id={`precio:${indexFil}`}
                    value={f.precio}
                  />
                </td>
                <td className="p-1 text-center">
                  <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">
                    {f.cantidad * parseFloat(f.precio)}
                  </p>
                </td>
                <td className="text-center text-secondary" >
                    <button 
                    type="button" 
                    className="bg-danger/80 p-1 rounded-full  text-white hover:bg-danger" 
                    onClick={() => {removeProducto(f.productoId, indexFil)}}>
                      <BsFillTrashFill />
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-2 border border-t-secondary flex justify-center" >
        <button
          type="button"
          className="border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white"
          onClick={createCotizacion}>REGISTRAR VENTA</button>

        <button
          type="button"
          className="border border-primary rounded-full text-primary px-3 transition-all duration-200 hover:bg-primary hover:text-white ms-3"
          onClick={createCotizacion}>GENERAR COTIZACION</button>
      </div>

    </Windows>
  );
}