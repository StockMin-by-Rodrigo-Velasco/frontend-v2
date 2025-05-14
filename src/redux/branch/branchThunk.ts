import axios, { AxiosResponse } from "axios";
import { AppDispatch, RootState } from '../store';
import api from "../../api/config";
import { CreateUserDto, ToggleUserPermissionDto, LoginBranchDto, LoginUserDto, Permission, Branch, UpdateUserDto, User, LoginSuperUserDto, GetLogsDto, Log } from "../../interfaces";
import { hideNotification, showNotificationError, showNotificationSuccess } from "../notification/notificationSlice";
import { createUser, getPermissions, getUsers, loginBranch, loginUser, logoutBranch, logoutUser, updateUser } from "./branchSlice";
import { finishLoadingAplication, finishLoadingData, finishLoadingModule, startLoadingAplication, startLoadingData, startLoadingModule } from "../aplication/aplicationSlice";
import Cookie from 'js-cookie';
import { NavigateFunction } from "react-router";
import { getProductLogs } from "../products/productSlice";
import { getLogsWarehouse } from "../warehouses/warehousesSlice";

export const loginBranchAPI = (
    loginBranchDto: LoginBranchDto,
    navigate: (path: string) => void,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());
            const res: AxiosResponse = await api.post('branch/login-branch', loginBranchDto);
            dispatch(finishLoadingData());
            const { token, data }: { data: Branch, token: string } = res.data;

            Cookie.set('token', token, { path: '/' });
            dispatch(loginBranch(data));
            dispatch(finishLoadingData());
            navigate('/list-users');
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'INICIO DE SESION', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const getBranchModuleDataAPI = (navigate: (path: string) => void) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {id: branchId, userData} = getState().Branch;
        let bId = branchId;
        
        try {
            dispatch(startLoadingAplication());
            //* 1. Verificar token de SUCURSAL
            const token = Cookie.get('token');
            if (token) {
                if(branchId === ''){
                    const res: AxiosResponse = await api.get('branch/verify-branch-token', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const { data: branchData, token: newToken }: { data: Branch, token: string } = res.data;
                    bId = branchData.id;
                    Cookie.set('token', newToken, { path: '/' });
                    dispatch(loginBranch(branchData));
                }

                //* 2. Verificar token de USUARIO
                const userToken = Cookie.get('userToken');
                if (userToken || userData.id === branchId) {
                    if(userData.id === ''){
                        const res: AxiosResponse = await api.get('user/verify-user-token', {
                            headers: { Authorization: `Bearer ${userToken}` }
                        });
                        const { data }: { data: {userData:User, token: string} } = res.data;
                        Cookie.set('userToken', data.token, { path: '/' });
                        dispatch(loginUser(data.userData));
                    }

                    //* 3. Traer lista de PERMISOS
                    const resPermisisons: AxiosResponse = await api.get(`permissions/get-permissions`);
                    const { data: permissions }: { data: Permission[] } = resPermisisons.data;
                    dispatch(getPermissions(permissions));

                    //* 4. Traer lista de USUARIOS
                    const resUsers: AxiosResponse = await api.get(`user/get-users/${bId}`)
                    const { data:users }: { data: User[] } = resUsers.data;
                    dispatch(getUsers(users));

                    dispatch(finishLoadingAplication());
                    navigate('/main');
                } else {

                    dispatch(finishLoadingAplication());
                    navigate('/list-users');
                }
            } else {
                dispatch(finishLoadingAplication());
                navigate('/');
            }
        } catch (error) {
            dispatch(finishLoadingAplication());
        }
    }
}

export const getUsersModuleDataAPI = (
    branchId: string
) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingModule());
            //* 1. Traer lista de PERMISOS
            const resPermisisons: AxiosResponse = await api.get(`permissions/get-permissions`);
            const { data: permissions }: { data: Permission[] } = resPermisisons.data;
            dispatch(getPermissions(permissions));

            //* 2. Traer lista de USUARIOS
            const resUsers: AxiosResponse = await api.get(`user/get-users/${branchId}`)
            const { data }: { data: User[] } = resUsers.data;
            dispatch(getUsers(data));
            dispatch(finishLoadingModule());
        } catch (error) {
            console.log(error)
            dispatch(finishLoadingModule());
        }
    }
}

export const logoutBranchAPI = () => {
    return async (dispatch: AppDispatch) => {
        Cookie.remove('token');
        dispatch(logoutBranch());
    }
}

export const loginUserAPI = (
    loginUserDto: LoginUserDto,
    navigate: (path: string) => void
) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());
            const res: AxiosResponse = await api.post('user/login-user', loginUserDto)
            const {data}:{data:{userData:User, token:string}} = res.data;
            Cookie.set('userToken', data.token, { path: '/' });
            dispatch(loginUser(data.userData));
            dispatch(finishLoadingData());
            navigate('/main');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'INICIO DE SESION', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const loginSuperUserAPI = (
    loginSuperUserDto: LoginSuperUserDto,
    navigate: (path: string) => void
) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());
            const res: AxiosResponse = await api.post('branch/login-super-user', loginSuperUserDto)
            const { data }: { data: User } = res.data;
            dispatch(loginUser(data));
            console.log()
            dispatch(finishLoadingData());
            navigate('/main');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'INICIO DE SESION', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const logoutUserAPI = (navigate: NavigateFunction) => {
    return async (dispatch: AppDispatch) => {
        Cookie.remove('userToken');
        dispatch(logoutUser());
        navigate('/list-users');
    }
}

export const updateUserAPI = (
    updateUserDto: UpdateUserDto,
    rePassword?: string,
    functionReturn?: (user: User) => void,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            if (updateUserDto.password && updateUserDto.oldPassword && updateUserDto.password !== '') {
                if (updateUserDto.password !== rePassword) {
                    dispatch(showNotificationError({ tittle: 'Actualizacion de perfil', description: 'Error al confirmar la nueva contraseña, verifica que ambas coincidan' }));
                    setTimeout(() => dispatch(hideNotification()), 5000);
                    return;
                }
            }
            dispatch(startLoadingData());
            const res: AxiosResponse = await api.post('user/update-user', updateUserDto);
            const { data, message }: { data: User, message: string } = res.data;

            if (functionReturn) functionReturn(data);

            dispatch(updateUser(data));
            dispatch(finishLoadingData());
            dispatch(showNotificationSuccess({ tittle: 'Modificación de datos', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'Modificación de datos', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const handlePermisoToUserAPI = (
    permission: ToggleUserPermissionDto,
    functionReturn?: (user: User) => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Branch;
        if (!sucursalId) return;
        try {
            dispatch(startLoadingData())
            const res: AxiosResponse = await api.post('permissions/toggle-permission-user', permission);
            const { data, message }: { data: User, message: string } = res.data;
            if (functionReturn) functionReturn(data);
            dispatch(updateUser(data));

            dispatch(finishLoadingData());
            dispatch(showNotificationSuccess({ tittle: 'Modificación de permisos', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'Modificación de permisos', description: data?.message || 'Error en servidor' }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const createUserAPI = (
    createUserDto: CreateUserDto,
    functionReturn?: (data: User) => void,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());
            const res: AxiosResponse = await api.post('user/create-user', createUserDto);
            const { data, message }: { data: User, message: string } = res.data;
            dispatch(createUser(data));
            
            dispatch(finishLoadingData());
            if (functionReturn) functionReturn(data);
            dispatch(showNotificationSuccess({ tittle: 'Registro de usuario', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'Registro de usuario', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const getUsersAPI = (
    branchId: string,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingModule());
            const res: AxiosResponse = await api.get(`user/get-users/${branchId}`)
            const { data }: { data: User[] } = res.data;
            dispatch(finishLoadingModule());
            dispatch(getUsers(data));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'USUARIOS', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingModule());
        }
    }
}

export const getPermissionsAPI = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingModule());
            const res: AxiosResponse = await api.get(`permissions/get-permissions`);
            const { data }: { data: Permission[] } = res.data;
            dispatch(finishLoadingModule());
            dispatch(getPermissions(data));
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingModule());
        }
    }
}

export const getLogsAPI = (getLogsDto: GetLogsDto) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());

            const response: AxiosResponse = await api.post(`log/get-logs`, getLogsDto);
            const {data}:{data:Log[]} = response.data;
            if(getLogsDto.module === 'products') dispatch(getProductLogs(data));
            if(getLogsDto.module === 'warehouses') dispatch(getLogsWarehouse(data));

            dispatch(finishLoadingData());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingData());
        }
    }
}