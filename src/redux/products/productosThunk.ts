import axios, { AxiosResponse } from "axios";
import { finishLoadingData, finishLoadingModule, startLoadingData, startLoadingModule } from "../aplication/aplicationSlice";
import { AppDispatch, RootState } from "../store";
import api from "../../api/config";
import {
    hideNotification,
    showNotificationError,
    showNotificationSuccess,
    showNotificationWarning
} from "../notification/notificationSlice";
import {
    Brand,
    Category,
    CreateBrandDto,
    CreateCategoryDto,
    CreateProductDto,
    Product,
    ToggleUnitMeasureDto,
    UnitMeasure,
    UnitMeasureBranch,
    UpdateBrandDto,
    UpdateCategoryDto,
    UpdateProductDto,
    UpdateProductImageDto
} from "../../interface";
import {
    createCategories,
    createBrand,
    createProduct,
    deleteCategory,
    deleteBrand,
    deleteProduct,
    getCategories,
    getProductLogs,
    getBrands,
    getProducts,
    getUnitMeasures,
    updateCategory,
    updateBrand,
    updateProduct,
    toggleUnitMeasure,
    getUnitMeasuresBranch
} from "./productosSlice";

export const getProductModuleDataAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: branchId } = getState().Branch;
        if(branchId === '')return
        try {
            dispatch(startLoadingModule());

            const resProduct: AxiosResponse = await api.get(`product/get-products/${branchId}`);
            const {data:products}:{data:Product[]} = resProduct.data;
            dispatch(getProducts(products));

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

            dispatch(finishLoadingModule());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingModule());
        }
    }
}

export const getProductsAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: branchId } = getState().Branch;
        try {
            const resProduct: AxiosResponse = await api.get(`product/get-products/${branchId}`);
            const {data:products}:{data:Product[]} = resProduct.data;
            dispatch(getProducts(products));
        } catch (error) {
            console.log(error);
        }
    }
}
export const createProductAPI = (createProductDto: CreateProductDto, image: File | undefined) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: branchId, userData } = getState().Branch;
        const newProducto = new FormData();
        newProducto.append('branchId', branchId);
        newProducto.append('code', createProductDto.code);
        newProducto.append('name', createProductDto.name);
        newProducto.append('description', createProductDto.description || '');
        newProducto.append('categoryId', createProductDto.categoryId);
        newProducto.append('brandId', createProductDto.brandId);
        newProducto.append('unitMeasureId', createProductDto.unitMeasureId);
        if (image) newProducto.append('image', image);

        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('product/create-product',
                newProducto,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-User-Id": userData.id
                    }
                }
            );
            const { data, message }: { data: Product, message: string } = response.data;
            dispatch(createProduct(data));
            dispatch(showNotificationSuccess({ tittle: 'CREACIÓN DE PRODUCTO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'CREACIÓN DE PRODUCTO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}
export const deleteProductAPI = (productId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.delete(`product/delete-product/${productId}`,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Product, message: string } = response.data;
            dispatch(deleteProduct(data.id));
            dispatch(showNotificationSuccess({ tittle: 'ELIMINACIÓN DE PRODUCTO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ELIMINACIÓN DE PRODUCTO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}
export const updateProductAPI = (updateProductDto: UpdateProductDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('product/update-product', updateProductDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Product, message: string } = response.data;
            dispatch(updateProduct(data));
            dispatch(showNotificationSuccess({ tittle: 'ACTUALIZACIÓN DE PRODUCTO', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE PRODUCTO', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}
export const updateProductImageAPI = (updateProductImageDto: UpdateProductImageDto, image: File | undefined) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        if (image) {
            const { userData } = getState().Branch;
            const updateProductImage = new FormData();
            updateProductImage.append('image', image);
            updateProductImage.append('productId', updateProductImageDto.productId);
            updateProductImage.append('imagenUrl', updateProductImageDto.imagenUrl);

            try {
                dispatch(startLoadingData());
                const response: AxiosResponse = await api.patch(`product/update-product-image`,
                    updateProductImage,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "X-User-Id": userData.id
                        }
                    }
                );
                const { data, message }: { data: Product, message: string } = response.data;
                dispatch(updateProduct(data));
                dispatch(showNotificationSuccess({ tittle: 'MODIFICACIÓN DE IMAGEN', description: message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
                dispatch(finishLoadingData());
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const { data } = error.response;
                    dispatch(showNotificationError({ tittle: 'MODIFICACIÓN DE IMAGEN', description: data.message }));
                    setTimeout(() => dispatch(hideNotification()), 5000);
                } else console.log(error);
                dispatch(finishLoadingData());
            }
        } else {
            dispatch(showNotificationWarning({ tittle: 'MODIFICACIÓN DE IMAGEN', description: 'La imagen original no fue modificada' }));
            setTimeout(() => dispatch(hideNotification()), 5000);
        }
    }
}
//* ----------------------- BRAND -------------------------
export const getBrandsAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: branchId } = getState().Branch;
        try {
            const response: AxiosResponse = await api.get(`brand/get-brands/${branchId}`);
            const { data }: { data: Brand[] } = response.data;
            dispatch(getBrands(data));
        } catch (error) {
            console.log(error);
        }
    }
}
export const createBrandAPI = (createBrandDto: CreateBrandDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('brand/create-brand', createBrandDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Brand, message: string } = response.data;
            dispatch(createBrand(data));
            dispatch(showNotificationSuccess({ tittle: 'CREACIÓN DE MARCA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'CREACIÓN DE MARCA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}
export const deleteBrandAPI = (brandId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.delete(`brand/delete-brand/${brandId}`,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Brand, message: string } = response.data;
            dispatch(deleteBrand(data.id));
            dispatch(showNotificationSuccess({ tittle: 'ELIMINACIÓN DE MARCA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ELIMINACIÓN DE MARCA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }

    }
}
export const updateBrandAPI = (updateBrandDto: UpdateBrandDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('brand/update-brand', updateBrandDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Brand, message: string } = response.data;
            dispatch(updateBrand(data));
            dispatch(showNotificationSuccess({ tittle: 'ACTUALIZACIÓN DE MARCA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE MARCA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

//* ---------------------------------- CATEGORY ---------------------------------------
export const getCategoriesAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: branchId } = getState().Branch;
        try {
            const response: AxiosResponse = await api.get(`productos-ms/get-all-categorias/${branchId}`);
            dispatch(getCategories(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}
export const createCategoryAPI = (createCategoryDto: CreateCategoryDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('category/create-category', createCategoryDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Category, message: string } = response.data;
            dispatch(createCategories(data));
            dispatch(showNotificationSuccess({ tittle: 'CREACIÓN DE CATEGORÍA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'CREACIÓN DE CATEGORÍA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}
export const deleteCategoryAPI = (categoryId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.delete(`category/delete-category/${categoryId}`,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Category, message: string } = response.data;
            dispatch(deleteCategory(data.id));
            dispatch(showNotificationSuccess({ tittle: 'ELIMINACIÓN DE CATEGORÍA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ELIMINACIÓN DE CATEGORÍA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}
export const updateCategoryAPI = (updateCategoryDto: UpdateCategoryDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('category/update-category', updateCategoryDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Category, message: string } = response.data;
            dispatch(updateCategory(data));
            dispatch(showNotificationSuccess({ tittle: 'ACTUALIZACIÓN DE CATEGORÍA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE CATEGORÍA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}
export const getUnitMeasuresAPI = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response: AxiosResponse = await api.get(`unit-measure/get-unit-measures`);
            dispatch(getProductLogs(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const getUnitMeasuresBranchAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { id: branchId } = getState().Branch;
        try {
            const response: AxiosResponse = await api.get(`unit-measure/get-unit-measures-branch/${branchId}`);
            dispatch(getUnitMeasures(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const toggleUnitMeasureAPI = (toggleUnitMeasureDto: ToggleUnitMeasureDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {userData} = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post(`unit-measure/toggle-unit-measure`, toggleUnitMeasureDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: UnitMeasureBranch, message: string } = response.data;
            dispatch(toggleUnitMeasure(data));

            dispatch(showNotificationSuccess({ tittle: 'ACTUALIZACIÓN DE UNIDADES DE MEDIDA', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE UNIDADES DE MEDIDA', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}