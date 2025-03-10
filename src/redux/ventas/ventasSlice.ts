import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { ClienteVenta, Log } from "../../interface";


interface VentasInitialState {
    listaClientes: ClienteVenta[];
    listaLogs: Log[];
}

const initialState: VentasInitialState = {
    listaClientes: [],
    listaLogs:[]
}

const VentasSlice = createSlice({
    name: 'ventas',
    initialState,
    reducers: {
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



        getLogsAlmacenes: (state, action: PayloadAction<Log[]>) => {
            state.listaLogs = [...action.payload];
        },
    }
});

export const {
    getAllClientesVenta,
    createClienteVenta,
    updateClienteVenta,

    getLogsAlmacenes

} = VentasSlice.actions

export default VentasSlice.reducer