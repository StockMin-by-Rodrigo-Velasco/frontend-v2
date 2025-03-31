import axios, { AxiosResponse } from "axios";
import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from "../aplication/aplicationSlice";
import { AppDispatch, RootState } from "../store";
import { createClienteVenta, createPrecioVenta, decrementProductos, deletePrecioVenta, getAllClientesVenta, getAllPrecioVenta, getAllProductosVenta, getAllTipoMonedaVenta, getLogsVentas, getOpcionesVenta, updateClienteVenta, updatePrecioVenta } from "./ventasSlice";
import api from "../../api/config";
import { ClienteVenta, CreateClienteVentaDto,  ListTransactionProductosAlmacenDto, ProductoAlmacen, TipoMonedaVenta, UpdateClienteVentaDto, CotizacionVenta, CreateCotizacionVentaDto, CreateOpcionesVentaDto, CreatePrecioVentaDto, CreateProductoVentaDto, CreateVentaDto, DeletePrecioVentaDto, GetCotizacionesVentaDto, OpcionesVenta, PrecioVenta, ProductoTienda, ProductoVenta, UpdateOpcionesVentaDto, UpdatePrecioVentaDto, Venta, UpdateProductoVentaDto } from "../../interface";
import { hideNotification, showNotificationError, showNotificationSuccess, showNotificationWarning } from "../notification/notificationSlice";
import { decrementProdutosAlmacenAPI } from "../almacenes/almacenThunks";


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

//* -------------------------------------------- TIPO MONEDA VENTA ----------------------------------------------------------

export const getAllTipoMonedaVentaAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Sucursal;
        if (!id) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.get(`ventas-ms/get-all-tipo-moneda-venta`);
            const listTipoMoneda: TipoMonedaVenta[] = response.data;
            dispatch(getAllTipoMonedaVenta(listTipoMoneda))
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}

//* -------------------------------------------- PRECIO VENTA ----------------------------------------------------------

export const getAllPrecioVentaAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Sucursal;
        if (!id) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.get(`ventas-ms/get-all-precio-venta/${id}`);
            const {data}: {data: PrecioVenta[]} = response;
            dispatch(getAllPrecioVenta(data))
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}

export const createPrecioVentaAPI = (createPrecioVentaDto:CreatePrecioVentaDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Sucursal;
        if(!createPrecioVentaDto.sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('ventas-ms/create-precio-venta', 
                createPrecioVentaDto,{headers: {"X-User-Id": userData.id}}
            );
            const {data, message}: {data: PrecioVenta, message: string} = response.data;
            dispatch(createPrecioVenta(data));
            dispatch(showNotificationSuccess({tittle: 'REGISTRO DE TIPO DE PRECIO', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
            
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'REGISTRO DE TIPO DE PRECIO', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

export const updatePrecioVentaAPI = (updatePrecioVentaDto:UpdatePrecioVentaDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Sucursal;
        if(!updatePrecioVentaDto.sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('ventas-ms/update-precio-venta', 
                updatePrecioVentaDto,{headers: {"X-User-Id": userData.id}}
            );
            const {data, message}: {data: PrecioVenta, message: string} = response.data;
            dispatch(updatePrecioVenta(data));
            dispatch(showNotificationSuccess({tittle: 'MODIFICACIÓN DE TIPO DE PRECIO', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
            
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'MODIFICACIÓN DE TIPO DE PRECIO', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

export const deletePrecioVentaAPI = (deletePrecioVentaDto:DeletePrecioVentaDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Sucursal;
        if(!deletePrecioVentaDto.sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.delete('ventas-ms/delete-precio-venta', 
                {headers: {"X-User-Id": userData.id}, data: deletePrecioVentaDto}
            );
            const {data, message}: {data: PrecioVenta, message: string} = response.data;
            dispatch(deletePrecioVenta(data.id));
            dispatch(showNotificationSuccess({tittle: 'ELIMINACIÓN DE TIPO DE PRECIO', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
            
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'ELIMINACIÓN DE TIPO DE PRECIO', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

//* -------------------------------------------- OPCIONES VENTA ----------------------------------------------------------
export const getOpcionesVentaAPI = (navigate: (path:string) => void) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Sucursal;
        if (!id) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.get(`ventas-ms/get-opciones-venta/${id}`);
            const {data}: {data: OpcionesVenta} = response;
            dispatch(getOpcionesVenta(data));

            dispatch(finishLoadingAplication());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationWarning({tittle: 'OPCIONES DE VENTA', description: data.message}));
                dispatch(finishLoadingAplication());
                navigate('/main/ventas/opciones');
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}

export const createOpcionesVentaAPI = (createOpcionesVentaDto: CreateOpcionesVentaDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Sucursal;
        if(!createOpcionesVentaDto.sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('ventas-ms/create-opciones-venta', 
                createOpcionesVentaDto,{headers: {"X-User-Id": userData.id}}
            );
            const {data, message}: {data: OpcionesVenta, message: string} = response.data;
            dispatch(getOpcionesVenta(data));
            dispatch(showNotificationSuccess({tittle: 'OPCIONES DE VENTA', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
            
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'OPCIONES DE VENTA', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

export const updateOpcionesVentaAPI = (updateOpcionesVentaDto:UpdateOpcionesVentaDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Sucursal;
        if(!updateOpcionesVentaDto.sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('ventas-ms/update-opciones-venta', 
                updateOpcionesVentaDto,{headers: {"X-User-Id": userData.id}}
            );
            const {data, message}: {data: OpcionesVenta, message: string} = response.data;
            dispatch(getOpcionesVenta(data));
            dispatch(showNotificationSuccess({tittle: 'OPCIONES DE VENTA', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
            
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'OPCIONES DE VENTA', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

//* -------------------------------------------- PRODUCTOS VENTA ----------------------------------------------------------

export const getAllProductosVentaAPI = (precioVentaId:string, almacenId:string, setLista?:React.Dispatch<React.SetStateAction<ProductoTienda[]>>) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id } = getState().Sucursal;
        const { listaProductos } = getState().Productos;
        if (!id || precioVentaId === '' || almacenId === '') return;
        try {
            dispatch(startLoadingData());
            const responseVenta: AxiosResponse = await api.get(`ventas-ms/get-all-productos-venta/${precioVentaId}/${almacenId}`);
            const productosVenta: ProductoVenta[] = responseVenta.data;
            const productosVentaObj = productosVenta.reduce((acc, producto) => { acc[producto.productoId] = producto; return acc; }, {} as Record<string, ProductoVenta>);

            const responceAlmacen: AxiosResponse = await api.get(`almacenes-ms/get-all-productos-almacen/${almacenId}`);
            const productosAlmacen: ProductoAlmacen[] = responceAlmacen.data.data;
            const productosAlmacenObj = productosAlmacen.reduce((acc, producto) => { acc[producto.productoId] = producto; return acc; }, {} as Record<string, ProductoAlmacen>);

            const productosTienda: ProductoTienda[] = listaProductos.map(p => ({
                id: productosVentaObj[p.id]?.id || '',
                productoId: p.id,
                productoAlmacenId: productosAlmacenObj[p.id]?.id || '',
                Categoria: p.Categoria,
                Marca: p.Marca,
                UnidadMedida: p.UnidadMedida,
                codigo: p.codigo,
                imagen: p.imagen,
                descripcion: p.descripcion,
                nombre: p.nombre,
                cantidad: productosAlmacenObj[p.id]?.cantidad || 0,
                precio: productosVentaObj[p.id]?.precio || '-',
                createdAt: productosVentaObj[p.id]?.createdAt,
                updatedAt: productosVentaObj[p.id]?.updatedAt,
                show: true,
                check: false
            }))
            dispatch(getAllProductosVenta(productosTienda));
            if(setLista) setLista(productosTienda); //* Agrega los productos al componente de las ventas, para evitar usar el useEffect

            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationWarning({tittle: 'PRODUCTOS EN VENTA', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const createProductoVentaAPI = (createProductoVentaDto: CreateProductoVentaDto, setLista?:React.Dispatch<React.SetStateAction<ProductoTienda[]>>) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        const { listaProductosTienda } = getState().Ventas;
        if (!sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post(`ventas-ms/create-producto-venta`, 
                createProductoVentaDto, { headers: {"X-User-Id": userData.id} }
            );
            
            const {data, message}: {data:ProductoVenta , message: string} = response.data;

            const { id, precio, productoId, updatedAt } = data;

            //* EDITANDO SOLO EL PRECIO Y ID DEL PRODUCTO INDICADO 
            const index = listaProductosTienda.findIndex((p) => p.productoId === productoId);
            if (index === -1) return;
            const newProductosTienda = [...listaProductosTienda];
            newProductosTienda[index] = { ...newProductosTienda[index], id, precio, updatedAt};
            dispatch(getAllProductosVenta(newProductosTienda));    
            
            if(setLista) setLista(newProductosTienda); //* Agrega los productos al componente de las ventas, para evitar usar el useEffect
            
            dispatch(showNotificationSuccess({tittle: 'PRECIO DE PRODUCTO', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationWarning({tittle: 'PRECIO DE PRODUCTO', description: data.message}));
                setTimeout( () => dispatch(hideNotification()), 5000 );
                dispatch(finishLoadingData());
            }else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const updateProductoVentaAPI = (updateProductoVentaDto: UpdateProductoVentaDto, setLista?:React.Dispatch<React.SetStateAction<ProductoTienda[]>>) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId, userData } = getState().Sucursal;
        const { listaProductosTienda } = getState().Ventas;
        if (!sucursalId) return;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch(`ventas-ms/update-producto-venta`, 
                updateProductoVentaDto, { headers: {"X-User-Id": userData.id} }
            );
            
            const {data, message}: {data:ProductoVenta , message: string} = response.data;

            const { precio, productoId, updatedAt } = data;

            //* EDITANDO SOLO EL PRECIO DEL PRODUCTO INDICADO 
            const index = listaProductosTienda.findIndex((p) => p.productoId === productoId);
            if (index === -1) return;
            const newProductosTienda = [...listaProductosTienda];
            newProductosTienda[index] = { ...newProductosTienda[index], precio, updatedAt};
            dispatch(getAllProductosVenta(newProductosTienda));    
            
            if(setLista) setLista(newProductosTienda); //* Agrega los productos al componente de las ventas, para evitar usar el useEffect
            
            dispatch(showNotificationSuccess({tittle: 'PRECIO DE PRODUCTO', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );
            dispatch(finishLoadingData());
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationWarning({tittle: 'PRECIO DE PRODUCTO', description: data.message}));
                setTimeout( () => dispatch(hideNotification()), 5000 );
                dispatch(finishLoadingData());
            }else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

//* -------------------------------------------- COTIZACION VENTA ----------------------------------------------------------

export const createCotizacionVentaAPI = (
    createCotizacionVentaDto: CreateCotizacionVentaDto, 
    setUltimaCotizacion?: React.Dispatch<React.SetStateAction<CotizacionVenta>>,
    setOpenViewCotizacion?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Sucursal;
        if(!sucursalId) return;

        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('ventas-ms/create-cotizacion-venta', createCotizacionVentaDto);
            const {data, message}: {data: CotizacionVenta, message: string} = response.data;

            // console.log(data);

            if(setUltimaCotizacion && setOpenViewCotizacion){
                setUltimaCotizacion(data);
                setOpenViewCotizacion(true);
            }

            dispatch(showNotificationSuccess({tittle: 'COTIZACION DE VENTA', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );

            dispatch(finishLoadingData());
            
        } catch (error) {
            console.log(error)
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'COTIZACION DE VENTA', description: data.message}));
                setTimeout( () => dispatch(hideNotification()), 5000 );
                dispatch(finishLoadingData());
            }else console.log(error);
        }
    }
}

export const getCotizacionesVentaAPI = ( 
    getCotizacionesVentaDto: GetCotizacionesVentaDto,
    setListaCotizacionesVenta: React.Dispatch<React.SetStateAction<CotizacionVenta[]>>
    ) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startLoadingData());
        try {
            const response: AxiosResponse = await api.post(`ventas-ms/get-cotizaciones-venta`, getCotizacionesVentaDto);
            const data:CotizacionVenta[] = response.data;
            // console.log(response.data);
            setListaCotizacionesVenta(data);

            dispatch(finishLoadingData());         
        } catch (error) {
            console.log(error);
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'LISTA DE COTIZACIONES', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

//* -------------------------------------------- VENTA ----------------------------------------------------------

export const createVentaAPI = (
    createVentaDto: CreateVentaDto, 
    listDecrementProductosAlmacenDto: ListTransactionProductosAlmacenDto,
    setUltimaVenta?: React.Dispatch<React.SetStateAction<Venta>>,
    setOpenViewVenta?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Sucursal;
        if(!sucursalId) return;

        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('ventas-ms/create-venta', createVentaDto);
            const {data, message}: {data: Venta, message: string} = response.data;

            if(setUltimaVenta && setOpenViewVenta){
                setUltimaVenta(data);
                setOpenViewVenta(true);
            }

            dispatch(decrementProdutosAlmacenAPI(listDecrementProductosAlmacenDto)); // Disminuye los productos del almacen correspondiente
            dispatch(decrementProductos(listDecrementProductosAlmacenDto)); // Disminuye los productos de la lista de la tienda
            dispatch(showNotificationSuccess({tittle: 'VENTA', description: message}));
            setTimeout( () => dispatch(hideNotification()), 5000 );

            dispatch(finishLoadingData());
            
        } catch (error) {
            // console.log(error)
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'VENTA', description: data.message}));
                setTimeout( () => dispatch(hideNotification()), 5000 );
                dispatch(finishLoadingData());
            }else console.log(error);
        }
    }
}

export const getVentasAPI = ( 
    getCotizacionesVentaDto: GetCotizacionesVentaDto,
    setListaVentas: React.Dispatch<React.SetStateAction<Venta[]>>
    ) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startLoadingData());
        try {
            const response: AxiosResponse = await api.post(`ventas-ms/get-ventas`, getCotizacionesVentaDto);
            // console.log(response.data);
            const data:Venta[] = response.data;
            setListaVentas(data);
            dispatch(finishLoadingData());         
        } catch (error) {
            // console.log(error);
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'LISTA DE VENTAS', description: data.message}));
                dispatch(finishLoadingData());
                setTimeout( () => dispatch(hideNotification()), 5000 );
            }else console.log(error);
        }
    }
}

//* -------------------------------------------- LOGS ----------------------------------------------------------

export const getLogsVentasAPI = (desde: string, hasta: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: sucursalId } = getState().Sucursal;
        if (!sucursalId) return;
        try {
            dispatch(startLoadingAplication());
            const response: AxiosResponse = await api.post(`ventas-ms/get-logs`, {sucursalId, desde, hasta});
            dispatch(getLogsVentas(response.data));
            dispatch(finishLoadingAplication());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingAplication());
        }
    }
}