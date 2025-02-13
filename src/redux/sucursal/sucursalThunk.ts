import axios, { AxiosResponse } from "axios";
import { AppDispatch, RootState } from "../store"
import api from "../../api/config";
import { LoginSucursalInterface, LoginSucursalUserInterface, UpdateSucursalUserInterface } from "../../interface";
import { hideNotification, showNotificationError, showNotificationSuccess } from "../notification/notificationSlice";
import { getSucursalUsers, loginSucursal, loginSucursalUser, logoutSucursal, logoutSucursalUser, updateSucursalUser } from "./sucursalSlice";
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from "../aplication/aplicationSlice";
import Cookie from 'js-cookie';

export const loginSucursalAPI = ( data: LoginSucursalInterface, navigate: (path: string)=>void ) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());
            const res: AxiosResponse = await api.post('sucursal-ms/login-sucursal', data )
            const {token} = res.data;

            Cookie.set( 'token', token, {path:'/'} )

            dispatch(loginSucursal( {...res.data} ));
            dispatch(finishLoadingData());
            navigate('/login-user');
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'INICIO DE SESION', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

export const logoutSucursalAPI = () => {
    return async (dispatch: AppDispatch) => {
        Cookie.remove('token');
        dispatch( logoutSucursal() );
    }
}

export const loginSucursalUserAPI = (data: LoginSucursalUserInterface, navigate: (path: string) => void) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());
            const res: AxiosResponse = await api.post('sucursal-ms/login-sucursal-user', data )
            const {token} = res.data;

            Cookie.set( 'userToken', token, {path:'/'} );

            const {data: userData} = res.data;
            dispatch(loginSucursalUser({...userData}));
            dispatch(finishLoadingData());
            navigate('/main');
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'INICIO DE SESION', description: data.message}));
                dispatch(finishLoadingData());

                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

export const logoutSucursalUserAPI = () => {
    return async (dispatch: AppDispatch) => {
        Cookie.remove('userToken');
        dispatch( logoutSucursalUser() );
    }
}

export const updateSucursalUserAPI = (dataUpdate: UpdateSucursalUserInterface) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());

            if(dataUpdate.password && dataUpdate.oldPassword && dataUpdate.rePassword && dataUpdate.password !==''){
                if(dataUpdate.password !== dataUpdate.rePassword){
                    dispatch(showNotificationError({tittle: 'Actualizacion de perfil', description:'Error al confirmar la nueva contraseña, verifica que ambas coincidan'}));
                    setTimeout( () => dispatch(hideNotification()), 5000 );
                    dispatch(finishLoadingData());
                    return;
                }         
            }

            const {rePassword, ...newData} = dataUpdate;
            const res: AxiosResponse = await api.post('sucursal-ms/update-sucursal-user', newData );
            const {message, data} = res.data;

            if (data) dispatch(updateSucursalUser({...data}));
            dispatch(showNotificationSuccess({tittle: 'Actualizacion de perfil', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());            
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'Actualizacion de perfil', description: data.message}));
                dispatch(finishLoadingData());

                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);            
        }
    }
}

export const getSucursalUsersAPI = ( sucursalId: string ) => {
    return async ( dispatch: AppDispatch ) => {
        try {
            const res: AxiosResponse = await api.get(`sucursal-ms/get-sucursal-users/${sucursalId}`)
            const {users} = res.data;
            dispatch(getSucursalUsers([...users]));        
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'USUARIOS', description: data.message}));
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);            
        }
    }
}

export const verifyTokenSucursalByCookieAPI = ( navigate: (path:string) => void ) => {
    return async ( dispatch: AppDispatch ) => {
        try {
            dispatch(startLoadingAplication());
            const token = Cookie.get('token');

            if(token){
                const res:AxiosResponse = await api.get('sucursal-ms/verify-token-sucursal', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                const { token: newToken, ...data } = res.data;
                dispatch(loginSucursal( {...data} ));
                Cookie.set('token', token, {path:'/'});
                navigate('/login-user');
            }
            dispatch(finishLoadingAplication());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                console.log(data)
            }else console.log(error);  
            dispatch(finishLoadingAplication());
        }
    }
}

export const verifyTokenSucursalUsersByCookieAPI = ( navigate: (path:string) => void ) => {
    return async ( dispatch: AppDispatch ) => {
        try {
            dispatch(startLoadingAplication());
            const token = Cookie.get('token');

            if(token){
                const res:AxiosResponse = await api.get('sucursal-ms/verify-token-sucursal', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                const { token: newToken, ...data } = res.data;
                dispatch(loginSucursal( {...data} ));
                Cookie.set('token', token, {path:'/'});
                dispatch(getSucursalUsersAPI(data.id));
            }else navigate('/');
            dispatch(finishLoadingAplication());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                console.log(data)
            }else console.log(error);  
            dispatch(finishLoadingAplication());
            navigate('/')
        }
    }
}

export const verifyTokenSucursalUserByCookieAPI = ( navigate: (path:string) => void ) => {
    return async ( dispatch: AppDispatch, getState: () => RootState) => {
        try {
            dispatch(startLoadingAplication());
            const {id: sucursalId} = getState().Sucursal;

            //1. Verificar los datos de la sucursal
            if(sucursalId === ''){
                const token = Cookie.get('token');
                if(!token){
                    navigate('/');
                    return;
                }else{
                    const res:AxiosResponse = await api.get('sucursal-ms/verify-token-sucursal', {
                        headers: {Authorization: `Bearer ${token}`}
                    });
                    const { token: newToken, ...data } = res.data;
                    dispatch(loginSucursal( {...data} ));
                    Cookie.set('token', token, {path:'/'});
                    dispatch(getSucursalUsersAPI(data.id));
                }
            }

            //2. Verificar los datos del usuario
            const userToken = Cookie.get('userToken');
            if(userToken){
                const res:AxiosResponse = await api.get('sucursal-ms/verify-token-sucursal-user', {
                    headers: {Authorization: `Bearer ${userToken}`}
                });
                const {data} = res.data;
                dispatch(loginSucursalUser( {...data} ));
            }else navigate('/login-user');
            dispatch(finishLoadingAplication());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                console.log(data)
            }else console.log(error);  
            dispatch(finishLoadingAplication());
            navigate('/login-user');
        }
    }
}