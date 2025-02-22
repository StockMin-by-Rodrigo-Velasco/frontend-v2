import axios, { AxiosResponse } from 'axios';
import { AppDispatch, RootState } from '../store';
import api from '../../api/config';
import { createAlmacen, getAllAlmacenes, updateAlmacen } from './almacenesSlice';
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from '../aplication/aplicationSlice';
import { hideNotification, showNotificationError, showNotificationSuccess } from '../notification/notificationSlice';

interface CreateAlmacenInterface{
    nombre?: string;
    descripcion?: string;
}

interface UpdateCategoriaInterface extends CreateAlmacenInterface {
    id: string;
}


export const getAllAlmacenesAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Sucursal;
        if( !sucursalId ) return;
        try {
            dispatch(startLoadingAplication());
            const responce: AxiosResponse = await api.get(`almacenes-ms/get-all-almacenes/${sucursalId}`);
            // console.log(responce.data)
            dispatch(getAllAlmacenes(responce.data));
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    };
}

export const createAlmacenAPI = ( CreateAlmacen: CreateAlmacenInterface ) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        if( !sucursalId ) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('almacenes-ms/create-almacen', 
                {sucursalId, ...CreateAlmacen},{headers: {"X-User-Id": userData.id}}
            );
            const { data, message } = response.data;
            dispatch(createAlmacen(data));

            dispatch(showNotificationSuccess({tittle: 'CREACIÓN DE ALMACÉN', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'CREACIÓN DE ALMACÉN', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

export const updateAlmacenAPI = ( updateCategoriaInterface: UpdateCategoriaInterface ) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        if( !sucursalId ) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('almacenes-ms/update-almacen', 
                {sucursalId, ...updateCategoriaInterface},{headers: {"X-User-Id": userData.id}}
            );
            const { data, message } = response.data;
            dispatch(updateAlmacen(data));

            dispatch(showNotificationSuccess({tittle: 'MODIFICACIÓN DE ALMACÉN', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'MODIFICACIÓN DE ALMACÉN', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}