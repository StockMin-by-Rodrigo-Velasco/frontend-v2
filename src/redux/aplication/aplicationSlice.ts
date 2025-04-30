import { createSlice } from '@reduxjs/toolkit';


interface AplicationInterface {
    loadingData: boolean;
    loadingApplication: boolean;
    loadingModule: boolean;
}

const initialState: AplicationInterface = {
    loadingData: false,
    loadingApplication: false,
    loadingModule: false,
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
        state.loadingApplication = true;
    },
    finishLoadingAplication: (state) => {
        state.loadingApplication = false;
    },
    startLoadingModule: (state) => {
        state.loadingModule = true;
    },
    finishLoadingModule: (state) => {
        state.loadingModule = false;
    }
  }
});

export const {
    startLoadingData,
    finishLoadingData,

    startLoadingAplication,
    finishLoadingAplication,  

    startLoadingModule,
    finishLoadingModule,
} = AplicationSlice.actions

export default AplicationSlice.reducer