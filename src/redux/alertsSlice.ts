import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertInterface{
    msg: string,
    show: boolean
}

const initialState: AlertInterface = {
    msg: '',
    show: false
}

const alertsSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    hideAlert: (state) => {
      state.msg = '';
      state.show = false;
    },
    showAlertaError: (state, action: PayloadAction<string>) => {
      state.msg = action.payload;
      state.show = true;
    }
  }
});

export const {hideAlert, showAlertaError} = alertsSlice.actions

export default alertsSlice.reducer