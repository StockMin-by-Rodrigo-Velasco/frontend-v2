import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import HeaderSection from "../../../components/HeaderSection";
import { InputSearch } from "../../../components/Input";
import BodySection from "../../../components/BodySection";
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from "../../../components/DataTable";
import { FaPlus } from "react-icons/fa";
import { User } from "../../../interface";
import { useEffect, useState } from "react";
import UpdateUsuario from "./windows/UpdateUsuario";
import CreateUsuario from "./windows/CreateUsuario";

interface FilterInterface {
  buscar: string;
}

const filterInitialState: FilterInterface = {
  buscar: '',
}

const columns: DataTableColumnInterface<User>[] = [
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
  { name: 'APELLIDO', type: DataTableColumnTypes.P, key: "apellido" },
  { name: 'CI', type: DataTableColumnTypes.P, key: "ci" }
];

export default function ListaUsuarios() {

  const { listUsers: users } = useSelector((s:RootState) => s.Sucursal);

  const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
    const [openCreateUsuario, setOpenCreateUsuario] = useState(false);
    const [openUpdateUsuario, setOpenUpdateUsuario] = useState(false);
  
  
    const initialStateClienteVentaSelected: User = { id:'', sucursalId:'', nombre: '', apellido: '', ci: '', imagen:'', direccion:'', contacto:'',password:'', UsuarioPermiso:[], deleted:false};
    const [userSelected, setUserSelected] = useState<User>(initialStateClienteVentaSelected);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { value, name } = e.target;
      const newFilter = { ...filter, [name]: value };
      const newData = users.filter(i => (i.nombre.includes(newFilter.buscar) || i.apellido.includes(newFilter.buscar)));
  
      setFilteredUsers([...newData]);
      setFilter(newFilter);
    }
  
    const getUsuario = (d: User) => {
      setUserSelected(d);  
      setOpenCreateUsuario(false);
      setOpenUpdateUsuario(true); 
    }

    useEffect(() => {
        setFilteredUsers(users);
      }, [users])


  return (
    <>
    { openUpdateUsuario&& <UpdateUsuario closeButton={() => { setOpenUpdateUsuario(false) }} usuario={userSelected} /> }
    { openCreateUsuario&& <CreateUsuario closeButton={() => { setOpenCreateUsuario(false) }} getUsuario={getUsuario} /> }


      <HeaderSection>
        <InputSearch
          handleInputChange={handleChange}
          name='buscar'
          placeholder="Buscar"
          value={filter.buscar}
        />
      </HeaderSection>
      <BodySection>


        <DataTable<User> columns={columns} data={filteredUsers} details={{ name: 'MAS', action: getUsuario }} />

        <button
          onClick={() => { setOpenCreateUsuario(true) }}
          type="button"
          className="absolute bottom-2 right-2 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[22px] hover:bg-opacity-100 w-14 h-14 rounded-full"
        >
          <FaPlus />
        </button>

      </BodySection>
    </>
  );
}