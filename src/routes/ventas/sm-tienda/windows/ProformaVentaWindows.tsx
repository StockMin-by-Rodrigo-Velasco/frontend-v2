import { useDispatch, useSelector } from "react-redux";
import FormTable, { FormTableColumn, FormTableColumnTypes } from "../../../../components/FormTable";
import Windows from "../../../../components/Windows";
import { useForm, useFormArray } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { CreateIngresoProductoAlmacenDto } from "../../../../interface";
import { AiOutlineLoading } from "react-icons/ai";
import { createIngresoProductosAlmacenAPI } from "../../../../redux/almacenes/almacenThunks";
import { dateLocal } from "../../../../helpers";
import { InputNumber, InputSelect, InputText, InputTextarea, InputTextBlock } from "../../../../components/Input";

interface CreateManyProductosAlmacenProp {
  closeButton: () => void;
}

interface FormTable {
  productoId: string,
  productoAlmacenId: string,
  codigo: string,
  nombre: string,
  unidadMedidaAbreviada?: string;
  cantidad: number,
  precio: number,
  subtotal: number
}

interface Productos {
  productoId: string;
  productoAlmacenId: string;
  codigo: string;
  nombre: string;
  imagen: string;

  categoriaId: string;
  categoria?: string;

  marcaId: string;
  marca?: string;

  unidadMedidaId: string;
  unidadMedidaAbreviada?: string;

  registered: boolean;
  selected: boolean;
  show: boolean;
}

const columns: FormTableColumn<FormTable>[] = [
  { name: 'CODIGO', type: FormTableColumnTypes.P, key: "codigo", width: 'w-[100px]' },
  { name: 'NOMBRE', type: FormTableColumnTypes.P, key: "nombre" },
  { name: 'U/M', type: FormTableColumnTypes.P, key: "unidadMedidaAbreviada", width: 'w-[70px]' },
  { name: 'CANTIDAD', type: FormTableColumnTypes.INPUTNUM, key: "cantidad", width: 'w-[110px]' },
  { name: 'PRECIO', type: FormTableColumnTypes.INPUTNUM, key: "precio", width: 'w-[110px]' },
  { name: 'SUBTOTAL', type: FormTableColumnTypes.P, key: "subtotal", width: 'w-[110px]' }
];

export default function ProformaVentaWindow({ closeButton }: CreateManyProductosAlmacenProp) {
  const { logo, userData } = useSelector((s: RootState) => s.Sucursal);
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { listaProductos } = useSelector((s: RootState) => s.Productos);
  const { selectedAlmacen, listaProductosAlmacen } = useSelector((s: RootState) => s.Almacenes);

  const {  listaPrecioVenta } = useSelector((s: RootState) => s.Ventas);
  const { data, handleInputChange: handleChange } = useForm<{cliente: string}>({cliente:''});

  const selectOptions = listaPrecioVenta.map(pv => ({ name: pv.codigo, value: pv.id }));

  const [openListaProductosIngresarAlmacenWindow, setOpenListaProductosIngresarAlmacenWindow] = useState(false);
  const [productosAlmacen, setProductosAlmacen] = useState<Productos[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const { data: formIngreso, handleInputChange: onChangeIngreso } = useForm<{ detalle: string, descuento: number }>({ detalle: '', descuento:0 });
  const { arrayData, handleInputChange, replaceData, removeData } = useFormArray<FormTable>([]);

  const createIngresoProductosAlmacen = () => {
    const productosAlmacen: CreateIngresoProductoAlmacenDto[] = arrayData.map(p => {
      const cantidadInt = typeof p.cantidad !== 'number' ? parseInt(p.cantidad) : p.cantidad;
      return {
        productoAlmacenId: p.productoAlmacenId,
        cantidad: isNaN(cantidadInt) ? 0 : cantidadInt,
      }
    }
    );

    dispatch(createIngresoProductosAlmacenAPI({
      usuarioId: userData.id,
      almacenId: selectedAlmacen.id,
      detalle: formIngreso.detalle,
      ingresoProductosAlmacen: productosAlmacen
    }));
  }

  useEffect(() => {
    const idsListaProductosAlmacen = listaProductosAlmacen.reduce((acc, producto) => { acc[producto.productoId] = producto.id; return acc; }, {} as Record<string, string>); //Lista de los ids de productos en el almacen. {Clave: Id del producto, Valor: Id del producto en almacen}

    const idsRegistered = new Set(listaProductosAlmacen.map(p => p.productoId)); //Productos registrados en el almacen
    const idsSelected = new Set(arrayData.map(p => p.productoId)); //Productos agregados al formulario para registrar

    const newProductosOutAlmacen: Productos[] = listaProductos
      .map(p => ({
        productoId: p.id,
        productoAlmacenId: idsListaProductosAlmacen[p.id],
        codigo: p.codigo,
        nombre: p.nombre,
        imagen: p.imagen,
        categoriaId: p.Categoria.id,
        categoria: p.Categoria.nombre,
        marcaId: p.marcaId,
        marca: p.Marca.nombre,
        unidadMedidaId: p.unidadMedidaId,
        unidadMedidaAbreviada: p.UnidadMedida.abreviatura,
        registered: idsRegistered.has(p.id),
        selected: idsSelected.has(p.id),
        show: true
      }));
    setProductosAlmacen(newProductosOutAlmacen);


    const selectedProductos: FormTable[] = listaProductos
      .map(p => ({
        productoId: p.id,
        productoAlmacenId: '',
        unidadMedidaAbreviada: p.UnidadMedida.abreviatura,
        codigo: p.codigo,
        nombre: p.nombre,
        cantidad: 0,
        precio: 0,
        subtotal: 0,
      }));
    replaceData(selectedProductos);


  }, [listaProductosAlmacen])

  return (
    <Windows tittle="REGISTRAR NUEVA VENTA" closeButton={closeButton}>
      <div className="relative  flex flex-col h-[80vh] overflow-y-scroll scroll-custom ms-2 my-2 ">


        {loadingData && <div className="bg-black/30 backdrop-blur-[2px] rounded absolute top-0 left-0 right-0 bottom-0 text-white z-10 flex flex-col justify-center items-center">
          <span className="text-[50px] mb-5" > <AiOutlineLoading className="ms-2 animate-spin" /> </span>
          Registrando ingreso de productos en tu almacén...
        </div>}

        <div className="mb-3 px-2 flex" >
          <div className="flex items-center" >
            <img src={logo} alt="logo-sucursal" width='300px' />
          </div>

          <div className="mx-3" >
            <InputTextBlock
              name="cliente"
              placeholder="Cliente: "
              value="Rodrigo Velasco"
            />
            <span className="text-info text-[12px]" >Buscar cliente por codigo</span>
            <InputSelect
              optionDefault="DISTRIBUCION"
              options={selectOptions}
              handleInputChange={handleChange}
              placeholder="Precio de venta"
              name="tipoMonedaVentaId"
              value={data.cliente}
              disabled={loadingData}
              required
            />
            <InputSelect
              optionDefault="ALMACEN 1"
              options={selectOptions}
              handleInputChange={handleChange}
              placeholder="Almacen de salida"
              name="tipoMonedaVentaId"
              value={data.cliente}
              disabled={loadingData}
              required
            />


          </div>


          <div className="ms-auto" >
            <p><span className="font-bold">Fecha: </span> {dateLocal(Date.now())} </p>
            <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${userData.nombre} ${userData.apellido}`}</span> </p>

            <InputNumber value={formIngreso.descuento.toString()} handleInputChange={onChangeIngreso} name="descuento" placeholder="Descuento:" />
            <InputTextarea value={formIngreso.detalle} handleInputChange={onChangeIngreso} name="detalle" placeholder="Detalle" />
          </div>
        </div>


        <div className="bg-success mb-3 text-white text-end px-8 text-[22px]" >
          Total: 2535 Bs.
        </div>


        <FormTable<FormTable> arrayData={arrayData} handleInputChange={handleInputChange} columns={columns} removeData={{ name: 'BORRAR', action: removeData, width: 'w-[85px]' }} tableFixed />
      </div>

      <div className="p-2 border border-t-secondary flex justify-center" >
        <button
          type="button"
          className="border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white"
          onClick={createIngresoProductosAlmacen}>REGISTRAR VENTA</button>

        <button
          type="button"
          className="border border-primary rounded-full text-primary px-3 transition-all duration-200 hover:bg-primary hover:text-white ms-3"
          onClick={createIngresoProductosAlmacen}>GENERAR COTIZACION</button>
      </div>

    </Windows>
  );
}