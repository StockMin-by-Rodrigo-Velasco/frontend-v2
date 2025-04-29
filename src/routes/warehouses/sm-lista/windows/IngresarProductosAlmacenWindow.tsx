import { useDispatch, useSelector } from "react-redux";
import FormTable, { FormTableColumn, FormTableColumnTypes } from "../../../../components/FormTable";
import Windows from "../../../../components/Windows";
import { useForm, useFormArray } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { CreateIngresoProductoAlmacenDto } from "../../../../interface";
import { AiOutlineLoading } from "react-icons/ai";
import { createIngresoProductosAlmacenAPI } from "../../../../redux/warehouses/almacenThunks";
import { dateLocal } from "../../../../helpers";
import { InputTextarea } from "../../../../components/Input";
import ListaProductosIngresarAlmacenWindow from "./ListaProductosIngresarAlmacenWindow";

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
  { name: 'CODIGO', type: FormTableColumnTypes.P, key: "codigo", width: 'w-[200px]' },
  { name: 'NOMBRE', type: FormTableColumnTypes.P, key: "nombre" },
  { name: 'U/M', type: FormTableColumnTypes.P, key: "unidadMedidaAbreviada", width: 'w-[70px]'},
  { name: 'CANTIDAD', type: FormTableColumnTypes.INPUTNUM, key: "cantidad", width: 'w-[120px]' }
];

export default function IngresarProductosAlmacenWindow({ closeButton }: CreateManyProductosAlmacenProp) {
  const { logo, userData } = useSelector((s: RootState) => s.Branch);
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { listaProductos } = useSelector((s: RootState) => s.Productos);
  const { selectedAlmacen, listaProductosAlmacen } = useSelector((s: RootState) => s.Almacenes);

  const [openListaProductosIngresarAlmacenWindow, setOpenListaProductosIngresarAlmacenWindow] = useState(false);
  const [productosAlmacen, setProductosAlmacen] = useState<Productos[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const { data:formIngreso, handleInputChange: onChangeIngreso } = useForm<{detalle:string}>({detalle:''});
  const { arrayData, handleInputChange, replaceData, removeData } = useFormArray<FormTable>([]);

  const createIngresoProductosAlmacen = () => {
    const productosAlmacen:CreateIngresoProductoAlmacenDto[] = arrayData.map(p => {
        const cantidadInt = typeof p.cantidad !== 'number'? parseInt(p.cantidad): p.cantidad;
        return {
          productoAlmacenId: p.productoAlmacenId, 
        cantidad: isNaN(cantidadInt)? 0: cantidadInt, 
      }}
    );

    dispatch (createIngresoProductosAlmacenAPI({
      usuarioId:userData.id,
      almacenId:selectedAlmacen.id,
      detalle:formIngreso.detalle,
      ingresoProductosAlmacen: productosAlmacen
    }, "LOADING-DATA-COMPLETE"));
  }

  useEffect(() => {
    const idsListaProductosAlmacen = listaProductosAlmacen.reduce((acc, producto) => 
      { acc[producto.productoId] = producto.id; return acc; }, {} as Record<string, string>); //Lista de los ids de productos en el almacen. {Clave: Id del producto, Valor: Id del producto en almacen}

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
  }, [arrayData, listaProductosAlmacen])

  return (
    <Windows tittle="REGISTRAR INGRESO DE PRODUCTOS EN EL ALMACÉN" closeButton={closeButton}>
      {openListaProductosIngresarAlmacenWindow && <ListaProductosIngresarAlmacenWindow arrayData={arrayData} replaceData={replaceData} productos={productosAlmacen} setProductos={setProductosAlmacen} closeButton={() => { setOpenListaProductosIngresarAlmacenWindow(false) }} />}
      <div className="relative  flex flex-col h-[80vh] overflow-y-scroll scroll-custom ms-2 my-2 ">
        
        
        {loadingData && <div className="bg-black/30 backdrop-blur-[2px] rounded absolute top-0 left-0 right-0 bottom-0 text-white z-10 flex flex-col justify-center items-center">
          <span className="text-[50px] mb-5" > <AiOutlineLoading className="ms-2 animate-spin"/> </span>
          Registrando ingreso de productos en tu almacén...
        </div>}

        <div className="mb-3 px-2 flex" >
          <div className="flex items-center" >
            <img src={logo} alt="logo-sucursal" width='300px' />    
          </div>
          <div className="ms-auto" >
            <p><span className="font-bold">Fecha: </span> {dateLocal(Date.now())} </p>
            <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${userData.nombre} ${userData.apellido}`}</span> </p>

            <InputTextarea value={formIngreso.detalle} handleInputChange={onChangeIngreso} name="detalle" placeholder="Detalle" />
          </div>      
        </div>


        <FormTable<FormTable> arrayData={arrayData} handleInputChange={handleInputChange} columns={columns} removeData={{ name: 'BORRAR', action: removeData, width: 'w-[85px]' }} tableFixed />
        <div>
          <button 
            type="button" 
            className="flex items-center border border-secondary rounded-full text-[14px] px-3 mt-2 text-secondary transition-all duration-200 hover:bg-secondary hover:text-white" 
            onClick={() => { setOpenListaProductosIngresarAlmacenWindow(true) }} 
          > <FaPlus/> <span className="ms-2">AGREGAR PRODUCTOS A LA LISTA</span></button>
        </div>
      </div>

      <div className="p-2 border border-t-secondary flex justify-center" >
        <button 
          type="button" 
          className="border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white" 
          onClick={createIngresoProductosAlmacen}>REGISTRAR INGRESO DE PRODUCTOS EN EL ALMACÉN</button>
      </div>

    </Windows>
  );
}