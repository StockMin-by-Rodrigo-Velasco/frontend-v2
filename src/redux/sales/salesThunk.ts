import axios, { AxiosResponse } from "axios";
import { Brand, Category, CreateCustomerDto, CreateDocSaleDto, CreateExchangeRateDto, CreatePaymentDto, CreateUserWarehouseSaleDto, Currency, Customer, DocSale, ExchangeRate, initialCurrency, Payment, PaymentMethod, Product, UnitMeasure, UnitMeasureBranch, UpdateCustomerDto, UpdateExchangeRateDto, UpdateProductPriceDto, User, Warehouse } from "../../interfaces";
import { AppDispatch, RootState } from "../store"
import { finishLoadingData, finishLoadingModule, startLoadingData, startLoadingModule } from "../aplication/aplicationSlice";
import api from "../../api/config";
import { createCustomer, createExchangeRate, getCurrencies, getCustomers, getExchangeRateFavorite, getExchangeRates, getPaymentMethods, toggleFavoriteExchangeRate, updateCustomer, updateExchangeRate } from "./salesSlice";
import { hideNotification, showNotificationError, showNotificationSuccess, showNotificationWarning } from "../notification/notificationSlice";
import { NavigateFunction } from "react-router";
import { createUserWarehouseSale, decrementProductsWarehouse, deleteUserWarehouseSale, getWarehauses, updatePriceProductWarehouse, updateWarehouse } from "../warehouses/warehousesSlice";
import { updateUser } from "../branch/branchSlice";
import { getBrands, getCategories, getUnitMeasures, getUnitMeasuresBranch, updateProduct } from "../products/productSlice";
import { GetDocSaleDto } from '../../../../backend/src/modules/sales/sale/dto/get-doc-sale.dto';


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

            const resBrand: AxiosResponse = await api.get(`brand/get-brands/${branchId}`);
            const { data:brands }: { data: Brand[] } = resBrand.data;
            dispatch(getBrands(brands));

            const resCategory: AxiosResponse = await api.get(`category/get-categories/${branchId}`);
            const { data:categories }: { data: Category[] } = resCategory.data;
            dispatch(getCategories(categories));

            const resUnitMeasure: AxiosResponse = await api.get(`unit-measure/get-unit-measures`);
            const { data:unitMeasures }: { data: UnitMeasure[] } = resUnitMeasure.data;
            dispatch(getUnitMeasures(unitMeasures));

            const resUnitMeasureBranch: AxiosResponse = await api.get(`unit-measure/get-unit-measures-branch/${branchId}`);
            const { data:unitMeasuresBranch }: { data: UnitMeasureBranch[] } = resUnitMeasureBranch.data;
            dispatch(getUnitMeasuresBranch(unitMeasuresBranch));

            const resCurrencies: AxiosResponse = await api.get(`currency/get-currencies`);
            const { data:currencies }: { data: Currency[] } = resCurrencies.data;
            dispatch(getCurrencies(currencies));

            const resPaymentMethods: AxiosResponse = await api.get(`payment-method/get-payment-methods`);
            const { data:paymentMethods }: { data: PaymentMethod[] } = resPaymentMethods.data;
            dispatch(getPaymentMethods(paymentMethods));

            const resExchangeRate: AxiosResponse = await api.get(`exchange-rate/get-exchange-rate/${branchId}`);
            const { data:exchangeRates }: { data: ExchangeRate[] } = resExchangeRate.data;
            dispatch(getExchangeRates(exchangeRates));
            const exchangeRateFavorite:ExchangeRate|undefined = exchangeRates.find(er => er.favorite);

            if(exchangeRateFavorite)dispatch(getExchangeRateFavorite(exchangeRateFavorite));
            else{
                const Currency = currencies.find(c => c.code === 'usd') || initialCurrency;
                const exchangeRateFavoriteDefault:ExchangeRate ={
                    id:branchId,
                    branchId,
                    Currency,
                    currencyId: Currency.id,
                    favorite:true,
                    rateToUSD:'1',
                    deleted:false
                };
                dispatch(getExchangeRateFavorite(exchangeRateFavoriteDefault));
            }

            if(navigate) navigate('/main/sales/store');

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

//* ------------------------ PRODUCTSALES ---------------------------------

export const updateProductPriceAPI = (updateProductPriceDto:UpdateProductPriceDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {userData} = getState().Branch;
        const verifyPrice = parseFloat(updateProductPriceDto.price);
        if(isNaN(verifyPrice) || verifyPrice <= 0){
            dispatch(showNotificationWarning({tittle: 'ACTUALIZACIÓN DE PRECIO', description:'El precio no debe ser menor a 0, por favor modifíquelo e intente de nuevo.'}));
            return;
        }
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch(`product-price/update-product-price`, updateProductPriceDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const {data, message}:{data:Product, message: string} = response.data;
            
            dispatch(updateProduct(data));
            dispatch(updatePriceProductWarehouse(data));
            dispatch(showNotificationSuccess({ tittle: 'ACTUALIZACIÓN DE PRECIO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE PRECIO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

//* ------------------------ EXCHANGE RATE ---------------------------------

export const createExchangeRateAPI = (createExchangeRateDto: CreateExchangeRateDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {userData} = getState().Branch;
        try {
            dispatch(startLoadingData());
            const verifyRateTopUSD =  parseFloat(createExchangeRateDto.rateToUSD);
            if(isNaN(verifyRateTopUSD) || verifyRateTopUSD <= 0){
                dispatch(showNotificationWarning({ tittle: 'REGISTRO DE TIPO DE CAMBIO', description: 'El valor de la conversión debe ser un numero valido mayor a “0”.' }));
                setTimeout(() => dispatch(hideNotification()), 5000);
                dispatch(finishLoadingData());
                return;
            }
            const response: AxiosResponse = await api.post(`exchange-rate/create-exchange-rate`, createExchangeRateDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: ExchangeRate, message: string } = response.data;
            dispatch(createExchangeRate(data));     
            dispatch(showNotificationSuccess({ tittle: 'REGISTRO DE TIPO DE CAMBIO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'REGISTRO DE TIPO DE CAMBIO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const updateExchangeRateAPI = (updateExchangeRateDto: UpdateExchangeRateDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {userData} = getState().Branch;
        try {
            dispatch(startLoadingData());
            const verifyRateTopUSD =  parseFloat(updateExchangeRateDto.rateToUSD);
            if(isNaN(verifyRateTopUSD) || verifyRateTopUSD <= 0){
                dispatch(showNotificationWarning({ tittle: 'TIPO DE CAMBIO', description: 'El valor de la conversión debe ser un numero valido mayor a “0”.' }));
                setTimeout(() => dispatch(hideNotification()), 5000);
                dispatch(finishLoadingData());
                return;
            }
            const response: AxiosResponse = await api.patch(`exchange-rate/update-exchange-rate`, updateExchangeRateDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: ExchangeRate, message: string } = response.data;
            dispatch(updateExchangeRate(data));
            if(data.favorite) dispatch(getExchangeRateFavorite(data));  
            dispatch(showNotificationSuccess({ tittle: 'TIPO DE CAMBIO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'TIPO DE CAMBIO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const toggleFavoriteExchangeRateAPI = (exchangeRateId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {id: branchId, userData} = getState().Branch;
        const {currencies} = getState().Sales;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch(`exchange-rate/toggle-favorite-exchange-rate/${exchangeRateId}`, {},
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: ExchangeRate, message: string } = response.data;
            dispatch(toggleFavoriteExchangeRate(data)); 

            const exchangeRateFavorite:ExchangeRate|undefined = data.favorite? data:undefined;
            if(exchangeRateFavorite)dispatch(getExchangeRateFavorite(exchangeRateFavorite));
            else{
                const Currency = currencies.find(c => c.code === 'usd') || initialCurrency;
                const exchangeRateFavoriteDefault:ExchangeRate ={
                    id:branchId,
                    branchId,
                    Currency,
                    currencyId: Currency.id,
                    favorite:true,
                    rateToUSD:'1',
                    deleted:false
                };
                dispatch(getExchangeRateFavorite(exchangeRateFavoriteDefault));
            }
            
            dispatch(showNotificationSuccess({ tittle: 'TIPO DE CAMBIO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'TIPO DE CAMBIO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const deleteExchangeRateAPI = (exchangeRateId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {userData} = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.delete(`exchange-rate/update-exchange-rate/${exchangeRateId}`,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: ExchangeRate, message: string } = response.data;
            console.log(data);       
            dispatch(showNotificationSuccess({ tittle: 'ELIMINACION DE TIPO DE CAMBIO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ELIMINACION DE TIPO DE CAMBIO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

//* --------------------------------- SALES ---------------------------------

export const getDocSalesAPI = (getDocSales:GetDocSaleDto, functionReturn?:(doc:DocSale[])=>void) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());
            const resDocSales: AxiosResponse = await api.post(`sale/get-doc-sales`, getDocSales);
            const {data:docSales}:{data:DocSale[]} = resDocSales.data;
            if(functionReturn) functionReturn(docSales)
            dispatch(finishLoadingData());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const createDocSaleAPI = (createDocSaleDto:CreateDocSaleDto, functionReturn?:(doc: DocSale)=>void) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());
            const resDocSale: AxiosResponse = await api.post(`sale/create-doc-sale`, createDocSaleDto);
            const {data:docSale}:{data:DocSale} = resDocSale.data;
            if(functionReturn) functionReturn(docSale);
            dispatch(decrementProductsWarehouse(createDocSaleDto.productsSale));
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'DOCUMENTO DE VENTA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const createPaymentAPI = (createPaymentDto:CreatePaymentDto, functionReturn?:(doc: Payment)=>void) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingData());
            const resPayment: AxiosResponse = await api.post(`sale/create-payment`, createPaymentDto);
            const {data:payment}:{data:Payment} = resPayment.data;
            if(functionReturn) functionReturn(payment);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'REGISTRO DE PAGO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
        }
    }
}