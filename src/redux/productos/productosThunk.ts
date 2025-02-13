import axios, { AxiosResponse } from "axios";
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from "../aplication/aplicationSlice";
import { AppDispatch, RootState } from "../store";
import api from "../../api/config";
import { deleteProducto, getAllCategorias, getAllMarcas, getAllProductos, updateProducto } from "./productosSlice";
import { hideNotification, showNotificationError, showNotificationSuccess } from "../notification/notificationSlice";

interface UpdateProductoInterface {
    id: string;
    codigo?: string;
    nombre?: string;
    descripcion?: string;
    categoriaId?: string;
    marcaId?: string;
    unidadMedidaId?: string;
}

export const getAllProductosAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Sucursal;
        if (!id) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.get(`productos-ms/get-all-productos/${id}`);
            // console.log(response.data);
            dispatch(getAllProductos(response.data))
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}
export const createProductoAPI = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {

    }
}
export const deleteProductoAPI = (id: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {id: sucursalId, userData} = getState().Sucursal;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.delete('productos-ms/delete-producto', 
                {
                    headers: {"X-User-Id": userData.id},
                    params: {id, sucursalId}
                }
            );
            const {data, message} = response.data;
            dispatch(deleteProducto(data.id));
            dispatch(showNotificationSuccess({tittle: 'ELIMINACIÓN DE PRODUCTO', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'ELIMINACIÓN DE PRODUCTO', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}
export const updateProductoAPI = (updateData: UpdateProductoInterface) => {
    return async(dispatch: AppDispatch, getState: () => RootState) => {
        const {id, userData} = getState().Sucursal;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('productos-ms/update-producto', 
                {sucursalId:id,...updateData},
                {
                    headers: {"X-User-Id": userData.id}
                }
            
            );
            const {data, message} = response.data;
            dispatch(updateProducto(data));
            dispatch(showNotificationSuccess({tittle: 'PRODUCTO ACTUALIZADO', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'ACTUALIZACIÓN DE PRODUCTO', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }

    }
}
export const getAllMarcasAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Sucursal;
        if (!id) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.get(`productos-ms/get-all-marcas/${id}`);
            dispatch(getAllMarcas(response.data))
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}
export const createMarcaAPI = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {

    }
}
export const deleteMarcaAPI = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {

    }
}
export const updateMarcaAPI = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {

    }
}
export const getAllCategoriasAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Sucursal;
        if (!id) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.get(`productos-ms/get-all-categorias/${id}`);
            dispatch(getAllCategorias(response.data));
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}
export const createCategoriaAPI = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {

    }
}
export const deleteCategoriaAPI = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {

    }
}
export const updateCategoriaAPI = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {

    }
}