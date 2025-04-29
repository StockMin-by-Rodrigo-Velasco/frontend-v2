import axios, { AxiosResponse } from "axios";
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from "../aplication/aplicationSlice";
import { AppDispatch, RootState } from "../store";
import api from "../../api/config";
import { createCategoria, createMarca, createProducto, deleteCategoria, deleteMarca, deleteProducto, getAllCategorias, getLogsProductos, getAllMarcas, getAllProductos, getAllUnidadesMedida, updateCategoria, updateMarca, updateProducto, getAllUnidadesMedidaSucursal, handleUnidadMedida } from "./productosSlice";
import { hideNotification, showNotificationError, showNotificationSuccess, showNotificationWarning } from "../notification/notificationSlice";
import { UnidadMedidaSucursal } from "../../interface";

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
    imagen: File | undefined
}
interface CreateProductoInterface {
    codigo: string;
    nombre: string;
    descripcion?: string;
    categoriaId: string;
    marcaId: string;
    unidadMedidaId: string;
}

interface CreateMarcaInterface {
    nombre: string,
    origen?: string
}
interface UpdateMarcaInterface extends CreateMarcaInterface {
    id: string
}
interface CreateCategoriaInterface {
    nombre: string,
    detalle?: string
}
interface UpdateCategoriaInterface extends CreateCategoriaInterface {
    id: string
}

export const getAllProductosAPI = (
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Branch;
        if (!id) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.get(`productos-ms/get-all-productos/${id}`);
            dispatch(getAllProductos(response.data));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        }
    }
}
export const createProductoAPI = (
    data: CreateProductoInterface,
    file: File | undefined,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!sucursalId) return;
        const newProducto = new FormData();
        newProducto.append('sucursalId', sucursalId);
        newProducto.append('codigo', data.codigo);
        newProducto.append('nombre', data.nombre);
        newProducto.append('descripcion', data.descripcion as string);
        newProducto.append('categoriaId', data.categoriaId);
        newProducto.append('marcaId', data.marcaId);
        newProducto.append('unidadMedidaId', data.unidadMedidaId);

        if (file) newProducto.append('imagen', file);

        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post('productos-ms/create-producto',
                newProducto,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-User-Id": userData.id
                    }
                }

            );
            const { data, message } = response.data;
            dispatch(createProducto(data));
            dispatch(showNotificationSuccess({ tittle: 'PRODUCTO CREADO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'CREACIÓN DE PRODUCTO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }

    }
}
export const deleteProductoAPI = (
    id: string,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.delete('productos-ms/delete-producto',
                {
                    headers: { "X-User-Id": userData.id },
                    params: { id, sucursalId }
                }
            );
            const { data, message } = response.data;
            dispatch(deleteProducto(data.id));
            dispatch(showNotificationSuccess({ tittle: 'ELIMINACIÓN DE PRODUCTO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ELIMINACIÓN DE PRODUCTO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}
export const updateProductoAPI = (
    updateData: UpdateProductoInterface,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.patch('productos-ms/update-producto',
                { sucursalId, ...updateData }, { headers: { "X-User-Id": userData.id } }
            );
            const { data, message } = response.data;
            dispatch(updateProducto(data));
            dispatch(showNotificationSuccess({ tittle: 'PRODUCTO ACTUALIZADO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE PRODUCTO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}
export const updateProductoImagenAPI = (
    data: UpdateProductoImagenInterface,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        if (data.imagen) {
            const { id: sucursalId, userData } = getState().Branch;
            if (!sucursalId) return;

            const updatedProductoImagen = new FormData();
            updatedProductoImagen.append('id', data.id);
            updatedProductoImagen.append('sucursalId', sucursalId);
            updatedProductoImagen.append('imagen', data.imagen);
            updatedProductoImagen.append('imagenUrl', data.imagenUrl);

            try {
                if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
                if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

                const response: AxiosResponse = await api.patch('productos-ms/update-producto-imagen',
                    updatedProductoImagen,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "X-User-Id": userData.id
                        }
                    }
                );
                const { data, message } = response.data;
                dispatch(updateProducto(data));
                dispatch(showNotificationSuccess({ tittle: 'MODIFICACIÓN DE IMAGEN', description: message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const { data } = error.response;
                    dispatch(showNotificationError({ tittle: 'MODIFICACIÓN DE IMAGEN', description: data.message }));
                    setTimeout(() => dispatch(hideNotification()), 5000);

                    if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                    if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
                } else console.log(error);
            }
        } else {
            dispatch(showNotificationWarning({ tittle: 'MODIFICACIÓN DE IMAGEN', description: 'La imagen original no fue modificada' }));
            setTimeout(() => dispatch(hideNotification()), 5000);
        }
    }
}
export const getAllMarcasAPI = (
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Branch;
        if (!id) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.get(`productos-ms/get-all-marcas/${id}`);
            dispatch(getAllMarcas(response.data));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        }
    }
}
export const createMarcaAPI = (
    createMarcaData: CreateMarcaInterface,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post('productos-ms/create-marca',
                { sucursalId, ...createMarcaData }, { headers: { "X-User-Id": userData.id } }
            );
            const { data, message } = response.data;
            dispatch(createMarca(data));
            dispatch(showNotificationSuccess({ tittle: 'CREACIÓN DE MARCA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'CREACIÓN DE MARCA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}
export const deleteMarcaAPI = (
    id: string,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.delete('productos-ms/delete-marca',
                { headers: { "X-User-Id": userData.id }, params: { id, sucursalId } }
            );
            const { data, message } = response.data;
            dispatch(deleteMarca(data.id));
            dispatch(showNotificationSuccess({ tittle: 'ELIMINACIÓN DE MARCA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ELIMINACIÓN DE MARCA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }

    }
}
export const updateMarcaAPI = (
    updateMarcaData: UpdateMarcaInterface,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.patch('productos-ms/update-marca',
                { sucursalId, ...updateMarcaData }, { headers: { "X-User-Id": userData.id } }
            );
            const { data, message } = response.data;
            dispatch(updateMarca(data));
            dispatch(showNotificationSuccess({ tittle: 'ACTUALIZACIÓN DE MARCA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE MARCA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}
export const getAllCategoriasAPI = (
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Branch;
        if (!id) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.get(`productos-ms/get-all-categorias/${id}`);
            dispatch(getAllCategorias(response.data));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        }
    }
}
export const createCategoriaAPI = (
    createCategoriaData: CreateCategoriaInterface,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post('productos-ms/create-categoria',
                { sucursalId, ...createCategoriaData }, { headers: { "X-User-Id": userData.id } }
            );
            const { data, message } = response.data;
            dispatch(createCategoria(data));
            dispatch(showNotificationSuccess({ tittle: 'CREACIÓN DE CATEGORÍA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'CREACIÓN DE CATEGORÍA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}
export const deleteCategoriaAPI = (
    id: string,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.delete('productos-ms/delete-categoria',
                { headers: { "X-User-Id": userData.id }, params: { id, sucursalId } }
            );
            const { data, message } = response.data;
            dispatch(deleteCategoria(data.id));
            dispatch(showNotificationSuccess({ tittle: 'ELIMINACIÓN DE CATEGORÍA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ELIMINACIÓN DE CATEGORÍA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}
export const updateCategoriaAPI = (
    updateCategoriaData: UpdateCategoriaInterface,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.patch('productos-ms/update-categoria',
                { sucursalId, ...updateCategoriaData }, { headers: { "X-User-Id": userData.id } }
            );
            const { data, message } = response.data;
            dispatch(updateCategoria(data));
            dispatch(showNotificationSuccess({ tittle: 'ACTUALIZACIÓN DE CATEGORÍA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE CATEGORÍA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}
export const getAllUnidadAPI = (
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Branch;
        if (!id) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.get(`productos-ms/get-all-logs/${id}`);
            dispatch(getLogsProductos(response.data));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        }
    }
}
export const getLogsProductosAPI = (
    desde: string,
    hasta: string,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post(`productos-ms/get-logs`, { sucursalId, desde, hasta });
            dispatch(getLogsProductos(response.data));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        }
    }
}

export const getAllUnidadesMedidaAPI = (
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Branch;
        if (!id) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.get(`productos-ms/get-all-unidades-medida`);
            dispatch(getAllUnidadesMedida(response.data));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        }
    }
}

export const getAllUnidadesMedidaSucursalAPI = (
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.get(`productos-ms/get-all-unidades-medida-sucursal/${sucursalId}`);
            dispatch(getAllUnidadesMedidaSucursal(response.data));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        }
    }
}

export const handleUnidadMedidaAPI = (
    unidadMedidaId: string,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post(`productos-ms/handle-unidad-medida`, { sucursalId, unidadMedidaId });
            const { message, data }: { message: string, data: UnidadMedidaSucursal } = response.data;
            dispatch(handleUnidadMedida(data));

            dispatch(showNotificationSuccess({ tittle: 'ACTUALIZACIÓN DE UNIDADES DE MEDIDA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE UNIDADES DE MEDIDA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
                if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}