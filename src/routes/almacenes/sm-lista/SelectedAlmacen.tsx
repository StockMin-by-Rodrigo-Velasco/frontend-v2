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
  const [filter, setFilter] = useState<FilterInterface>(filterInitialState);

  const logoutAlmacen = () => {
    dispatch(resetSelectAlmacen())
    navigate('/main/almacenes/lista');
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

  }, [])
  return (
    <>
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
        <div className="bg-slate-500" >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis commodi quaerat accusamus? Amet maxime eius officiis, dolorum veritatis ducimus suscipit. Voluptas beatae facere amet nobis voluptate nisi earum recusandae delectus!
        </div>
      </BodySection>

      <button
        // onClick={() => {setOpenCreateProducto(true)}}
        type="button"
        className="absolute bottom-2 right-2 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[22px] hover:bg-opacity-100 w-14 h-14 rounded-full"
      >
        <FaPlus />
      </button>
    </>
  );
}