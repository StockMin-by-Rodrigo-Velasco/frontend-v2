import { createSlice, PayloadAction } from '@reduxjs/toolkit';


enum NotificationTypes{
    ERROR = "ERROR",
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    INFO = "INFO",
    NONE = "NONE",
}

interface PayloadInterface{
    tittle: string,
    description: string,
    type?: NotificationTypes,
    action?: () => void,
}

interface NotificationInterface extends PayloadInterface{
    showNotification: boolean
}

const initialState: NotificationInterface = {
    tittle: '',
    description: '',
    type: NotificationTypes.NONE,
    showNotification: false,
}

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    hideNotification: (state) => {
      state.tittle = '';
      state.description = '';
      state.type = NotificationTypes.NONE;
      state.showNotification = false;
    },
    showNotificationError: (state, action: PayloadAction<PayloadInterface>) => {
      state.tittle = action.payload.tittle;
      state.description = action.payload.description;
      state.type = NotificationTypes.ERROR;
      state.showNotification = true;
    },
    showNotificationWarning: (state, action: PayloadAction<PayloadInterface>) => {
        state.tittle = action.payload.tittle;
        state.description = action.payload.description;
        state.type = NotificationTypes.WARNING;
        state.showNotification = true;
    },
    showNotificationLoading: (state, action: PayloadAction<PayloadInterface>) => {
        state.tittle = action.payload.tittle;
        state.description = action.payload.description;
        state.type = NotificationTypes.LOADING;
        state.showNotification = true;
    },
    showNotificationSuccess: (state, action: PayloadAction<PayloadInterface>) => {
        state.tittle = action.payload.tittle;
        state.description = action.payload.description;
        state.type = NotificationTypes.SUCCESS;
        state.showNotification = true;
    },
    showNotificationInfo: (state, action: PayloadAction<PayloadInterface>) => {
        state.tittle = action.payload.tittle;
        state.description = action.payload.description;
        state.type = NotificationTypes.INFO;
        state.showNotification = true;
    },
  }
});

export const {
    hideNotification, 
    showNotificationError, 
    showNotificationInfo, 
    showNotificationLoading, 
    showNotificationSuccess, 
    showNotificationWarning
} = NotificationSlice.actions

export default NotificationSlice.reducer