import axios, { AxiosResponse } from "axios";
import { CreateCustomerDto, CreateUserWarehouseSaleDto, Customer, UpdateCustomerDto, User, Warehouse } from "../../interfaces";
import { AppDispatch, RootState } from "../store"
import { finishLoadingData, finishLoadingModule, startLoadingData, startLoadingModule } from "../aplication/aplicationSlice";
import api from "../../api/config";
import { createCustomer, getCustomers, updateCustomer } from "./salesSlice";
import { hideNotification, showNotificationError, showNotificationSuccess } from "../notification/notificationSlice";
import { NavigateFunction } from "react-router";
import { createUserWarehouseSale, deleteUserWarehouseSale, getWarehauses, updateWarehouse } from "../warehouses/warehousesSlice";
import { updateUser } from "../branch/branchSlice";


export const getSalesModuleDataAPI = (navigate?: NavigateFunction) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: branchId } = getState().Branch;
        if(branchId === '') return;
        try {
            dispatch(startLoadingModule());

            const resCustomer: AxiosResponse = await api.get(`customer/get-customers/${branchId}`);
            const {data:customers}:{data:Customer[]} = resCustomer.data;
            dispatch(getCustomers(customers));

            const resWarehouses: AxiosResponse = await api.get(`warehouse/get-warehouses/${branchId}`);
            const {data:warehouses}:{data:Warehouse[]} = resWarehouses.data;
            dispatch(getWarehauses(warehouses));


            // if(navigate) navigate('/main/products/list');

            dispatch(finishLoadingModule());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingModule());
        }
    }
}

export const getCustomersAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {id: branchId} = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.get(`customer/get-customers/${branchId}`);
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

//* ------------------------ WAREHOUSESALES ---------------------------------

export const toggleWarehouseSaleAPI = (warehouseId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {userData} = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch(`warehouse-sale/toggle-warehouse-sale/${warehouseId}/${userData.id}`,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Warehouse, message: string } = response.data;
            dispatch(updateWarehouse(data));
            dispatch(showNotificationSuccess({ tittle: 'ALMACÉN PARA VENTAS', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ALMACÉN PARA VENTAS', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const createUserWarehouseSaleAPI = (createUserWarehouseSaleDto: CreateUserWarehouseSaleDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {userData} = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch(`warehouse-sale/create-user-warehouse-sale`, createUserWarehouseSaleDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: User, message: string } = response.data;
            dispatch(updateUser(data));
            dispatch(createUserWarehouseSale(data));         
            dispatch(showNotificationSuccess({ tittle: 'REGISTRO DE VENDEDOR', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'REGISTRO DE VENDEDOR', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const deleteUserWarehouseSaleAPI = (userId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {userData, users} = getState().Branch;
        const warehouseId:string = users.find(u => u.id === userId)?.warehouseId || '';
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.delete(`warehouse-sale/delete-user-warehouse-sale/${userId}`,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: User, message: string } = response.data;
            dispatch(updateUser(data));
            dispatch(deleteUserWarehouseSale({userId, warehouseId} ));         
            dispatch(showNotificationSuccess({ tittle: 'ELIMINACION DE VENDEDOR', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ELIMINACION DE VENDEDOR', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}
