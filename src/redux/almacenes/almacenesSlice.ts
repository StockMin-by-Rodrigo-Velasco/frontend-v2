import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        createAlmacen: (state, action: PayloadAction<AlmacenInterface>) => {
            state.listaAlmacenes = [action.payload,...state.listaAlmacenes]
        }
    }
});


export const {
    getAllAlmacenes,
    selectAlmacen,
    createAlmacen,

} = AlmacenesSlice.actions;
export default AlmacenesSlice.reducer;