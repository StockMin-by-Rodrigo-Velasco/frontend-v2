import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';
import { Permission, Branch, User } from '../../interfaces';

interface BranchState{
    id: string;
    data: Branch;
    userData: User,
    listUsers: User[];
    listUsersObj: Record<string, User>;
    listPermissions: Permission[];
    listPermissionsObj: Record<string, Permission> ;
    logo: string;
}

const initialState: BranchState = {
    id: '',
    data: {id:'', nit:'', code: '', name:'', owner:'', address:'', contact: '', adminPassword:'',logo:'',password:'',deleted:false, createdAt:'', updatedAt:''},
    userData: { id:'', branchId:'', name:'', lastName:'', ci:'', profile:'', contact:'', address:'', password:'', UserPermission:[], deleted:false },
    listUsers:[],
    listUsersObj:{},
    listPermissions:[],
    listPermissionsObj:{},
    logo: '',
}

const BranchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    loginBranch: (state, action: PayloadAction<Branch>) => {
        state.id = action.payload.id
        state.data = action.payload;
        state.logo = action.payload.logo;
    },
    logoutBranch: (state) => {
        state.id = '';
        state.data = initialState.data;
        state.listUsers =[];
        state.logo = '';

        Cookie.remove('token');
    },
    getUsers: (state, action: PayloadAction<User[]>) => {
        state.listUsers = [...action.payload]
        state.listUsersObj = action.payload.reduce((acc, a) => {acc[a.id] = a; return acc}, {} as Record<string, User>);
    },
    loginUser: (state, action: PayloadAction<User>) => {
        state.userData = {...action.payload};
    },
    logoutUser: (state) => {
        state.userData = initialState.userData;
    },
    createUser: (state, action: PayloadAction<User>) => {
        state.listUsers = [action.payload, ...state.listUsers];
        state.listUsersObj[action.payload.id] = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
        if( action.payload.id === state.userData.id ) state.userData = {...state.userData,...action.payload};
        const newListUsers = current(state.listUsers).map(u => (u.id !== action.payload.id)? u:action.payload);
        state.listUsers = newListUsers;
        state.listUsersObj[action.payload.id] = action.payload;
    },
    getPermissions: (state, action: PayloadAction<Permission[]>) => {
        state.listPermissions = action.payload;
        state.listPermissionsObj = action.payload.reduce((acc, a) => {acc[a.id] = a; return acc}, {} as Record<string, Permission>);
    },
  }
});

export const {
    loginBranch,
    logoutBranch,

    getPermissions,

    loginUser,
    logoutUser,
    createUser,
    updateUser,
    getUsers,
} = BranchSlice.actions

export default BranchSlice.reducer