import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AlmacenInterface, ProductoAlmacenDetalladoInterface, ProductoAlmacenInterface } from "../../interface";


export interface ProductoAlmacenWithOutIdInterface {
    productoId: string;
    almacenId: string;
    cantidad: number;
    cantidadMinima: number;
    createdAt: number;
    updatedAt: number;
}

interface InitialStateInterface {
    selectedAlmacen: AlmacenInterface;
    listaAlmacenes: AlmacenInterface[];
    listaProductosAlmacen: ProductoAlmacenDetalladoInterface[];
}

const initialState: InitialStateInterface = {
    listaAlmacenes: [],
    listaProductosAlmacen: [],
    selectedAlmacen: { id: '', sucursalId: '', nombre: '', descripcion: '', deleted: false, createdAt: 0, updatedAt: 0 }
}

const AlmacenesSlice = createSlice({
    name: 'almacenes',
    initialState,
    reducers: {
        getAllAlmacenes: (state, action: PayloadAction<AlmacenInterface[]>) => {
            state.listaAlmacenes = [...action.payload];
        },
        selectAlmacen: (state, action: PayloadAction<AlmacenInterface>) => {
            state.selectedAlmacen = action.payload;
        },
        resetSelectAlmacen: (state) => {
            state.selectedAlmacen = initialState.selectedAlmacen;
        },
        createAlmacen: (state, action: PayloadAction<AlmacenInterface>) => {
            state.listaAlmacenes = [action.payload,...state.listaAlmacenes]
        },
        updateAlmacen: (state, action: PayloadAction<AlmacenInterface>) => {
            state.listaAlmacenes = current(state.listaAlmacenes).map(a => (a.id === action.payload.id)? action.payload : a);
        },
        deleteAlmacen: (state, action: PayloadAction<string>) => {
            state.listaAlmacenes = state.listaAlmacenes.filter(a => a.id !== action.payload);
        },
        getAllProductosAlmacen: (state, action: PayloadAction<ProductoAlmacenDetalladoInterface[]>) => {
            state.listaProductosAlmacen = action.payload
        },
        createManyProductosAlmacen: (state, action: PayloadAction<ProductoAlmacenDetalladoInterface[]>) => {
            state.listaProductosAlmacen = [ ...action.payload, ...current(state.listaProductosAlmacen) ];
        },
        createProductoAlmacen: (state, action: PayloadAction<ProductoAlmacenDetalladoInterface>) => {
            state.listaProductosAlmacen = [ action.payload, ...current(state.listaProductosAlmacen) ];
        },
        updateProductoAlmacen: (state, action: PayloadAction<ProductoAlmacenInterface>) => {
            const newListaProductosAlmacen:ProductoAlmacenDetalladoInterface[] = current(state.listaProductosAlmacen)
            .map(p => p.id === action.payload.id? {...p, cantidadMinima: action.payload.cantidadMinima, updatedAt: action.payload.updatedAt} : p);

            state.listaProductosAlmacen = [...newListaProductosAlmacen];
        },
        updateManyProductosAlmacen: (state, action: PayloadAction<ProductoAlmacenInterface[]>) => {
            const productosAlmacen = action.payload.reduce((acc, {id, ...res}) => 
                { acc[id] = res; return acc; }, {} as Record<string, ProductoAlmacenWithOutIdInterface>);
           
            const newListaProductosAlmacen:ProductoAlmacenDetalladoInterface[] = current(state.listaProductosAlmacen)
            .map(p => (p.id in productosAlmacen)? {...p, ...productosAlmacen[p.id]} : p);

            state.listaProductosAlmacen = [...newListaProductosAlmacen];
        }
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

} = AlmacenesSlice.actions;
export default AlmacenesSlice.reducer;