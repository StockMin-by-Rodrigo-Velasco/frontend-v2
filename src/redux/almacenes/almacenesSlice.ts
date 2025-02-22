import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AlmacenInterface } from "../../interface";




interface InitialStateInterface {
    listaAlmacenes: AlmacenInterface[];
    selectedAlmacen: AlmacenInterface;
}

const initialState: InitialStateInterface = {
    listaAlmacenes: [],
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

} = AlmacenesSlice.actions;
export default AlmacenesSlice.reducer;