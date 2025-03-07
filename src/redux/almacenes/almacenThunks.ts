import axios, { AxiosResponse } from 'axios';
import { AppDispatch, RootState } from '../store';
import api from '../../api/config';
import { createAlmacen, createManyProductosAlmacen, createProductoAlmacen, getAllAlmacenes, getAllIngresosProductosAlmacen, getAllProductosAlmacen, getLogsAlmacenes, updateAlmacen, updateManyProductosAlmacen, updateProductoAlmacen } from './almacenesSlice';
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from '../aplication/aplicationSlice';
import { hideNotification, showNotificationError, showNotificationSuccess, showNotificationWarning } from '../notification/notificationSlice';
import { CreateIngresoProductosAlmacenDto, CreateManyProductosAlmacenDto, CreateProductoAlmacenDto, IngresoAlmacenInterface, ProductoAlmacenDetalladoInterface, ProductoAlmacenInterface } from '../../interface';

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

interface UpdateAlmacenInterface extends CreateAlmacenInterface {
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

export const updateAlmacenAPI = ( updateCategoriaInterface: UpdateAlmacenInterface ) => {
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
                    productoId: p.productoId,
                    almacenId: p.almacenId,
                    codigo: listaProductosObj[p.productoId].codigo,
                    nombre: listaProductosObj[p.productoId].nombre,
                    descripcion: listaProductosObj[p.productoId].descripcion,
                    imagen: listaProductosObj[p.productoId].imagen,
                    categoria: listaProductosObj[p.productoId].categoria,
                    marca: listaProductosObj[p.productoId].marca,
                    unidadMedida: listaProductosObj[p.productoId].unidadMedida,
                    unidadMedidaAbreviada: listaProductosObj[p.productoId].unidadMedidaAbreviada,
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

export const createProductoAlmacenAPI = (createProductoAlmacenDto: CreateProductoAlmacenDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id:sucursalId, userData } = getState().Sucursal;
        const { listaProductos } = getState().Productos;

        const listaProductosObj = listaProductos.reduce((acc, producto) => 
            { acc[producto.id] = producto; return acc; }, {} as Record<string, ProductoInterface>);

        if(!userData) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('almacenes-ms/create-producto-almacen', createProductoAlmacenDto, 
                {headers: {"X-User-Id": userData.id, "X-Sucursal-Id": sucursalId}}
            );
            const { data, message } = response.data;
            const newProductoAlmacenDetallado: ProductoAlmacenDetalladoInterface = {
                    id: data.id,
                    productoId: data.productoId,
                    almacenId: data.almacenId,
                    codigo: listaProductosObj[data.productoId].codigo,
                    nombre: listaProductosObj[data.productoId].nombre,
                    descripcion: listaProductosObj[data.productoId].descripcion,
                    imagen: listaProductosObj[data.productoId].imagen,
                    categoria: listaProductosObj[data.productoId].categoria,
                    marca: listaProductosObj[data.productoId].marca,
                    unidadMedida: listaProductosObj[data.productoId].unidadMedida,
                    unidadMedidaAbreviada: listaProductosObj[data.productoId].unidadMedidaAbreviada,
                    cantidad: data.cantidad,
                    cantidadMinima: data.cantidadMinima,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                }; 
            dispatch( createProductoAlmacen(newProductoAlmacenDetallado) );

            dispatch(showNotificationSuccess({tittle: 'NUEVO PRODUCTO', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'NUEVO PRODUCTO', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

export const createManyProductosAlmacenAPI = (createManyProductosAlmacenDto: CreateManyProductosAlmacenDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id:sucursalId, userData } = getState().Sucursal;
        const { listaProductos } = getState().Productos;

        const listaProductosObj = listaProductos.reduce((acc, producto) => 
        { acc[producto.id] = producto; return acc; }, {} as Record<string, ProductoInterface>);

        if(!userData) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('almacenes-ms/create-many-productos-almacen', createManyProductosAlmacenDto, {
                headers: {"X-User-Id": userData.id, "X-Sucursal-Id": sucursalId}
            });
            const { data, message } = response.data;
            const newProductosAlmacenDetallado: ProductoAlmacenDetalladoInterface[] = data.map((p:ProductoAlmacenInterface) => (
                {
                    id: p.id,
                    productoId: p.productoId,
                    almacenId: p.almacenId,
                    codigo: listaProductosObj[p.productoId].codigo,
                    nombre: listaProductosObj[p.productoId].nombre,
                    descripcion: listaProductosObj[p.productoId].descripcion,
                    imagen: listaProductosObj[p.productoId].imagen,
                    categoria: listaProductosObj[p.productoId].categoria,
                    marca: listaProductosObj[p.productoId].marca,
                    unidadMedida: listaProductosObj[p.productoId].unidadMedida,
                    unidadMedidaAbreviada: listaProductosObj[p.productoId].unidadMedidaAbreviada,
                    cantidad: p.cantidad,
                    cantidadMinima: p.cantidadMinima,
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt,
                })); 
            dispatch( createManyProductosAlmacen(newProductosAlmacenDetallado) )

            dispatch(showNotificationSuccess({tittle: 'NUEVOS PRODUCTOS', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'NUEVOS PRODUCTOS', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }

    }
}

export const updateProductoAlmacenAPI = (updateProducto: { id:string, cantidadMinima:number }) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {id: sucursalId, userData } = getState().Sucursal;

        if(!userData) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('almacenes-ms/update-producto-almacen', updateProducto, {
                headers: {"X-User-Id": userData.id, "X-Sucursal-Id": sucursalId}
            });
            const { data, message } = response.data;

            dispatch(updateProductoAlmacen(data));

            dispatch(showNotificationSuccess({tittle: 'ACTUALIZACIÓN DE PRODUCTOS', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'ACTUALIZACIÓN DE PRODUCTOS', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

export const getAllIngresosProductosAlmacenAPI = (desde: number, hasta:number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { selectedAlmacen } = getState().Almacenes;
        const { id: almacenId } = selectedAlmacen;
        if(!almacenId) {
            dispatch(showNotificationWarning({tittle: 'HISTORIAL DE INGRESOS', description: 'No se detecto al usuario responsable del ingreso, por favor, vuelve a iniciar sesión.'}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            return;
        }
        dispatch(startLoadingData());
        try {
            const response: AxiosResponse = await api.post(`almacenes-ms/get-all-ingresos-productos-almacen`, {almacenId, desde, hasta});
            const data:IngresoAlmacenInterface[] = response.data.data;
            dispatch(getAllIngresosProductosAlmacen(data));   
            dispatch(finishLoadingData());         
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'HISTORIAL DE INGRESOS', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

export const createIngresoProductosAlmacenAPI = (createIngresoProductosAlmacenDto:CreateIngresoProductosAlmacenDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id:sucursalId, userData } = getState().Sucursal;
        if(!userData.id) {
            dispatch(showNotificationWarning({tittle: 'INGRESO DE PRODUCTOS', description: 'No se detecto al usuario responsable del ingreso, por favor, vuelve a iniciar sesión.'}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            return;
        }
        if(createIngresoProductosAlmacenDto.ingresoProductosAlmacen.length <= 0) {
            dispatch(showNotificationWarning({tittle: 'INGRESO DE PRODUCTOS', description: 'Es necesario agregar al menos un producto como ingreso.'}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            return;
        }     

        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('almacenes-ms/create-ingreso-productos-almacen', createIngresoProductosAlmacenDto, {
                headers: {"X-User-Id": userData.id, "X-Sucursal-Id": sucursalId}});
            const { data, message }:{data: IngresoAlmacenInterface, message: string} = response.data;
            const {IngresoProductosAlmacen} = data;
            const productosAlmacenActualizados: ProductoAlmacenInterface[] = IngresoProductosAlmacen.map(({ProductoAlmacen}) => ProductoAlmacen);

            dispatch(updateManyProductosAlmacen(productosAlmacenActualizados));

            dispatch(showNotificationSuccess({tittle: 'INGRESO DE PRODUCTOS', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'INGRESO DE PRODUCTOS', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

export const getLogsAlmacenesAPI = (desde: number, hasta: number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Sucursal;
        if (!sucursalId) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.post(`almacenes-ms/get-logs`, {sucursalId, desde, hasta});
            dispatch(getLogsAlmacenes(response.data))
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}