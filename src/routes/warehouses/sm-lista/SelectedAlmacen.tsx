import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../../redux/store";
import HeaderSection from "../../../components/HeaderSection";
import { resetSelectAlmacen } from "../../../redux/warehouses/almacenesSlice";
import BodySection from "../../../components/BodySection";
import { InputSearch, InputSelectSearch } from "../../../components/Input";
import { TbLogout2, TbReportAnalytics } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from "../../../components/DataTable";
import { ProductoAlmacenDetallado } from "../../../interface";
import RegistarProductosAlmacenWindow from "./windows/RegistrarProductosAlmacenWindow";
import SelectedProductoAlmacenWindow from "./windows/SelectedProductoAlmacenWindow";
import IngresarProductosAlmacenWindow from "./windows/IngresarProductosAlmacenWindow";
import HistorialIngresosAlmacenWindow from "./windows/HistorialIngresosAlmacenWindow";

interface FilterInterface {
  buscar: string;
  categoria: string;
  marca: string;
}
const filterInitialState: FilterInterface = {
  buscar: '',
  categoria: '',
  marca: '',
}

const initialStateSelectedProducto: ProductoAlmacenDetallado = {
  id: '',
  productoId: '',
  almacenId: '',
  cantidad: 0,
  cantidadMinima: 0,
  codigo: '',
  nombre: '',
  descripcion: '',
  imagen: '',
  categoria: '',
  marca: '',
  unidadMedida: '',
  unidadMedidaAbreviada: '',
  createdAt: '',
  updatedAt: '',
}

export default function SelectedAlmacen() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { brands: listaMarcas, categories: listaCategorias } = useSelector((s: RootState) => s.Products);
  const { selectedAlmacen, listaProductosAlmacen } = useSelector((s: RootState) => s.Almacenes);
  const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
  const [filteredAlmacenProducto, setFilteredProducto] = useState<ProductoAlmacenDetallado[]>([]);
  const [createOptions, setCreateOptions] = useState(false);

  const [openRegistrarProductosAlmacen, setOpenRegistrarProductosAlmacen] = useState(false);
  const [openIngresarProductosAlmacen, setOpenIngresarProductosAlmacen] = useState(false);
  const [openSelectedProductoAlmacen, setOpenSelectedProductoAlmacen] = useState(false);
  const [openHistorialIngresosAlmacen, setOpenHistorialIngresosAlmacen] = useState(false);

  const [selectedProducto, setSelectedProducto] = useState<ProductoAlmacenDetallado>(initialStateSelectedProducto)

  const columns: DataTableColumnInterface<ProductoAlmacenDetallado>[] = [
    { name: 'IMAGEN', type: DataTableColumnTypes.IMG, key: "imagen" },
    { name: 'CODIGO', type: DataTableColumnTypes.P, key: "codigo" },
    { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
    { name: 'MEDIDA', type: DataTableColumnTypes.P, key: "unidadMedidaAbreviada" },
    { name: 'CANTIDAD', type: DataTableColumnTypes.P, key: "cantidad" },
    { name: 'ESTADO', type: DataTableColumnTypes.ALERT, key: "cantidadMinima" },
  ];

  const logoutAlmacen = () => {
    dispatch(resetSelectAlmacen())
    navigate('/main/almacenes/lista');
  }

  const getProducto = (productoData: ProductoAlmacenDetallado) => {
    setSelectedProducto(productoData);
    setOpenSelectedProductoAlmacen(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    const newFilter = { ...filter, [name]: value };
    const newData = listaProductosAlmacen.filter(i =>
      i.categoria?.includes(newFilter.categoria) &&
      i.marca?.includes(newFilter.marca) &&
      (i.nombre.includes(newFilter.buscar) || i.codigo.includes(newFilter.buscar))
    )
    setFilteredProducto(newData);
    setFilter(newFilter);
  }

  const goToRegistrarProductos = () => {
    setOpenRegistrarProductosAlmacen(true);
    setCreateOptions(s => !s)
  }

  const goToIngresarProductos = () => {
    setOpenIngresarProductosAlmacen(true);
    setCreateOptions(s => !s)
  }

  useEffect(() => {
    setFilteredProducto(listaProductosAlmacen);
  }, [listaProductosAlmacen])
  return (
    <>
      {openRegistrarProductosAlmacen && <RegistarProductosAlmacenWindow closeButton={() => { setOpenRegistrarProductosAlmacen(false)}} />}
      {openIngresarProductosAlmacen && <IngresarProductosAlmacenWindow closeButton={() => setOpenIngresarProductosAlmacen(false)}/>}
      {openHistorialIngresosAlmacen && <HistorialIngresosAlmacenWindow closeButton={() => setOpenHistorialIngresosAlmacen(false)}/> }
      {openSelectedProductoAlmacen && <SelectedProductoAlmacenWindow producto={selectedProducto} closeButton={() => { setOpenSelectedProductoAlmacen(false) }} />}


      <HeaderSection>
        <InputSearch
          handleInputChange={handleChange}
          name='buscar'
          placeholder="Buscar"
          value={filter.buscar}
        />

        <div 
          className="w-[200px] flex justify-center items-center border relative overflow-hidden border-primary text-primary rounded-lg ms-auto me-auto transition-all duration-300 cursor-pointer"
          onClick={() => {setOpenHistorialIngresosAlmacen(true)}}
          >
          <span className="uppercase flex" >{selectedAlmacen.nombre} <span className="ms-2 text-[20px]" ><TbReportAnalytics/></span> </span>
          
          <span className="opacity-0 w-[200px] flex justify-center items-center text-white absolute top-0 bottom-0 transition-all duration-300 bg-primary text-[10px] hover:text-[14px] hover:opacity-100"> 
            Historial de ingresos 
            <span className="ms-2 text-[20px]"><TbReportAnalytics/></span>
          </span>
        </div>

        <InputSelectSearch
          value={filter.categoria}
          className="ms-auto"
          name="categoria"
          placeholder="Categoría: "
          options={listaCategorias.map(m => ({ value: m.name, name: m.name }))}
          optionDefault="Todas..."
          handleInputChange={handleChange}
        />

        <InputSelectSearch
          value={filter.marca}
          className="ms-3"
          name="marca"
          placeholder="Marca: "
          options={listaMarcas.map(m => ({ value: m.name, name: m.name }))}
          optionDefault="Todas..."
          handleInputChange={handleChange}
        />

        <button onClick={logoutAlmacen} className="flex items-center text-white ms-2 rounded-md px-3 bg-danger/80 hover:bg-danger" type="button">
          <span className="me-2" >Salir</span> <TbLogout2 />
        </button>
      </HeaderSection>

      <BodySection>
        <DataTable<ProductoAlmacenDetallado> columns={columns} data={filteredAlmacenProducto} details={{ name: 'MAS', action: getProducto }} compareAlert="cantidad" />
      </BodySection>

      <div className='absolute bottom-2 right-2 flex flex-col items-end ' >
        {createOptions && <div className='flex flex-col bg-primary mb-3 rounded text-white' >
          <span className='px-3 py-1 cursor-pointer hover:bg-white/10' onClick={goToRegistrarProductos} >REGISTRAR PRODUCTOS</span>
          <span className='px-3 py-1 cursor-pointer hover:bg-white/10' onClick={goToIngresarProductos} >INGRESAR PRODUCTOS</span>
        </div>}
        <button
          onClick={() => { setCreateOptions(s => !s) }}
          type="button"
          className={`${createOptions && 'rotate-[135deg]'} transition-all duration-300 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[22px] hover:bg-opacity-100 w-14 h-14 rounded-full`}
        >
          <FaPlus />
        </button>
      </div>
    </>
  );
}