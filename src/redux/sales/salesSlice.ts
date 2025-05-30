import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Currency, Customer, Log } from "../../interfaces";

interface SalesInitialState {
    // idUltimoTipoMonedaVentaEliminado: string,
    // idUltimoPrecioVentaEliminado: string,
    // opcionesVenta: OpcionesVenta,
    // listaProductosTienda: ProductoTienda[],
    customers: Customer[];
    currencies: Currency[];
    // listaPrecioVenta: PrecioVenta[];
    // listaPrecioVentaObj: Record<string, PrecioVenta>;
    logs: Log[];
}

const initialState: SalesInitialState = {
    // idUltimoTipoMonedaVentaEliminado:'',
    // idUltimoPrecioVentaEliminado: '',
    // opcionesVenta: initialOpciones,
    // listaProductosTienda: [],
    customers: [],
    currencies: [],
    // listaPrecioVenta: [],
    // listaPrecioVentaObj:{},
    logs:[]
}

const SalesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        // getAllProductosVenta: (state, action: PayloadAction<ProductoTienda[]>) => {
        //     state.listaProductosTienda= action.payload;
        // },
        // decrementProductos: (state, action: PayloadAction<ListTransactionProductosAlmacenDto>) => {
        //     const {productos} = action.payload;
        //     const productosObj = productos.reduce((acc, p) => { acc[p.productoAlmacenId] = p; return acc; }, {} as Record<string, TransactionProductoAlmacenDto>);
        //     const newListaProductos:ProductoTienda[] = current(state.listaProductosTienda).map(p => {
        //         if(productosObj[p.productoAlmacenId]){
        //             return {...p, cantidad: (p.cantidad - productosObj[p.productoAlmacenId].cantidad)}
        //         }else return {...p}
        //     });
        //     state.listaProductosTienda = [...newListaProductos];
        // },
        getCustomers: (state, action: PayloadAction<Customer[]>) => {
            state.customers = action.payload;
        },
        createCustomer: (state, action: PayloadAction<Customer>) => {
            state.customers = [action.payload, ...state.customers];
        },
        updateCustomer: (state, action: PayloadAction<Customer>) => {
            const updateListaClientes = current(state.customers).map(p => (p.id === action.payload.id) ? action.payload : p);
            state.customers = [...updateListaClientes];
        },

        getCurrencies: (state, action: PayloadAction<Currency[]>) => {
            state.currencies = action.payload;
        },


        // getAllPrecioVenta: (state, action: PayloadAction<PrecioVenta[]>) => {
        //     state.listaPrecioVenta = action.payload;
        // },
        // createPrecioVenta: (state, action: PayloadAction<PrecioVenta>) => {
        //     state.listaPrecioVenta = [action.payload, ...state.listaPrecioVenta];
        // },
        // updatePrecioVenta: (state, action: PayloadAction<PrecioVenta>) => {
        //     const updateListaPrecio = current(state.listaPrecioVenta).map(tm => (tm.id === action.payload.id) ? action.payload : tm);
        //     state.listaPrecioVenta = [...updateListaPrecio];
        // },
        // deletePrecioVenta: (state, action: PayloadAction<string>) => {
        //     const newListaPrecio = state.listaPrecioVenta.filter(tm => tm.id !== action.payload);
        //     state.listaPrecioVenta = [...newListaPrecio];
        //     state.idUltimoPrecioVentaEliminado = action.payload;
        // },
        // resetIdUltimoPrecioVentaEliminado: (state) => {
        //     state.idUltimoPrecioVentaEliminado = '';
        // },

        // getOpcionesVenta: (state, action: PayloadAction<OpcionesVenta>) => {
        //     state.opcionesVenta = action.payload;
        // },
        getSalesLogs: (state, action: PayloadAction<Log[]>) => {
            state.logs = [...action.payload];
        },
    }
});

export const {
    getCustomers,
    createCustomer,
    updateCustomer,

    getCurrencies,
    
    getSalesLogs,

} = SalesSlice.actions

export default SalesSlice.reducer