import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { DocEntry, DocTransfer, initialWarehouse, Log, Product, ProductWarehouse, User, Warehouse } from "../../interfaces";

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
    warehouseSelected: initialWarehouse,
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
        createUserWarehouseSale:(state, action: PayloadAction<User>) => {
            const newUserWarehouse = action.payload;
            state.warehouses = current(state.warehouses).map(w => (w.id === newUserWarehouse.warehouseId)?{...w, User:[...w.User, newUserWarehouse]}:w);
        },
        deleteUserWarehouseSale:(state, action: PayloadAction<{userId: string, warehouseId: string}>) => {
            const {userId, warehouseId} = action.payload;
            state.warehouses = current(state.warehouses).map(w => {
                if(w.id === warehouseId){
                    const newUsers = w.User.filter(u => u.id !== userId);
                    return {...w, User: newUsers}
                } else return w
            })
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
        updatePriceProductWarehouse: (state, action: PayloadAction<Product>) => {
            const productWarehouse: ProductWarehouse[] = current(state.productsWarehouse)
                .map(p => p.productId === action.payload.id? {...p, Product: action.payload} : p);
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
    createUserWarehouseSale,
    deleteUserWarehouseSale,
    deleteWarehouse,

    getProductsWarehouse,
    createManyProductsWarehouse,
    createProductWarehouse,
    updateProductWarehouse,
    updatePriceProductWarehouse,
    updateManyProductsWarehouse,

    getDocTransfers,
    createDocTransfer,

    getDocEntries,
    clearDocEntries,

    getWarehouseLogs

} = WarehousesSlice.actions;
export default WarehousesSlice.reducer;