import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { perfilColor, perfilImg } from "../../../../assets/profile";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { InputText } from "../../../../components/Input";
import { useForm } from "../../../../hooks";
import { FormEvent } from 'react';
import { CreateUserDto, User } from "../../../../interfaces";
import { createUserAPI } from "../../../../redux/branch/branchThunk";

interface CreateUsuarioProp {
  closeButton: () => void;
  getUsuario: (data:User)=>void
}

export default function CreateUsuario({ closeButton, getUsuario }: CreateUsuarioProp) {
  const { id: branchId, permissions: listaPermisos } = useSelector((s: RootState) => s.Branch);
  const { loadingData } = useSelector((s: RootState) => s.Aplication);

  const dispatch = useDispatch<AppDispatch>();

  const initialStateFormData: CreateUserDto = { 
    branchId, 
    name: '', 
    lastName: '', 
    contact: '', 
    address: '', 
    password: '', 
    ci: '', 
    profile: '' 
  }
  const { data: formData, handleInputChange: handleInputChangeData } = useForm<CreateUserDto>(initialStateFormData);
  const [profile, setProfile] = useState('img1 color1');


  const changeColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newColor = e.currentTarget.value;
    const img = profile.split(' ')[0];
    setProfile(`${img} ${newColor}`);
  }
  const changeImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newImg = e.currentTarget.value;
    const color = profile.split(' ')[1];
    setProfile(`${newImg} ${color}`);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createUserAPI({ ...formData, profile }, getUsuario ));
  }

  return (
    <Windows tittle="configuracion de perfil" closeButton={closeButton} >
      <div className="flex" >
        <div>
          <div className="flex">
            <div className="p-5 flex flex-col">
              <div style={{ backgroundColor: perfilColor(profile.split(' ')[1]) }} className="rounded relative">
                <img src={perfilImg(profile.split(' ')[0])} width={'145px'} />
              </div>

              <div className="mt-1 flex justify-between">
                <button type="button" className="w-6 h-6 rounded-full" style={{ backgroundColor: perfilColor('color1') }} value='color1' onClick={changeColor}></button>
                <button type="button" className="w-6 h-6 rounded-full" style={{ backgroundColor: perfilColor('color2') }} value='color2' onClick={changeColor}></button>
                <button type="button" className="w-6 h-6 rounded-full" style={{ backgroundColor: perfilColor('color3') }} value='color3' onClick={changeColor}></button>
                <button type="button" className="w-6 h-6 rounded-full" style={{ backgroundColor: perfilColor('color4') }} value='color4' onClick={changeColor}></button>
              </div>

            </div>

            <div className="flex flex-col justify-between h-[200px]" >
              <button type="button" className="w-10 h-10" value='img1' onClick={changeImg}><img src={perfilImg('img1')} /></button>
              <button type="button" className="w-10 h-10" value='img2' onClick={changeImg}><img src={perfilImg('img2')} /></button>
              <button type="button" className="w-10 h-10" value='img3' onClick={changeImg}><img src={perfilImg('img3')} /></button>
              <button type="button" className="w-10 h-10" value='img4' onClick={changeImg}><img src={perfilImg('img4')} /></button>
            </div>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col px-5 pb-5" >
            <h1 className="text-center text-secondary" >INFORMACION DE USUARIO</h1>
            <div>
              <InputText
                className="w-full"
                handleInputChange={handleInputChangeData}
                name="name"
                value={formData.name}
                placeholder="*Nombre:"
                required
                disabled={loadingData} />

              <InputText
                className="w-full"
                handleInputChange={handleInputChangeData}
                name="lastName"
                value={formData.lastName}
                placeholder="*Apellido:"
                required
                disabled={loadingData} />

              <InputText
                className="w-full"
                handleInputChange={handleInputChangeData}
                name="address"
                value={formData.address}
                placeholder="*Direccion:"
                required
                disabled={loadingData} />

              <InputText
                className="w-full"
                handleInputChange={handleInputChangeData}
                name="ci"
                value={formData.ci}
                placeholder="*CI:"
                required
                disabled={loadingData} />

              <InputText
                className="w-full"
                handleInputChange={handleInputChangeData}
                name="contact"
                value={formData.contact}
                placeholder="*Contacto:"
                required
                disabled={loadingData} />

              <InputText
                className="w-full"
                handleInputChange={handleInputChangeData}
                name="password"
                value={formData.password}
                placeholder="*Contraseña:"
                required
                disabled={loadingData} />
            </div>

            <div className="mt-4 flex justify-center" >
              <button
                className="bg-success bg-opacity-85 px-2 rounded-full text-white hover:bg-opacity-100 disabled:bg-opacity-85 disabled:cursor-not-allowed flex items-center disabled:bg-secondary"
                disabled={loadingData}
                type="submit"
              >Guardar {loadingData && <AiOutlineLoading className="ms-2 animate-spin h-[12px] w-[12px]" color="white" />}
              </button>
            </div>
          </form>
        </div>
        <div className="border border-secondary rounded m-2 p-2 relative">

          <div className="bg-secondary/70 absolute top-0 left-0 right-0 bottom-0">
            <div className="p-3 text-center h-full flex items-end text-white" >
              <p> Es necesario registrar al usuario para poder asignarle sus respectivos permisos.</p>
            </div>
          </div>

          <h1 className="text-center text-secondary" >PERMISOS</h1>
          <div className="my-2" >
            <h1 className="bg-secondary text-white rounded px-2" >Productos</h1>
            {listaPermisos.filter(p => p.module === 'products').map(p => (
              <div key={p.id} className="ms-2" >
                <input type="checkbox" id={p.code} />
                <label className="ms-2" htmlFor={p.code}>{p.description}</label>
              </div>
            ))
            }
          </div>

          <div className="my-2" >
            <h1 className="bg-secondary text-white rounded px-2" >Almacenes</h1>
            {listaPermisos.filter(p => p.module === 'warehouses').map(p => (
              <div key={p.id} className="ms-2" >
                <input type="checkbox" id={p.code} />
                <label className="ms-2" htmlFor={p.code}>{p.description}</label>
              </div>
            ))
            }
          </div>

          <div className="my-2" >
            <h1 className="bg-secondary text-white rounded px-2" >Ventas</h1>
            {listaPermisos.filter(p => p.module === 'sales').map(p => (
              <div key={p.id} className="ms-2" >
                <input type="checkbox" id={p.code} />
                <label className="ms-2" htmlFor={p.code}>{p.description}</label>
              </div>
            ))
            }
          </div>

          <div className="my-2" >
            <h1 className="bg-secondary text-white rounded px-2" >Usuarios</h1>
            {listaPermisos.filter(p => p.module === 'users').map(p => (
              <div key={p.id} className="ms-2" >
                <input type="checkbox" id={p.code} />
                <label className="ms-2" htmlFor={p.code}>{p.description}</label>
              </div>
            ))
            }
          </div>




        </div>
      </div>
    </Windows>
  );
}