import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { ClienteVenta, TransactionProductoAlmacenDto, ListTransactionProductosAlmacenDto, Log, OpcionesVenta, PrecioVenta, ProductoTienda, TipoMonedaVenta } from "../../interface";


interface VentasInitialState {
    idUltimoTipoMonedaVentaEliminado: string,
    idUltimoPrecioVentaEliminado: string,
    opcionesVenta: OpcionesVenta | null,
    listaProductosTienda: ProductoTienda[],
    listaClientes: ClienteVenta[];
    listaTipoMonedaVenta: TipoMonedaVenta[];
    listaPrecioVenta: PrecioVenta[];
    listaLogs: Log[];
}

const initialState: VentasInitialState = {
    idUltimoTipoMonedaVentaEliminado:'',
    idUltimoPrecioVentaEliminado: '',
    opcionesVenta: null,
    listaProductosTienda: [],
    listaClientes: [],
    listaTipoMonedaVenta: [],
    listaPrecioVenta: [],
    listaLogs:[]
}

const VentasSlice = createSlice({
    name: 'ventas',
    initialState,
    reducers: {
        getAllProductosVenta: (state, action: PayloadAction<ProductoTienda[]>) => {
            state.listaProductosTienda= action.payload;
        },
        decrementProductos: (state, action: PayloadAction<ListTransactionProductosAlmacenDto>) => {
            const {productos} = action.payload;
            const productosObj = productos.reduce((acc, p) => { acc[p.productoAlmacenId] = p; return acc; }, {} as Record<string, TransactionProductoAlmacenDto>);
            const newListaProductos:ProductoTienda[] = current(state.listaProductosTienda).map(p => {
                if(productosObj[p.productoAlmacenId]){
                    return {...p, cantidad: (p.cantidad - productosObj[p.productoAlmacenId].cantidad)}
                }else return {...p}
            });
            state.listaProductosTienda = [...newListaProductos];
        },
        getAllClientesVenta: (state, action: PayloadAction<ClienteVenta[]>) => {
            state.listaClientes = action.payload;
        },
        createClienteVenta: (state, action: PayloadAction<ClienteVenta>) => {
            state.listaClientes = [action.payload, ...state.listaClientes];
        },
        updateClienteVenta: (state, action: PayloadAction<ClienteVenta>) => {
            const updateListaClientes = current(state.listaClientes).map(p => (p.id === action.payload.id) ? action.payload : p);
            state.listaClientes = [...updateListaClientes];
        },

        getAllTipoMonedaVenta: (state, action: PayloadAction<TipoMonedaVenta[]>) => {
            state.listaTipoMonedaVenta = action.payload;
        },
        createTipoMonedaVenta: (state, action: PayloadAction<TipoMonedaVenta>) => {
            state.listaTipoMonedaVenta = [action.payload, ...state.listaTipoMonedaVenta];
        },
        updateTipoMonedaVenta: (state, action: PayloadAction<TipoMonedaVenta>) => {
            const updateListaTipoMoneda = current(state.listaTipoMonedaVenta).map(tm => (tm.id === action.payload.id) ? action.payload : tm);
            state.listaTipoMonedaVenta = [...updateListaTipoMoneda];
        },
        deleteTipoMonedaVenta: (state, action: PayloadAction<string>) => {
            const newListaTipoMoneda = state.listaTipoMonedaVenta.filter(tm => tm.id !== action.payload);
            state.listaTipoMonedaVenta = [...newListaTipoMoneda];
            state.idUltimoTipoMonedaVentaEliminado = action.payload;
        },
        resetIdUltimoTipoMonedaVentaEliminado: (state) => {
            state.idUltimoTipoMonedaVentaEliminado = '';
        },

        getAllPrecioVenta: (state, action: PayloadAction<PrecioVenta[]>) => {
            state.listaPrecioVenta = action.payload;
        },
        createPrecioVenta: (state, action: PayloadAction<PrecioVenta>) => {
            state.listaPrecioVenta = [action.payload, ...state.listaPrecioVenta];
        },
        updatePrecioVenta: (state, action: PayloadAction<PrecioVenta>) => {
            const updateListaPrecio = current(state.listaPrecioVenta).map(tm => (tm.id === action.payload.id) ? action.payload : tm);
            state.listaPrecioVenta = [...updateListaPrecio];
        },
        deletePrecioVenta: (state, action: PayloadAction<string>) => {
            const newListaPrecio = state.listaPrecioVenta.filter(tm => tm.id !== action.payload);
            state.listaPrecioVenta = [...newListaPrecio];
            state.idUltimoPrecioVentaEliminado = action.payload;
        },
        resetIdUltimoPrecioVentaEliminado: (state) => {
            state.idUltimoPrecioVentaEliminado = '';
        },

        getOpcionesVenta: (state, action: PayloadAction<OpcionesVenta>) => {
            state.opcionesVenta = action.payload;
        },
        
        getLogsVentas: (state, action: PayloadAction<Log[]>) => {
            state.listaLogs = [...action.payload];
        },
    }
});

export const {
    getAllProductosVenta,
    decrementProductos,

    getAllClientesVenta,
    createClienteVenta,
    updateClienteVenta,

    getAllTipoMonedaVenta,
    createTipoMonedaVenta,
    updateTipoMonedaVenta,
    deleteTipoMonedaVenta,
    resetIdUltimoTipoMonedaVentaEliminado,

    getAllPrecioVenta,
    createPrecioVenta,
    updatePrecioVenta,
    deletePrecioVenta,
    resetIdUltimoPrecioVentaEliminado,

    getOpcionesVenta,
    
    getLogsVentas,

} = VentasSlice.actions

export default VentasSlice.reducer