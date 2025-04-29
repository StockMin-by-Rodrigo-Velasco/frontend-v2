import axios, { AxiosResponse } from "axios";
import { AppDispatch, RootState } from '../store';
import api from "../../api/config";
import { CreateUserDto, HandlePermissionUserDto, LoginBranchDto, LoginUserDto, Permission, Branch, UpdateUserDto, User, LoginSuperUserDto } from "../../interface";
import { hideNotification, showNotificationError, showNotificationSuccess } from "../notification/notificationSlice";
import { createUser, getPermissions, getUsers, loginBranch, loginUser, logoutBranch, logoutUser, updateUser } from "./branchSlice";
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from "../aplication/aplicationSlice";
import Cookie from 'js-cookie';
import { NavigateFunction } from "react-router";

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
            navigate('/list-users');
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'INICIO DE SESION', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
        }
    }
}

export const verifyTokens = (
    navigate: (path: string) => void,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            const token = Cookie.get('token');
            if (token) {
                dispatch(startLoadingAplication());
                const res: AxiosResponse = await api.get('branch/verify-branch-token', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { data, token: newToken }: { data: Branch, token: string } = res.data;
                Cookie.set('token', newToken, { path: '/' });
                dispatch(loginBranch(data));

                const userToken = Cookie.get('userToken');
                if (userToken) {
                    const res: AxiosResponse = await api.get('branch/verify-user-token', {
                        headers: { Authorization: `Bearer ${userToken}` }
                    });
                    const { data }: { data: User } = res.data;
                    dispatch(loginUser(data));
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

export const logoutBranchAPI = () => {
    return async (dispatch: AppDispatch) => {
        Cookie.remove('token');
        dispatch(logoutBranch());
    }
}

export const loginUserAPI = (
    data: LoginUserDto,
    navigate: (path: string) => void
) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());
            const res: AxiosResponse = await api.post('user/login-user', data)
            const { token } = res.data;
            Cookie.set('userToken', token, { path: '/' });
            const usuario: User = res.data.data;
            dispatch(loginUser(usuario));
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
            const {data}: {data: User} = res.data;
            dispatch(loginUser(data));
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
            const res: AxiosResponse = await api.post('user/update-user', updateUserDto);
            const { data, message }: { data: User, message: string } = res.data;

            if (functionReturn) functionReturn(data);

            dispatch(updateUser(data));
            dispatch(showNotificationSuccess({ tittle: 'Modificación de datos', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'Modificación de datos', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
        }
    }
}

export const handlePermisoToUserAPI = (
    permission: HandlePermissionUserDto,
    functionReturn?: (user: User) => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Branch;
        if (!sucursalId) return;
        try {
            const res: AxiosResponse = await api.post('branch/handle-permission-user', permission);
            const { data, message }: { data: User, message: string } = res.data;
            if (functionReturn) functionReturn(data);
            dispatch(updateUser(data));
            dispatch(showNotificationSuccess({ tittle: 'Modificación de permisos', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'Modificación de permisos', description: data?.message || 'Error en servidor' }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
        }
    }
}

export const createUserAPI = (
    createUserDto: CreateUserDto,
    functionReturn?: (data: User) => void,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res: AxiosResponse = await api.post('user/create-user', createUserDto);
            const { data, message }: { data: User, message: string } = res.data;

            dispatch(createUser(data));
            if (functionReturn) functionReturn(data);

            dispatch(showNotificationSuccess({ tittle: 'Registro de usuario', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'Registro de usuario', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
        }
    }
}

export const getUsersAPI = (
    branchId: string,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res: AxiosResponse = await api.get(`user/get-users/${branchId}`)
            const {data}:{data:User[]} = res.data;
            dispatch(getUsers(data));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'USUARIOS', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
        }
    }
}

export const getPermissionsAPI = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const res: AxiosResponse = await api.get(`permissions/get-permissions`)
            const {data}: {data: Permission[] }= res.data;
            dispatch(getPermissions(data));
        } catch (error) {
            console.log(error);
        }
    }
}

// export const getOneSucursalUserAPI = (
//     userId: string,
// ) => {
//     return async (dispatch: AppDispatch) => {
//         try {
//             const res: AxiosResponse = await api.get(`sucursal-ms/get-one-sucursal-user/${userId}`)
//             const user = res.data;
//             dispatch(getOneUser(user));

//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'USUARIO', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }



// export const verifyTokenSucursalUsersByCookieAPI = (
//     navigate: (path: string) => void,
// ) => {
//     return async (dispatch: AppDispatch, getState:()=>RootState) => {
//         const {id:sucursalId, userData} = getState().Sucursal;

//         try {
//             const token = Cookie.get('token');
//             if (token && sucursalId === '') {
//                 const res: AxiosResponse = await api.get('sucursal-ms/verify-token-sucursal', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 const { token: newToken, ...data } = res.data;
//                 dispatch(loginSucursal({ ...data }));
//                 Cookie.set('token', token, { path: '/' });
//                 dispatch(getSucursalUsersAPI(data.id));
//             }
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 console.log(data)
//             } else console.log(error);
//             navigate('/');
//         }
//     }
// }

// export const verifyTokenSucursalUserByCookieAPI = (
//     navigate: (path: string) => void,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const { id: sucursalId } = getState().Branch;
//             //1. Verificar los datos de la sucursal
//             if (sucursalId === '') {
//                 const token = Cookie.get('token');
//                 if (!token) {
//                     navigate('/');
//                     return;
//                 } else {
//                     const res: AxiosResponse = await api.get('sucursal-ms/verify-token-sucursal', {
//                         headers: { Authorization: `Bearer ${token}` }
//                     });
//                     const { token: newToken, ...data } = res.data;
//                     dispatch(loginBranch({ ...data }));
//                     Cookie.set('token', token, { path: '/' });
//                     dispatch(getUsersAPI(data.id));
//                 }
//             }
//             //2. Verificar los datos del usuario
//             const userToken = Cookie.get('userToken');
//             if (userToken) {
//                 const res: AxiosResponse = await api.get('sucursal-ms/verify-token-sucursal-user', {
//                     headers: { Authorization: `Bearer ${userToken}` }
//                 });
//                 const { data }: { data: User } = res.data;

//                 if (data.id === data.sucursalId) { // Iniciar como super usuario
//                     const { listPermissions: listaPermisos } = getState().Branch;
//                     const superPermisos: UserPermission[] = listaPermisos.map(p => ({ id: p.id, userId: data.id, permisoId: p.id }));
//                     dispatch(loginUser({ ...data, UsuarioPermiso: superPermisos }));
//                     navigate('/main');
//                 } else {
//                     dispatch(loginUser(data));
//                     navigate('/main');
//                 }
//                 // console.log('UserData', data);
//                 // dispatch(loginSucursalUser(data));
//                 // navigate('/main');
//             } else navigate('/login-user');

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             console.log(error);
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 console.log(data)
//             } else console.log(error);
//             navigate('/login-user');

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }