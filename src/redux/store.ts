import { configureStore } from '@reduxjs/toolkit';
import NotificationSlice from './notification/notificationSlice';
import BranchSlice from './branch/branchSlice';
import AplicationSlice from './aplication/aplicationSlice';
import ProductsSlice from './products/productSlice';
import WarehousesSlice from './warehouses/warehousesSlice';
// import VentasSlice from './sales/ventasSlice';
import SalesSlice from './sales/salesSlice';


export const store = configureStore({
    reducer: {
        Aplication: AplicationSlice,
        Notification: NotificationSlice,
        Branch: BranchSlice,
        Products: ProductsSlice,
        Warehouses: WarehousesSlice,
        Sales: SalesSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;