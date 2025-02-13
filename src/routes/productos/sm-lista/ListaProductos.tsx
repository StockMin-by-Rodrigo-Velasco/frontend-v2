import DataTable, { DataTableColumnTypes, DataTableColumnInterface } from "../../../components/DataTable";
import HeaderSection from "../../../components/HeaderSection"
import BodySection from '../../../components/BodySection';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { InputSearch } from "../../../components/Input";
import ProductoSelectedWindow from "./ProductoSelectedWindow";

interface DataInterface {
  id: string;
  sucursalId: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  activo: boolean;
  deleted: boolean;
  categoriaId: string;
  categoria?: string;
  marcaId: string;
  marca?:string;
  unidadMedidaId: string;
  unidadMedida?: string;
  createdAt: number;
  updatedAt: number;
}

const dataInitialState = {
  id: '',
  sucursalId: '',
  codigo: '',
  nombre: '',
  descripcion: '',
  imagen: '',
  activo: true,
  deleted: false,
  categoriaId: '',
  categoria: '',
  marcaId: '',
  marca:'',
  unidadMedidaId: '',
  unidadMedida: '',
  createdAt: 0,
  updatedAt: 0,
}

interface FilterInterface{
  buscar: string;
  categoria: string;
  marca: string;
}

const filterInitialState = {
  buscar: '',
  categoria: '',
  marca: '',
}

export default function ListaProductos() {
  const { listaProductos, listaMarcas, listaCategorias } = useSelector((s: RootState) => s.Productos);
  const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
  const [data, setData] = useState<DataInterface[]>([]);
  const [openDataDetails, setOpenDataDetails] = useState(false);
  const [productoSelected, setProductoSelected] = useState<DataInterface>(dataInitialState);

  const columns: DataTableColumnInterface<DataInterface>[] = [
    { name: 'IMAGEN', type: DataTableColumnTypes.IMG, key: "imagen"},
    { name: 'CODIGO', type: DataTableColumnTypes.P , key: "codigo"},
    { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
    { name: 'MARCA', type: DataTableColumnTypes.P, key: "marca" },
    { name: 'CATEGORIA', type: DataTableColumnTypes.P, key: "categoria" },
  ];


  //* ---------------- METODOS ----------------
  const getData = (d:DataInterface) => {
    setProductoSelected(d);
    setOpenDataDetails(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    const newFilter = {...filter, [name]: value};
    const newData = listaProductos.filter(i => 
      i.categoria?.includes(newFilter.categoria) && 
      i.marca?.includes(newFilter.marca) &&
      (i.nombre.includes(newFilter.buscar) || i.codigo.includes(newFilter.buscar))
    )
    setData(newData);
    setFilter(newFilter);
  }

  //* ---------------- METODOS ----------------

  useEffect(() => {
    setData(listaProductos);
  }, [listaProductos]);
  return (
    <>

      {openDataDetails&&
        <ProductoSelectedWindow producto={productoSelected} closeButton={() => {setOpenDataDetails(s => !s)}} />
      }

      <HeaderSection>
        <InputSearch
          handleInputChange={handleChange}
          name='buscar'
          placeholder="Buscar"
          value={filter.buscar}
        />
        <div className="ms-auto border-[1px] rounded-lg border-secondary text-secondary flex justify-center items-center px-2 text-[14px]" >
          <label htmlFor="categoria" className="text-secondary/70 me-1" > Categoria: </label>
          <select 
            id="categoria" 
            name='categoria' 
            className="rounded-lg focus:outline-none focus:bg-secondary-1"
            onChange={handleChange}            
          >
            <option value=''>Todas...</option>
            {listaCategorias.map(c => (
              <option key={c.id} value={c.nombre}>{c.nombre.toLocaleUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="ms-2 border-[1px] rounded-lg border-secondary text-secondary flex justify-center items-center px-2 text-[14px]" >
          <label htmlFor="marca" className="text-secondary/70 me-1" > Marca: </label>
          <select 
            id="marca" 
            name="marca" 
            className="rounded-lg focus:outline-none focus:bg-secondary-1"
            onChange={handleChange}
          >
            <option value=''>Todas...</option>
            {listaMarcas.map(m => (
              <option key={m.id} value={m.nombre}>{m.nombre.toLocaleUpperCase()}</option>
            ))}
          </select>
        </div>
      </HeaderSection>
      <BodySection>
        <DataTable<DataInterface> columns={columns} data={data} details={{name: 'MAS', action:getData}} />
      </BodySection>

    </>
  );
}