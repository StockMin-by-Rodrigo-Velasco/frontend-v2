import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SucursalDataInterface{
    nit: string;
    nombre: string;
    propietario: string;
    direccion: string;
    contacto: string;
}
interface SucursalInterface{
    data: SucursalDataInterface;
    token: string;
    logo: string;
}

const initialState: SucursalInterface = {
    data: {nit:'', nombre:'', propietario:'', direccion:'', contacto: ''},
    token: '',
    logo: '',
}

const SucursalSlice = createSlice({
  name: 'sucursal',
  initialState,
  reducers: {

    sucursalLogin: (state, action: PayloadAction<SucursalInterface>) => {
        state.data = action.payload.data;
        state.token = action.payload.token;
        state.logo = action.payload.logo;
    },
  }
});

export const {
    sucursalLogin,
    
} = SucursalSlice.actions

export default SucursalSlice.reducer