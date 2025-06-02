export interface Brand {
    id: string;
    branchId: string;
    name: string;
    origin: string;
    deleted: boolean;
}
export const initialBrand:Brand = {id:'', branchId:'', name:'', origin:'', deleted:false}

export interface Category {
    id: string;
    branchId: string;
    name: string;
    details: string;
    deleted: boolean;
}
export const initialCategory:Category = {id:'', branchId:'', name:'', details:'', deleted:false}

export interface UnitMeasure {
    id: string;
    name: string;
    abbreviation: string;
    details: string;
}
export const initialUnitMeasure:UnitMeasure = {id:'', name:'', abbreviation:'', details:''}

export interface UnitMeasureBranch {
    id: string;
    branchId: string;
    unitMeasureId: string;
    deleted: boolean;
    UnitMeasure: UnitMeasure;
}

export interface Product {
    id: string;
    branchId: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price?: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    categoryId: string;
    brandId: string;
    unitMeasureId: string;

    Brand: Brand;
    Category: Category;
    UnitMeasure: UnitMeasure;
}
export const initialProduct:Product = {id:'', branchId:'', code:'', name:'', description:'', image:'', deleted:false, createdAt:'', updatedAt:'', brandId:'', categoryId:'',unitMeasureId:'', Brand:initialBrand, Category:initialCategory, UnitMeasure:initialUnitMeasure}

//* ----------------------------- DTOs -------------------------------------

export interface CreateBrandDto {
    branchId: string;
    name: string;
    origin?: string;
}
export interface DeleteBrandDto {
    id: string;
    branchId: string;
}
export interface UpdateBrandDto {
    id: string;
    branchId: string;
    name?: string;
    origin?: string;
}
export interface CreateCategoryDto {
    branchId: string;
    name: string;
    details?: string;
}
export interface DeleteCategoryDto {
    id: string;
    branchId: string;
}
export interface UpdateCategoryDto {
    id: string;
    branchId: string;
    name?: string;
    details?: string;
}
export interface CreateProductDto {
    branchId: string;
    code: string;
    name: string;
    description?: string;
    categoryId: string;
    brandId: string;
    unitMeasureId: string;
}
export interface UpdateProductDto {
    id: string;
    branchId: string;
    code?: string;
    name?: string;
    description?: string;
    categoryId?: string;
    brandId?: string;
    unitMeasureId?: string;
}
export interface UpdateProductImageDto {
    productId: string;
    imagenUrl: string;
  }
export interface CreateUnitMeasureDto {
    name: string;
    abbreviation: string;
    details?: string;
}
export interface ToggleUnitMeasureDto {
    branchId: string;
    unitMeasureId: string;
}
