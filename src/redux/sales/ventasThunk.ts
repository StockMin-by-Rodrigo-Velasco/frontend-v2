// import axios, { AxiosResponse } from "axios";
// import { finishLoadingAplication, finishLoadingData, startLoadingAplication, startLoadingData } from "../aplication/aplicationSlice";
// import { AppDispatch, RootState } from "../store";
// import { createClienteVenta, createPrecioVenta, decrementProductos, deletePrecioVenta, getAllClientesVenta, getAllPrecioVenta, getAllProductosVenta, getAllTipoMonedaVenta, getLogsVentas, getOpcionesVenta, updateClienteVenta, updatePrecioVenta } from "./ventasSlice";
// import api from "../../api/config";
// import { ClienteVenta, CreateClienteVentaDto, ListTransactionProductosAlmacenDto, ProductoAlmacen, TipoMonedaVenta, UpdateClienteVentaDto, CotizacionVenta, CreateCotizacionVentaDto, CreateOpcionesVentaDto, CreatePrecioVentaDto, CreateProductoVentaDto, CreateVentaDto, DeletePrecioVentaDto, GetCotizacionesVentaDto, OpcionesVenta, PrecioVenta, ProductoTienda, ProductoVenta, UpdateOpcionesVentaDto, UpdatePrecioVentaDto, Venta, UpdateProductoVentaDto } from "../../interface";
// import { hideNotification, showNotificationError, showNotificationSuccess, showNotificationWarning } from "../notification/notificationSlice";
// import { decrementProdutosAlmacenAPI } from "../warehouses/almacenThunks";


// export const getAllClientesVentaAPI = (
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { id } = getState().Branch;
//         if (!id) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.get(`ventas-ms/get-all-clientes-venta/${id}`);
//             dispatch(getAllClientesVenta(response.data));

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             console.log(error);
//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// export const createClienteVentaAPI = (
//     createClienteVentaDto: CreateClienteVentaDto,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { userData } = getState().Branch;
//         if (!createClienteVentaDto.sucursalId) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.post('ventas-ms/create-cliente-venta',
//                 createClienteVentaDto, { headers: { "X-User-Id": userData.id } }
//             );
//             const { data, message }: { data: ClienteVenta, message: string } = response.data;
//             dispatch(createClienteVenta(data));
//             dispatch(showNotificationSuccess({ tittle: 'REGISTRO DE CLIENTE', description: message }));
//             setTimeout(() => dispatch(hideNotification()), 5000);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'REGISTRO DE CLIENTE', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// export const updateClienteVentaAPI = (
//     updateClienteVentaDto: UpdateClienteVentaDto,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { userData } = getState().Branch;
//         if (!updateClienteVentaDto.sucursalId) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.patch('ventas-ms/update-cliente-venta',
//                 updateClienteVentaDto, { headers: { "X-User-Id": userData.id } }
//             );
//             const { data, message }: { data: ClienteVenta, message: string } = response.data;
//             dispatch(updateClienteVenta(data));
//             dispatch(showNotificationSuccess({ tittle: 'MODIFICACIÓN DE CLIENTE', description: message }));
//             setTimeout(() => dispatch(hideNotification()), 5000);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'MODIFICACIÓN DE CLIENTE', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// //* -------------------------------------------- TIPO MONEDA VENTA ----------------------------------------------------------

// export const getAllTipoMonedaVentaAPI = (
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { id } = getState().Branch;
//         if (!id) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.get(`ventas-ms/get-all-tipo-moneda-venta`);
//             const listTipoMoneda: TipoMonedaVenta[] = response.data;
//             dispatch(getAllTipoMonedaVenta(listTipoMoneda));

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             console.log(error);
//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// //* -------------------------------------------- PRECIO VENTA ----------------------------------------------------------

// export const getAllPrecioVentaAPI = (
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { id } = getState().Branch;
//         if (!id) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.get(`ventas-ms/get-all-precio-venta/${id}`);
//             const { data }: { data: PrecioVenta[] } = response;
//             dispatch(getAllPrecioVenta(data));

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             console.log(error);
//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// export const createPrecioVentaAPI = (
//     createPrecioVentaDto: CreatePrecioVentaDto,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { userData } = getState().Branch;
//         if (!createPrecioVentaDto.sucursalId) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.post('ventas-ms/create-precio-venta',
//                 createPrecioVentaDto, { headers: { "X-User-Id": userData.id } }
//             );
//             const { data, message }: { data: PrecioVenta, message: string } = response.data;
//             dispatch(createPrecioVenta(data));
//             dispatch(showNotificationSuccess({ tittle: 'REGISTRO DE TIPO DE PRECIO', description: message }));
//             setTimeout(() => dispatch(hideNotification()), 5000);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'REGISTRO DE TIPO DE PRECIO', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// export const updatePrecioVentaAPI = (
//     updatePrecioVentaDto: UpdatePrecioVentaDto,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { userData } = getState().Branch;
//         if (!updatePrecioVentaDto.sucursalId) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.patch('ventas-ms/update-precio-venta',
//                 updatePrecioVentaDto, { headers: { "X-User-Id": userData.id } }
//             );
//             const { data, message }: { data: PrecioVenta, message: string } = response.data;
//             dispatch(updatePrecioVenta(data));
//             dispatch(showNotificationSuccess({ tittle: 'MODIFICACIÓN DE TIPO DE PRECIO', description: message }));
//             setTimeout(() => dispatch(hideNotification()), 5000);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'MODIFICACIÓN DE TIPO DE PRECIO', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// export const deletePrecioVentaAPI = (
//     deletePrecioVentaDto: DeletePrecioVentaDto,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { userData } = getState().Branch;
//         if (!deletePrecioVentaDto.sucursalId) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.delete('ventas-ms/delete-precio-venta',
//                 { headers: { "X-User-Id": userData.id }, data: deletePrecioVentaDto }
//             );
//             const { data, message }: { data: PrecioVenta, message: string } = response.data;
//             dispatch(deletePrecioVenta(data.id));
//             dispatch(showNotificationSuccess({ tittle: 'ELIMINACIÓN DE TIPO DE PRECIO', description: message }));
//             setTimeout(() => dispatch(hideNotification()), 5000);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'ELIMINACIÓN DE TIPO DE PRECIO', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// //* -------------------------------------------- OPCIONES VENTA ----------------------------------------------------------
// export const getOpcionesVentaAPI = (
//     navigate: (path: string) => void,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { id } = getState().Branch;
//         if (!id) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.get(`ventas-ms/get-opciones-venta/${id}`);
//             const { data }: { data: OpcionesVenta } = response;
//             dispatch(getOpcionesVenta(data));

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationWarning({ tittle: 'OPCIONES DE VENTA', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//                 navigate('/main/ventas/opciones');
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// export const createOpcionesVentaAPI = (
//     createOpcionesVentaDto: CreateOpcionesVentaDto,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { userData } = getState().Branch;
//         if (!createOpcionesVentaDto.sucursalId) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.post('ventas-ms/create-opciones-venta',
//                 createOpcionesVentaDto, { headers: { "X-User-Id": userData.id } }
//             );
//             const { data, message }: { data: OpcionesVenta, message: string } = response.data;
//             dispatch(getOpcionesVenta(data));
//             dispatch(showNotificationSuccess({ tittle: 'OPCIONES DE VENTA', description: message }));
//             setTimeout(() => dispatch(hideNotification()), 5000);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'OPCIONES DE VENTA', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// export const updateOpcionesVentaAPI = (
//     updateOpcionesVentaDto: UpdateOpcionesVentaDto,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { userData } = getState().Branch;
//         if (!updateOpcionesVentaDto.sucursalId) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.patch('ventas-ms/update-opciones-venta',
//                 updateOpcionesVentaDto, { headers: { "X-User-Id": userData.id } }
//             );
//             const { data, message }: { data: OpcionesVenta, message: string } = response.data;
//             dispatch(getOpcionesVenta(data));
//             dispatch(showNotificationSuccess({ tittle: 'OPCIONES DE VENTA', description: message }));
//             setTimeout(() => dispatch(hideNotification()), 5000);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'OPCIONES DE VENTA', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);

//             } else console.log(error);
//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// //* -------------------------------------------- PRODUCTOS VENTA ----------------------------------------------------------

// export const getAllProductosVentaAPI = (
//     precioVentaId: string,
//     almacenId: string,
//     setLista?: React.Dispatch<React.SetStateAction<ProductoTienda[]>>,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { id } = getState().Branch;
//         const { products: listaProductos } = getState().Products;
//         if (!id || precioVentaId === '' || almacenId === '') return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const responseVenta: AxiosResponse = await api.get(`ventas-ms/get-all-productos-venta/${precioVentaId}/${almacenId}`);
//             const productosVenta: ProductoVenta[] = responseVenta.data;
//             const productosVentaObj = productosVenta.reduce((acc, producto) => { acc[producto.productoId] = producto; return acc; }, {} as Record<string, ProductoVenta>);

//             const responceAlmacen: AxiosResponse = await api.get(`almacenes-ms/get-all-productos-almacen/${almacenId}`);
//             const productosAlmacen: ProductoAlmacen[] = responceAlmacen.data.data;
//             const productosAlmacenObj = productosAlmacen.reduce((acc, producto) => { acc[producto.productoId] = producto; return acc; }, {} as Record<string, ProductoAlmacen>);

//             const productosTienda: ProductoTienda[] = listaProductos.map(p => ({
//                 id: productosVentaObj[p.id]?.id || '',
//                 productoId: p.id,
//                 productoAlmacenId: productosAlmacenObj[p.id]?.id || '',
//                 Categoria: p.Categoria,
//                 Marca: p.Marca,
//                 UnidadMedida: p.UnidadMedida,
//                 codigo: p.code,
//                 imagen: p.image,
//                 descripcion: p.description,
//                 nombre: p.name,
//                 cantidad: productosAlmacenObj[p.id]?.cantidad || 0,
//                 precio: productosVentaObj[p.id]?.precio || '-',
//                 createdAt: productosVentaObj[p.id]?.createdAt,
//                 updatedAt: productosVentaObj[p.id]?.updatedAt,
//                 show: true,
//                 check: false
//             }))
//             dispatch(getAllProductosVenta(productosTienda));
//             if (setLista) setLista(productosTienda); //* Agrega los productos al componente de las ventas, para evitar usar el useEffect

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationWarning({ tittle: 'PRODUCTOS EN VENTA', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// export const createProductoVentaAPI = (
//     createProductoVentaDto: CreateProductoVentaDto,
//     setLista?: React.Dispatch<React.SetStateAction<ProductoTienda[]>>,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { id: sucursalId, userData } = getState().Branch;
//         const { listaProductosTienda } = getState().Ventas;
//         if (!sucursalId) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.post(`ventas-ms/create-producto-venta`,
//                 createProductoVentaDto, { headers: { "X-User-Id": userData.id } }
//             );

//             const { data, message }: { data: ProductoVenta, message: string } = response.data;

//             const { id, precio, productoId, updatedAt } = data;

//             //* EDITANDO SOLO EL PRECIO Y ID DEL PRODUCTO INDICADO 
//             const index = listaProductosTienda.findIndex((p) => p.productoId === productoId);
//             if (index === -1) return;
//             const newProductosTienda = [...listaProductosTienda];
//             newProductosTienda[index] = { ...newProductosTienda[index], id, precio, updatedAt };
//             dispatch(getAllProductosVenta(newProductosTienda));

//             if (setLista) setLista(newProductosTienda); //* Agrega los productos al componente de las ventas, para evitar usar el useEffect

//             dispatch(showNotificationSuccess({ tittle: 'PRECIO DE PRODUCTO', description: message }));
//             setTimeout(() => dispatch(hideNotification()), 5000);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationWarning({ tittle: 'PRECIO DE PRODUCTO', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// export const updateProductoVentaAPI = (
//     updateProductoVentaDto: UpdateProductoVentaDto,
//     setLista?: React.Dispatch<React.SetStateAction<ProductoTienda[]>>,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { id: sucursalId, userData } = getState().Branch;
//         const { listaProductosTienda } = getState().Ventas;
//         if (!sucursalId) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.patch(`ventas-ms/update-producto-venta`,
//                 updateProductoVentaDto, { headers: { "X-User-Id": userData.id } }
//             );

//             const { data, message }: { data: ProductoVenta, message: string } = response.data;

//             const { precio, productoId, updatedAt } = data;

//             //* EDITANDO SOLO EL PRECIO DEL PRODUCTO INDICADO 
//             const index = listaProductosTienda.findIndex((p) => p.productoId === productoId);
//             if (index === -1) return;
//             const newProductosTienda = [...listaProductosTienda];
//             newProductosTienda[index] = { ...newProductosTienda[index], precio, updatedAt };
//             dispatch(getAllProductosVenta(newProductosTienda));

//             if (setLista) setLista(newProductosTienda); //* Agrega los productos al componente de las ventas, para evitar usar el useEffect

//             dispatch(showNotificationSuccess({ tittle: 'PRECIO DE PRODUCTO', description: message }));
//             setTimeout(() => dispatch(hideNotification()), 5000);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationWarning({ tittle: 'PRECIO DE PRODUCTO', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// //* -------------------------------------------- COTIZACION VENTA ----------------------------------------------------------

// export const createCotizacionVentaAPI = (
//     createCotizacionVentaDto: CreateCotizacionVentaDto,
//     setUltimaCotizacion?: React.Dispatch<React.SetStateAction<CotizacionVenta>>,
//     setOpenViewCotizacion?: React.Dispatch<React.SetStateAction<boolean>>,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { id: sucursalId } = getState().Branch;
//         if (!sucursalId) return;

//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.post('ventas-ms/create-cotizacion-venta', createCotizacionVentaDto);
//             const { data, message }: { data: CotizacionVenta, message: string } = response.data;

//             // console.log(data);

//             if (setUltimaCotizacion && setOpenViewCotizacion) {
//                 setUltimaCotizacion(data);
//                 setOpenViewCotizacion(true);
//             }

//             dispatch(showNotificationSuccess({ tittle: 'COTIZACION DE VENTA', description: message }));
//             setTimeout(() => dispatch(hideNotification()), 5000);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());

//         } catch (error) {
//             console.log(error)
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'COTIZACION DE VENTA', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// export const getCotizacionesVentaAPI = (
//     getCotizacionesVentaDto: GetCotizacionesVentaDto,
//     setListaCotizacionesVenta: React.Dispatch<React.SetStateAction<CotizacionVenta[]>>,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch) => {
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.post(`ventas-ms/get-cotizaciones-venta`, getCotizacionesVentaDto);
//             const data: CotizacionVenta[] = response.data;
//             // console.log(response.data);
//             setListaCotizacionesVenta(data);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             console.log(error);
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'LISTA DE COTIZACIONES', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// //* -------------------------------------------- VENTA ----------------------------------------------------------

// export const createVentaAPI = (
//     createVentaDto: CreateVentaDto,
//     listDecrementProductosAlmacenDto: ListTransactionProductosAlmacenDto,
//     setUltimaVenta?: React.Dispatch<React.SetStateAction<Venta>>,
//     setOpenViewVenta?: React.Dispatch<React.SetStateAction<boolean>>,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { id: sucursalId } = getState().Branch;
//         if (!sucursalId) return;

//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.post('ventas-ms/create-venta', createVentaDto);
//             const { data, message }: { data: Venta, message: string } = response.data;

//             if (setUltimaVenta && setOpenViewVenta) {
//                 setUltimaVenta(data);
//                 setOpenViewVenta(true);
//             }

//             dispatch(decrementProdutosAlmacenAPI(listDecrementProductosAlmacenDto)); // Disminuye los productos del almacen correspondiente
//             dispatch(decrementProductos(listDecrementProductosAlmacenDto)); // Disminuye los productos de la lista de la tienda
//             dispatch(showNotificationSuccess({ tittle: 'VENTA', description: message }));
//             setTimeout(() => dispatch(hideNotification()), 5000);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             // console.log(error)
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'VENTA', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);

//             } else console.log(error);
//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// export const getVentasAPI = (
//     getCotizacionesVentaDto: GetCotizacionesVentaDto,
//     setListaVentas: React.Dispatch<React.SetStateAction<Venta[]>>,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch) => {
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.post(`ventas-ms/get-ventas`, getCotizacionesVentaDto);
//             // console.log(response.data);
//             const data: Venta[] = response.data;
//             setListaVentas(data);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 const { data } = error.response;
//                 dispatch(showNotificationError({ tittle: 'LISTA DE VENTAS', description: data.message }));
//                 setTimeout(() => dispatch(hideNotification()), 5000);
//             } else console.log(error);

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }

// //* -------------------------------------------- LOGS ----------------------------------------------------------

// export const getLogsVentasAPI = (
//     desde: string,
//     hasta: string,
//     loading?: 'LOADING-DATA-START' | 'LOADING-DATA-FINISH' | 'LOADING-DATA-COMPLETE' | 'LOADING-APP-START' | 'LOADING-APP-FINISH' | 'LOADING-APP-COMPLETE',
// ) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { id: sucursalId } = getState().Branch;
//         if (!sucursalId) return;
//         try {
//             if ((loading === 'LOADING-DATA-START') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(startLoadingData());
//             if ((loading === 'LOADING-APP-START') || (loading === 'LOADING-APP-COMPLETE')) dispatch(startLoadingAplication());

//             const response: AxiosResponse = await api.post(`ventas-ms/get-logs`, { sucursalId, desde, hasta });
//             dispatch(getLogsVentas(response.data));

//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         } catch (error) {
//             console.log(error);
//             if ((loading === 'LOADING-DATA-FINISH') || (loading === 'LOADING-DATA-COMPLETE')) dispatch(finishLoadingData());
//             if ((loading === 'LOADING-APP-FINISH') || (loading === 'LOADING-APP-COMPLETE')) dispatch(finishLoadingAplication());
//         }
//     }
// }