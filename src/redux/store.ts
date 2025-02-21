import { configureStore } from '@reduxjs/toolkit';
import NotificationSlice from './notification/notificationSlice';
import SucursalSlice from './sucursal/sucursalSlice';
import AplicationSlice from './aplication/aplicationSlice';
import ProductosSlice from './productos/productosSlice';
import AlmacenesSlice from './almacenes/almacenesSlice';


export const store = configureStore({
    reducer: {
        Aplication: AplicationSlice,
        Notification: NotificationSlice,
        Sucursal: SucursalSlice,
        Productos: ProductosSlice,
        Almacenes: AlmacenesSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;