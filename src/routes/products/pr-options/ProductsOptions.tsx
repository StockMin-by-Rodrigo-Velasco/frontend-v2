import { useDispatch, useSelector } from 'react-redux';
import Accordion from '../../../components/Accordion';
import BodySection from '../../../components/BodySection';
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from '../../../components/DataTable';
import { AppDispatch, RootState } from '../../../redux/store';
import { useState } from 'react';
import UpdateCategory from './windows/UpdateCategory';
import UpdateBrand from './windows/UpdateBrand';
import { FaPlus } from 'react-icons/fa';
import CreateBrand from './windows/CreateBrand';
import CreateCategory from './windows/CreateCategory';
import AddUnitMeasure from './windows/AddUnitMeasure';
import { Category, Brand } from '../../../interface';
import { toggleUnitMeasureAPI } from '../../../redux/products/productsThunk';


const marcaColumns: DataTableColumnInterface<Brand>[] = [
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "name" },
  { name: 'ORIGEN', type: DataTableColumnTypes.P, key: "origin" },
]

const categoriaColumns: DataTableColumnInterface<Category>[] = [
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "name" },
  { name: 'DETALLE', type: DataTableColumnTypes.P, key: "details" },
]

export default function ProductsOptions() {
  const dispatch = useDispatch<AppDispatch>();
  const { id:branchId } = useSelector((s: RootState) => s.Branch);
  const { brands, categories, unitMeasuresBranch } = useSelector((s: RootState) => s.Products);

  const [openUpdateBrand, setOpenUpdateMarca] = useState(false);
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
  const [openCreateBrand, setOpenCreateBrand] = useState(false);
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openCreateUnitMeasure, setOpenCreateUnitMeasure] = useState(false);

  const [updateCategoria, setUpdateCategoria] = useState<Category>({ id: '', branchId: '', name: '', details: '', deleted: false })
  const [updateMarca, setUpdateMarca] = useState<Brand>({ id: '', branchId: '', name: '', origin: '', deleted: false })

  const updateBrand = (data: Brand) => {
    setUpdateMarca(data);
    setOpenUpdateMarca(true);
  }
  const updateCategory = (data: Category) => {
    setUpdateCategoria(data)
    setOpenUpdateCategory(true);
  }
  const removeUnitMeasure = (unitMeasureId: string) => {
    dispatch(toggleUnitMeasureAPI({branchId, unitMeasureId}));
  }

  return (
    <>
      <BodySection>

        {openUpdateCategory && <UpdateCategory dataUpdate={updateCategoria} closeButton={() => { setOpenUpdateCategory(false) }} />}
        {openUpdateBrand && <UpdateBrand dataUpdate={updateMarca} closeButton={() => { setOpenUpdateMarca(false) }} />}

        {openCreateBrand && <CreateBrand closeButton={() => { setOpenCreateBrand(false) }} />}
        {openCreateCategory && <CreateCategory closeButton={() => { setOpenCreateCategory(false) }} />}

        {openCreateUnitMeasure && <AddUnitMeasure closeButton={() => { setOpenCreateUnitMeasure(false) }} />}



        <button className='mt-3 flex justify-center items-center bg-primary/80 mb-1 rounded text-white hover:bg-primary'
          onClick={() => { setOpenCreateBrand(true) }}>
          <FaPlus /> <span className='ms-2' >Agregar nueva marca</span>
        </button>
        <div className='border-[1px] border-secondary rounded mb-3' >
          <Accordion tittle='MARCAS' last>
            <DataTable<Brand> data={brands} columns={marcaColumns} details={{ name: 'MAS', action: updateBrand }} />
          </Accordion>
        </div>


        <button className='flex justify-center items-center bg-primary/80 mb-1 rounded text-white hover:bg-primary'
          onClick={() => { setOpenCreateCategory(true) }}>
          <FaPlus /> <span className='ms-2' >Agregar nueva categoría</span>
        </button>
        <div className='border-[1px] border-secondary rounded mb-3'>
          <Accordion tittle='CATEGORÍAS' last>
            <DataTable<Category> data={categories} columns={categoriaColumns} details={{ name: 'MAS', action: updateCategory }} />
          </Accordion>
        </div>

        <button className='flex justify-center items-center bg-primary/80 mb-1 rounded text-white hover:bg-primary'
          onClick={() => { setOpenCreateUnitMeasure(true) }}>
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
                {unitMeasuresBranch.map(um => (
                  <tr key={um.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase" >
                    <td className='py-2 text-center'>{um.UnitMeasure.name}</td>
                    <td className='py-2 text-center'>{um.UnitMeasure.abbreviation}</td>
                    <td className='py-2 text-center'>{um.UnitMeasure.details}</td>
                    <td className='py-2 text-center'>
                      <button 
                        onClick={() => {removeUnitMeasure(um.id)}}
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