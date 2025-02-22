import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AlmacenCard from "./components/AlmacenCart";
import BodySection from "../../../components/BodySection";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import CreateAlmacenWindow from "./windows/CreateAlmacenWindow";

export default function ListaAlmacenes() {
  const navigate = useNavigate();
  const { listaAlmacenes, selectedAlmacen } = useSelector((s: RootState) => s.Almacenes);
  const [openCreateAlmacenWindow, setOpenCreateAlmacenWindow] = useState(false);

  useEffect(() => {
    if(!selectedAlmacen.id) navigate('/main/almacenes/lista');
  }, [])
  
  return ( selectedAlmacen.id?
    <>
        <Outlet/>
    </>
    :
    <>
      {openCreateAlmacenWindow&& <CreateAlmacenWindow closeButton={() => {setOpenCreateAlmacenWindow(false)}}/>}

      <BodySection>
        <h1 className="text-[30px] text-secondary border-b-2 border-secondary mb-5" >ALMACENES</h1>
        <div className="flex flex-wrap justify-evenly" >
          {listaAlmacenes.map(a => (
            <AlmacenCard key={a.id} almacen={a} />
          ))}
        </div>
      </BodySection>

      <button
        onClick={() => { setOpenCreateAlmacenWindow(true) }}
        type="button"
        className="absolute bottom-2 right-2 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[22px] hover:bg-opacity-100 w-14 h-14 rounded-full"
      >
        <FaPlus />
      </button>
    </>
  );
}