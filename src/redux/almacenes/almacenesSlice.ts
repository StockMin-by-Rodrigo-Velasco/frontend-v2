import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Almacen, IngresoAlmacen, Log, ProductoAlmacenDetallado, ProductoAlmacen } from "../../interface";


export interface ProductoAlmacenWithOutIdInterface {
    productoId: string;
    almacenId: string;
    cantidad: number;
    cantidadMinima: number;
    createdAt: number;
    updatedAt: number;
}

interface InitialStateInterface {
    selectedAlmacen: Almacen;
    historialIngresosAlmacen: IngresoAlmacen[];
    listaAlmacenes: Almacen[];
    listaProductosAlmacen: ProductoAlmacenDetallado[];
    listaLogs: Log[],
}

const initialState: InitialStateInterface = {
    listaAlmacenes: [],
    historialIngresosAlmacen: [],
    listaProductosAlmacen: [],
    selectedAlmacen: { id: '', sucursalId: '', nombre: '', descripcion: '', deleted: false, createdAt: 0, updatedAt: 0 },
    listaLogs:[]
}

const AlmacenesSlice = createSlice({
    name: 'almacenes',
    initialState,
    reducers: {
        getAllAlmacenes: (state, action: PayloadAction<Almacen[]>) => {
            state.listaAlmacenes = [...action.payload];
        },
        selectAlmacen: (state, action: PayloadAction<Almacen>) => {
            state.selectedAlmacen = action.payload;
        },
        resetSelectAlmacen: (state) => {
            state.selectedAlmacen = initialState.selectedAlmacen;
        },
        createAlmacen: (state, action: PayloadAction<Almacen>) => {
            state.listaAlmacenes = [action.payload,...state.listaAlmacenes]
        },
        updateAlmacen: (state, action: PayloadAction<Almacen>) => {
            state.listaAlmacenes = current(state.listaAlmacenes).map(a => (a.id === action.payload.id)? action.payload : a);
        },
        deleteAlmacen: (state, action: PayloadAction<string>) => {
            state.listaAlmacenes = state.listaAlmacenes.filter(a => a.id !== action.payload);
        },
        getAllProductosAlmacen: (state, action: PayloadAction<ProductoAlmacenDetallado[]>) => {
            state.listaProductosAlmacen = action.payload
        },
        createManyProductosAlmacen: (state, action: PayloadAction<ProductoAlmacenDetallado[]>) => {
            state.listaProductosAlmacen = [ ...action.payload, ...current(state.listaProductosAlmacen) ];
        },
        createProductoAlmacen: (state, action: PayloadAction<ProductoAlmacenDetallado>) => {
            state.listaProductosAlmacen = [ action.payload, ...current(state.listaProductosAlmacen) ];
        },
        updateProductoAlmacen: (state, action: PayloadAction<ProductoAlmacen>) => {
            const newListaProductosAlmacen:ProductoAlmacenDetallado[] = current(state.listaProductosAlmacen)
            .map(p => p.id === action.payload.id? {...p, cantidadMinima: action.payload.cantidadMinima, updatedAt: action.payload.updatedAt} : p);

            state.listaProductosAlmacen = [...newListaProductosAlmacen];
        },
        updateManyProductosAlmacen: (state, action: PayloadAction<ProductoAlmacen[]>) => {
            const productosAlmacen = action.payload.reduce((acc, {id, ...res}) => 
                { acc[id] = res; return acc; }, {} as Record<string, ProductoAlmacenWithOutIdInterface>);
           
            const newListaProductosAlmacen:ProductoAlmacenDetallado[] = current(state.listaProductosAlmacen)
            .map(p => (p.id in productosAlmacen)? {...p, ...productosAlmacen[p.id]} : p);
            state.listaProductosAlmacen = [...newListaProductosAlmacen];
        },
        getAllIngresosProductosAlmacen: (state, action: PayloadAction<IngresoAlmacen[]>) => {
            state.historialIngresosAlmacen = action.payload;
        },
        clearIngresosProductosAlmacen: (state) => {
            state.historialIngresosAlmacen = [];
        },
        getLogsAlmacenes: (state, action: PayloadAction<Log[]>) => {
                    state.listaLogs = [...action.payload];
                },

    }
});


export const {
    getAllAlmacenes,
    selectAlmacen,
    resetSelectAlmacen,
    createAlmacen,
    updateAlmacen,
    deleteAlmacen,

    getAllProductosAlmacen,
    createManyProductosAlmacen,
    createProductoAlmacen,
    updateProductoAlmacen,
    updateManyProductosAlmacen,

    getAllIngresosProductosAlmacen,
    clearIngresosProductosAlmacen,

    getLogsAlmacenes

} = AlmacenesSlice.actions;
export default AlmacenesSlice.reducer;