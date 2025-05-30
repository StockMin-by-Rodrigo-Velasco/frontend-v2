import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';
import { Permission, Branch, User, initialBranch, initialUser } from '../../interfaces';

interface BranchState{
    id: string;
    data: Branch;
    userData: User,
    users: User[];
    permissions: Permission[];
    logo: string;
}

const initialState: BranchState = {
    id: '',
    data: initialBranch,
    userData: initialUser,
    users:[],
    permissions:[],
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
        state.users =[];
        state.logo = '';

        Cookie.remove('token');
    },
    getUsers: (state, action: PayloadAction<User[]>) => {
        state.users = [...action.payload]
    },
    loginUser: (state, action: PayloadAction<User>) => {
        state.userData = {...action.payload};
    },
    logoutUser: (state) => {
        state.userData = initialState.userData;
    },
    createUser: (state, action: PayloadAction<User>) => {
        state.users = [action.payload, ...state.users];
    },
    updateUser: (state, action: PayloadAction<User>) => {
        if( action.payload.id === state.userData.id ) state.userData = {...state.userData,...action.payload};
        const newListUsers = current(state.users).map(u => (u.id !== action.payload.id)? u:action.payload);
        state.users = newListUsers;
    },
    getPermissions: (state, action: PayloadAction<Permission[]>) => {
        state.permissions = action.payload;
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