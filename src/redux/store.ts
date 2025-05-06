import { configureStore } from '@reduxjs/toolkit';
import NotificationSlice from './notification/notificationSlice';
import BranchSlice from './branch/branchSlice';
import AplicationSlice from './aplication/aplicationSlice';
import ProductsSlice from './products/productosSlice';
// import AlmacenesSlice from './warehouses/almacenesSlice';
// import VentasSlice from './sales/ventasSlice';


export const store = configureStore({
    reducer: {
        Aplication: AplicationSlice,
        Notification: NotificationSlice,
        Branch: BranchSlice,
        Products: ProductsSlice,
        // Almacenes: AlmacenesSlice,
        // Ventas: VentasSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;