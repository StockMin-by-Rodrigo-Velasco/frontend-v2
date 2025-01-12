import { configureStore } from '@reduxjs/toolkit';
import alertsSlice from './alertsSlice';


export const store = configureStore({
    reducer: {
        Alerts: alertsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;