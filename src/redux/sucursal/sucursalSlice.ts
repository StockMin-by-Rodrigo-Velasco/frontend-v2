import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';


interface SucursalDataInterface{
    nit: string;
    nombre: string;
    propietario: string;
    direccion: string;
    contacto: string;
    activo: boolean;
}

interface UserDataInterface{
    id: string;
    sucursalId: string;
    nombre: string;
    apellido: string;
    ci: string;
    imagen: string;
    contacto: string;
    direccion: string;
    permisos: string;
    activo: boolean;
}

interface UserInterface{
    id: string;
    sucursalId: string;
    nombre: string;
    apellido: string;
    ci: string;
    imagen: string;
}
interface UserLoginInterface{
    id: string;
    sucursalId: string;
}

interface SucursalStateInterface{
    id: string;
    data: SucursalDataInterface;
    userData: UserDataInterface,
    users: UserInterface[];
    userSelected: UserLoginInterface,
    logo: string;
}

const initialState: SucursalStateInterface = {
    id: '',
    data: {nit:'', nombre:'', propietario:'', direccion:'', contacto: '', activo: false},
    userData: { id:'', sucursalId:'', nombre:'', apellido:'', ci:'', imagen:'', contacto:'', direccion:'', permisos:'', activo:false },
    users:[],
    userSelected: {id: '', sucursalId: ''},
    logo: '',
}

const SucursalSlice = createSlice({
  name: 'sucursal',
  initialState,
  reducers: {
    loginSucursal: (state, action: PayloadAction<SucursalStateInterface>) => {
        state.id = action.payload.id
        state.data = action.payload.data;
        state.logo = action.payload.logo;
    },
    logoutSucursal: (state) => {
        state.id = '';
        state.data = {nit:'', nombre:'', propietario:'', direccion:'', contacto: '', activo: false};
        state.users =[];
        state.userSelected = {id: '', sucursalId: ''};
        state.logo = '';

        Cookie.remove('token');
    },
    loginSucursalUser: (state, action: PayloadAction<UserDataInterface>) => {
        state.userData = {...action.payload};
    },
    logoutSucursalUser: (state) => {
        state.userData = { id:'', sucursalId:'', nombre:'', apellido:'', ci:'', imagen:'', contacto:'', direccion:'', permisos:'', activo:false };
    },
    getSucursalUsers: (state, action: PayloadAction<UserInterface[]>) => {
        state.users = [...action.payload]
    },
    selectSucursalUser: (state, action: PayloadAction<UserLoginInterface>) => {
        state.userSelected= action.payload;
    }
  }
});

export const {
    loginSucursal,
    logoutSucursal,
    loginSucursalUser,
    logoutSucursalUser,
    getSucursalUsers,
    selectSucursalUser,
} = SucursalSlice.actions

export default SucursalSlice.reducer