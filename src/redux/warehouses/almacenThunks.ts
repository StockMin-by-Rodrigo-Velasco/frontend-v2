import axios, { AxiosResponse } from 'axios';
import { AppDispatch, RootState } from '../store';
import api from '../../api/config';
import { createAlmacen, createManyProductosAlmacen, createProductoAlmacen, createTraspasoProductosAlmacen, getAllAlmacenes, getAllIngresosProductosAlmacen, getAllProductosAlmacen, getAllTraspasosProductosAlmacen, getLogsAlmacenes, updateAlmacen, updateManyProductosAlmacen, updateProductoAlmacen } from './almacenesSlice';
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from '../aplication/aplicationSlice';
import { hideNotification, showNotificationError, showNotificationSuccess, showNotificationWarning } from '../notification/notificationSlice';
import { CreateIngresoAlmacenDto, CreateManyProductosAlmacenDto, CreateProductoAlmacenDto, IngresoAlmacen, ProductoAlmacenDetallado, ProductoAlmacen, CreateAlmacenDto, Almacen, UpdateAlmacenDto, Product, ListTransactionProductosAlmacenDto, CreateDocTraspasoAlmacenDto, DocTraspasoProductoAlmacen } from '../../interface';


export const getAllAlmacenesAPI = (
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const responce: AxiosResponse = await api.get(`almacenes-ms/get-all-almacenes/${sucursalId}`);

            dispatch(getAllAlmacenes(responce.data));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        }
    };
}

export const createAlmacenAPI = (
    createAlmacenDto: CreateAlmacenDto,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post('almacenes-ms/create-almacen',
                createAlmacenDto, { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Almacen, message: string } = response.data;
            dispatch(createAlmacen(data));

            dispatch(showNotificationSuccess({ tittle: 'CREACIÓN DE ALMACÉN', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'CREACIÓN DE ALMACÉN', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}

export const updateAlmacenAPI = (
    updateCategoriaDto: UpdateAlmacenDto,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.patch('almacenes-ms/update-almacen',
                updateCategoriaDto, { headers: { "X-User-Id": userData.id } }
            );
            const { data, message } = response.data;
            dispatch(updateAlmacen(data));
            dispatch(showNotificationSuccess({ tittle: 'MODIFICACIÓN DE ALMACÉN', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'MODIFICACIÓN DE ALMACÉN', description: data.message }));

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
        }
    }
}

export const getAllProductosAlmacenAPI = (
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { selectedAlmacen } = getState().Almacenes;
        const { products: listaProductos } = getState().Products;

        const listaProductosObj = listaProductos.reduce((acc, p) => { acc[p.id] = p; return acc }, {} as Record<string, Product>)

        if (!selectedAlmacen.id) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const responce: AxiosResponse = await api.get(`almacenes-ms/get-all-productos-almacen/${selectedAlmacen.id}`);
            const productosAlmacen: ProductoAlmacen[] = responce.data.data;

            const productosAlmacenDetallado: ProductoAlmacenDetallado[] = productosAlmacen.map((p: ProductoAlmacen) => (
                {
                    id: p.id,
                    productoId: p.productoId,
                    almacenId: p.almacenId,
                    codigo: listaProductosObj[p.productoId].code,
                    nombre: listaProductosObj[p.productoId].name,
                    descripcion: listaProductosObj[p.productoId].description,
                    imagen: listaProductosObj[p.productoId].image,
                    categoria: listaProductosObj[p.productoId].Categoria.name,
                    marca: listaProductosObj[p.productoId].Marca.name,
                    unidadMedida: listaProductosObj[p.productoId].UnidadMedida.name,
                    unidadMedidaAbreviada: listaProductosObj[p.productoId].UnidadMedida.abbreviation,
                    cantidad: p.cantidad,
                    cantidadMinima: p.cantidadMinima,
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt,
                }));

            dispatch(getAllProductosAlmacen(productosAlmacenDetallado));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        }
    };
}

export const getProductosOneAlmacenAPI = (
    almacenId: string,
    functionReturn?: (lista: ProductoAlmacen[]) => void,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch) => {
        if (almacenId === '') return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const responce: AxiosResponse = await api.get(`almacenes-ms/get-all-productos-almacen/${almacenId}`);
            const productosAlmacen: ProductoAlmacen[] = responce.data.data;
            if (productosAlmacen.length <= 0) {
                dispatch(showNotificationWarning({ tittle: 'PRODUCTOS EN ALMACÉN', description: 'El almacén seleccionado no cuenta con productos registrados.' }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            }
            if (functionReturn) functionReturn(productosAlmacen);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        }
    };
}

export const createProductoAlmacenAPI = (
    createProductoAlmacenDto: CreateProductoAlmacenDto,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        const { selectedAlmacen } = getState().Almacenes
        const { products: listaProductos } = getState().Products;

        const listaProductosObj = listaProductos.reduce((acc, producto) => { acc[producto.id] = producto; return acc; }, {} as Record<string, Product>);

        if (!userData) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post('almacenes-ms/create-producto-almacen', { almacenNombre: selectedAlmacen.nombre, ...createProductoAlmacenDto },
                { headers: { "X-User-Id": userData.id, "X-Sucursal-Id": sucursalId } }
            );

            // console.log(response.data);
            const { data, message }: { data: ProductoAlmacen, message: string } = response.data;
            const newProductoAlmacenDetallado: ProductoAlmacenDetallado = {
                id: data.id,
                productoId: data.productoId,
                almacenId: data.almacenId,
                codigo: listaProductosObj[data.productoId].code,
                nombre: listaProductosObj[data.productoId].name,
                descripcion: listaProductosObj[data.productoId].description,
                imagen: listaProductosObj[data.productoId].image,
                categoria: listaProductosObj[data.productoId].Categoria.name,
                marca: listaProductosObj[data.productoId].Marca.name,
                unidadMedida: listaProductosObj[data.productoId].UnidadMedida.name,
                unidadMedidaAbreviada: listaProductosObj[data.productoId].UnidadMedida.abbreviation,
                cantidad: data.cantidad,
                cantidadMinima: data.cantidadMinima,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };
            dispatch(createProductoAlmacen(newProductoAlmacenDetallado));

            dispatch(showNotificationSuccess({ tittle: 'NUEVO PRODUCTO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            // console.log(error);
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'NUEVO PRODUCTO', description: data?.message || 'Internal server error' }));

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
        }
    }
}

export const createOneProductoAlmacenAPI = (
    createProductoAlmacenDto: CreateProductoAlmacenDto,
    almacenNombre: string,
    functionReturn?: (producto: ProductoAlmacen) => void,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!userData) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post('almacenes-ms/create-producto-almacen', { almacenNombre, ...createProductoAlmacenDto },
                { headers: { "X-User-Id": userData.id, "X-Sucursal-Id": sucursalId } }
            );

            const { data, message }: { data: ProductoAlmacen, message: string } = response.data;
            if (functionReturn) functionReturn(data);

            dispatch(showNotificationSuccess({ tittle: 'NUEVO PRODUCTO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'NUEVO PRODUCTO', description: data?.message || 'Internal server error' }));

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
        }
    }
}

export const createManyProductosAlmacenAPI = (
    createManyProductosAlmacenDto: CreateManyProductosAlmacenDto,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        const { products: listaProductos } = getState().Products;

        const listaProductosObj = listaProductos.reduce((acc, producto) => { acc[producto.id] = producto; return acc; }, {} as Record<string, Product>);

        if (!userData) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post('almacenes-ms/create-many-productos-almacen', createManyProductosAlmacenDto, {
                headers: { "X-User-Id": userData.id, "X-Sucursal-Id": sucursalId }
            });
            const { data, message } = response.data;
            const newProductosAlmacenDetallado: ProductoAlmacenDetallado[] = data.map((p: ProductoAlmacen) => (
                {
                    id: p.id,
                    productoId: p.productoId,
                    almacenId: p.almacenId,
                    codigo: listaProductosObj[p.productoId].code,
                    nombre: listaProductosObj[p.productoId].name,
                    descripcion: listaProductosObj[p.productoId].description,
                    imagen: listaProductosObj[p.productoId].image,
                    categoria: listaProductosObj[p.productoId].Categoria.name,
                    marca: listaProductosObj[p.productoId].Marca.name,
                    unidadMedida: listaProductosObj[p.productoId].UnidadMedida.name,
                    unidadMedidaAbreviada: listaProductosObj[p.productoId].UnidadMedida.abbreviation,
                    cantidad: p.cantidad,
                    cantidadMinima: p.cantidadMinima,
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt,
                }));
            dispatch(createManyProductosAlmacen(newProductosAlmacenDetallado))

            dispatch(showNotificationSuccess({ tittle: 'NUEVOS PRODUCTOS', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'NUEVOS PRODUCTOS', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }

    }
}

export const updateProductoAlmacenAPI = (
    updateProducto: { almacenProductoNombre: string, productoAlmacenId: string, cantidadMinima: number },
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        const { selectedAlmacen } = getState().Almacenes;

        if (!userData) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.patch('almacenes-ms/update-producto-almacen', { almacenNombre: selectedAlmacen.nombre, ...updateProducto }, {
                headers: { "X-User-Id": userData.id, "X-Sucursal-Id": sucursalId }
            });
            const { data, message } = response.data;

            dispatch(updateProductoAlmacen(data));

            dispatch(showNotificationSuccess({ tittle: 'ACTUALIZACIÓN DE PRODUCTOS', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE PRODUCTOS', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}

export const getAllIngresosProductosAlmacenAPI = (
    desde: string,
    hasta: string,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { selectedAlmacen } = getState().Almacenes;
        const { id: almacenId } = selectedAlmacen;
        if (!almacenId) {
            dispatch(showNotificationWarning({ tittle: 'HISTORIAL DE INGRESOS', description: 'No se detecto al usuario responsable del ingreso, por favor, vuelve a iniciar sesión.' }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            return;
        }
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post(`almacenes-ms/get-all-ingresos-productos-almacen`, { almacenId, desde, hasta });
            const data: IngresoAlmacen[] = response.data.data;
            dispatch(getAllIngresosProductosAlmacen(data));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'HISTORIAL DE INGRESOS', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}

export const createIngresoProductosAlmacenAPI = (
    createIngresoProductosAlmacenDto: CreateIngresoAlmacenDto,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Branch;
        if (!userData.id) {
            dispatch(showNotificationWarning({ tittle: 'INGRESO DE PRODUCTOS', description: 'No se detecto al usuario responsable del ingreso, por favor, vuelve a iniciar sesión.' }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            return;
        }
        if (createIngresoProductosAlmacenDto.ingresoProductosAlmacen.length <= 0) {
            dispatch(showNotificationWarning({ tittle: 'INGRESO DE PRODUCTOS', description: 'Es necesario agregar al menos un producto como ingreso.' }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            return;
        }

        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post('almacenes-ms/create-ingreso-productos-almacen', createIngresoProductosAlmacenDto, {
                headers: { "X-User-Id": userData.id, "X-Sucursal-Id": sucursalId }
            });
            const { data, message }: { data: IngresoAlmacen, message: string } = response.data;
            const { IngresoProductosAlmacen } = data;
            const productosAlmacenActualizados: ProductoAlmacen[] = IngresoProductosAlmacen.map(({ ProductoAlmacen }) => ProductoAlmacen);

            dispatch(updateManyProductosAlmacen(productosAlmacenActualizados));

            dispatch(showNotificationSuccess({ tittle: 'INGRESO DE PRODUCTOS', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'INGRESO DE PRODUCTOS', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}

export const createTraspasoProductosAlmacenAPI = (
    createDocTraspasoAlmacenDto: CreateDocTraspasoAlmacenDto,
    functionReturn?: (data: DocTraspasoProductoAlmacen) => void,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch) => {
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post('almacenes-ms/create-traspaso-productos-almacen', createDocTraspasoAlmacenDto);
            const { data, message }: { data: DocTraspasoProductoAlmacen, message: string } = response.data;
            dispatch(showNotificationSuccess({ tittle: 'TRASPASO DE PRODUCTOS', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);

            if (functionReturn) functionReturn(data);
            dispatch(createTraspasoProductosAlmacen(data));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'TRASPASO DE PRODUCTOS', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 50000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}

export const getAllTraspasosProductosAlmacenAPI = (
    desde: string,
    hasta: string,
    functionReturn?: (data: DocTraspasoProductoAlmacen[]) => void,
    loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Branch;
        if (!sucursalId) return;
        try {
            if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
            if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

            const response: AxiosResponse = await api.post(`almacenes-ms/get-all-traspasos-productos-almacen`, { sucursalId, desde, hasta });
            const traspasos: DocTraspasoProductoAlmacen[] = response.data;
            if (functionReturn) functionReturn(traspasos);
            dispatch(getAllTraspasosProductosAlmacen(traspasos));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'HISTORIAL DE TRASPASOS', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);

                if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
            } else console.log(error);
        }
    }
}

export const incrementProdutosAlmacenAPI = (
    listIncrementProductosAlmacenDto: ListTransactionProductosAlmacenDto,
) => {
    return async () => {
        try {
            await api.post(`almacenes-ms/increment-productos-almacen`, listIncrementProductosAlmacenDto);
        } catch (error) {
            console.log(error);
        }
    }
}

export const decrementProdutosAlmacenAPI = (listDecrementProductosAlmacenDto: ListTransactionProductosAlmacenDto) => {
    return async () => {
        try {
            await api.post(`almacenes-ms/decrement-productos-almacen`, listDecrementProductosAlmacenDto);
        } catch (error) {
            console.log(error);
        }
    }
}

export const getLogsAlmacenesAPI = (
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

            const response: AxiosResponse = await api.post(`almacenes-ms/get-logs`, { sucursalId, desde, hasta });
            dispatch(getLogsAlmacenes(response.data));

            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
            if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
        }
    }
}