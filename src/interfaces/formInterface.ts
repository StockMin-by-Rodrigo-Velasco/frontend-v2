import { ProductWarehouse } from "./warehousesInterfaces";

export interface ProductWarehouseForm {
    id: string;
    productId: string;
    code: string;
    name: string;
    image?: string;
    quantity: string;
    minQuantity: string;
    transferQuantity?: string; // Solo para crear transpasos

    categoryId: string;
    categoryName?: string;

    brandId: string;
    brandName?: string;

    unitMeasureId: string;
    unitMeasureAbbreviation?: string;

    registered: boolean;
    selected: boolean;
    show: boolean;
}

export interface DateRange {
  from: string,
  to: string
}

export interface ProductStore extends ProductWarehouse {
  selected: boolean;
}

export const initDateRange: DateRange = {
  from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
  to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split("T")[0],
}

export interface SearchFilter {
    search: string;
    category: string;
    brand: string;
}
export const initialSerchFilter: SearchFilter = {
    search: '',
    category: '',
    brand: '',
}