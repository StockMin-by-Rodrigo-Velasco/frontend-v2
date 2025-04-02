import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';
import { Permiso, Sucursal, User } from '../../interface';

interface UserLoginInterface{
    id: string;
    sucursalId: string;
}

interface SucursalStateInterface{
    id: string;
    data: Sucursal;
    userData: User,
    logUserData: User;
    listUsers: User[];
    listUsersObj: Record<string, User>;
    listaPermisos: Permiso[];
    listaPermisosObj: Record<string, Permiso> ;
    userSelected: UserLoginInterface;
    logo: string;
}

const initialState: SucursalStateInterface = {
    id: '',
    data: {id:'', nit:'', nombre:'', propietario:'', direccion:'', contacto: '', adminPassword:'',logo:'',password:'',deleted:false},
    userData: { id:'', sucursalId:'', nombre:'', apellido:'', ci:'', imagen:'', contacto:'', direccion:'', password:'', UsuarioPermiso:[], deleted:false },
    logUserData: {id:'', sucursalId:'', nombre:'', apellido:'', ci:'', imagen:'', contacto:'', direccion:'', password:'', UsuarioPermiso:[], deleted:false,},
    listUsers:[],
    listUsersObj:{},
    listaPermisos:[],
    listaPermisosObj:{},
    userSelected: {id: '', sucursalId: ''},
    logo: '',
}

const SucursalSlice = createSlice({
  name: 'sucursal',
  initialState,
  reducers: {
    loginSucursal: (state, action: PayloadAction<Sucursal>) => {
        state.id = action.payload.id
        state.data = action.payload;
        state.logo = action.payload.logo;
    },
    logoutSucursal: (state) => {
        state.id = '';
        state.data = initialState.data;
        state.listUsers =[];
        state.userSelected = {id: '', sucursalId: ''};
        state.logo = '';

        Cookie.remove('token');
    },
    loginSucursalUser: (state, action: PayloadAction<User>) => {
        state.userData = {...action.payload};
    },
    updateSucursalUser: (state, action: PayloadAction<User>) => {
        if( action.payload.id === state.userData.id ) state.userData = {...state.userData,...action.payload};
        const newListUsers = current(state.listUsers).map(u => (u.id !== action.payload.id)? u:action.payload);
        state.listUsers = newListUsers;
        state.listUsersObj[action.payload.id] = action.payload;
    },
    logoutSucursalUser: (state) => {
        state.userData = initialState.userData;
    },
    getSucursalUsers: (state, action: PayloadAction<User[]>) => {
        state.listUsers = [...action.payload]
        state.listUsersObj = action.payload.reduce((acc, a) => {acc[a.id] = a; return acc}, {} as Record<string, User>);
    },
    getAllPermisos: (state, action: PayloadAction<Permiso[]>) => {
        state.listaPermisos = action.payload;
        state.listaPermisosObj = action.payload.reduce((acc, a) => {acc[a.id] = a; return acc}, {} as Record<string, Permiso>);
    },
    getOneSucursalUser: (state, action: PayloadAction<User>) => {
        state.logUserData = action.payload;
    },
    selectSucursalUser: (state, action: PayloadAction<UserLoginInterface>) => {
        state.userSelected= action.payload;
    },
    createSucursalUser: (state, action: PayloadAction<User>) => {
        state.listUsers = [action.payload, ...state.listUsers];
        state.listUsersObj[action.payload.id] = action.payload;
    }
  }
});

export const {
    loginSucursal,
    logoutSucursal,

    getAllPermisos,

    loginSucursalUser,
    logoutSucursalUser,

    createSucursalUser,
    updateSucursalUser,

    getSucursalUsers,
    getOneSucursalUser,
    selectSucursalUser,
} = SucursalSlice.actions

export default SucursalSlice.reducer