import axios, { AxiosResponse } from 'axios';
import { AppDispatch, RootState } from '../store';
import api from '../../api/config';
import { createAlmacen, getAllAlmacenes, getAllProductosAlmacen, updateAlmacen } from './almacenesSlice';
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from '../aplication/aplicationSlice';
import { hideNotification, showNotificationError, showNotificationSuccess } from '../notification/notificationSlice';
import { ProductoAlmacenDetalladoInterface, ProductoAlmacenInterface } from '../../interface';

interface ProductoInterface {
    id: string;
    sucursalId: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    activo: boolean;
    deleted: boolean;
    categoriaId: string;
    categoria?: string;
    marcaId: string;
    marca?:string;
    unidadMedidaId: string;
    unidadMedida?: string;
    unidadMedidaAbreviada?: string;
    createdAt: number;
    updatedAt: number;
}

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

export const getAllProductosAlmacenAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { selectedAlmacen } = getState().Almacenes;
        const { listaProductos } = getState().Productos;
        const listaProductosObj = listaProductos.reduce((acc, producto) => { acc[producto.id] = producto; return acc;
        }, {} as Record<string, ProductoInterface>);
        // console.log(listaProductosObj);

        if( !selectedAlmacen.id ) return;
        try {
            dispatch(startLoadingAplication());
            const responce: AxiosResponse = await api.get(`almacenes-ms/get-all-productos-almacen/${selectedAlmacen.id}`);
            const productosAlmacen: ProductoAlmacenInterface[] = responce.data.data;
            const productosAlmacenDetallado: ProductoAlmacenDetalladoInterface[] = productosAlmacen.map((p:ProductoAlmacenInterface) => (
                {
                    id: p.id,
                    almacenId: p.almacenId,
                    codigo: listaProductosObj[p.id].codigo,
                    nombre: listaProductosObj[p.id].nombre,
                    descripcion: listaProductosObj[p.id].descripcion,
                    imagen: listaProductosObj[p.id].imagen,
                    categoria: listaProductosObj[p.id].categoria,
                    marca: listaProductosObj[p.id].marca,
                    unidadMedida: listaProductosObj[p.id].unidadMedida,
                    unidadMedidaAbreviada: listaProductosObj[p.id].unidadMedidaAbreviada,
                    cantidad: p.cantidad,
                    cantidadMinima: p.cantidadMinima,
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt,
                })); 

            dispatch(getAllProductosAlmacen( productosAlmacenDetallado ));
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    };
}