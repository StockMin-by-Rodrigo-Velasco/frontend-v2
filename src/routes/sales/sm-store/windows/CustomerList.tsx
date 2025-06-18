import { useEffect, useState } from "react";
import Windows from "../../../../components/Windows";
import { useSelector } from "react-redux";
import { InputSearch } from "../../../../components/Input";
import { RootState } from "../../../../redux/store";
import { TiUserAddOutline } from "react-icons/ti";
import { Customer } from "../../../../interfaces";
import CreateCustomer from "../../sm-customers/windows/CreateCustomer";

interface ListaClientesProp {
  closeButton: () => void;
  selectCustomer: (customer:Customer) => void
}

export default function CustomerList({ closeButton, selectCustomer}: ListaClientesProp) {
  const { customers } = useSelector((s: RootState) => s.Sales);

  const [filteredClientes, setFilteredClientes] = useState<Customer[]>([]);
  const [filter, setFilter] = useState<{ buscar: string }>({ buscar: '' });

  const [openCreateCustomer, setOpenCreateCustomer] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    const newFilter = { ...filter, [name]: value };
    const newData: Customer[] = customers.filter(i => i.name.toLowerCase().includes(newFilter.buscar.toLowerCase()) || i.code.includes(newFilter.buscar));

    setFilteredClientes([...newData]);
    setFilter(newFilter);
  }

  useEffect(() => {
    setFilteredClientes(customers);
  }, [customers])
  return (
    <Windows tittle="Lista de clientes" closeButton={closeButton}>

      {openCreateCustomer&& <CreateCustomer closeButton={() => {setOpenCreateCustomer(false)}} />}


      <div className="flex m-2" >
        <InputSearch
          handleInputChange={handleChange}
          name='buscar'
          placeholder="Buscar"
          value={filter.buscar}
        />
        <button onClick={() => {setOpenCreateCustomer(true)}} className="ms-2 flex justify-center items-center bg-primary/80 rounded-full text-white h-6 w-6 hover:bg-primary" >
        <TiUserAddOutline />
        </button>
      </div>

      <div className="max-h-[200px] overflow-y-scroll scroll-custom ps-2 mb-2" >
        <table className="table-auto w-full text-left" >
          <thead className="bg-primary text-white sticky top-0" >
            <tr>
              <th className="px-3" >CODIGO</th>
              <th className="px-3" >NOMBRE</th>
              <th className="px-3" >APELLIDO</th>
            </tr>
          </thead>

          <tbody >
            {filteredClientes.map(c => (
              <tr key={c.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase cursor-pointer" onClick={() =>{selectCustomer(c)}}>
                <td className="px-3" >{c.code}</td>
                <td className="px-3" >{c.name}</td>
                <td className="px-3" >{c.lasName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Windows>
  );
}