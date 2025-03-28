import { useDispatch, useSelector } from "react-redux";
import FormTable, { FormTableColumn, FormTableColumnTypes } from "../../../../components/FormTable";
import Windows from "../../../../components/Windows";
import { useForm, useFormArray } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from 'react';
import { ClienteVenta, CotizacionVenta, CreateCotizacionVentaDto, CreateProductoDetalleVentaDto, CreateVentaDto, ListDecrementProductosAlmacenDto, ProductoTienda, Venta } from "../../../../interface";
import { dateLocal } from "../../../../helpers";
import { InputNumber, InputTextarea, InputTextBlock } from "../../../../components/Input";
import ListaClientes from "./ListaClientes";
import { BsFillTrashFill } from "react-icons/bs";
import { createCotizacionVentaAPI, createVentaAPI } from '../../../../redux/ventas/ventasThunk';
import { hideNotification, showNotificationError, showNotificationWarning } from "../../../../redux/notification/notificationSlice";
import ViewCotizacion from "./ViewCotizacion";
import { FaWarehouse } from "react-icons/fa";
import ViewVenta from "./ViewVenta";
import { AiOutlineLoading } from "react-icons/ai";


interface CreateManyProductosAlmacenProp {
  closeButton: () => void;
  decrementProductos: (listDecrementProductosAlmacenDto: ListDecrementProductosAlmacenDto) => void;
  datosCotizacion?: {cotizacionId: string, Cliente:ClienteVenta, descuento: string, },
  checkProductosTienda: ProductoTienda[];
  handleCheckProducto?: (productoId: string) => void;
}

interface FormTable {
  productoId: string,
  productoAlmacenId: string,
  codigo: string,
  nombre: string,
  unidadMedidaAbreviada?: string;
  cantidadAlmacen: number;
  cantidad: string,
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

const initialCotizacion: CotizacionVenta = {
  id:'',
  ClienteVenta: {id:'', sucursalId:'', nombre:'', apellido: '', codigo: ''},
  clienteVentaId: '',
  numero: 0,
  precioVentaId: '',
  ProductoDetalleVenta: [],
  sucursalId:'',
  total:'',
  usuarioId:'',
  PrecioVenta: { id:'', codigo: '', sucursalId:'', tipoMonedaVentaId:''},
  createdAt:''
}

export default function ProformaVentaWindow({ closeButton, checkProductosTienda, handleCheckProducto, decrementProductos, datosCotizacion }: CreateManyProductosAlmacenProp) {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { id: sucursalId, logo, userData } = useSelector((s: RootState) => s.Sucursal);
  const { opcionesVenta } = useSelector((s: RootState) => s.Ventas);

  const dispatch = useDispatch<AppDispatch>();

  const [clienteSelected, setClienteSelected] = useState<ClienteVenta>({ id: '', apellido: '', codigo: '', nombre: '', sucursalId });
  const [ultimaCotizacion, setUltimaCotizacion] = useState<CotizacionVenta>(initialCotizacion)
  const [ultimaVenta, setUltimaVenta] = useState<Venta | null>(null);

  const [openListaClientes, setOpenListaClientes] = useState(false);
  const [openViewCotizacion, setOpenViewCotizacion] = useState(false);
  const [openViewVenta, setOpenViewVenta] = useState(false);

  const { data: formProforma, handleInputChange: onChangeIngreso } = useForm<{ detalle: string, descuento: string }>({ detalle: '', descuento: datosCotizacion?.descuento || '0'  });
  const { arrayData, handleInputChange, replaceData, removeData } = useFormArray<FormTable>([]);

  const removeProducto = (productoId: string, index: number) => {
    if (handleCheckProducto) {
      handleCheckProducto(productoId);
    }
    removeData(index);
  }

  const createCotizacion = () => {

    if (!clienteSelected.id) {
      dispatch(showNotificationError({ tittle: 'COTIZACION DE VENTA', description: 'Se necesitan datos del cliente.' }));
      setTimeout(() => dispatch(hideNotification()), 5000);
      return;
    }

    const productoDetalleVenta: CreateProductoDetalleVentaDto[] = arrayData.map(p => ({
      cantidad: parseInt(p.cantidad),
      precio: p.precio,
      productoId: p.productoId
    }))

    const totalNum = (arrayData.reduce((acc, p) => acc + (parseInt(p.cantidad) * parseFloat(p.precio)), 0) - parseFloat(formProforma.descuento)).toFixed(3);

    const cotizacionVenta: CreateCotizacionVentaDto = {
      sucursalId,
      total: totalNum.toString(),
      usuarioId: userData.id,
      descuento: formProforma.descuento,
      detalle: formProforma.detalle,
      precioVentaId: opcionesVenta?.precioVentaId || '',
      clienteVentaId: clienteSelected.id,
      productoDetalleVenta
    }
    dispatch(createCotizacionVentaAPI(cotizacionVenta, setUltimaCotizacion, setOpenViewCotizacion));
  }

  const createVenta = () => {
    if (!clienteSelected.id) {
      dispatch(showNotificationError({ tittle: 'REGISTRO DE VENTA', description: 'Se necesitan datos del cliente.' }));
      setTimeout(() => dispatch(hideNotification()), 5000);
      return;
    }

    const verifyCantidades: boolean = arrayData.some(p => parseInt(p.cantidad) > p.cantidadAlmacen);
    if (verifyCantidades) {
      dispatch(showNotificationWarning({ tittle: 'REGISTRO DE VENTA', description: 'El almacén de ventas no cuenta con las cantidades a vender.' }));
      setTimeout(() => dispatch(hideNotification()), 5000);
      return;
    }

    const productoDetalleVenta: CreateProductoDetalleVentaDto[] = arrayData.map(p => ({
      cantidad: parseInt(p.cantidad),
      precio: p.precio,
      productoId: p.productoId
    }));

    const listDecrementProductos: ListDecrementProductosAlmacenDto = {
      productos: arrayData.map(p => ({
        cantidad: parseInt(p.cantidad),
        productoAlmacenId: p.productoAlmacenId
      }))
    }

    const totalNum = (arrayData.reduce((acc, p) => acc + (parseInt(p.cantidad) * parseFloat(p.precio)), 0) - parseFloat(formProforma.descuento)).toFixed(3);

    if (!opcionesVenta?.almacenId) return;

    const venta: CreateVentaDto = {
      sucursalId,
      almacenId: opcionesVenta.almacenId,
      cotizacionVentaId: datosCotizacion?.cotizacionId || undefined,
      total: totalNum.toString(),
      usuarioId: userData.id,
      descuento: formProforma.descuento,
      detalle: formProforma.detalle,
      precioVentaId: opcionesVenta?.precioVentaId || '',
      clienteVentaId: clienteSelected.id,
      productoDetalleVenta
    }

    decrementProductos(listDecrementProductos);
    dispatch(createVentaAPI(venta, listDecrementProductos, setUltimaVenta, setOpenViewVenta));
  }

  useEffect(() => {

    if(datosCotizacion){
      setClienteSelected(datosCotizacion.Cliente);
    }

    const selectedProductos: FormTable[] = checkProductosTienda
      .map(p => ({
        productoId: p.productoId,
        productoAlmacenId: p.productoAlmacenId,
        unidadMedidaAbreviada: p.UnidadMedida.abreviatura,
        codigo: p.codigo,
        nombre: p.nombre,
        cantidadAlmacen: p.cantidad,
        cantidad:  p.cantidadCotizacion?.toString() || '1',
        precio: p.precio,
        subtotal: p.precio,
      }));
    replaceData(selectedProductos);

  }, [])

  return (
    <Windows tittle="REGISTRAR NUEVA VENTA" closeButton={closeButton}>

      {openListaClientes && <ListaClientes closeButton={() => { setOpenListaClientes(false) }} setClienteSelected={setClienteSelected} />}
      {openViewCotizacion && <ViewCotizacion closeButton={() => { setOpenViewCotizacion(false) }} cotizacion={ultimaCotizacion} decrementProductos={decrementProductos} />}
      {openViewVenta && <ViewVenta closeButton={() => { setOpenViewVenta(false) }} venta={ultimaVenta} />}


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

            <InputTextarea value={formProforma.detalle} handleInputChange={onChangeIngreso} name="detalle" placeholder="Detalle" />
          </div>


          <div className="ms-auto" >
            <p><span className="font-bold">Fecha: </span> {dateLocal(Date.now())} </p>
            <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${userData.nombre} ${userData.apellido}`}</span> </p>
            <InputNumber className="mt-[82px]" value={formProforma.descuento.toString()} handleInputChange={onChangeIngreso} name="descuento" placeholder="Descuento:" />
          </div>
        </div>


        <div className="bg-success mb-3 text-white text-end px-8 text-[22px]" >
          <span className="me-2" >Total:</span>
          {(arrayData.reduce((acc, p) => acc + (parseInt(p.cantidad) * parseFloat(p.precio)), 0) - parseFloat(formProforma.descuento || '0')).toFixed(2)}
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
                <td className="p-1 text-center relative ">
                  {(parseInt(f.cantidad) > f.cantidadAlmacen) && <span
                    className="flex justify-center items-center bg-warning absolute text-[10px] px-1 right-0 top-0 rounded-full">
                    <FaWarehouse className="me-2" />{f.cantidadAlmacen}
                  </span>}
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
                    {(parseInt(f.cantidad) * parseFloat(f.precio)).toFixed(2)}
                  </p>
                </td>
                <td className="text-center text-secondary" >
                  <button
                    type="button"
                    className="bg-danger/80 p-1 rounded-full  text-white hover:bg-danger"
                    onClick={() => { removeProducto(f.productoId, indexFil) }}>
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-2 border border-t-secondary flex justify-center" >
        {loadingData ?
          <span className=" flex justify-center items-center border border-secondary rounded-full text-secondary px-3">
            Registrando <AiOutlineLoading className="ms-2 animate-spin" />
          </span>
          :
          <>
            <button
              type="button"
              className="border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white"
              onClick={createVenta}>REGISTRAR VENTA</button>

            <button
              type="button"
              className="border border-primary rounded-full text-primary px-3 transition-all duration-200 hover:bg-primary hover:text-white ms-3"
              onClick={createCotizacion}>REGISTRAR COTIZACION</button>
          </>
        }
      </div>

    </Windows>
  );
}