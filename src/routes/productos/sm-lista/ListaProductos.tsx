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
import { Producto } from "../../../interface";


interface ProductoForDataTable extends Producto {
  unidadMedida: string;
  marca: string;
  categoria: string;
}

const dataInitialState: ProductoForDataTable = {
  id: '',
  sucursalId: '',
  codigo: '',
  nombre: '',
  descripcion: '',
  imagen: '',
  deleted: false,
  createdAt: '',
  updatedAt: '',
  categoriaId: '',
  marcaId: '',
  unidadMedidaId: '',

  Marca: {id:'', sucursalId:'', nombre:'', origen:'', deleted:false},
  Categoria: {id:'', sucursalId:'', nombre:'', detalle:'', deleted:false},
  UnidadMedida: {id:'', nombre:'', abreviatura:'', detalle:''},  

  unidadMedida: '',
  marca:'',
  categoria: '',
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
  const [filteredProducto, setFilteredProducto] = useState<ProductoForDataTable[]>([]);
  const [openDataDetails, setOpenDataDetails] = useState(false);
  const [openCreateProducto, setOpenCreateProducto] = useState(false);
  const [productoSelected, setProductoSelected] = useState<ProductoForDataTable>(dataInitialState);

  const columns: DataTableColumnInterface<ProductoForDataTable>[] = [
    { name: 'IMAGEN', type: DataTableColumnTypes.IMG, key: "imagen"},
    { name: 'CODIGO', type: DataTableColumnTypes.P , key: "codigo"},
    { name: 'U/M', type: DataTableColumnTypes.P , key: "unidadMedida"},
    { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
    { name: 'MARCA', type: DataTableColumnTypes.P, key: "marca" },
    { name: 'CATEGORIA', type: DataTableColumnTypes.P, key: "categoria" },
  ];


  //* ---------------- METODOS ----------------
  const getProducto = (d:ProductoForDataTable) => {
    setProductoSelected(d);
    setOpenDataDetails(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    const newFilter = {...filter, [name]: value};
    const newData = listaProductos.filter(i => 
      i.Categoria.nombre?.includes(newFilter.categoria) && 
      i.Marca.nombre?.includes(newFilter.marca) &&
      (i.nombre.includes(newFilter.buscar) || i.codigo.includes(newFilter.buscar))
    );

    const newListaProductos:ProductoForDataTable[] = newData.map(p => ({
      ...p, 
      unidadMedida: p.UnidadMedida.nombre,
      marca: p.Marca.nombre,
      categoria: p.Categoria.nombre
    }))
    setFilteredProducto([...newListaProductos]);
    setFilter(newFilter);
  }

  //* ---------------- METODOS ----------------

  useEffect(() => {
    const newListaProductos:ProductoForDataTable[] = listaProductos.map(p => ({
      ...p, 
      unidadMedida: p.UnidadMedida.nombre,
      marca: p.Marca.nombre,
      categoria: p.Categoria.nombre
    }))
    setFilteredProducto([...newListaProductos]);
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
        <DataTable<ProductoForDataTable> columns={columns} data={filteredProducto} details={{name: 'MAS', action:getProducto}} />
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