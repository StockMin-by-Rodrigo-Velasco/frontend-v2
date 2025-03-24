import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { perfilColor, perfilImg } from "../../../../assets/perfil";
import { FaEdit } from "react-icons/fa";
import React, { useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { updateSucursalUserAPI } from "../../../../redux/sucursal/sucursalThunk";
import { AiOutlineLoading } from "react-icons/ai";
import { InputPassword, InputText } from "../../../../components/Input";
import { useForm } from "../../../../hooks";
import { FormEvent } from 'react';

interface PerfilInterface {
  closeButton: () => void
}

interface UpdateUserInterface {
  nombre: string;
  apellido: string;
  contacto: string;
  direccion: string;
}

interface UpdateUserPasswordInterface {
  oldPassword: string;
  password: string;
  rePassword: string;
}

export default function UpdateUsuario({ closeButton }: PerfilInterface) {

  const { userData } = useSelector((s: RootState) => s.Sucursal);
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>();

  //* ----- EDIT IMAGE -----
  const [imagen, setImagen] = useState(userData.imagen);
  const [modeEditImagen, setModeEditImagen] = useState(false);


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
    dispatch(updateSucursalUserAPI({ id: userData.id, sucursalId: userData.sucursalId, imagen }));
    setModeEditImagen(false);
  }

  const cancelSaveImagen = () => {
    setImagen(userData.imagen);
    setModeEditImagen(false);
  }
  const initialStateFormData: UpdateUserInterface = { nombre: userData.nombre, apellido: userData.apellido, contacto: userData.contacto, direccion: userData.direccion };
  const { data: formData, handleInputChange: handleInputChangeData, resetData: resetFormData } = useForm<UpdateUserInterface>(initialStateFormData);

  const initialStateFormPassword: UpdateUserPasswordInterface = { oldPassword: '', password: '', rePassword: '' };
  const { data: formPassword, handleInputChange: handleInputChangePassword, resetData: resetDataPassword } = useForm<UpdateUserPasswordInterface>(initialStateFormPassword);

  //* ----- EDIT PASSWORS -----
  const [modeEditPassword, setModeEditPassword] = useState(false);

  const handleModeEditPassword = () => {
    setModeEditPassword(!modeEditPassword);
    setModeEditData(false);
    resetFormData();
  }

  //* ----- EDIT DATA -----
  const [modeEditData, setModeEditData] = useState(false);

  const handleModeEditData = () => {
    setModeEditData(!modeEditData);
    setModeEditPassword(false);
    resetDataPassword();
  }

  //* ----- SUBMIT -----
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    // console.log({ id: userData.id, sucursalId: userData.sucursalId, ...formData, ...formPassword })
    dispatch(updateSucursalUserAPI({ id: userData.id, sucursalId: userData.sucursalId, ...formData, ...formPassword }));
  }

  const cancelSaveData = () => {
    resetFormData();
    resetDataPassword();
    setModeEditData(false);
  }

  return (
    <Windows tittle="configuracion de perfil" closeButton={closeButton} >
      {/* AVATAR EDIT */}

      <div className="flex" >
        <div>
          <div className="flex">
            <div className="p-5 flex flex-col">
              <div style={{ backgroundColor: perfilColor(imagen.split(' ')[1]) }} className="rounded relative">
                <img src={perfilImg(imagen.split(' ')[0])} width={modeEditImagen ? '245px' : '300px'} />
                {!modeEditImagen &&
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-white transition-all text-[40px] hover:text-[45px] disabled:cursor-not-allowed"
                    onClick={() => { setModeEditImagen(true) }}
                    disabled={loadingData}
                  >
                    {!loadingData && <FaEdit />}
                    {loadingData && <AiOutlineLoading className="ms-2 animate-spin h-[40px] w-[40px]" color="white" />}
                  </button>
                }

                {modeEditImagen &&
                  <div className="absolute top-2 right-2 flex">
                    <button
                      type="button"
                      className="text-white transition-all border-white border-2 bg-success rounded-full w-[30px] h-[30px] flex justify-center items-center me-3 text-[24px] hover:brightness-75"
                      onClick={saveImagen}
                    >
                      <IoCheckmark />
                    </button>
                    <button
                      type="button"
                      className=" text-white transition-all border-white border-2 bg-danger rounded-full w-[30px] h-[30px] flex justify-center items-center text-[24px] hover:brightness-75"
                      onClick={cancelSaveImagen}
                    >
                      <IoClose />
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
          <div className="flex flex-col px-5 mb-3" >
            <h1
              className="text-secondary text-[12px] flex items-center hover:cursor-pointer hover:text-info"
              onClick={handleModeEditData}
            > <span className="me-2" >CAMBIAR INFORMACION </span> <FaEdit />
            </h1>
            {/* <h1
            className="text-secondary text-[12px] flex items-center hover:cursor-pointer hover:text-info"
            onClick={handleModeEditPassword}
          > <span className="me-2" >CAMBIAR CONTRASEÑA </span> <FaEdit />
          </h1> */}
          </div>

          {modeEditData &&
            <form onSubmit={onSubmit} className="flex flex-col px-5 pb-5" >
              <h1 className="text-center text-secondary" >CAMBIAR INFORMACION DE USUARIO</h1>
              <div>
                <InputText className="w-full" handleInputChange={handleInputChangeData} name="nombre" value={formData.nombre} placeholder="Nombre" required disabled={loadingData} />
                <InputText className="w-full" handleInputChange={handleInputChangeData} name="apellido" value={formData.apellido} placeholder="Apellido" required disabled={loadingData} />
                <InputText className="w-full" handleInputChange={handleInputChangeData} name="direccion" value={formData.direccion} placeholder="Direccion" required disabled={loadingData} />
                <InputText className="w-full" handleInputChange={handleInputChangeData} name="contacto" value={formData.contacto} placeholder="Contacto" required disabled={loadingData} />
              </div>

              <div className="mt-4 flex justify-center" >
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
                >Guardar {loadingData && <AiOutlineLoading className="ms-2 animate-spin h-[12px] w-[12px]" color="white" />}
                </button>
              </div>
            </form>
          }

          {modeEditPassword &&
            <form onSubmit={onSubmit} className="flex flex-col px-5 pb-5">
              <h1 className="text-center text-secondary">CAMBIA TU INFORMACION</h1>
              <div>
                <InputPassword className="w-full" handleInputChange={handleInputChangePassword} name="oldPassword" value={formPassword.oldPassword} placeholder="Ingresa tu contraseña" required disabled={loadingData} />
                <InputPassword className="w-full" handleInputChange={handleInputChangePassword} name="password" value={formPassword.password} placeholder="Nueva contraseña" required disabled={loadingData} />
                <InputPassword className="w-full" handleInputChange={handleInputChangePassword} name="rePassword" value={formPassword.rePassword} placeholder="Confirmar nueva contraseña" required disabled={loadingData} />
              </div>
              <div className="mt-4 flex justify-center" >
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
                >Guardar {loadingData && <AiOutlineLoading className="ms-2 animate-spin h-[12px] w-[12px]" color="white" />}
                </button>
              </div>
            </form>
          }
        </div>
        <div className="border border-secondary rounded m-2 p-2" >
          <h1 className="text-center text-secondary" >PERMISOS</h1>
          <div>
            <h1 className="bg-secondary text-white rounded px-2" >Productos</h1>
            <div className="ms-2" >
              <input type="checkbox"  id="producto-1"/>
              <label className="ms-2"  htmlFor="producto-1">Registrar productos</label>
            </div>

            <div className="ms-2" >
              <input type="checkbox"  id="producto-2"/>
              <label className="ms-2"  htmlFor="producto-2">Modificar productos</label>
            </div>

            <div className="ms-2" >
              <input type="checkbox"  id="producto-3"/>
              <label className="ms-2"  htmlFor="producto-3">Crear marcas, categorias y unidades de medida </label>
            </div>

            <div className="ms-2" >
              <input type="checkbox"  id="producto-4"/>
              <label className="ms-2"  htmlFor="producto-4">Modificar marcas, categorias y unidades de medida </label>
            </div>
          </div>

          <div>
            <h1 className="bg-secondary text-white rounded px-2" >Almacenes</h1>
            <div className="ms-2" >
              <input type="checkbox"  id="producto-5"/>
              <label className="ms-2"  htmlFor="producto-5">Registrar almacenes</label>
            </div>

            <div className="ms-2" >
              <input type="checkbox"  id="producto-6"/>
              <label className="ms-2"  htmlFor="producto-6">Modificar almacenes</label>
            </div>

            <div className="ms-2" >
              <input type="checkbox"  id="producto-7"/>
              <label className="ms-2"  htmlFor="producto-7">Ingresar productos al almacen</label>
            </div>
          </div>

          <div>
            <h1 className="bg-secondary text-white rounded px-2" >Ventas</h1>
            <div className="ms-2" >
              <input type="checkbox"  id="producto-8"/>
              <label className="ms-2"  htmlFor="producto-8">Agregar y modificar tipos de moneda</label>
            </div>

            <div className="ms-2" >
              <input type="checkbox"  id="producto-9"/>
              <label className="ms-2"  htmlFor="producto-9">Agregar y modificar tipos de precio</label>
            </div>

            <div className="ms-2" >
              <input type="checkbox"  id="producto-10"/>
              <label className="ms-2"  htmlFor="producto-10">Modificar opciones de venta</label>
            </div>
          </div>



        </div>

      </div>


    </Windows>
  );
}