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
export const initialCurrency: Currency = {id:'',code:'',name:'',symbol:'', description:''}

export interface WarehouseSale {
    id: string;
    deleted: boolean;
    userId: string;
    branchId: string;
    warehouseId: string;
}
export const initialWarehouseSale: WarehouseSale = {id:'', deleted:false, userId:'', branchId:'', warehouseId:''}

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
