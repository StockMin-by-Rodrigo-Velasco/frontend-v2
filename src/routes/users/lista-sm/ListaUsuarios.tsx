import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import HeaderSection from "../../../components/HeaderSection";
import { InputSearch } from "../../../components/Input";
import BodySection from "../../../components/BodySection";
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from "../../../components/DataTable";
import { FaPlus } from "react-icons/fa";
import { User } from "../../../interfaces";
import { useEffect, useState } from "react";
import UpdateUsuario from "./windows/UpdateUsuario";
import CreateUsuario from "./windows/CreateUsuario";
import FooterSection from "../../../components/FooterSection";

interface FilterInterface {
  buscar: string;
}

const filterInitialState: FilterInterface = {
  buscar: '',
}

const columns: DataTableColumnInterface<User>[] = [
  { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "name" },
  { name: 'APELLIDO', type: DataTableColumnTypes.P, key: "lastName" },
  { name: 'CI', type: DataTableColumnTypes.P, key: "ci" }
];

export default function ListaUsuarios() {

  const { users: users } = useSelector((s: RootState) => s.Branch);

  const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
  const [openCreateUsuario, setOpenCreateUsuario] = useState(false);
  const [openUpdateUsuario, setOpenUpdateUsuario] = useState(false);


  const initialStateClienteVentaSelected: User = {
    id: '',
    branchId: '',
    name: '',
    lastName: '',
    ci: '',
    profile: '',
    address: '',
    contact: '',
    password: '',
    UserPermission: [],
    deleted: false
  }
  const [userSelected, setUserSelected] = useState<User>(initialStateClienteVentaSelected);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    const newFilter = { ...filter, [name]: value };
    const newData = users.filter(i => (
      i.name.toLocaleLowerCase().includes(newFilter.buscar.toLocaleLowerCase()) ||
      i.lastName.toLocaleLowerCase().includes(newFilter.buscar.toLocaleLowerCase())));

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
      {openUpdateUsuario && <UpdateUsuario closeButton={() => { setOpenUpdateUsuario(false) }} user={userSelected} />}
      {openCreateUsuario && <CreateUsuario closeButton={() => { setOpenCreateUsuario(false) }} getUsuario={getUsuario} />}


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
      </BodySection>

      <FooterSection>
        <span className="bg-secondary text-white text-[12px] px-2 rounded-full" > {users.length} Usuarios</span>
        <button
          onClick={() => { setOpenCreateUsuario(true) }}
          type="button"
          className="ms-auto py-1 px-2 rounded-full flex justify-center items-center bg-primary bg-opacity-80 text-white hover:bg-opacity-100"
        >
          <FaPlus className="me-2" /> Agregar
        </button>
      </FooterSection>
    </>
  );
}