import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Log, Categoria, Marca, Producto, UnidadMedida, UnidadMedidaSucursal } from "../../interface";

interface InitialStateInterface {
    idUltimoProductoEliminado: string;
    idUltimaMarcaEliminada: string;
    idUltimaCategoriaEliminada: string;
    listaProductos: Producto[],
    listaProductosObj: Record<string, Producto>,
    listaMarcas: Marca[],
    listaCategorias: Categoria[],
    listaUnidadesMedida: UnidadMedida[],
    listaUnidadesMedidaSucursal: UnidadMedidaSucursal[],
    listaLogs: Log[],
}

const initialState: InitialStateInterface = {
    idUltimoProductoEliminado: '',
    idUltimaMarcaEliminada: '',
    idUltimaCategoriaEliminada: '',
    listaProductos: [],
    listaProductosObj:{},
    listaMarcas: [],
    listaCategorias: [],
    listaUnidadesMedida:[],
    listaUnidadesMedidaSucursal:[],
    listaLogs: [],
}
const ProductosSlice = createSlice({
    name: 'productos',
    initialState,
    reducers: {
        getAllProductos: (state, action: PayloadAction<Producto[]>) => {
            state.listaProductos = [...action.payload];
            state.listaProductosObj = action.payload.reduce((acc, p) => {acc[p.id] = p; return acc}, {} as Record<string, Producto>);
        },
        createProducto: (state, action: PayloadAction<Producto>) => {
            state.listaProductos = [action.payload, ...state.listaProductos]
        },
        deleteProducto: (state, action: PayloadAction<string>) => {
            const newListaProductos = state.listaProductos.filter(p => p.id !== action.payload);
            state.listaProductos = [...newListaProductos];
            state.idUltimoProductoEliminado = action.payload;
        },
        updateProducto: (state, action: PayloadAction<Producto>) => {
            const updateListaProductos = current(state.listaProductos).map(p => (p.id === action.payload.id)?action.payload:p);
            state.listaProductos = [...updateListaProductos];
        },
        getAllMarcas: (state, action: PayloadAction<Marca[]>) => {
            state.listaMarcas = [...action.payload];
        },
        createMarca: (state, action: PayloadAction<Marca>) => {
            state.listaMarcas = [action.payload, ...state.listaMarcas]
        },
        deleteMarca: (state, action: PayloadAction<string>) => {
            const newListaMarcas = state.listaMarcas.filter(m => m.id !== action.payload);
            state.listaMarcas = [...newListaMarcas];
            state.idUltimaMarcaEliminada = action.payload;
        },
        updateMarca: (state, action: PayloadAction<Marca>) => {
            const updateListaMarcas = current(state.listaMarcas).map(m => (m.id === action.payload.id)?action.payload:m);
            state.listaMarcas = [...updateListaMarcas];
        },
        getAllCategorias: (state, action: PayloadAction<Categoria[]>) => {
            state.listaCategorias = [...action.payload];
        },
        createCategoria: (state, action: PayloadAction<Categoria>) => {
            state.listaCategorias = [action.payload, ...state.listaCategorias]
        },
        deleteCategoria: (state, action: PayloadAction<string>) => {
            const newListaCategorias = state.listaCategorias.filter(m => m.id !== action.payload);
            state.listaCategorias = [...newListaCategorias];
            state.idUltimaCategoriaEliminada = action.payload;
        },
        updateCategoria: (state, action: PayloadAction<Categoria>) => {
            const updateListaCategorias = current(state.listaCategorias).map(c => (c.id === action.payload.id)?action.payload:c);
            state.listaCategorias = [...updateListaCategorias];
        },
        getAllUnidadesMedida: (state, action: PayloadAction<UnidadMedida[]>) => {
            state.listaUnidadesMedida = [...action.payload];
        },
        getAllUnidadesMedidaSucursal: (state, action: PayloadAction<UnidadMedidaSucursal[]>) => {
            state.listaUnidadesMedidaSucursal = [...action.payload];
        },
        handleUnidadMedida: (state, action: PayloadAction<UnidadMedidaSucursal>) =>{
            if(action.payload.deleted){
                state.listaUnidadesMedidaSucursal = current(state.listaUnidadesMedidaSucursal).filter(um => um.id !== action.payload.id)
            }else{
                state.listaUnidadesMedidaSucursal = [action.payload, ...state.listaUnidadesMedidaSucursal]
            }
        },
        getLogsProductos: (state, action: PayloadAction<Log[]>) => {
            state.listaLogs = [...action.payload];
        },
    }
});

export const {
    getAllProductos,
    createProducto,
    deleteProducto,
    updateProducto,

    getAllMarcas,
    createMarca,
    deleteMarca,
    updateMarca,

    getAllCategorias,
    createCategoria,
    deleteCategoria,
    updateCategoria,

    getLogsProductos,

    getAllUnidadesMedida,
    getAllUnidadesMedidaSucursal,
    handleUnidadMedida,

} = ProductosSlice.actions;

export default ProductosSlice.reducer;