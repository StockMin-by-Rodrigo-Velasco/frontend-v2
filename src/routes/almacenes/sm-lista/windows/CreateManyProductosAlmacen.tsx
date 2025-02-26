import { useDispatch, useSelector } from "react-redux";
import FormTable, { FormTableColumn, FormTableColumnTypes } from "../../../../components/FormTable";
import Windows from "../../../../components/Windows";
import { useFormArray } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from 'react';
import ListaProductosOutAlmacen from "./ListaProductosOutAlmacen";
import { FaPlus } from "react-icons/fa";
import { CreateProductoAlmacenDto } from "../../../../interface";
import { AiOutlineLoading } from "react-icons/ai";
import { createManyProductosAlmacenAPI } from "../../../../redux/almacenes/almacenThunks";

interface CreateManyProductosAlmacenProp {
  closeButton: () => void;
}

interface FormTable {
  productoId: string,
  codigo: string,
  nombre: string,
  unidadMedidaAbreviada?: string;
  cantidad: number,
  cantidadMinima: number
}

interface ProductosOutAlmacen {
  productoId: string;
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
  { name: 'CODIGO', type: FormTableColumnTypes.P, key: "codigo" },
  { name: 'NOMBRE', type: FormTableColumnTypes.P, key: "nombre" },
  { name: 'U/M', type: FormTableColumnTypes.P, key: "unidadMedidaAbreviada", width: 'w-[70px]'},
  { name: 'CANTIDAD', type: FormTableColumnTypes.INPUTNUM, key: "cantidad", width: 'w-[120px]' },
  { name: 'C/MIN', type: FormTableColumnTypes.INPUTNUM, key: "cantidadMinima", width: 'w-[120px]' },
];

export default function CreateManyProductosAlmacen({ closeButton }: CreateManyProductosAlmacenProp) {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { listaProductos } = useSelector((s: RootState) => s.Productos);
  const { selectedAlmacen, listaProductosAlmacen } = useSelector((s: RootState) => s.Almacenes);
  const dispatch = useDispatch<AppDispatch>();

  const [openListaProductosOutAlmacen, setOpenListaProductosOutAlmacen] = useState(false);

  const [productosOutAlmacen, setProductosOutAlmacen] = useState<ProductosOutAlmacen[]>([]);

  const { arrayData, handleInputChange, replaceData, removeData } = useFormArray<FormTable>([]);

  const createProductosAlmacen = () => {
    const productosAlmacen:CreateProductoAlmacenDto[] = arrayData.map(p => {
        const cantidadInt = typeof p.cantidad !== 'number'? parseInt(p.cantidad): p.cantidad;
        const cantidadMinimaInt = typeof p.cantidadMinima !== 'number'? parseInt(p.cantidadMinima): p.cantidadMinima;
        return {
        productoId: p.productoId, 
        cantidad: isNaN(cantidadInt)? 0: cantidadInt, 
        cantidadMinima: isNaN(cantidadMinimaInt)? 0: cantidadMinimaInt
      }}
    );
    dispatch( createManyProductosAlmacenAPI({ almacenId: selectedAlmacen.id, productosAlmacen }) );
  }

  useEffect(() => {
    const idsRegistered = new Set(listaProductosAlmacen.map(p => p.productoId)); //Productos registrados en el almacen
    const idsSelected = new Set(arrayData.map(p => p.productoId)); //Productos agregados al formulario para registrar

    const newProductosOutAlmacen: ProductosOutAlmacen[] = listaProductos
    .map(p => ({
        productoId: p.id,
        codigo: p.codigo,
        nombre: p.nombre,
        imagen: p.imagen,
        categoriaId: p.categoriaId,
        categoria: p.categoria,
        marcaId: p.marcaId,
        marca: p.marca,
        unidadMedidaId: p.unidadMedidaId,
        unidadMedidaAbreviada: p.unidadMedidaAbreviada,
        registered: idsRegistered.has(p.id),
        selected: idsSelected.has(p.id),
        show: true
      }));
    setProductosOutAlmacen(newProductosOutAlmacen);
  }, [arrayData])

  return (
    <Windows tittle="REGISTRAR NUEVOS PRODUCTOS EN EL ALMACÉN" closeButton={closeButton}>
      {openListaProductosOutAlmacen && <ListaProductosOutAlmacen arrayData={arrayData} replaceData={replaceData} productos={productosOutAlmacen} setProductos={setProductosOutAlmacen} closeButton={() => { setOpenListaProductosOutAlmacen(false) }} />}
      <div className="relative  flex flex-col h-[80vh] overflow-y-scroll scroll-custom ms-2 my-2 ">
        
        
        {loadingData && <div className="bg-black/30 backdrop-blur-[2px] rounded absolute top-0 left-0 right-0 bottom-0 text-white z-10 flex flex-col justify-center items-center">
          <span className="text-[50px] mb-5" > <AiOutlineLoading className="ms-2 animate-spin"/> </span>
          Registrando productos en tu almacén...
        </div>}


        <FormTable<FormTable> arrayData={arrayData} handleInputChange={handleInputChange} columns={columns} removeData={{ name: 'BORRAR', action: removeData, width: 'w-[85px]' }} tableFixed />
        <div>
          <button 
            type="button" 
            className="flex items-center border border-secondary rounded-full text-[14px] px-3 mt-2 text-secondary transition-all duration-200 hover:bg-secondary hover:text-white" 
            onClick={() => { setOpenListaProductosOutAlmacen(true) }} 
          > <FaPlus/> <span className="ms-2">AGREGAR PRODUCTOS A LA LISTA</span></button>
        </div>
      </div>

      <div className="p-2 border border-t-secondary flex justify-center" >
        <button 
          type="button" 
          className="border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white" 
          onClick={createProductosAlmacen}>REGISTRAR LOS PRODUCTOS EN EL ALMACÉN</button>
      </div>

    </Windows>
  );
}