import { createSlice } from '@reduxjs/toolkit';


interface AplicationInterface {
    loadingData: boolean;
    loadingApplication: boolean;
}

const initialState: AplicationInterface = {
    loadingData: false,
    loadingApplication: false,
}

const AplicationSlice = createSlice({
  name: 'aplication',
  initialState,
  reducers: {
    startLoadingData: (state) => {
        state.loadingData = true
    },
    finishLoadingData: (state) => {
        state.loadingData = false
    },
    startLoadingAplication: (state) => {
        state.loadingApplication = true
    },
    finishLoadingAplication: (state) => {
        state.loadingApplication = false
    },
  }
});

export const {
    startLoadingData,
    finishLoadingData,
    startLoadingAplication,
    finishLoadingAplication,    
} = AplicationSlice.actions

export default AplicationSlice.reducer