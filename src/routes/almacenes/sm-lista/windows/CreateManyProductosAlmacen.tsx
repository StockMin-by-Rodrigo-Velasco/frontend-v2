import { useSelector } from "react-redux";
import FormTable, { FormTableColumn, FormTableColumnTypes } from "../../../../components/FormTable";
import Windows from "../../../../components/Windows";
import { useFormArray } from "../../../../hooks";
import { RootState } from "../../../../redux/store";
import { useEffect, useState } from 'react';
import ListaProductosOutAlmacen from "./ListaProductosOutAlmacen";

interface CreateManyProductosAlmacenProp{
    closeButton: () => void;
}

interface FormTable {
    id: string,
    almacenId: string,
    codigo: string,
    nombre: string,
    cantidad: number,
    cantidadMinima: number
}

interface ProductosOutAlmacen {
  id: string;
  codigo: string;
  nombre: string;
  imagen: string;

  categoriaId: string;
  categoria?: string;

  marcaId: string;
  marca?: string;

  unidadMedidaId: string;
  unidadMedidaAbreviada?: string;
  
  selected: boolean;
  show: boolean;
}

const columns: FormTableColumn<FormTable>[] = [
    { name: 'CODIGO', type: FormTableColumnTypes.P , key: "codigo"},
    { name: 'NOMBRE', type: FormTableColumnTypes.P, key: "nombre" },
    { name: 'CANTIDAD', type: FormTableColumnTypes.INPUTNUM, key: "cantidad" },
    { name: 'C/MIN', type: FormTableColumnTypes.INPUTNUM, key: "cantidadMinima" },
  ];

export default function CreateManyProductosAlmacen({ closeButton }:CreateManyProductosAlmacenProp) {
  const { listaProductos } = useSelector((s:RootState) => s.Productos);
  const { listaProductosAlmacen } = useSelector((s:RootState) => s.Almacenes);

  const [openListaProductosOutAlmacen, setOpenListaProductosOutAlmacen] = useState(false);

  const [productosOutAlmacen, setProductosOutAlmacen] = useState<ProductosOutAlmacen[]>([]);
  

  // const blackObj:FormTable = {id:'id', almacenId:'almacenId', codigo:'codigo', nombre:'nombre', cantidad:0, cantidadMinima:0};

  const {arrayData, handleInputChange, pushData, pushManyData, removeData} = useFormArray<FormTable>([{id:'id', almacenId:'almacenId', codigo:'codigo', nombre:'nombre', cantidad:0, cantidadMinima:0}]);
  
  const createProductosAlmacen = () => {
    console.log(arrayData);
  }

  useEffect(() => {
    const idsProductosAlmacen = new Set( listaProductosAlmacen.map(p => p.id));

    const newProductosOutAlmacen: ProductosOutAlmacen[] = listaProductos
    .filter( p => !idsProductosAlmacen.has(p.id))
    .map(p => ({
      id: p.id,
      codigo: p.codigo,
      nombre: p.nombre,
      imagen: p.imagen,
      categoriaId: p.categoriaId,
      categoria: p.categoria,
      marcaId: p.marcaId,
      marca: p.marca,
      unidadMedidaId: p.unidadMedidaId,
      unidadMedidaAbreviada: p.unidadMedidaAbreviada,
      selected: false,
      show: true
    }));

    setProductosOutAlmacen(newProductosOutAlmacen);
  }, [])
  
  return (
    <Windows tittle="REGISTRAR NUEVOS PRODUCTOS EN EL ALMACÉN" closeButton={closeButton}>
      {openListaProductosOutAlmacen&& <ListaProductosOutAlmacen productos={productosOutAlmacen} setProductos={setProductosOutAlmacen} closeButton={()=>{setOpenListaProductosOutAlmacen(false)}} />}

        <div>header</div>
        <div className="flex flex-col h-[80vh] overflow-y-scroll scroll-custom ps-2" >
            <FormTable<FormTable> arrayData={arrayData} handleInputChange={handleInputChange} columns={columns} removeData={{name:'BORRAR', action:removeData}} />
            <button type="button" className="bg-success" onClick={() => {setOpenListaProductosOutAlmacen(true)}} >MAS</button>
        </div>

        <div>
            <button type="button" className="bg-warning" onClick={createProductosAlmacen} >getAllProductos</button>
        </div>
        
    </Windows>
  );
}