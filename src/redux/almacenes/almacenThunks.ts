import axios, { AxiosResponse } from 'axios';
import { AppDispatch, RootState } from '../store';
import api from '../../api/config';
import { createAlmacen, createManyProductosAlmacen, createProductoAlmacen, getAllAlmacenes, getAllIngresosProductosAlmacen, getAllProductosAlmacen, getLogsAlmacenes, updateAlmacen, updateManyProductosAlmacen, updateProductoAlmacen } from './almacenesSlice';
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from '../aplication/aplicationSlice';
import { hideNotification, showNotificationError, showNotificationSuccess, showNotificationWarning } from '../notification/notificationSlice';
import { CreateIngresoAlmacenDto, CreateManyProductosAlmacenDto, CreateProductoAlmacenDto, IngresoAlmacen, ProductoAlmacenDetallado, ProductoAlmacen, CreateAlmacenDto, Almacen, UpdateAlmacenDto, Producto } from '../../interface';

// interface Producto {
//     id: string;
//     sucursalId: string;
//     codigo: string;
//     nombre: string;
//     descripcion: string;
//     imagen: string;
//     deleted: boolean;
//     categoriaId: string;
//     categoria?: string;
//     marcaId: string;
//     marca?:string;
//     unidadMedidaId: string;
//     unidadMedida?: string;
//     unidadMedidaAbreviada?: string;
//     createdAt: number;
//     updatedAt: number;
// }

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

export const createAlmacenAPI = ( createAlmacenDto: CreateAlmacenDto ) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        if( !sucursalId ) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('almacenes-ms/create-almacen', 
                createAlmacenDto, {headers: {"X-User-Id": userData.id}}
            );
            const { data, message }: {data:Almacen, message:string} = response.data;
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

export const updateAlmacenAPI = ( updateCategoriaDto: UpdateAlmacenDto ) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        if( !sucursalId ) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('almacenes-ms/update-almacen', 
                updateCategoriaDto, {headers: {"X-User-Id": userData.id}}
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

        const listaProductosObj = listaProductos.reduce((acc, p) => {acc[p.id] = p; return acc}, {} as Record<string, Producto>)

        if( !selectedAlmacen.id ) return;
        try {
            dispatch(startLoadingAplication());
            const responce: AxiosResponse = await api.get(`almacenes-ms/get-all-productos-almacen/${selectedAlmacen.id}`);
            const productosAlmacen: ProductoAlmacen[] = responce.data.data;

            const productosAlmacenDetallado: ProductoAlmacenDetallado[] = productosAlmacen.map((p:ProductoAlmacen) => (
                {
                    id: p.id,
                    productoId: p.productoId,
                    almacenId: p.almacenId,
                    codigo: listaProductosObj[p.productoId].codigo,
                    nombre: listaProductosObj[p.productoId].nombre,
                    descripcion: listaProductosObj[p.productoId].descripcion,
                    imagen: listaProductosObj[p.productoId].imagen,
                    categoria: listaProductosObj[p.productoId].Categoria.nombre,
                    marca: listaProductosObj[p.productoId].Marca.nombre,
                    unidadMedida: listaProductosObj[p.productoId].UnidadMedida.nombre,
                    unidadMedidaAbreviada: listaProductosObj[p.productoId].UnidadMedida.abreviatura,
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
        const {selectedAlmacen} = getState().Almacenes
        const { listaProductos } = getState().Productos;

        const listaProductosObj = listaProductos.reduce((acc, producto) => 
            { acc[producto.id] = producto; return acc; }, {} as Record<string, Producto>);

        if(!userData) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('almacenes-ms/create-producto-almacen', {almacenNombre: selectedAlmacen.nombre ,...createProductoAlmacenDto}, 
                {headers: {"X-User-Id": userData.id, "X-Sucursal-Id": sucursalId}}
            );
            const { data, message } = response.data;
            const newProductoAlmacenDetallado: ProductoAlmacenDetallado = {
                    id: data.id,
                    productoId: data.productoId,
                    almacenId: data.almacenId,
                    codigo: listaProductosObj[data.productoId].codigo,
                    nombre: listaProductosObj[data.productoId].nombre,
                    descripcion: listaProductosObj[data.productoId].descripcion,
                    imagen: listaProductosObj[data.productoId].imagen,
                    categoria: listaProductosObj[data.productoId].Categoria.nombre,
                    marca: listaProductosObj[data.productoId].Marca.nombre,
                    unidadMedida: listaProductosObj[data.productoId].UnidadMedida.nombre,
                    unidadMedidaAbreviada: listaProductosObj[data.productoId].UnidadMedida.abreviatura,
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
        { acc[producto.id] = producto; return acc; }, {} as Record<string, Producto>);

        if(!userData) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('almacenes-ms/create-many-productos-almacen', createManyProductosAlmacenDto, {
                headers: {"X-User-Id": userData.id, "X-Sucursal-Id": sucursalId}
            });
            const { data, message } = response.data;
            const newProductosAlmacenDetallado: ProductoAlmacenDetallado[] = data.map((p:ProductoAlmacen) => (
                {
                    id: p.id,
                    productoId: p.productoId,
                    almacenId: p.almacenId,
                    codigo: listaProductosObj[p.productoId].codigo,
                    nombre: listaProductosObj[p.productoId].nombre,
                    descripcion: listaProductosObj[p.productoId].descripcion,
                    imagen: listaProductosObj[p.productoId].imagen,
                    categoria: listaProductosObj[p.productoId].Categoria.nombre,
                    marca: listaProductosObj[p.productoId].Marca.nombre,
                    unidadMedida: listaProductosObj[p.productoId].UnidadMedida.nombre,
                    unidadMedidaAbreviada: listaProductosObj[p.productoId].UnidadMedida.abreviatura,
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

export const updateProductoAlmacenAPI = (updateProducto: {almacenProductoNombre: string, id:string, cantidadMinima:number }) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {id: sucursalId, userData } = getState().Sucursal;
        const {selectedAlmacen} = getState().Almacenes;

        if(!userData) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('almacenes-ms/update-producto-almacen', {almacenNombre: selectedAlmacen.nombre,...updateProducto}, {
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

export const getAllIngresosProductosAlmacenAPI = (desde: string, hasta:string) => {
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
            const data:IngresoAlmacen[] = response.data.data;
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

export const createIngresoProductosAlmacenAPI = (createIngresoProductosAlmacenDto:CreateIngresoAlmacenDto) => {
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
            const { data, message }:{data: IngresoAlmacen, message: string} = response.data;
            const {IngresoProductosAlmacen} = data;
            const productosAlmacenActualizados: ProductoAlmacen[] = IngresoProductosAlmacen.map(({ProductoAlmacen}) => ProductoAlmacen);

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

export const getLogsAlmacenesAPI = (desde: string, hasta: string) => {
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