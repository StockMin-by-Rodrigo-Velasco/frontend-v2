import DataTable, { DataTableColumnTypes, DataTableColumnInterface } from "../../../components/DataTable";
import HeaderSection from "../../../components/HeaderSection"
import BodySection from '../../../components/BodySection';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { InputSearch, InputSelectSearch } from "../../../components/Input";
import UpdateProduct from "./windows/UpdateProduct";
import { FaPlus } from "react-icons/fa";
import CreateProduct from "./windows/CreateProduct";
import { Product } from "../../../interface";


interface ProductoForDataTable extends Product {
  unitMeasure: string;
  brand: string;
  category: string;
}

const dataInitialState: ProductoForDataTable = {
  id: '',
  branchId: '',
  code: '',
  name: '',
  description: '',
  image: '',
  deleted: false,
  createdAt: '',
  updatedAt: '',
  categoryId: '',
  brandId: '',
  unitMeasureId: '',

  Brand: {id:'', branchId:'', name:'', origin:'', deleted:false},
  Category: {id:'', branchId:'', name:'', details:'', deleted:false},
  UnitMeasure: {id:'', name:'', abbreviation:'', details:''},  

  unitMeasure: '',
  brand:'',
  category: '',
}


interface FilterInterface{
  search: string;
  category: string;
  brand: string;
}

const filterInitialState:FilterInterface = {
  search: '',
  category: '',
  brand: '',
}

export default function ProductsList() {
  const { products, brands, categories } = useSelector((s: RootState) => s.Products);
  
  const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
  const [filteredProducto, setFilteredProducto] = useState<ProductoForDataTable[]>([]);
  const [openDataDetails, setOpenDataDetails] = useState(false);
  const [openCreateProducto, setOpenCreateProducto] = useState(false);
  const [productoSelected, setProductoSelected] = useState<ProductoForDataTable>(dataInitialState);

  const columns: DataTableColumnInterface<ProductoForDataTable>[] = [
    { name: 'IMAGEN', type: DataTableColumnTypes.IMG, key: "image"},
    { name: 'CODIGO', type: DataTableColumnTypes.P , key: "code"},
    { name: 'U/M', type: DataTableColumnTypes.P , key: "unitMeasure"},
    { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "name" },
    { name: 'MARCA', type: DataTableColumnTypes.P, key: "brand" },
    { name: 'CATEGORIA', type: DataTableColumnTypes.P, key: "category" },
  ];

  const getProducto = (d:ProductoForDataTable) => {
    setProductoSelected(d);
    setOpenDataDetails(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    const newFilter = {...filter, [name]: value};
    const newData = products.filter(i => 
      i.Category.name?.toLowerCase().includes(newFilter.category.toLowerCase()) && 
      i.Brand.name?.toLowerCase().includes(newFilter.brand.toLowerCase()) &&
      (i.name.toLowerCase().includes(newFilter.search.toLowerCase()) || i.code.toLowerCase().includes(newFilter.search.toLowerCase()))
    );

    const newListProducts:ProductoForDataTable[] = newData.map(p => ({
      ...p, 
      unitMeasure: p.UnitMeasure.name,
      brand: p.Brand.name,
      category: p.Category.name
    }))
    setFilteredProducto([...newListProducts]);
    setFilter(newFilter);
  }

  useEffect(() => {
    const newListaProductos:ProductoForDataTable[] = products.map(p => ({
      ...p, 
      unitMeasure: p.UnitMeasure.name,
      brand: p.Brand.name,
      category: p.Category.name
    }))
    setFilteredProducto([...newListaProductos]);
  }, [products]);
  return (
    <>
      {openDataDetails&&
        <UpdateProduct product={productoSelected} closeButton={() => {setOpenDataDetails(s => !s)}} />
      }
      {openCreateProducto&&
        <CreateProduct closeButton={() => {setOpenCreateProducto(s => !s)}} />
      }

      <HeaderSection>
        <InputSearch
          handleInputChange={handleChange}
          name='search'
          placeholder="Buscar"
          value={filter.search}
        />
        <InputSelectSearch
          value={filter.category}
          className="ms-auto"
          name="category"
          placeholder="Categoría: "
          options={categories.map(m => ({value: m.name, name:m.name}))}
          optionDefault="Todas..."
          handleInputChange={handleChange} 
        />
        <InputSelectSearch
          value={filter.brand}
          className="ms-3"
          name="brand"
          placeholder="Marca: "
          options={brands.map(m => ({value: m.name, name:m.name}))}
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