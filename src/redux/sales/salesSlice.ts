import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Currency, Customer, ExchangeRate, Log } from "../../interfaces";
import { initialExchangeRate, PaymentMethod } from '../../interfaces/salesInterfaces';

interface SalesInitialState {
    customers: Customer[];
    currencies: Currency[];
    exchangeRates: ExchangeRate[];
    exchangeRateFavorite: ExchangeRate;
    paymentMethods: PaymentMethod[];
    logs: Log[];
}

const initialState: SalesInitialState = {
    customers: [],
    currencies: [],
    exchangeRates:[],
    exchangeRateFavorite: initialExchangeRate,
    paymentMethods:[],
    logs:[]
}

const SalesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        getCustomers: (state, action: PayloadAction<Customer[]>) => {
            state.customers = action.payload;
        },
        createCustomer: (state, action: PayloadAction<Customer>) => {
            state.customers = [action.payload, ...state.customers];
        },
        updateCustomer: (state, action: PayloadAction<Customer>) => {
            const updateListaClientes = current(state.customers).map(p => (p.id === action.payload.id) ? action.payload : p);
            state.customers = [...updateListaClientes];
        },

        getExchangeRates: (state, action: PayloadAction<ExchangeRate[]>) => {
            state.exchangeRates = action.payload;
        },
        getExchangeRateFavorite: (state, action: PayloadAction<ExchangeRate>) => {
            state.exchangeRateFavorite = action.payload
        },
        createExchangeRate: (state, action: PayloadAction<ExchangeRate>) => {
            state.exchangeRates = [action.payload, ...state.exchangeRates];
        },
        updateExchangeRate: (state, action: PayloadAction<ExchangeRate>) => {
            const updateExchangeRate = current(state.exchangeRates).map(er => (er.id === action.payload.id) ? action.payload : er);
            state.exchangeRates = [...updateExchangeRate];
        },
        toggleFavoriteExchangeRate: (state, action: PayloadAction<ExchangeRate>) => {
            const updateExchangeRate = current(state.exchangeRates).map(er => (er.id === action.payload.id) ? action.payload : {...er, favorite:false});
            state.exchangeRates = [...updateExchangeRate];
        },
        deleteExchangeRate: (state, action: PayloadAction<ExchangeRate>) => {
            state.exchangeRates = current(state.exchangeRates).filter(er => er.id !== action.payload.id);
        },

        getCurrencies: (state, action: PayloadAction<Currency[]>) => {
            state.currencies = action.payload;
        },
        getPaymentMethods: (state, action: PayloadAction<PaymentMethod[]>) => {
            state.paymentMethods = action.payload;
        },
        getSalesLogs: (state, action: PayloadAction<Log[]>) => {
            state.logs = [...action.payload];
        },
    }
});

export const {
    getCustomers,
    createCustomer,
    updateCustomer,

    getExchangeRates,
    getExchangeRateFavorite,
    createExchangeRate,
    updateExchangeRate,
    toggleFavoriteExchangeRate,
    deleteExchangeRate,

    getCurrencies,

    getPaymentMethods,
    
    getSalesLogs,

} = SalesSlice.actions

export default SalesSlice.reducer