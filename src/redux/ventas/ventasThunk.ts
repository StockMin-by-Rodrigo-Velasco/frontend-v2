import axios, { AxiosResponse } from "axios";
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from "../aplication/aplicationSlice";
import { AppDispatch, RootState } from "../store";
import { createClienteVenta, getAllClientesVenta, getLogsAlmacenes, updateClienteVenta } from "./ventasSlice";
import api from "../../api/config";
import { ClienteVenta, CreateClienteVentaDto, UpdateClienteVentaDto } from "../../interface";
import { hideNotification, showNotificationError, showNotificationSuccess } from "../notification/notificationSlice";


export const getAllClientesVentaAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Sucursal;
        if (!id) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.get(`ventas-ms/get-all-clientes-venta/${id}`);
            dispatch(getAllClientesVenta(response.data))
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}

export const createClienteVentaAPI = (createClienteVentaDto:CreateClienteVentaDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Sucursal;
        if(!createClienteVentaDto.sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('ventas-ms/create-cliente-venta', 
                createClienteVentaDto,{headers: {"X-User-Id": userData.id}}
            );
            const {data, message}: {data: ClienteVenta, message: string} = response.data;
            dispatch(createClienteVenta(data));
            dispatch(showNotificationSuccess({tittle: 'REGISTRO DE CLIENTE', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
            
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'REGISTRO DE CLIENTE', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

export const updateClienteVentaAPI = (updateClienteVentaDto:UpdateClienteVentaDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Sucursal;
        if(!updateClienteVentaDto.sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('ventas-ms/update-cliente-venta', 
                updateClienteVentaDto,{headers: {"X-User-Id": userData.id}}
            );
            const {data, message}: {data: ClienteVenta, message: string} = response.data;
            dispatch(updateClienteVenta(data));
            dispatch(showNotificationSuccess({tittle: 'MODIFICACIÓN DE CLIENTE', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
            
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'MODIFICACIÓN DE CLIENTE', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}



export const getLogsVentasAPI = (desde: string, hasta: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Sucursal;
        if (!sucursalId) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.post(`ventas-ms/get-logs`, {sucursalId, desde, hasta});
            dispatch(getLogsAlmacenes(response.data))
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}