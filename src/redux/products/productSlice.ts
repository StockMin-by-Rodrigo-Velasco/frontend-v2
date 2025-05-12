import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Log, Category, Brand, Product, UnitMeasure, UnitMeasureBranch } from "../../interfaces";

interface InitialState {
    idDeletedProduct: string;
    idDeletedBrand: string;
    idDeletedCategory: string;
    products: Product[],
    brands: Brand[],
    categories: Category[],
    unitMeasures: UnitMeasure[],
    unitMeasuresBranch: UnitMeasureBranch[],
    logs: Log[],
}

const initialState: InitialState = {
    idDeletedProduct: '',
    idDeletedBrand: '',
    idDeletedCategory: '',
    products: [],
    brands: [],
    categories: [],
    unitMeasures:[],
    unitMeasuresBranch:[],
    logs: [],
}
const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = [...action.payload];
        },
        createProduct: (state, action: PayloadAction<Product>) => {
            state.products = [action.payload, ...state.products]
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            const newListaProductos = state.products.filter(p => p.id !== action.payload);
            state.products = [...newListaProductos];
            state.idDeletedProduct = action.payload;
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const updateListaProductos = current(state.products).map(p => (p.id === action.payload.id)?action.payload:p);
            state.products = [...updateListaProductos];
        },
        getBrands: (state, action: PayloadAction<Brand[]>) => {
            state.brands = [...action.payload];
        },
        createBrand: (state, action: PayloadAction<Brand>) => {
            state.brands = [action.payload, ...state.brands]
        },
        deleteBrand: (state, action: PayloadAction<string>) => {
            const newListaMarcas = state.brands.filter(m => m.id !== action.payload);
            state.brands = [...newListaMarcas];
            state.idDeletedBrand = action.payload;
        },
        updateBrand: (state, action: PayloadAction<Brand>) => {
            const updateListaMarcas = current(state.brands).map(m => (m.id === action.payload.id)?action.payload:m);
            state.brands = [...updateListaMarcas];
        },
        getCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = [...action.payload];
        },
        createCategories: (state, action: PayloadAction<Category>) => {
            state.categories = [action.payload, ...state.categories]
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            const newListaCategorias = state.categories.filter(m => m.id !== action.payload);
            state.categories = [...newListaCategorias];
            state.idDeletedCategory = action.payload;
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            const updateListaCategorias = current(state.categories).map(c => (c.id === action.payload.id)?action.payload:c);
            state.categories = [...updateListaCategorias];
        },
        getUnitMeasures: (state, action: PayloadAction<UnitMeasure[]>) => {
            state.unitMeasures = [...action.payload];
        },
        getUnitMeasuresBranch: (state, action: PayloadAction<UnitMeasureBranch[]>) => {
            state.unitMeasuresBranch = [...action.payload];
        },
        toggleUnitMeasure: (state, action: PayloadAction<UnitMeasureBranch>) =>{
            if(action.payload.deleted){
                state.unitMeasuresBranch = current(state.unitMeasuresBranch).filter(um => um.id !== action.payload.id)
            }else{
                state.unitMeasuresBranch = [action.payload, ...state.unitMeasuresBranch]
            }
        },
        getProductLogs: (state, action: PayloadAction<Log[]>) => {
            state.logs = [...action.payload];
        },
    }
});

export const {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,

    getBrands,
    createBrand,
    deleteBrand,
    updateBrand,

    getCategories,
    createCategories,
    deleteCategory,
    updateCategory,

    getUnitMeasures,
    getUnitMeasuresBranch,
    toggleUnitMeasure,

    getProductLogs,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;