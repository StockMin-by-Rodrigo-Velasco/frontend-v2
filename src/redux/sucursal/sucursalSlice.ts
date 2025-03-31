import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';
import { User } from '../../interface';


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

interface UserLoginInterface{
    id: string;
    sucursalId: string;
}

interface SucursalStateInterface{
    id: string;
    data: SucursalDataInterface;
    userData: UserDataInterface,
    logUserData: User;
    listUsers: User[];
    listUsersObj: Record<string, User>;
    userSelected: UserLoginInterface;
    logo: string;
}

const initialState: SucursalStateInterface = {
    id: '',
    data: {nit:'', nombre:'', propietario:'', direccion:'', contacto: '', activo: false},
    userData: { id:'', sucursalId:'', nombre:'', apellido:'', ci:'', imagen:'', contacto:'', direccion:'', permisos:'', activo:false },
    logUserData: {id:'', sucursalId:'', nombre:'', apellido:'', ci:'', imagen:''},
    listUsers:[],
    listUsersObj:{},
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
        state.listUsers =[];
        state.userSelected = {id: '', sucursalId: ''};
        state.logo = '';

        Cookie.remove('token');
    },
    loginSucursalUser: (state, action: PayloadAction<UserDataInterface>) => {
        state.userData = {...action.payload};
    },
    updateSucursalUser: (state, action: PayloadAction<UserDataInterface>) => {
        state.userData = {...state.userData,...action.payload};
    },
    logoutSucursalUser: (state) => {
        state.userData = { id:'', sucursalId:'', nombre:'', apellido:'', ci:'', imagen:'', contacto:'', direccion:'', permisos:'', activo:false };
    },
    getSucursalUsers: (state, action: PayloadAction<User[]>) => {
        state.listUsers = [...action.payload]
        state.listUsersObj = action.payload.reduce((acc, a) => {acc[a.id] = a; return acc}, {} as Record<string, User>);
    },
    getOneSucursalUser: (state, action: PayloadAction<User>) => {
        state.logUserData = action.payload;
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
    updateSucursalUser,
    getSucursalUsers,
    getOneSucursalUser,
    selectSucursalUser,
} = SucursalSlice.actions

export default SucursalSlice.reducer