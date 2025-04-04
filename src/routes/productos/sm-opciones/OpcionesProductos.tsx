import { useDispatch, useSelector } from 'react-redux';
import Accordion from '../../../components/Accordion';
import BodySection from '../../../components/BodySection';
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from '../../../components/DataTable';
import { AppDispatch, RootState } from '../../../redux/store';
import { useState } from 'react';
import UpdateCategoria from './windows/UpdateCategoria';
import UpdateMarca from './windows/UpdateMarca';
import { FaPlus } from 'react-icons/fa';
import CreateMarca from './windows/CreateMarca';
import CreateCategoria from './windows/CreateCategoria';
import CreateUnidadMedida from './windows/CreateUnidadMedida';
import { Categoria, Marca, UnidadMedidaSucursal } from '../../../interface';
import { handleUnidadMedidaAPI } from '../../../redux/productos/productosThunk';


const marcaColumns: DataTableColumnInterface<Marca>[] = [
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
  { name: 'ORIGEN', type: DataTableColumnTypes.P, key: "origen" },
]

const categoriaColumns: DataTableColumnInterface<Categoria>[] = [
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
  { name: 'DETALLE', type: DataTableColumnTypes.P, key: "detalle" },
]

export default function OpcionesProductos() {
  const dispatch = useDispatch<AppDispatch>();
  const { listaMarcas, listaCategorias, listaUnidadesMedidaSucursal } = useSelector((s: RootState) => s.Productos);
  const [windowsUpdateMarca, setWindowsUpdateMarca] = useState(false);
  const [windowsUpdateCategoria, setWindowsUpdateCategoria] = useState(false);
  const [windowsCreateMarca, setWindowsCreateMarca] = useState(false);
  const [windowsCreateCategoria, setWindowsCreateCategoria] = useState(false);
  const [openCreateUnidadMedida, setOpenCreateUnidadMedida] = useState(false);
  const [updateCategoria, setUpdateCategoria] = useState<Categoria>({ id: '', sucursalId: '', nombre: '', detalle: '', deleted: false })
  const [updateMarca, setUpdateMarca] = useState<Marca>({ id: '', sucursalId: '', nombre: '', origen: '', deleted: false })

  const openUpdateMarca = (data: Marca) => {
    setUpdateMarca(data);
    setWindowsUpdateMarca(true);
  }
  const openUpdateCategoria = (data: Categoria) => {
    setUpdateCategoria(data)
    setWindowsUpdateCategoria(true);
  }
  const quitarUnidadMedida = (data: UnidadMedidaSucursal) => {
    dispatch(handleUnidadMedidaAPI(data.unidadMedidaId, "LOADING-DATA-COMPLETE"));
  }

  return (
    <>
      <BodySection>

        {windowsUpdateCategoria && <UpdateCategoria dataUpdate={updateCategoria} closeButton={() => { setWindowsUpdateCategoria(false) }} />}
        {windowsUpdateMarca && <UpdateMarca dataUpdate={updateMarca} closeButton={() => { setWindowsUpdateMarca(false) }} />}

        {windowsCreateMarca && <CreateMarca closeButton={() => { setWindowsCreateMarca(false) }} />}
        {windowsCreateCategoria && <CreateCategoria closeButton={() => { setWindowsCreateCategoria(false) }} />}

        {openCreateUnidadMedida && <CreateUnidadMedida closeButton={() => { setOpenCreateUnidadMedida(false) }} />}



        <button className='mt-3 flex justify-center items-center bg-primary/80 mb-1 rounded text-white hover:bg-primary'
          onClick={() => { setWindowsCreateMarca(true) }}>
          <FaPlus /> <span className='ms-2' >Agregar nueva marca</span>
        </button>
        <div className='border-[1px] border-secondary rounded mb-3' >
          <Accordion tittle='MARCAS' last>
            <DataTable<Marca> data={listaMarcas} columns={marcaColumns} details={{ name: 'MAS', action: openUpdateMarca }} />
          </Accordion>
        </div>


        <button className='flex justify-center items-center bg-primary/80 mb-1 rounded text-white hover:bg-primary'
          onClick={() => { setWindowsCreateCategoria(true) }}>
          <FaPlus /> <span className='ms-2' >Agregar nueva categoría</span>
        </button>
        <div className='border-[1px] border-secondary rounded mb-3'>
          <Accordion tittle='CATEGORÍAS' last>
            <DataTable<Categoria> data={listaCategorias} columns={categoriaColumns} details={{ name: 'MAS', action: openUpdateCategoria }} />
          </Accordion>
        </div>

        <button className='flex justify-center items-center bg-primary/80 mb-1 rounded text-white hover:bg-primary'
          onClick={() => { setOpenCreateUnidadMedida(true) }}>
          <FaPlus /> <span className='ms-2' >Agregar nueva unidad de medida</span>
        </button>
        <div className='border-[1px] border-secondary rounded'>
          <Accordion tittle='UNIDADES DE MEDIDA' last >
            <table className="table-fixed w-full text-left" >
              <thead className="bg-primary text-white sticky top-0">
                <tr>
                  <th className="uppercase text-center w-[130px] ">Nombre</th>
                  <th className="uppercase text-center w-[120px]">Abreviatura</th>
                  <th className="uppercase text-center">Decripcion</th>
                  <th className="uppercase text-center w-[80px]">Acción</th>
                </tr>
              </thead>
              <tbody>
                {listaUnidadesMedidaSucursal.map(um => (
                  <tr key={um.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase" >
                    <td className='py-2 text-center'>{um.UnidadMedida.nombre}</td>
                    <td className='py-2 text-center'>{um.UnidadMedida.abreviatura}</td>
                    <td className='py-2 text-center'>{um.UnidadMedida.detalle}</td>
                    <td className='py-2 text-center'>
                      <button 
                        onClick={() => {quitarUnidadMedida(um)}}
                        type='button' 
                        className='text-[10px] border border-danger rounded-full px-2 text-danger hover:bg-danger hover:text-white'
                      >QUITAR</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Accordion>
        </div>

      </BodySection>
    </>
  );
}