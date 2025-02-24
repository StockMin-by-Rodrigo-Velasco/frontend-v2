import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { LogInterface, CategoriaInterface, MarcaInterface, ProductoDetalladoInterface, ProductoInterface, UnidadMedidaInterface } from "../../interface";

interface InitialStateInterface {
    idUltimoProductoEliminado: string;
    idUltimaMarcaEliminada: string;
    idUltimaCategoriaEliminada: string;
    listaProductos: ProductoInterface[],
    listaMarcas: MarcaInterface[],
    listaCategorias: CategoriaInterface[],
    listaUnidadesMedida: UnidadMedidaInterface[],
    listaLogs: LogInterface[],
}

const initialState: InitialStateInterface = {
    idUltimoProductoEliminado: '',
    idUltimaMarcaEliminada: '',
    idUltimaCategoriaEliminada: '',
    listaProductos: [],
    listaMarcas: [],
    listaCategorias: [],
    listaUnidadesMedida:[],
    listaLogs: [],
}
const ProductosSlice = createSlice({
    name: 'productos',
    initialState,
    reducers: {
        getAllProductos: (state, action: PayloadAction<ProductoDetalladoInterface[]>) => {
            const newListaProductos:ProductoInterface[] = action.payload.map(p => {
                // console.log(p);
            return {
              id: p.id,
              sucursalId: p.sucursalId,
              codigo: p.codigo,
              nombre: p.nombre,
              activo: p.activo,
              deleted: p.deleted,
              descripcion: p.descripcion,
              imagen: p.imagen,
              marca: p.Marca.nombre,
              marcaId: p.marcaId,
              categoria: p.Categoria.nombre,
              categoriaId: p.categoriaId,
              unidadMedida: p.UnidadMedida.nombre,
              unidadMedidaAbreviada: p.UnidadMedida.abreviatura,
              unidadMedidaId: p.unidadMedidaId,
              createdAt: p.createdAt,
              updatedAt: p.updatedAt
            }}
        );
            state.listaProductos = [...newListaProductos];
        },
        createProducto: (state, action: PayloadAction<ProductoDetalladoInterface>) => {
            const newProducto:ProductoInterface = {
                id: action.payload.id,
                sucursalId: action.payload.sucursalId,
                codigo: action.payload.codigo,
                nombre: action.payload.nombre,
                activo: action.payload.activo,
                deleted: action.payload.deleted,
                descripcion: action.payload.descripcion,
                imagen: action.payload.imagen,
                marca: action.payload.Marca.nombre,
                marcaId: action.payload.marcaId,
                categoria: action.payload.Categoria.nombre,
                categoriaId: action.payload.categoriaId,
                unidadMedida: action.payload.UnidadMedida.nombre,
                unidadMedidaAbreviada: action.payload.UnidadMedida.abreviatura,
                unidadMedidaId: action.payload.unidadMedidaId,
                createdAt: action.payload.createdAt,
                updatedAt: action.payload.updatedAt
              };
            state.listaProductos = [newProducto, ...state.listaProductos]
        },
        deleteProducto: (state, action: PayloadAction<string>) => {
            const newListaProductos = state.listaProductos.filter(p => p.id !== action.payload);
            state.listaProductos = [...newListaProductos];
            state.idUltimoProductoEliminado = action.payload;
        },
        updateProducto: (state, action: PayloadAction<ProductoDetalladoInterface>) => {
            const updatedProducto:ProductoInterface = {
                id: action.payload.id,
                sucursalId: action.payload.sucursalId,
                codigo: action.payload.codigo,
                nombre: action.payload.nombre,
                activo: action.payload.activo,
                deleted: action.payload.deleted,
                descripcion: action.payload.descripcion,
                imagen: action.payload.imagen,
                marca: action.payload.Marca.nombre,
                marcaId: action.payload.marcaId,
                categoria: action.payload.Categoria.nombre,
                categoriaId: action.payload.categoriaId,
                unidadMedida: action.payload.UnidadMedida.nombre,
                unidadMedidaAbreviada: action.payload.UnidadMedida.abreviatura,
                unidadMedidaId: action.payload.unidadMedidaId,
                createdAt: action.payload.createdAt,
                updatedAt: action.payload.updatedAt
              };
            const updateListaProductos = current(state.listaProductos).map(p => (p.id === updatedProducto.id)?updatedProducto:p);
            state.listaProductos = [...updateListaProductos];
        },
        getAllMarcas: (state, action: PayloadAction<MarcaInterface[]>) => {
            state.listaMarcas = [...action.payload];
        },
        createMarca: (state, action: PayloadAction<MarcaInterface>) => {
            state.listaMarcas = [action.payload, ...state.listaMarcas]
        },
        deleteMarca: (state, action: PayloadAction<string>) => {
            const newListaMarcas = state.listaMarcas.filter(m => m.id !== action.payload);
            state.listaMarcas = [...newListaMarcas];
            state.idUltimaMarcaEliminada = action.payload;
        },
        updateMarca: (state, action: PayloadAction<MarcaInterface>) => {
            const updateListaMarcas = current(state.listaMarcas).map(m => (m.id === action.payload.id)?action.payload:m);
            state.listaMarcas = [...updateListaMarcas];
        },
        getAllCategorias: (state, action: PayloadAction<CategoriaInterface[]>) => {
            state.listaCategorias = [...action.payload];
        },
        createCategoria: (state, action: PayloadAction<CategoriaInterface>) => {
            state.listaCategorias = [action.payload, ...state.listaCategorias]
        },
        deleteCategoria: (state, action: PayloadAction<string>) => {
            const newListaCategorias = state.listaCategorias.filter(m => m.id !== action.payload);
            state.listaCategorias = [...newListaCategorias];
            state.idUltimaCategoriaEliminada = action.payload;
        },
        updateCategoria: (state, action: PayloadAction<CategoriaInterface>) => {
            const updateListaCategorias = current(state.listaCategorias).map(c => (c.id === action.payload.id)?action.payload:c);
            state.listaCategorias = [...updateListaCategorias];
        },
        getAllLogs: (state, action: PayloadAction<LogInterface[]>) => {
            state.listaLogs = [...action.payload];
        },
        getAllUnidadesMedida: (state, action: PayloadAction<UnidadMedidaInterface[]>) => {
            state.listaUnidadesMedida = [...action.payload];
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

    getAllLogs,

    getAllUnidadesMedida,

} = ProductosSlice.actions;

export default ProductosSlice.reducer;