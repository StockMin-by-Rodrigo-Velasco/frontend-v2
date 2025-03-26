import { useEffect, useState } from "react";
import Windows from "../../../../components/Windows";
import { ClienteVenta } from "../../../../interface";
import { useSelector } from "react-redux";
import { InputSearch } from "../../../../components/Input";
import { RootState } from "../../../../redux/store";
import { TiUserAddOutline } from "react-icons/ti";
import CreateClienteVentasWindows from "../../sm-clientes/windows/CreateClienteVentasWindows";

interface ListaClientesProp {
  closeButton: () => void,
  setClienteSelected: React.Dispatch<React.SetStateAction<ClienteVenta>>
}

export default function ListaClientes({ closeButton, setClienteSelected }: ListaClientesProp) {
  const { listaClientes } = useSelector((s: RootState) => s.Ventas);

  const [filteredClientes, setFilteredClientes] = useState<ClienteVenta[]>([]);
  const [filter, setFilter] = useState<{ buscar: string }>({ buscar: '' });

  const [openCreateClienteVentas, setOpenCreateClienteVentas] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    const newFilter = { ...filter, [name]: value };
    console.log(newFilter);
    const newData: ClienteVenta[] = listaClientes.filter(c => {
      if( c.codigo.includes(newFilter.buscar) || c.nombre.includes(newFilter.buscar) )
        return c;
    });

    setFilteredClientes([...newData]);
    setFilter(newFilter);
  }

  const selectCliente = (cliente: ClienteVenta) => {
    setClienteSelected(cliente);
    closeButton();
  }

  useEffect(() => {
    setFilteredClientes(listaClientes);
  }, [listaClientes])
  return (
    <Windows tittle="Lista de clientes" closeButton={closeButton}>

      {openCreateClienteVentas&& <CreateClienteVentasWindows closeButton={() => {setOpenCreateClienteVentas(false)}} />}


      <div className="flex m-2" >
        <InputSearch
          handleInputChange={handleChange}
          name='buscar'
          placeholder="Buscar"
          value={filter.buscar}
        />
        <button onClick={() => {setOpenCreateClienteVentas(true)}} className="ms-2 flex justify-center items-center bg-primary/80 rounded-full text-white h-6 w-6 hover:bg-primary" >
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
              <tr key={c.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase cursor-pointer" onClick={() =>{selectCliente(c)}}>
                <td className="px-3" >{c.codigo}</td>
                <td className="px-3" >{c.nombre}</td>
                <td className="px-3" >{c.apellido}</td>
              </tr>
            ))}
          </tbody>


        </table>
      </div>
    </Windows>
  );
}