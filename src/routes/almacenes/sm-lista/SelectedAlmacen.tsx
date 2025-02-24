import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../../redux/store";
import HeaderSection from "../../../components/HeaderSection";
import { resetSelectAlmacen } from "../../../redux/almacenes/almacenesSlice";
import BodySection from "../../../components/BodySection";
import { InputSearch, InputSelectSearch } from "../../../components/Input";
import { TbLogout2 } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from "../../../components/DataTable";
import { ProductoAlmacenDetalladoInterface } from "../../../interface";
import CreateManyProductosAlmacen from "./windows/CreateManyProductosAlmacen";

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

export default function SelectedAlmacen() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { listaMarcas, listaCategorias } = useSelector((s: RootState) => s.Productos);
  const { selectedAlmacen, listaProductosAlmacen } = useSelector((s: RootState) => s.Almacenes);
  const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
  const [filteredAlmacenProducto, setFilteredProducto] = useState<ProductoAlmacenDetalladoInterface[]>([]);
  const [createOptions, setCreateOptions] = useState(false);
  const [openCreateManyProductosAlmacen, setOpenCreateManyProductosAlmacen] = useState(false);

  const columns: DataTableColumnInterface<ProductoAlmacenDetalladoInterface>[] = [
      { name: 'IMAGEN', type: DataTableColumnTypes.IMG, key: "imagen"},
      { name: 'CODIGO', type: DataTableColumnTypes.P , key: "codigo"},
      { name: 'MEDIDA', type: DataTableColumnTypes.P , key: "unidadMedidaAbreviada"},
      { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "nombre" },
      { name: 'CANTIDAD', type: DataTableColumnTypes.P, key: "cantidad" },
      { name: 'ESTADO', type: DataTableColumnTypes.ALERT, key: "cantidadMinima" },
    ];

  const logoutAlmacen = () => {
    dispatch(resetSelectAlmacen())
    navigate('/main/almacenes/lista');
  }

  const getProducto = (d:ProductoAlmacenDetalladoInterface) => {
      console.log(d);
      // setProductoSelected(d);
      // setOpenDataDetails(true);
    }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    const newFilter = { ...filter, [name]: value };
    // const newData = listaProductos.filter(i => 
    //   i.categoria?.includes(newFilter.categoria) && 
    //   i.marca?.includes(newFilter.marca) &&
    //   (i.nombre.includes(newFilter.buscar) || i.codigo.includes(newFilter.buscar))
    // )
    // setData(newData);
    setFilter(newFilter);
  }

  useEffect(() => {
    setFilteredProducto(listaProductosAlmacen);
  }, [listaProductosAlmacen])
  return (
    <>
      {openCreateManyProductosAlmacen&& <CreateManyProductosAlmacen closeButton={() => {setOpenCreateManyProductosAlmacen(false)}} />}


      <HeaderSection>
        <InputSearch
          handleInputChange={handleChange}
          name='buscar'
          placeholder="Buscar"
          value={filter.buscar}
        />

        <div className="flex justify-center items-center bg-secondary text-white rounded-full px-3 text-[20px] ms-auto me-auto" >
          <h1 className="ms-auto me-auto uppercase" >{selectedAlmacen.nombre}</h1>
        </div>

        <InputSelectSearch
          value={filter.categoria}
          className="ms-auto"
          name="categoria"
          placeholder="Categoría: "
          options={listaCategorias.map(m => ({ value: m.nombre, name: m.nombre }))}
          optionDefault="Todas..."
          handleInputChange={handleChange}
        />

        <InputSelectSearch
          value={filter.marca}
          className="ms-3"
          name="marca"
          placeholder="Marca: "
          options={listaMarcas.map(m => ({ value: m.nombre, name: m.nombre }))}
          optionDefault="Todas..."
          handleInputChange={handleChange}
        />

        <button onClick={logoutAlmacen} className="flex items-center text-white ms-2 rounded-md px-3 bg-danger/80 hover:bg-danger" type="button">
          <span className="me-2" >Salir</span> <TbLogout2 />
        </button>
      </HeaderSection>

      <BodySection>
        <DataTable<ProductoAlmacenDetalladoInterface> columns={columns} data={filteredAlmacenProducto} details={{name: 'MAS', action:getProducto}} compareAlert="cantidad" />
      </BodySection>

      <div className='absolute bottom-2 right-2 flex flex-col items-end ' >
        { createOptions&& <div className='flex flex-col bg-primary mb-3 rounded text-white' >
          <span className='px-3 py-1 cursor-pointer hover:bg-white/10' onClick={() => {setOpenCreateManyProductosAlmacen(true)}} >REGISTRAR PRODUCTOS</span>
          <span className='px-3 py-1 cursor-pointer hover:bg-white/10' onClick={() => {}} >INGRESAR PRODUCTOS</span>
        </div>}
        <button
          onClick={() => {setCreateOptions(s=>!s)}}
          type="button"
          className={`${ createOptions&& 'rotate-[135deg]'} transition-all duration-300 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[22px] hover:bg-opacity-100 w-14 h-14 rounded-full`}
        >
          <FaPlus />
        </button>
      </div>
    </>
  );
}