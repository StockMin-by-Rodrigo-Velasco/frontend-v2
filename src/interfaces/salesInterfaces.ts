import { initialUser, User } from './branchInterfaces';
import { initialProduct, Product } from './productsInterface';
export interface Customer {
    id: string;
    code: string;
    name: string;
    lasName: string;
    contact?: string;
    address?: string;
    branchId: string;
}
export const initialCustomer: Customer = { id: '', code: '', name: '', lasName: '', contact: '', address: '', branchId: '' }

export interface Currency {
    id: string;
    code: string;
    name: string;
    symbol: string;
    description?: string;
}
export const initialCurrency: Currency = { id: '', code: '', name: '', symbol: '', description: '' }

export interface WarehouseSale {
    id: string;
    deleted: boolean;
    userId: string;
    branchId: string;
    warehouseId: string;
}
export const initialWarehouseSale: WarehouseSale = { id: '', deleted: false, userId: '', branchId: '', warehouseId: '' }

export interface ExchangeRate {
    id: string;
    rateToUSD: string;
    deleted: boolean;
    favorite: boolean;
    branchId: string;
    currencyId: string;
    createdAt?: string;
    updatedAt?: string;

    Currency: Currency
}
export const initialExchangeRate: ExchangeRate = { id: '', rateToUSD: '', branchId: '', currencyId: '', deleted: false, favorite: false, createdAt: '', updatedAt: '', Currency: initialCurrency }

export interface ProductSale {
    id: string;
    quantity: number;
    price: string;
    docSaleId: string;
    productId: string;

    Product: Product;
}
export const initialProductSale: ProductSale = { id: '', quantity: 0, price: '', docSaleId: '', productId: '', Product: initialProduct }

export interface PaymentMethod {
    id: string;
    code: string;
    name: string;
    description: string;
    image?: string;
    deleted: boolean;
}
export const initialPaymentMethod: PaymentMethod = { id: '', code: '', name: '', description: '', image: '', deleted: false }

export interface Payment {
    id: string;
    amount: string;
    description?: string;
    docSaleId: string;
    paymentMethodId: string;
    createdAt?: string;

    PaymentMethod: PaymentMethod;
}
export const initialPayment: Payment = { id: '', amount: '', description: '', docSaleId: '', paymentMethodId: '', PaymentMethod: initialPaymentMethod }

export interface DocSale {
    id: string;
    number: number; 
    paymentType: 'PAID' | 'CREDIT';
    customerName: string;
    details?: string;
    customerId?: string;
    branchId: string;
    userId: string;
    currencyId: string;
    isPaid: boolean;
    createdAt?: string;
    canceled: boolean;

    User: User;
    Currency: Currency;
    Customer?: Customer;
    Payment: Payment[];
    ProductSale: ProductSale[];
}
export const initialDocSale: DocSale = { id: '', number:0, paymentType: 'PAID', customerName: '', details: '', customerId: '', branchId: '', userId: '', currencyId: '', isPaid:false, canceled:false, createdAt: '', User: initialUser, Currency: initialCurrency, Customer: initialCustomer, Payment: [], ProductSale: [] }

export interface DocQuotation {
    id: string;
    number: number; 
    customerName: string;
    details?: string;
    customerId?: string;
    branchId: string;
    userId: string;
    currencyId: string;
    createdAt?: string;

    User: User;
    Currency: Currency;
    Customer?: Customer;
    ProductSale: ProductSale[];
}
export const initialQuotationSale: DocQuotation = { id: '', number:0, customerName: '', details: '', customerId: '', branchId: '', userId: '', currencyId: '', createdAt: '', User: initialUser, Currency: initialCurrency, Customer: initialCustomer, ProductSale: [] }

//* ------------------ DTOs -------------------------

export interface CreateCustomerDto {
    branchId: string;
    code: string;
    name: string;
    lasName: string;
    contact?: string;
    address?: string;
}

export interface UpdateCustomerDto {
    id: string;
    branchId: string;
    code?: string;
    name?: string;
    lasName?: string;
    contact?: string;
    address?: string;
}

export interface CreateUserWarehouseSaleDto {
    warehouseId: string;
    userId: string;
}

export interface UpdateProductPriceDto {
    id: string;
    price: string
}

export interface CreateExchangeRateDto {
    branchId: string;
    currencyId: string;
    rateToUSD: string;
}

export interface UpdateExchangeRateDto {
    id: string;
    rateToUSD: string;
}

export interface CreatePaymentDto {
    docSaleId?: string;
    paymentMethodId: string;
    amount: string;
    description?: string;
}

export interface CreateProductSaleDto {
    productId: string;
    docSaleId?: string;
    docQuotationId?: string;
    quantity: number;
    price: string;

    //* Solo para hacer un descuento en las cantidades 
    productWarehouseId: string;
}

export interface CreateProductQuotationDto {
    productId: string;
    docSaleId?: string;
    docQuotationId?: string;
    quantity: number;
    price: string;
}

export interface CreateDocSaleDto {
    branchId: string;
    userId: string;
    customerId?: string;
    currencyId: string;
    paymentType: 'PAID' | 'CREDIT';
    customerName: string;
    details?: string;
    productsSale: CreateProductSaleDto[]
    payments: CreatePaymentDto[]
}

export interface CreateDocQuotationDto {
    customerId?: string;
    branchId: string;
    userId: string;
    currencyId: string;
    customerName: string;
    details?: string;
    productsSale: CreateProductQuotationDto[]
}

export interface GetDocSaleDto{
    branchId: string;
    from: string;
    to: string;
}

export interface IncrementProductDto {
    productWarehouseId: string;
    quantity: number;
}

export interface CancelDocSaleDto {
    docSaleId: string;
    productsSale: IncrementProductDto[]
}
