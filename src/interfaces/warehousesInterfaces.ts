import { initialUser, User } from "./branchInterfaces";
import { Product } from "./productsInterface";

export interface Warehouse {
    id: string;
    name: string;
    description?: string;
    deleted: boolean;
    createdAt?: string;
    updatedAt?: string;
    branchId: string;
}

export interface ProductWarehouse {
    id: string;
    quantity: number;
    minQuantity: number;
    productId: string;
    warehouseId: string;
    createdAt: String;
    updatedAt: string;
    Product: Product;
}

export const initialProductWarehouse: ProductWarehouse = {
    id: '', productId: '', warehouseId: '', minQuantity: 0, quantity: 0, createdAt: '', updatedAt: '',
    Product: {
        branchId: '', brandId: '', categoryId: '', code: '', createdAt: '', deleted: false, id: '', description: '', image: '', name: '', unitMeasureId: '', updatedAt: '',
        Brand: { id: '', branchId: '', deleted: false, name: '', origin: '' },
        Category: { id: '', branchId: '', deleted: false, details: '', name: '' },
        UnitMeasure: { id: '', abbreviation: '', details: '', name: '' }
    }
}

export interface ProductEntry {
    id: string;
    quantity: number;
    docEntryId?: string;
    productWarehouseId?: string;

    ProductWarehouse: ProductWarehouse;
}

export interface ProductTransfer {
    id: string;
    quantity: number;
    productOriginWarehouseId: string;
    productDestinationWarehouseId: string;
    productId: string;

    Product: Product;
}

export interface DocTransfer {
    id: string;
    originWarehouseId: string;
    destinationWarehouseId: string;
    details?: string;
    createdAt?: string;
    branchId: string;
    userId: string;

    User: User;

    ProductTransfer?: ProductTransfer[]
}
export const initialDocTransfer: DocTransfer = {
    id: '',
    originWarehouseId: '',
    destinationWarehouseId: '',
    details: '',
    createdAt: '',
    branchId: '',
    userId: '',
    User: initialUser
}

export interface DocEntry {
    id: string;
    details?: string;
    createdAt?: string;
    userId: string;
    warehouseId: string;

    User: User;

    ProductEntry?: ProductEntry[]
}

export const initialDocEntry: DocEntry = {
    id: '', details: '', createdAt: '', userId: '', warehouseId: '',
    User: initialUser,
}

//* ------------------- DTOs -------------------------------

export interface CreateWarehouseDto {
    branchId: string;
    name: string;
    description?: string;
}

export interface UpdateWarehouseDto {
    id: string;
    branchId: string;
    name?: string;
    description?: string;
}

export interface CreateProductEntryDto {
    productWarehouseId: string;
    docEntryId?: string;
    quantity: number;
}

export interface CreateDocEntryDto {
    userId: string;
    warehouseId: string;
    details?: string;
    productsEntry: CreateProductEntryDto[]
}

export interface GetDocEntryDto {
    warehouseId: string;
    from: string;
    to: string;
}

// export interface CreateProductTransferDto {
//     productWarehouseId: string;
//     quantity: number;
//     docTransferId?: string;
// }

export interface CreateProductTransferDto {
    productId: string;
    productWarehouseOriginId: string;
    productWarehouseDestinationId: string;
    quantity: number;
    docTransferId?: string;
}

export interface CreateDocTrasferDto {
    branchId: string;
    userId: string;
    originWarehouseId: string;
    destinationWarehouseId: string;
    details?: string;
    productsTransfer: CreateProductTransferDto[]
}

export interface GetDocTransfersDto {
    branchId: string;
    from: string;
    to: string;
}

export interface CreateProductWarehouseDto {
    productId: string;
    warehouseId: string;
    quantity?: number;
    minQuantity?: number;
}

export interface CreateManyProductsWarehouseDto {
    warehouseId: string;
    productsWarehouse: CreateProductWarehouseDto[];
}

export interface ProductTransferDto {
    productWarehouseId: string;
    quantity: number;
}

export interface ListProductTransferDto {
    products: ProductTransferDto[]
}

export interface UpdateProductWarehouseDto {
    productWarehouseId: string;
    minQuantity?: number;
}


