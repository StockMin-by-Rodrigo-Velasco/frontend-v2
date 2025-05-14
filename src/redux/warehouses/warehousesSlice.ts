import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { DocEntry, DocTransfer, Log, ProductWarehouse, Warehouse } from "../../interfaces";


export interface ProductoAlmacenWithOutIdInterface {
    productoId: string;
    almacenId: string;
    cantidad: number;
    cantidadMinima: number;
    createdAt: string;
    updatedAt: string;
}

interface InitialState {
    warehouseSelected: Warehouse;
    docEntries: DocEntry[];
    docTransfers: DocTransfer[];
    warehouses: Warehouse[];
    productsWarehouse: ProductWarehouse[];
    logs: Log[],
}

const initialState: InitialState = {
    warehouseSelected: {id: '', branchId: '', name: '', description: '', deleted: false, createdAt: '', updatedAt: ''},
    warehouses: [],
    docEntries: [],
    docTransfers:[],
    productsWarehouse: [],
    logs: []
}

const WarehousesSlice = createSlice({
    name: 'warehouses',
    initialState,
    reducers: {
        getWarehauses: (state, action: PayloadAction<Warehouse[]>) => {
            state.warehouses = [...action.payload];
        },
        loginWarehouse: (state, action: PayloadAction<Warehouse>) => {
            state.warehouseSelected = action.payload;
        },
        logoutWarehouse: (state) => {
            state.warehouseSelected = initialState.warehouseSelected;
            state.productsWarehouse = initialState.productsWarehouse;
        },
        createWarehouse: (state, action: PayloadAction<Warehouse>) => {
            state.warehouses = [action.payload, ...state.warehouses];
        },
        updateWarehouse: (state, action: PayloadAction<Warehouse>) => {
            state.warehouses = current(state.warehouses).map(a => (a.id === action.payload.id) ? action.payload : a);
        },
        deleteWarehouse: (state, action: PayloadAction<string>) => {
            state.warehouses = state.warehouses.filter(a => a.id !== action.payload);
        },
        getProductsWarehouse: (state, action: PayloadAction<ProductWarehouse[]>) => {
            state.productsWarehouse = action.payload
        },
        createManyProductsWarehouse: (state, action: PayloadAction<ProductWarehouse[]>) => {
            state.productsWarehouse = [...action.payload, ...current(state.productsWarehouse)];
        },
        createProductWarehouse: (state, action: PayloadAction<ProductWarehouse>) => {
            state.productsWarehouse = [action.payload, ...current(state.productsWarehouse)];
        },
        updateProductWarehouse: (state, action: PayloadAction<ProductWarehouse>) => {
            const productWarehouse: ProductWarehouse[] = current(state.productsWarehouse)
                .map(p => p.id === action.payload.id? {...p, minQuantity: action.payload.minQuantity, updatedAt: action.payload.updatedAt } : p);

            state.productsWarehouse = [...productWarehouse];
        },
        updateManyProductsWarehouse: (state, action: PayloadAction<ProductWarehouse[]>) => {
            const productsWarehouseObj = action.payload.reduce((acc, p) => { acc[p.id] = p; return acc; }, {} as Record<string, ProductWarehouse>);

            const productsWarehouse: ProductWarehouse[] = current(state.productsWarehouse)
                .map(p => (p.id in productsWarehouseObj) ? {...p, ...productsWarehouseObj[p.id]}:p);
            state.productsWarehouse = [...productsWarehouse];
        },
        getDocTransfers:(state, action: PayloadAction<DocTransfer[]>) =>{
            state.docTransfers = action.payload;
        },
        createDocTransfer:(state, action: PayloadAction<DocTransfer>) =>{
            state.docTransfers = [action.payload, ...state.docTransfers];
        },
        getDocEntries: (state, action: PayloadAction<DocEntry[]>) => {
            state.docEntries = action.payload;
        },
        clearDocEntries: (state) => {
            state.docEntries = [];
        },
        getWarehouseLogs: (state, action: PayloadAction<Log[]>) => {
            state.logs = [...action.payload];
        },

    }
});


export const {
    getWarehauses,
    loginWarehouse,
    logoutWarehouse,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,

    getProductsWarehouse,
    createManyProductsWarehouse,
    createProductWarehouse,
    updateProductWarehouse,
    updateManyProductsWarehouse,

    getDocTransfers,
    createDocTransfer,

    getDocEntries,
    clearDocEntries,

    getWarehouseLogs

} = WarehousesSlice.actions;
export default WarehousesSlice.reducer;