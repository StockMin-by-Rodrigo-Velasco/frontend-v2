import axios, { AxiosResponse } from "axios";
import { CreateCustomerDto, Customer, UpdateCustomerDto } from "../../interfaces";
import { AppDispatch, RootState } from "../store"
import { finishLoadingData, startLoadingData } from "../aplication/aplicationSlice";
import api from "../../api/config";
import { createCustomer, getCustomers, updateCustomer } from "./salesSlice";
import { hideNotification, showNotificationError, showNotificationSuccess } from "../notification/notificationSlice";


export const getCustomersAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {id: branchId, userData} = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.get(`customer/get-customers/${branchId}`,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data }: { data: Customer[]} = response.data;
            dispatch(getCustomers(data));
            dispatch(finishLoadingData());
        } catch (error) {
            console.log(error)
        }
    }
}

export const createCustomerAPI = (createCustomerDto: CreateCustomerDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {userData} = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('customer/create-customer', createCustomerDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Customer, message: string } = response.data;
            dispatch(createCustomer(data));
            dispatch(showNotificationSuccess({ tittle: 'REGISTRO DE CLIENTE', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'REGISTRO DE CLIENTE', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const updateCustomerAPI = (updateCustomerDto: UpdateCustomerDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {userData} = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('customer/update-customer', updateCustomerDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Customer, message: string } = response.data;
            dispatch(updateCustomer(data));
            dispatch(showNotificationSuccess({ tittle: 'ACTUALIZACIÓN DE CLIENTE', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE CLIENTE', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}