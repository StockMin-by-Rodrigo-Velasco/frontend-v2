import { useDispatch, useSelector } from 'react-redux';
import Accordion from '../../../components/Accordion';
import BodySection from '../../../components/BodySection';
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from '../../../components/DataTable';
import { AppDispatch, RootState } from '../../../redux/store';
import { FormEvent, useState } from 'react';
import UpdateTipoMoneda from './windows/UpdateTipoMoneda';
import { FaPlus } from 'react-icons/fa';
import CreateTipoMoneda from './windows/CreateTipoMoneda';
import { CreateOpcionesVentaDto, PrecioVenta, TipoMonedaVenta } from '../../../interface';
import CreatePrecioVenta from './windows/CreatePrecioVenta';
import UpdatePrecioVenta from './windows/UpdatePrecioVenta';
import { InputSelectSearch } from '../../../components/Input';
import { useForm } from '../../../hooks';
import { createOpcionesVentaAPI, updateOpcionesVentaAPI } from '../../../redux/ventas/ventasThunk';
import { AiOutlineLoading } from 'react-icons/ai';


const tipoMonedaColumns: DataTableColumnInterface<TipoMonedaVenta>[] = [
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
  { name: 'ABREVIATURA', type: DataTableColumnTypes.P, key: "abreviatura" },
]

const precioVentaColumns: DataTableColumnInterface<PrecioVenta>[] = [
  { name: 'CODIGO', type: DataTableColumnTypes.P, key: "codigo" },
  { name: 'DESCRIPCION', type: DataTableColumnTypes.P, key: "descripcion" },
]

export default function OpcionesVentas() {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { id: sucursalId } = useSelector((s: RootState) => s.Sucursal);
  const { listaTipoMonedaVenta, listaPrecioVenta, opcionesVenta } = useSelector((s: RootState) => s.Ventas);
  const { listaAlmacenes } = useSelector((s: RootState) => s.Almacenes);

  const dispatch = useDispatch<AppDispatch>();

  const { data: formOpcionesVenta, handleInputChange } = useForm<CreateOpcionesVentaDto>({ 
    almacenId: opcionesVenta?.almacenId || '', 
    precioVentaId:opcionesVenta?.precioVentaId || '', 
    sucursalId });

  const [windowsUpdateTipoMoneda, setWindowsUpdateTipoMoneda] = useState(false);
  const [windowsCreateTipoMoneda, setWindowsCreateTipoMoneda] = useState(false);
  const [selectTipoMoneda, setSelectTipoMoneda] = useState<TipoMonedaVenta>({ id: '', sucursalId: '', nombre: '', abreviatura: '', deleted: false })

  const [windowsUpdatePrecioVenta, setWindowsUpdatePrecioVenta] = useState(false);
  const [windowsCreatePrecioVenta, setWindowsCreatePrecioVenta] = useState(false);
  const [selectPrecioVenta, setSelectPrecioVenta] = useState<PrecioVenta>({ id: '', sucursalId: '', tipoMonedaVentaId: '', codigo: '', descripcion: '', deleted: false })

  const openUpdateTipoMoneda = (data: TipoMonedaVenta) => {
    setSelectTipoMoneda(data);
    setWindowsUpdateTipoMoneda(true);
  }
  const openUpdatePrecioVenta = (data: PrecioVenta) => {
    setSelectPrecioVenta(data)
    setWindowsUpdatePrecioVenta(true);
  }

  const saveOpcionesVenta = (e: FormEvent) => {
    e.preventDefault();
    if(opcionesVenta) dispatch(updateOpcionesVentaAPI({ id: opcionesVenta.id, ...formOpcionesVenta}));
    else dispatch(createOpcionesVentaAPI(formOpcionesVenta));
  }

  return (
    <>
      <BodySection>
        {windowsCreateTipoMoneda && <CreateTipoMoneda closeButton={() => { setWindowsCreateTipoMoneda(false) }} />}
        {windowsUpdateTipoMoneda && <UpdateTipoMoneda dataUpdate={selectTipoMoneda} closeButton={() => { setWindowsUpdateTipoMoneda(false) }} />}

        {windowsCreatePrecioVenta && <CreatePrecioVenta closeButton={() => { setWindowsCreatePrecioVenta(false) }} />}
        {windowsUpdatePrecioVenta && <UpdatePrecioVenta dataUpdate={selectPrecioVenta} closeButton={() => { setWindowsUpdatePrecioVenta(false) }} />}



        <button className='mt-3 flex justify-center items-center bg-primary/80 mb-1 rounded text-white hover:bg-primary'
          onClick={() => { setWindowsCreateTipoMoneda(true) }}>
          <FaPlus /> <span className='ms-2' >Agregar nuevo tipo de moneda</span>
        </button>
        <div className='border-[1px] border-secondary rounded mb-3' >
          <Accordion tittle='TIPOS DE MONEDA' last>
            <DataTable<TipoMonedaVenta> data={listaTipoMonedaVenta} columns={tipoMonedaColumns} details={{ name: 'MAS', action: openUpdateTipoMoneda }} />
          </Accordion>
        </div>


        <button className='flex justify-center items-center bg-primary/80 mb-1 rounded text-white hover:bg-primary'
          onClick={() => { setWindowsCreatePrecioVenta(true) }}>
          <FaPlus /> <span className='ms-2' >Agregar nuevo tipo de precio</span>
        </button>
        <div className='border border-secondary rounded mb-3'>
          <Accordion tittle='TIPOS DE PRECIO' last>
            <DataTable<PrecioVenta> data={listaPrecioVenta} columns={precioVentaColumns} details={{ name: 'MAS', action: openUpdatePrecioVenta }} />
          </Accordion>
        </div>


        <div className='border border-secondary rounded'>
          <p className='bg-secondary text-white px-2' >OPCIONES DE VENTA</p>
          <p className='p-2 text-secondary text-[14px] ' >Por favor ingresa las opciones de venta que tu la tienda usara por defecto para futuras ventas. Ten en cuenta que estas opciones se pueden cambiar al momento de registrar una venta si es necesario.</p>

          <form onSubmit={saveOpcionesVenta}>
            <div className='flex px-2' >
              <InputSelectSearch
                value={formOpcionesVenta.almacenId}
                className="me-5"
                name="almacenId"
                placeholder="Almacen de venta: "
                options={listaAlmacenes.map(a => ({ value: a.id, name: a.nombre }))}
                optionDefault= 'Sin definir'
                handleInputChange={handleInputChange}
                required
              />
              <InputSelectSearch
                value={formOpcionesVenta.precioVentaId}
                name="precioVentaId"
                placeholder="Tipo de precio: "
                options={listaPrecioVenta.map(pv => ({ value: pv.id, name: pv.codigo }))}
                optionDefault= 'Sin definir'
                handleInputChange={handleInputChange}
                required
              />
            </div>

            <div className='w-full flex justify-center border-secondary border-t mt-3 py-2' >
              <button
                type="submit"
                className="flex items-center border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white ms-3 
                            disabled:border-secondary disabled:text-white disabled:bg-secondary disabled:cursor-not-allowed"
                disabled={loadingData}
              > {loadingData&& <AiOutlineLoading className="me-2 animate-spin"/>} GUARDAR OPCIONES
              </button>
            </div>
          </form>
        </div>


      </BodySection>
    </>
  );
}