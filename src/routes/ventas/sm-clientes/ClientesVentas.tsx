import { useEffect, useState } from 'react';
import BodySection from '../../../components/BodySection';
import HeaderSection from '../../../components/HeaderSection';
import { InputSearch } from '../../../components/Input';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ClienteVenta } from '../../../interface';
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from '../../../components/DataTable';
import { FaPlus } from 'react-icons/fa';
import CreateClienteVentasWindows from './windows/CreateClienteVentasWindows';
import UpdateClienteVentasWindows from './windows/UpdateClienteVentasWindows';


interface FilterInterface {
  buscar: string;
}

const filterInitialState: FilterInterface = {
  buscar: '',
}

const columns: DataTableColumnInterface<ClienteVenta>[] = [
  { name: 'CODIGO', type: DataTableColumnTypes.P, key: "codigo" },
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
  { name: 'APELLIDO', type: DataTableColumnTypes.P, key: "apellido" }
];

export default function ClientesVentas() {

  const { listaClientes } = useSelector((s: RootState) => s.Ventas);

  const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
  const [openCreateClienteVentas, setOpenCreateClienteVentas] = useState(false);
  const [openUpdateClienteVentas, setOpenUpdateClienteVentas] = useState(false);


  const initialStateClienteVentaSelected: ClienteVenta = { id:'', sucursalId:'', codigo: '', nombre: '', apellido: '', contacto: '', direccion: '' };
  const [clienteVentaSelected, setClienteVentaSelected] = useState<ClienteVenta>(initialStateClienteVentaSelected);
  const [filteredClientes, setFilteredClientes] = useState<ClienteVenta[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    const newFilter = { ...filter, [name]: value };
    const newData = listaClientes.filter(i => i.nombre.toLowerCase().includes(newFilter.buscar.toLowerCase()) || i.codigo.includes(newFilter.buscar));

    setFilteredClientes([...newData]);
    setFilter(newFilter);
  }

  const getCliente = (d: ClienteVenta) => {
    setClienteVentaSelected(d);  
    setOpenUpdateClienteVentas(true); 
  }

  useEffect(() => {
    setFilteredClientes(listaClientes);
  }, [listaClientes])
  return (
    <>

    { openCreateClienteVentas&& <CreateClienteVentasWindows closeButton={() => { setOpenCreateClienteVentas(false) }} />}
    { openUpdateClienteVentas&& <UpdateClienteVentasWindows closeButton={() => { setOpenUpdateClienteVentas(false) }} cliente={clienteVentaSelected} />}


      <HeaderSection>
        <InputSearch
          handleInputChange={handleChange}
          name='buscar'
          placeholder="Buscar"
          value={filter.buscar}
        />
      </HeaderSection>
      <BodySection>


        <DataTable<ClienteVenta> columns={columns} data={filteredClientes} details={{ name: 'MAS', action: getCliente }} />

        <button
          onClick={() => { setOpenCreateClienteVentas(true) }}
          type="button"
          className="absolute bottom-2 right-2 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[22px] hover:bg-opacity-100 w-14 h-14 rounded-full"
        >
          <FaPlus />
        </button>

      </BodySection>
    </>
  );
}