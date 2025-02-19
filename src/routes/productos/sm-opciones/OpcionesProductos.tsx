import { useSelector } from 'react-redux';
import Accordion from '../../../components/Accordion';
import BodySection from '../../../components/BodySection';
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from '../../../components/DataTable';
import { RootState } from '../../../redux/store';
import { useState } from 'react';
import UpdateCategoria from './windows/UpdateCategoria';
import UpdateMarca from './windows/UpdateMarca';
import { FaPlus } from 'react-icons/fa';
import CreateMarca from './windows/CreateMarca';
import CreateCategoria from './windows/CreateCategoria';

interface DataMarcaInterface {
  id: string;
  sucursalId: string;
  nombre: string;
  origen: string;
  deleted: boolean;
}
interface DataCategoriaInterface {
  id: string;
  sucursalId: string;
  nombre: string;
  detalle: string;
  deleted: boolean;
}
interface DataUnidadMedidaInterface {
  id: string;
  sucursalId: string;
  nombre: string;
  abreviatura: string;
  detalle: string;
  favorito: boolean;
}

const marcaColumns: DataTableColumnInterface<DataMarcaInterface>[] = [
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
  { name: 'ORIGEN', type: DataTableColumnTypes.P, key: "origen" },
]
const categoriaColumns: DataTableColumnInterface<DataCategoriaInterface>[] = [
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
  { name: 'DETALLE', type: DataTableColumnTypes.P, key: "detalle" },
]
const unidadMedidaColumns: DataTableColumnInterface<DataUnidadMedidaInterface>[] = [
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
  { name: 'ABREVIATURA', type: DataTableColumnTypes.P, key: "abreviatura" },
  { name: 'DETALLE', type: DataTableColumnTypes.P, key: "detalle" },
]

export default function OpcionesProductos() {
  const { listaMarcas, listaCategorias, listaUnidadesMedida } = useSelector((s: RootState) => s.Productos);
  const [windowsUpdateMarca, setWindowsUpdateMarca] = useState(false);
  const [windowsUpdateCategoria, setWindowsUpdateCategoria] = useState(false);
  const [windowsCreateMarca, setWindowsCreateMarca] = useState(false);
  const [windowsCreateCategoria, setWindowsCreateCategoria] = useState(false);
  const [crearMarcaCategoria, setCrearMarcaCategoria] = useState(false);
  const [updateCategoria, setUpdateCategoria] = useState<DataCategoriaInterface>({ id: '', sucursalId: '', nombre: '', detalle: '', deleted: false })
  const [updateMarca, setUpdateMarca] = useState<DataMarcaInterface>({ id: '', sucursalId: '', nombre: '', origen: '', deleted: false })

  const openUpdateMarca = (data: DataMarcaInterface) => {
    setUpdateMarca(data);
    setWindowsUpdateMarca(true);
  }
  const openUpdateCategoria = (data: DataCategoriaInterface) => {
    setUpdateCategoria(data)
    setWindowsUpdateCategoria(true);
  }
  const checkFatoriteUnidadMedida = (data: DataUnidadMedidaInterface) => {
    console.log(data)
  }

  return (
    <>
      <BodySection>

        {windowsUpdateCategoria && <UpdateCategoria dataUpdate={updateCategoria} closeButton={() => { setWindowsUpdateCategoria(false) }} />}
        {windowsUpdateMarca && <UpdateMarca dataUpdate={updateMarca} closeButton={() => { setWindowsUpdateMarca(false) }} />}
        
        {windowsCreateMarca && <CreateMarca closeButton={() => { setWindowsCreateMarca(false) }} />}
        {windowsCreateCategoria && <CreateCategoria closeButton={() => { setWindowsCreateCategoria(false) }} />}


        <div className='border-[1px] border-secondary rounded mb-3' >
          <Accordion title='MARCAS' last>
            <DataTable<DataMarcaInterface> data={listaMarcas} columns={marcaColumns} details={{ name: 'MAS', action: openUpdateMarca }} />
          </Accordion>
        </div>

        <div className='border-[1px] border-secondary rounded mb-3'>
          <Accordion title='CATEGORIAS' last>
            <DataTable<DataCategoriaInterface> data={listaCategorias} columns={categoriaColumns} details={{ name: 'MAS', action: openUpdateCategoria }} />
          </Accordion>
        </div>

        <div className='border-[1px] border-secondary rounded'>
          <Accordion title='UNIDADES DE MEDIDA' last >
            <DataTable<DataUnidadMedidaInterface> data={listaUnidadesMedida} columns={unidadMedidaColumns} details={{ name: 'FAVORITO', action: checkFatoriteUnidadMedida }} />
          </Accordion>
        </div>

      </BodySection>

      <div className='absolute bottom-2 right-2 flex flex-col items-end ' >
        { crearMarcaCategoria&& <div className='flex flex-col bg-primary mb-3 rounded text-white' >
          <span className='px-3 py-1 cursor-pointer hover:bg-white/10' onClick={() => { setWindowsCreateMarca(true) }} >NUEVA MARCA</span>
          <span className='px-3 py-1 cursor-pointer hover:bg-white/10' onClick={() => { setWindowsCreateCategoria(true) }} >NUEVA CATEGORÍA</span>
        </div>}
        <button
          onClick={() => { setCrearMarcaCategoria(s=>!s) }}
          type="button"
          className={`${ crearMarcaCategoria&& 'rotate-[135deg]'} transition-all duration-300 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[22px] hover:bg-opacity-100 w-14 h-14 rounded-full`}
        >
          <FaPlus />
        </button>
      </div>

    </>
  );
}