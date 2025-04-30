import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { perfilColor, perfilImg } from "../../../../assets/profile";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { InputText, InputTextBlock } from "../../../../components/Input";
import { useForm } from "../../../../hooks";
import { FormEvent } from 'react';
import { ToggleUserPermissionDto, UpdateUserDto, User } from "../../../../interface";
import { FaEdit } from "react-icons/fa";
import { handlePermisoToUserAPI, updateUserAPI } from "../../../../redux/branch/branchThunk";

interface UpdateUsuarioProp {
  closeButton: () => void,
  user: User
}

export default function UpdateUsuario({ closeButton, user }: UpdateUsuarioProp) {
  const { id: branchId, listPermissions: listaPermisos } = useSelector((s: RootState) => s.Branch);
  const { loadingData } = useSelector((s: RootState) => s.Aplication);

  const userPermissionsSet = new Set(user.UserPermission.map(p => p.permissionId));
  const dispatch = useDispatch<AppDispatch>();

  const initialStateFormData: UpdateUserDto = { 
    id: user.id,
    branchId, 
    name: user.name, 
    lastName: user.lastName, 
    contact: user.contact,
    address: user.address, 
    ci: user.ci, 
    profile: user.profile, 
  };
  const { data: formData, handleInputChange: handleInputChangeData } = useForm<UpdateUserDto>(initialStateFormData);
  const [profile, setProfile] = useState(user.profile);
  const [modeEditInfo, setModeEditInfo] = useState(false);

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

  const changePermiso = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id:permissionId } = e.target;
    const permiso:ToggleUserPermissionDto = {userId: user.id, permissionId} 
    // console.log(permiso);
    dispatch(handlePermisoToUserAPI(permiso));
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // console.log({ ...formData, profile });
    dispatch(updateUserAPI({ ...formData, profile }));
  }
 
  return (
    <Windows tittle="configuracion de perfil" closeButton={closeButton} >
      <div className="flex" >
        <div>
          <div className="flex">
            <div className="p-5 flex flex-col">
              <div style={{ backgroundColor: perfilColor(profile.split(' ')[1]  ) }} className="rounded relative">
                <img src={perfilImg(profile.split(' ')[0])} width={ modeEditInfo? '145px':'173px'} />
              </div>

              {modeEditInfo&& <div className="mt-1 flex justify-between">
                <button type="button" className="w-6 h-6 rounded-full" style={{ backgroundColor: perfilColor('color1') }} value='color1' onClick={changeColor}></button>
                <button type="button" className="w-6 h-6 rounded-full" style={{ backgroundColor: perfilColor('color2') }} value='color2' onClick={changeColor}></button>
                <button type="button" className="w-6 h-6 rounded-full" style={{ backgroundColor: perfilColor('color3') }} value='color3' onClick={changeColor}></button>
                <button type="button" className="w-6 h-6 rounded-full" style={{ backgroundColor: perfilColor('color4') }} value='color4' onClick={changeColor}></button>
              </div>}
            </div>

            { modeEditInfo&& <div className="flex flex-col justify-between h-[200px]" >
              <button type="button" className="w-10 h-10" value='img1' onClick={changeImg}><img src={perfilImg('img1')} /></button>
              <button type="button" className="w-10 h-10" value='img2' onClick={changeImg}><img src={perfilImg('img2')} /></button>
              <button type="button" className="w-10 h-10" value='img3' onClick={changeImg}><img src={perfilImg('img3')} /></button>
              <button type="button" className="w-10 h-10" value='img4' onClick={changeImg}><img src={perfilImg('img4')} /></button>
            </div>}
          </div>
          <form onSubmit={onSubmit} className="flex flex-col px-5 pb-5" >
            <button type="button" className="text-center text-secondary flex items-center" onClick={() => {setModeEditInfo(s=>!s)}} >INFORMACION DE USUARIO <FaEdit className="ms-2"/> </button>
            <div>
              <InputText
                className="w-full"
                handleInputChange={handleInputChangeData}
                name="name"
                value={formData.name||''}
                placeholder="Nombre:"
                disabled={loadingData||!modeEditInfo}/>
              

              <InputText
                className="w-full"
                handleInputChange={handleInputChangeData}
                name="lastName"
                value={formData.lastName||''}
                placeholder="Apellido:"
                disabled={loadingData||!modeEditInfo} />

              <InputText
                className="w-full"
                handleInputChange={handleInputChangeData}
                name="address"
                value={formData.address||''}
                placeholder="Direccion:"
                disabled={loadingData || !modeEditInfo} />

              <InputText
                className="w-full"
                handleInputChange={handleInputChangeData}
                name="ci"
                value={formData.ci || ''}
                placeholder="CI:"
                disabled={loadingData || !modeEditInfo} />

              <InputText
                className="w-full"
                handleInputChange={handleInputChangeData}
                name="contact"
                value={formData.contact || ''}
                placeholder="Contacto:"
                disabled={loadingData || !modeEditInfo} />

              <InputTextBlock
                className="w-full"
                name="password"
                value='*************'
                placeholder="Contraseña:"/>
            </div>

            <div className="mt-4 flex justify-center" >
              <button
                className="bg-success bg-opacity-85 px-2 rounded-full text-white hover:bg-opacity-100 disabled:bg-opacity-85 disabled:cursor-not-allowed flex items-center disabled:bg-secondary"
                disabled={loadingData || !modeEditInfo}
                type="submit"
              >Guardar {loadingData && <AiOutlineLoading className="ms-2 animate-spin h-[12px] w-[12px]" color="white" />}
              </button>
            </div>
          </form>
        </div>
        <div className="border border-secondary rounded m-2 p-2 relative">

              <div className="flex items-center justify-center text-secondary w-full" >
                <h1 className="text-center" >PERMISOS </h1>
                {loadingData&& <AiOutlineLoading className="ms-2 animate-spin h-[12px] w-[12px]"/>}
              </div>
          <div className="my-2" >
            <h1 className="bg-secondary text-white rounded px-2" >Productos</h1>
            {listaPermisos.filter(p => p.module === 'products').map(p => (
              <div key={p.id} className="ms-2" >
                <input type="checkbox" id={p.id} onChange={changePermiso} defaultChecked={userPermissionsSet.has(p.id)} disabled={loadingData}/>
                <label className="ms-2" htmlFor={p.id}>{p.description}</label>
              </div>
            ))
            }
          </div>

          <div className="my-2" >
            <h1 className="bg-secondary text-white rounded px-2" >Almacenes</h1>
            {listaPermisos.filter(p => p.module === 'warehouses').map(p => (
              <div key={p.id} className="ms-2" >
                <input type="checkbox" id={p.id} onChange={changePermiso} defaultChecked={userPermissionsSet.has(p.id)} disabled={loadingData}/>
                <label className="ms-2" htmlFor={p.id}>{p.description}</label>
              </div>
            ))
            }
          </div>

          <div className="my-2" >
            <h1 className="bg-secondary text-white rounded px-2" >Ventas</h1>
            {listaPermisos.filter(p => p.module === 'sales').map(p => (
              <div key={p.id} className="ms-2" >
                <input type="checkbox" id={p.id} onChange={changePermiso} defaultChecked={userPermissionsSet.has(p.id)} disabled={loadingData}/>
                <label className="ms-2" htmlFor={p.id}>{p.description}</label>
              </div>
            ))
            }
          </div>

          <div className="my-2" >
            <h1 className="bg-secondary text-white rounded px-2" >Usuarios</h1>
            {listaPermisos.filter(p => p.module === 'users').map(p => (
              <div key={p.id} className="ms-2" >
                <input type="checkbox" id={p.id} onChange={changePermiso} defaultChecked={userPermissionsSet.has(p.id)} disabled={loadingData}/>
                <label className="ms-2" htmlFor={p.id}>{p.description}</label>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </Windows>
  );
}