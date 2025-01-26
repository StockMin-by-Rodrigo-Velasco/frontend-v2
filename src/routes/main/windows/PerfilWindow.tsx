import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../components/Windows";
import { AppDispatch, RootState } from "../../../redux/store";
import { perfilColor, perfilImg } from "../../../assets/perfil";
import { FaEdit } from "react-icons/fa";
import React, { useState } from "react";
import { IoCheckmark, IoClose} from "react-icons/io5";
import { updateSucursalUserAPI } from "../../../redux/sucursal/sucursalThunk";
import { AiOutlineLoading } from "react-icons/ai";
import { InputText } from "../../../components/Input";
import { useForm } from "../../../hooks";

interface PerfilInterface {
  closeButton: () => void
}

interface UpdateUserInterface {
  nombre: string;
  apellido: string;
  contacto: string;
  direccion: string;
}

export default function PerfilWindow({ closeButton }: PerfilInterface) {

  const { userData } = useSelector((s: RootState) => s.Sucursal);
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>();

  const [imagen, setImagen] = useState(userData.imagen);
  const [modeEditImagen, setModeEditImagen] = useState(false);
  const [modeEditData, setModeEditData] = useState(false);

  const changeColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newColor = e.currentTarget.value;
    const img = imagen.split(' ')[0];
    setImagen(`${img} ${newColor}`);
  }
  const changeImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newImg = e.currentTarget.value;
    const color = imagen.split(' ')[1];
    setImagen(`${newImg} ${color}`);
  }

  const saveImagen = () => {
    dispatch(updateSucursalUserAPI( {id: userData.id, sucursalId: userData.sucursalId, imagen} ));
    setModeEditImagen(false);  
  }

  const cancelSaveImagen = () => {
    setImagen(userData.imagen);
    setModeEditImagen(false);  
  }

  const initialStateForm: UpdateUserInterface = {nombre:userData.nombre, apellido:userData.apellido, contacto:userData.contacto, direccion:userData.direccion};
  const {data: formData, handleInputChange, resetData} = useForm<UpdateUserInterface>(initialStateForm);

  const saveData = () => {
    dispatch(updateSucursalUserAPI( {id: userData.id, sucursalId: userData.sucursalId, ...formData} ));
    setModeEditData(false);
  }

  const cancelSaveData = () => {
    resetData();
    setModeEditData(false);
  }

  return (
    <Windows tittle="configuracion de perfil" closeButton={closeButton} >
      {/* AVATAR EDIT */}
      <div className="flex">
        <div className="p-5 flex flex-col">
          <div style={{ backgroundColor: perfilColor(imagen.split(' ')[1]) }} className="rounded relative">
            <img src={perfilImg(imagen.split(' ')[0])} width={modeEditImagen?'245px':'300px'}/>
            {!modeEditImagen &&
              <button
                type="button"
                className="absolute top-1 right-1 text-white transition-all text-[40px] hover:text-[45px] disabled:cursor-not-allowed"
                onClick={() => { setModeEditImagen(true) }}
                disabled={loadingData}
              >
                {!loadingData&&<FaEdit/>}
                {loadingData&&<AiOutlineLoading className="ms-2 animate-spin h-[40px] w-[40px]" color="white" />}
              </button>
            }

            {modeEditImagen &&
              <div className="absolute top-2 right-2 flex">
                <button
                  type="button"
                  className="text-white transition-all border-white border-2 bg-success rounded-full w-[30px] h-[30px] flex justify-center items-center me-3 text-[24px] hover:brightness-75"
                  onClick={saveImagen}
                >
                  <IoCheckmark/>
                </button>
                <button
                  type="button"
                  className=" text-white transition-all border-white border-2 bg-danger rounded-full w-[30px] h-[30px] flex justify-center items-center text-[24px] hover:brightness-75"
                  onClick={cancelSaveImagen}
                >
                  <IoClose/>
                </button>
              </div>
            }
          </div>
          {modeEditImagen &&
            <div className="mt-1 flex justify-between">
              <button type="button" className="w-10 h-10 rounded-full" style={{ backgroundColor: perfilColor('color1') }} value='color1' onClick={changeColor}></button>
              <button type="button" className="w-10 h-10 rounded-full" style={{ backgroundColor: perfilColor('color2') }} value='color2' onClick={changeColor}></button>
              <button type="button" className="w-10 h-10 rounded-full" style={{ backgroundColor: perfilColor('color3') }} value='color3' onClick={changeColor}></button>
              <button type="button" className="w-10 h-10 rounded-full" style={{ backgroundColor: perfilColor('color4') }} value='color4' onClick={changeColor}></button>
            </div>
          }
        </div>

        {modeEditImagen &&
          <div className="flex flex-col justify-between h-[300px]" >
            <button type="button" className="w-14 h-14" value='img1' onClick={changeImg}><img src={perfilImg('img1')} /></button>
            <button type="button" className="w-14 h-14" value='img2' onClick={changeImg}><img src={perfilImg('img2')} /></button>
            <button type="button" className="w-14 h-14" value='img3' onClick={changeImg}><img src={perfilImg('img3')} /></button>
            <button type="button" className="w-14 h-14" value='img4' onClick={changeImg}><img src={perfilImg('img4')} /></button>
          </div>
        }

      </div>

      <form className="flex flex-col px-5 pb-5" >
        <h1 className="text-secondary flex items-center hover:cursor-pointer" onClick={() => {setModeEditData(!modeEditData)}} > <span className="me-2" >DATOS DE USUARIO </span> <FaEdit/></h1>
        <InputText className="w-full" handleInputChange={handleInputChange} name="nombre" value={formData.nombre} placeholder="Nombre" required disabled={!modeEditData} />
        <InputText className="w-full" handleInputChange={handleInputChange} name="apellido" value={formData.apellido} placeholder="Apellido" required disabled={!modeEditData} />
        <InputText className="w-full" handleInputChange={handleInputChange} name="direccion" value={formData.direccion} placeholder="Direccion" required disabled={!modeEditData} />
        <InputText className="w-full" handleInputChange={handleInputChange} name="contacto" value={formData.contacto} placeholder="Contacto" required disabled={!modeEditData} />

        {modeEditData&& <div className="mt-3 flex justify-center" >
          <button 
            className="bg-danger me-3 bg-opacity-85 px-2 rounded-full text-white hover:bg-opacity-100 disabled:bg-opacity-85 disabled:cursor-not-allowed" 
            disabled={loadingData} 
            type="button" 
            onClick={cancelSaveData} 
          >Cancelar
          </button>
          <button 
          className="bg-success bg-opacity-85 px-2 rounded-full text-white hover:bg-opacity-100 disabled:bg-opacity-85 disabled:cursor-not-allowed flex items-center" 
          disabled={loadingData} 
          type="submit" 
          onClick={saveData} 
          >Guardar {loadingData&&<AiOutlineLoading className="ms-2 animate-spin h-[12px] w-[12px]" color="white" />}
          </button>
        </div>}
      </form>
    </Windows>
  );
}