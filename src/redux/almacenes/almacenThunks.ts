import axios, { AxiosResponse } from 'axios';
import { AppDispatch, RootState } from '../store';
import api from '../../api/config';
import { createAlmacen, getAllAlmacenes } from './almacenesSlice';
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from '../aplication/aplicationSlice';
import { hideNotification, showNotificationError, showNotificationSuccess } from '../notification/notificationSlice';

interface CreateAlmacenInterface{
    nombre: string;
    descripcion: string;
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

            dispatch(showNotificationSuccess({tittle: 'CREACIÓN DE ALMACEN', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'CREACIÓN DE ALMACEN', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}