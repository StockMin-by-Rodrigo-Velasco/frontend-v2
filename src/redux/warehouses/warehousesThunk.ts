import axios, { AxiosResponse } from "axios";
import { AppDispatch, RootState } from "../store";
import api from "../../api/config";
import { Brand, Category, Product } from "../../interface";
import { finishLoadingData, finishLoadingModule, startLoadingData, startLoadingModule } from "../aplication/aplicationSlice";
import { getBrands, getCategories, getProducts } from "../products/productSlice";
import { ProductWarehouse, Warehouse, CreateWarehouseDto, UpdateWarehouseDto, CreateManyProductsWarehouseDto, CreateProductWarehouseDto, UpdateProductWarehouseDto, ListProductTransferDto } from '../../interface/warehousesInterfaces';
import { createManyProductsWarehouse, createProductWarehouse, createWarehouse, deleteWarehouse, getProductsWarehouse, getWarehauses, updateProductWarehouse, updateWarehouse } from "./warehousesSlice";
import { hideNotification, showNotificationError, showNotificationSuccess } from "../notification/notificationSlice";


export const getWarehouseModuleDataAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const { id: branchId } = getState().Branch;
        if (branchId === '') return;

        try {
            dispatch(startLoadingModule());

            const resWarehouse: AxiosResponse = await api.get(`warehouse/get-warehouses/${branchId}`);
            const { data: warehouses }: { data: Warehouse[] } = resWarehouse.data;
            dispatch(getWarehauses(warehouses));

            const resBrand: AxiosResponse = await api.get(`brand/get-brands/${branchId}`);
            const { data: brands }: { data: Brand[] } = resBrand.data;
            dispatch(getBrands(brands));

            const resCategory: AxiosResponse = await api.get(`category/get-categories/${branchId}`);
            const { data: categories }: { data: Category[] } = resCategory.data;
            dispatch(getCategories(categories));

            const resProduct: AxiosResponse = await api.get(`product/get-products/${branchId}`);
            const {data:products}:{data:Product[]} = resProduct.data;
            dispatch(getProducts(products));

            dispatch(finishLoadingModule());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingModule());
        }
    }
}

export const createWarehouseAPI = (createWarehouseDto: CreateWarehouseDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('warehouse/create-warehouse', createWarehouseDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Warehouse, message: string } = response.data;
            dispatch(createWarehouse(data));
            dispatch(showNotificationSuccess({ tittle: 'CREACIÓN DE ALMACÉN', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'CREACIÓN DE ALMACÉN', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const updateWarehouseAPI = (updateWarehouseDto: UpdateWarehouseDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('warehouse/update-warehouse', updateWarehouseDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Warehouse, message: string } = response.data;
            dispatch(updateWarehouse(data));
            dispatch(showNotificationSuccess({ tittle: 'ACTUALIZACIÓN DE ALMACÉN', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ACTUALIZACIÓN DE ALMACÉN', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const deleteWarehouseAPI = (warehouseId: string) => { //! Sin uso
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.delete(`delete-warehouse/${warehouseId}`,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: Warehouse, message: string } = response.data;
            dispatch(deleteWarehouse(data.id));
            dispatch(showNotificationSuccess({ tittle: 'ELIMINACIÓN DE ALMACÉN', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'ELIMINACIÓN DE ALMACÉN', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

//* ---------------------------- PRODUCT WAREHOUSE -------------------------------

export const createProductWarehouseAPI = (createProductWarehouseDto: CreateProductWarehouseDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('product-warehouse/create-product-warehouse', createProductWarehouseDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: ProductWarehouse, message: string } = response.data;
            dispatch(createProductWarehouse(data));

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

export const createManyProductsWarehouseAPI = (createManyProductsWarehouseDto: CreateManyProductsWarehouseDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.post('product-warehouse/create-many-products-warehouse', createManyProductsWarehouseDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: ProductWarehouse[], message: string } = response.data;
            dispatch(createManyProductsWarehouse(data));

            dispatch(showNotificationSuccess({ tittle: 'CREACIÓN DE PRODUCTOS', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'CREACIÓN DE PRODUCTOS', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const updateProductWarehouseAPI = (updateProductWarehouseDto: UpdateProductWarehouseDto) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userData } = getState().Branch;
        try {
            dispatch(startLoadingData());
            const response: AxiosResponse = await api.patch('product-warehouse/update-product-warehouse', updateProductWarehouseDto,
                { headers: { "X-User-Id": userData.id } }
            );
            const { data, message }: { data: ProductWarehouse, message: string } = response.data;
            dispatch(updateProductWarehouse(data));

            dispatch(showNotificationSuccess({ tittle: 'CREACIÓN DE PRODUCTOS', description: message }));
            setTimeout(() => dispatch(hideNotification()), 5000);
            dispatch(finishLoadingData());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                dispatch(showNotificationError({ tittle: 'CREACIÓN DE PRODUCTOS', description: data.message }));
                setTimeout(() => dispatch(hideNotification()), 5000);
            } else console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const getProductsWarehouseAPI = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { warehouseSelected } = getState().Warehouses;
        try {
            dispatch(startLoadingData());
            const resProduct: AxiosResponse = await api.get(`product-warehouse/get-products-warehouse/${warehouseSelected.id}`);
            const { data: products }: { data: ProductWarehouse[] } = resProduct.data;
            dispatch(getProductsWarehouse(products));
            dispatch(finishLoadingData());
        } catch (error) {
            console.log(error);
            dispatch(finishLoadingData());
        }
    }
}

export const decrementProdutsWarehouseAPI = (listProductTransferDto: ListProductTransferDto) => {
    return async () => {
        try {
            await api.post(`product-warehouse/decrement-products-warehouse`, listProductTransferDto);
        } catch (error) {
            console.log(error);
        }
    }
}

export const incrementProdutsWarehouseAPI = (listProductTransferDto: ListProductTransferDto) => {
    return async () => {
        try {
            await api.post(`product-warehouse/increment-products-warehouse`, listProductTransferDto);
        } catch (error) {
            console.log(error);
        }
    }
}


