import axios, { AxiosResponse } from "axios";
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from "../aplication/aplicationSlice";
import { AppDispatch, RootState } from "../store";
import api from "../../api/config";
import { createCategoria, createMarca, createProducto, deleteCategoria, deleteMarca, deleteProducto, getAllCategorias, getAllLogs, getAllMarcas, getAllProductos, getAllUnidadesMedida, updateCategoria, updateMarca, updateProducto } from "./productosSlice";
import { hideNotification, showNotificationError, showNotificationSuccess, showNotificationWarning } from "../notification/notificationSlice";

interface UpdateProductoInterface {
    id: string;
    codigo?: string;
    nombre?: string;
    descripcion?: string;
    categoriaId?: string;
    marcaId?: string;
    unidadMedidaId?: string;
}
interface UpdateProductoImagenInterface {
    id: string;
    imagenUrl: string;
    imagen: File|undefined
}
interface CreateProductoInterface {
    codigo: string;
    nombre: string;
    descripcion?: string;
    categoriaId: string;
    marcaId: string;
    unidadMedidaId: string;
}

interface CreateMarcaInterface{
    nombre: string,
    origen?: string
}
interface UpdateMarcaInterface extends CreateMarcaInterface{
    id: string
}
interface CreateCategoriaInterface{
    nombre: string,
    detalle?: string
}
interface UpdateCategoriaInterface extends CreateCategoriaInterface{
    id: string
}

export const getAllProductosAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Sucursal;
        if (!id) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.get(`productos-ms/get-all-productos/${id}`);
            dispatch(getAllProductos(response.data))
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}
export const createProductoAPI = (data: CreateProductoInterface, file: File|undefined) => {
    return async(dispatch: AppDispatch, getState: () => RootState) => {
        const {id: sucursalId, userData} = getState().Sucursal;
        if(!sucursalId) return;
        const newProducto = new FormData();
        newProducto.append('sucursalId', sucursalId);
        newProducto.append('codigo', data.codigo);
        newProducto.append('nombre', data.nombre);
        newProducto.append('descripcion', data.descripcion as string);
        newProducto.append('categoriaId', data.categoriaId);
        newProducto.append('marcaId', data.marcaId);
        newProducto.append('unidadMedidaId', data.unidadMedidaId);

        if(file) newProducto.append('imagen', file);

        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('productos-ms/create-producto', 
                newProducto,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-User-Id": userData.id
                    }
                }
            
            );
            const {data, message} = response.data;
            dispatch(createProducto(data));
            dispatch(showNotificationSuccess({tittle: 'PRODUCTO CREADO', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
            
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'CREACIÓN DE PRODUCTO', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
        
    }
}
export const deleteProductoAPI = (id: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {id: sucursalId, userData} = getState().Sucursal;
        if(!sucursalId) return;
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
        const {id:sucursalId, userData} = getState().Sucursal;
        if(!sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('productos-ms/update-producto', 
                {sucursalId,...updateData}, { headers: {"X-User-Id": userData.id} }
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
export const updateProductoImagenAPI = (data: UpdateProductoImagenInterface) => {
    return async(dispatch: AppDispatch, getState: () => RootState) => {
        if( data.imagen ){
            const {id: sucursalId, userData} = getState().Sucursal;
            if(!sucursalId) return;

            const updatedProductoImagen = new FormData();
            updatedProductoImagen.append('id', data.id);
            updatedProductoImagen.append('sucursalId', sucursalId);
            updatedProductoImagen.append('imagen', data.imagen);
            updatedProductoImagen.append('imagenUrl', data.imagenUrl);
        
            try {
                dispatch(startLoadingData());
                const response: AxiosResponse = await api.patch('productos-ms/update-producto-imagen', 
                    updatedProductoImagen,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "X-User-Id": userData.id
                        }
                    }
                );
                const {data, message} = response.data;
                dispatch(updateProducto(data));
                dispatch(showNotificationSuccess({tittle: 'MODIFICACIÓN DE IMAGEN', description: message}));
                setTimeout( () => dispatch(hideNotification()), 5000 );
                dispatch(finishLoadingData());
            } catch (error) {
                if( axios.isAxiosError(error) && error.response ){
                    const {data} = error.response;
                    dispatch(showNotificationError({tittle: 'MODIFICACIÓN DE IMAGEN', description: data.message}));
                    dispatch(finishLoadingData());
                    setTimeout( () => dispatch(hideNotification()), 5000 );
                }else console.log(error);
            }
        }else{
            dispatch(showNotificationWarning({tittle: 'MODIFICACIÓN DE IMAGEN', description: 'La imagen original no fue modificada'}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
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
export const createMarcaAPI = ( createMarcaData: CreateMarcaInterface ) => {
    return async(dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        if( !sucursalId ) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('productos-ms/create-marca', 
                {sucursalId, ...createMarcaData},{headers: {"X-User-Id": userData.id}}
            );
            const {data, message} = response.data;
            dispatch(createMarca(data));
            dispatch(showNotificationSuccess({tittle: 'CREACIÓN DE MARCA', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'CREACIÓN DE MARCA', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);            
        }
    }
}
export const deleteMarcaAPI = ( id: string ) => {
    return async(dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        if( !sucursalId ) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.delete('productos-ms/delete-marca', 
                {headers: {"X-User-Id": userData.id}, params: {id, sucursalId}}
            );
            const {data, message} = response.data;
            dispatch(deleteMarca(data.id));
            dispatch(showNotificationSuccess({tittle: 'ELIMINACIÓN DE MARCA', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'ELIMINACIÓN DE MARCA', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }

    }
}
export const updateMarcaAPI = (updateMarcaData: UpdateMarcaInterface) => {
    return async(dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        if(!sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('productos-ms/update-marca', 
                {sucursalId,...updateMarcaData}, { headers: {"X-User-Id": userData.id} }
            );
            const {data, message} = response.data;
            dispatch(updateMarca(data));
            dispatch(showNotificationSuccess({tittle: 'ACTUALIZACIÓN DE MARCA', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'ACTUALIZACIÓN DE MARCA', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
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
export const createCategoriaAPI = (createCategoriaData: CreateCategoriaInterface) => {
    return async(dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        if( !sucursalId ) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('productos-ms/create-categoria', 
                {sucursalId, ...createCategoriaData},{headers: {"X-User-Id": userData.id}}
            );
            const {data, message} = response.data;
            dispatch(createCategoria(data));
            dispatch(showNotificationSuccess({tittle: 'CREACIÓN DE CATEGORÍA', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'CREACIÓN DE CATEGORÍA', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);            
        }
    }
}
export const deleteCategoriaAPI = ( id: string ) => {
    return async(dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        if( !sucursalId ) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.delete('productos-ms/delete-categoria', 
                {headers: {"X-User-Id": userData.id}, params: {id, sucursalId}}
            );
            const {data, message} = response.data;
            dispatch(deleteCategoria(data.id));
            dispatch(showNotificationSuccess({tittle: 'ELIMINACIÓN DE CATEGORÍA', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'ELIMINACIÓN DE CATEGORÍA', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}
export const updateCategoriaAPI = ( updateCategoriaData: UpdateCategoriaInterface ) => {
    return async(dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        if(!sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('productos-ms/update-categoria', 
                {sucursalId,...updateCategoriaData}, { headers: {"X-User-Id": userData.id} }
            );
            const {data, message} = response.data;
            dispatch(updateCategoria(data));
            dispatch(showNotificationSuccess({tittle: 'ACTUALIZACIÓN DE CATEGORÍA', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'ACTUALIZACIÓN DE CATEGORÍA', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}
export const getAllUnidadAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Sucursal;
        if (!id) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.get(`productos-ms/get-all-logs/${id}`);
            dispatch(getAllLogs(response.data))
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}
export const getLogsAPI = (desde: number, hasta: number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Sucursal;
        if (!sucursalId) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.post(`productos-ms/get-logs`, {sucursalId, desde, hasta});
            dispatch(getAllLogs(response.data))
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}

export const getAllUnidadesMedidaAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Sucursal;
        if (!id) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.get(`productos-ms/get-all-unidades-medida/${id}`);
            dispatch(getAllUnidadesMedida(response.data))
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}