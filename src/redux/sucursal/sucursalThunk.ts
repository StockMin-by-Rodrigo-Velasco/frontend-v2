import axios, { AxiosResponse } from "axios";
import { AppDispatch } from "../store"
import api from "../../api/config";
import { SucursalLoginInterface } from "../../interface";
import { hideNotification, showNotificationError } from "../notification/notificationSlice";
import { sucursalLogin } from "./sucursalSlice";


export const sucursalLoginAPI = ( data: SucursalLoginInterface ) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res: AxiosResponse = await api.post('sucursal-ms/login', data )
            // console.log(res.data)
            dispatch(sucursalLogin( {...res.data} ))
            
        } catch (error) {
            if( axios.isAxiosError(error) && error.response ){
                const {data} = error.response;
                dispatch(showNotificationError({tittle: 'INICIO DE SESION', description: data.message}));

                setTimeout( () => dispatch(hideNotification()), 5000 );

            }else console.log(error);
        }
    }
}