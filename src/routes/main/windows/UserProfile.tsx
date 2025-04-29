import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../components/Windows";
import { AppDispatch, RootState } from "../../../redux/store";
import { perfilColor, perfilImg } from "../../../assets/profile";
import { FaEdit } from "react-icons/fa";
import React, { useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { updateUserAPI } from "../../../redux/branch/branchThunk";
import { AiOutlineLoading } from "react-icons/ai";
import { InputPassword, InputText } from "../../../components/Input";
import { useForm } from "../../../hooks";
import { FormEvent } from 'react';
import { UpdateUserDto } from "../../../interface";

interface UserProfileProp {
  closeButton: () => void
}



export default function UserProfile({ closeButton }: UserProfileProp) {
  
  const { userData } = useSelector((s: RootState) => s.Branch);
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>();

  const initialStateFormUserProfile: UpdateUserDto = { 
    id: userData.id, 
    branchId: userData.branchId,
    name: userData.name, 
    profile: userData.profile,
    lastName: userData.lastName, 
    contact: userData.contact, 
    address: userData.address,
    password: '',
    oldPassword: ''
  };
  
  
  
  const { data: formData, handleInputChange, resetData: resetFormData } = useForm<UpdateUserDto>(initialStateFormUserProfile);

  // const initialStateFormPassword: UpdateUserPasswordInterface = { oldPassword: '', password: '', rePassword: '' };
  // const { data: formPassword, handleInputChange: handleInputChangePassword, resetData: resetDataPassword } = useForm<UpdateUserPasswordInterface>(initialStateFormPassword);

  //* ----- EDIT IMAGE -----
  const [profile, setProfile] = useState(userData.profile);
  const [modeEditProfile, setModeEditProfile] = useState(false);


  const changeColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newColor = e.currentTarget.value;
    const img = profile.split(' ')[0];
    setProfile(`${img} ${newColor}`);
  }
  const changeProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newImg = e.currentTarget.value;
    const color = profile.split(' ')[1];
    setProfile(`${newImg} ${color}`);
  }

  const saveProfile = () => {
    dispatch(updateUserAPI({ id: userData.id, branchId: userData.branchId, profile: profile }));
    setModeEditProfile(false);
  }

  const cancelSaveProfile = () => {
    setProfile(userData.profile);
    setModeEditProfile(false);
  }
  
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
  }

  //* ----- SUBMIT -----
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // console.log({ id: userData.id, sucursalId: userData.sucursalId, ...formData, ...formPassword })
    dispatch(updateUserAPI( formData ));
  }

  const cancelSaveData = () => {
    // resetFormData();
    // resetDataPassword();
    setModeEditData(false);
  }

  return (
    <Windows tittle="configuracion de perfil" closeButton={closeButton} >
      {/* AVATAR EDIT */}
      <div className="flex">
        <div className="p-5 flex flex-col">
          <div style={{ backgroundColor: perfilColor(profile.split(' ')[1]) }} className="rounded relative">
            <img src={perfilImg(profile.split(' ')[0])} width={modeEditProfile ? '245px' : '300px'} />
            {!modeEditProfile &&
              <button
                type="button"
                className="absolute top-1 right-1 text-white transition-all text-[40px] hover:text-[45px] disabled:cursor-not-allowed"
                onClick={() => { setModeEditProfile(true) }}
                disabled={loadingData}
              >
                {!loadingData && <FaEdit />}
                {loadingData && <AiOutlineLoading className="ms-2 animate-spin h-[40px] w-[40px]" color="white" />}
              </button>
            }

            {modeEditProfile &&
              <div className="absolute top-2 right-2 flex">
                <button
                  type="button"
                  className="text-white transition-all border-white border-2 bg-success rounded-full w-[30px] h-[30px] flex justify-center items-center me-3 text-[24px] hover:brightness-75"
                  onClick={saveProfile}
                >
                  <IoCheckmark />
                </button>
                <button
                  type="button"
                  className=" text-white transition-all border-white border-2 bg-danger rounded-full w-[30px] h-[30px] flex justify-center items-center text-[24px] hover:brightness-75"
                  onClick={cancelSaveProfile}
                >
                  <IoClose />
                </button>
              </div>
            }
          </div>
          {modeEditProfile &&
            <div className="mt-1 flex justify-between">
              <button type="button" className="w-10 h-10 rounded-full" style={{ backgroundColor: perfilColor('color1') }} value='color1' onClick={changeColor}></button>
              <button type="button" className="w-10 h-10 rounded-full" style={{ backgroundColor: perfilColor('color2') }} value='color2' onClick={changeColor}></button>
              <button type="button" className="w-10 h-10 rounded-full" style={{ backgroundColor: perfilColor('color3') }} value='color3' onClick={changeColor}></button>
              <button type="button" className="w-10 h-10 rounded-full" style={{ backgroundColor: perfilColor('color4') }} value='color4' onClick={changeColor}></button>
            </div>
          }
        </div>

        {modeEditProfile &&
          <div className="flex flex-col justify-between h-[300px]" >
            <button type="button" className="w-14 h-14" value='img1' onClick={changeProfile}><img src={perfilImg('img1')} /></button>
            <button type="button" className="w-14 h-14" value='img2' onClick={changeProfile}><img src={perfilImg('img2')} /></button>
            <button type="button" className="w-14 h-14" value='img3' onClick={changeProfile}><img src={perfilImg('img3')} /></button>
            <button type="button" className="w-14 h-14" value='img4' onClick={changeProfile}><img src={perfilImg('img4')} /></button>
          </div>
        }

      </div>
      <div className="flex flex-col px-5 mb-3" >
        <h1
          className="text-secondary text-[12px] flex items-center hover:cursor-pointer hover:text-info"
          onClick={handleModeEditData}
        > <span className="me-2" >CAMBIAR INFORMACION </span> <FaEdit />
        </h1>
        <h1
          className="text-secondary text-[12px] flex items-center hover:cursor-pointer hover:text-info"
          onClick={handleModeEditPassword}
        > <span className="me-2" >CAMBIAR CONTRASEÑA </span> <FaEdit />
        </h1>
      </div>

      {modeEditData&&
        <form onSubmit={onSubmit} className="flex flex-col px-5 pb-5" >
          <h1 className="text-center text-secondary" >CAMBIA TU INFORMACION</h1>
          <div>
            <InputText 
              className="w-full" 
              handleInputChange={handleInputChange} 
              name="name" 
              value={formData.name||''} 
              placeholder="Nombre" 
              required 
              disabled={loadingData} />
            <InputText 
              className="w-full" 
              handleInputChange={handleInputChange} 
              name="lastname" 
              value={formData.lastName||''} 
              placeholder="Apellido" 
              required 
              disabled={loadingData} />
            <InputText 
              className="w-full" 
              handleInputChange={handleInputChange} 
              name="address" 
              value={formData.address||''} 
              placeholder="Direccion" 
              required 
              disabled={loadingData} />
            <InputText 
              className="w-full" 
              handleInputChange={handleInputChange} 
              name="contact" 
              value={formData.contact||''} 
              placeholder="Contacto" 
              required 
              disabled={loadingData} />
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

      {modeEditPassword&&
        <form onSubmit={onSubmit} className="flex flex-col px-5 pb-5">
          <h1 className="text-center text-secondary">CAMBIA TU CONTRASEÑA</h1>
          <div>
            <InputPassword 
              className="w-full" 
              handleInputChange={handleInputChange} 
              name="oldPassword" 
              value={formData.oldPassword||''} 
              placeholder="Ingresa tu contraseña" 
              required />
            <InputPassword 
              className="w-full" 
              handleInputChange={handleInputChange} 
              name="password" 
              value={formData.password||''} 
              placeholder="Nueva contraseña" 
              required disabled={loadingData} />
            {/* <InputPassword 
              className="w-full" 
              handleInputChange={handleInputChange} 
              name="oldPassword" 
              value={formData.oldPassword||''} 
              placeholder="Confirmar nueva contraseña" 
              required 
              disabled={loadingData} /> */}
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
    </Windows>
  );
}