import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Log, Categoria, Marca, Producto, UnidadMedida, UnidadMedidaSucursal } from "../../interface";

interface InitialStateInterface {
    idUltimoProductoEliminado: string;
    idUltimaMarcaEliminada: string;
    idUltimaCategoriaEliminada: string;
    listaProductos: Producto[],
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
        //     const newListaProductos:Producto[] = action.payload.map(p => {
        //         // console.log(p);
        //     return {
        //       id: p.id,
        //       sucursalId: p.sucursalId,
        //       codigo: p.codigo,
        //       nombre: p.nombre,
        //       deleted: p.deleted,
        //       descripcion: p.descripcion,
        //       imagen: p.imagen,
        //       marca: p.Marca.nombre,
        //       marcaId: p.marcaId,
        //       categoria: p.Categoria.nombre,
        //       categoriaId: p.categoriaId,
        //       unidadMedida: p.UnidadMedida.nombre,
        //       unidadMedidaAbreviada: p.UnidadMedida.abreviatura,
        //       unidadMedidaId: p.unidadMedidaId,
        //       createdAt: p.createdAt,
        //       updatedAt: p.updatedAt
        //     }}
        // );
            state.listaProductos = [...action.payload];
        },
        createProducto: (state, action: PayloadAction<Producto>) => {
            // const newProducto:Producto = {
            //     id: action.payload.id,
            //     sucursalId: action.payload.sucursalId,
            //     codigo: action.payload.codigo,
            //     nombre: action.payload.nombre,
            //     deleted: action.payload.deleted,
            //     descripcion: action.payload.descripcion,
            //     imagen: action.payload.imagen,
            //     marca: action.payload.Marca.nombre,
            //     marcaId: action.payload.marcaId,
            //     categoria: action.payload.Categoria.nombre,
            //     categoriaId: action.payload.categoriaId,
            //     unidadMedida: action.payload.UnidadMedida.nombre,
            //     unidadMedidaAbreviada: action.payload.UnidadMedida.abreviatura,
            //     unidadMedidaId: action.payload.unidadMedidaId,
            //     createdAt: action.payload.createdAt,
            //     updatedAt: action.payload.updatedAt
            //   };
            state.listaProductos = [action.payload, ...state.listaProductos]
        },
        deleteProducto: (state, action: PayloadAction<string>) => {
            const newListaProductos = state.listaProductos.filter(p => p.id !== action.payload);
            state.listaProductos = [...newListaProductos];
            state.idUltimoProductoEliminado = action.payload;
        },
        updateProducto: (state, action: PayloadAction<Producto>) => {
            // const updatedProducto:Producto = {
            //     id: action.payload.id,
            //     sucursalId: action.payload.sucursalId,
            //     codigo: action.payload.codigo,
            //     nombre: action.payload.nombre,
            //     deleted: action.payload.deleted,
            //     descripcion: action.payload.descripcion,
            //     imagen: action.payload.imagen,
            //     marca: action.payload.Marca.nombre,
            //     marcaId: action.payload.marcaId,
            //     categoria: action.payload.Categoria.nombre,
            //     categoriaId: action.payload.categoriaId,
            //     unidadMedida: action.payload.UnidadMedida.nombre,
            //     unidadMedidaAbreviada: action.payload.UnidadMedida.abreviatura,
            //     unidadMedidaId: action.payload.unidadMedidaId,
            //     createdAt: action.payload.createdAt,
            //     updatedAt: action.payload.updatedAt
            //   };
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