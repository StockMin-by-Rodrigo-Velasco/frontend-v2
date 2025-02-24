import DataTable, { DataTableColumnTypes, DataTableColumnInterface } from "../../../components/DataTable";
import HeaderSection from "../../../components/HeaderSection"
import BodySection from '../../../components/BodySection';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { InputSearch, InputSelectSearch } from "../../../components/Input";
import UpdateProductoWindow from "./windows/UpdateProductoWindow";
import LoadingSection from "../../../components/LoadingSection";
import { FaPlus } from "react-icons/fa";
import CreateProductoWindow from "./windows/CreateProductoWindow";
import { ProductoInterface } from "../../../interface";

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

const filterInitialState:FilterInterface = {
  buscar: '',
  categoria: '',
  marca: '',
}

export default function ListaProductos() {
  const { listaProductos, listaMarcas, listaCategorias } = useSelector((s: RootState) => s.Productos);
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
  const [filteredProducto, setFilteredProducto] = useState<ProductoInterface[]>([]);
  const [openDataDetails, setOpenDataDetails] = useState(false);
  const [openCreateProducto, setOpenCreateProducto] = useState(false);
  const [productoSelected, setProductoSelected] = useState<ProductoInterface>(dataInitialState);

  const columns: DataTableColumnInterface<ProductoInterface>[] = [
    { name: 'IMAGEN', type: DataTableColumnTypes.IMG, key: "imagen"},
    { name: 'CODIGO', type: DataTableColumnTypes.P , key: "codigo"},
    { name: 'MEDIDA', type: DataTableColumnTypes.P , key: "unidadMedidaAbreviada"},
    { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
    { name: 'MARCA', type: DataTableColumnTypes.P, key: "marca" },
    { name: 'CATEGORIA', type: DataTableColumnTypes.P, key: "categoria" },
  ];


  //* ---------------- METODOS ----------------
  const getProducto = (d:ProductoInterface) => {
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
    setFilteredProducto(newData);
    setFilter(newFilter);
  }

  //* ---------------- METODOS ----------------

  useEffect(() => {
    setFilteredProducto(listaProductos);
  }, [listaProductos]);
  return (
    <>
      {openDataDetails&&
        <UpdateProductoWindow producto={productoSelected} closeButton={() => {setOpenDataDetails(s => !s)}} />
      }
      {openCreateProducto&&
        <CreateProductoWindow closeButton={() => {setOpenCreateProducto(s => !s)}} />
      }
      {loadingApplication&& <LoadingSection title="Cargando lista de productos"/>}

      <HeaderSection>
        <InputSearch
          handleInputChange={handleChange}
          name='buscar'
          placeholder="Buscar"
          value={filter.buscar}
        />
        <InputSelectSearch
          value={filter.categoria}
          className="ms-auto"
          name="categoria"
          placeholder="Categoría: "
          options={listaCategorias.map(m => ({value: m.nombre, name:m.nombre}))}
          optionDefault="Todas..."
          handleInputChange={handleChange} 
        />
        <InputSelectSearch
          value={filter.marca}
          className="ms-3"
          name="marca"
          placeholder="Marca: "
          options={listaMarcas.map(m => ({value: m.nombre, name:m.nombre}))}
          optionDefault="Todas..."
          handleInputChange={handleChange} 
        />
      </HeaderSection>
      <BodySection>
        <DataTable<ProductoInterface> columns={columns} data={filteredProducto} details={{name: 'MAS', action:getProducto}} />
      </BodySection>

      <button 
        onClick={() => {setOpenCreateProducto(true)}}
        type="button" 
        className="absolute bottom-2 right-2 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[22px] hover:bg-opacity-100 w-14 h-14 rounded-full" 
      >
        <FaPlus/>
      </button>
    </>
  );
}