export interface AlmacenInterface {
    id: string;
    sucursalId: string;
    nombre: string;
    descripcion: string | null,
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
}

export interface ProductoAlmacenInterface {
    id: string;
    productoId: string;
    almacenId: string;
    cantidad: number;
    cantidadMinima: number;
    createdAt: number;
    updatedAt: number;
}

export interface CreateProductoAlmacenDto {
    productoId: string;
    almacenId?: string;
    cantidad?: number;
    cantidadMinima?: number;
}

export interface CreateManyProductosAlmacenDto {
    almacenId: string;
    productosAlmacen: CreateProductoAlmacenDto[];
}

export interface ProductoAlmacenDetalladoInterface extends ProductoAlmacenInterface {
    codigo: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    categoria?: string;
    marca?:string;
    unidadMedida?: string;
    unidadMedidaAbreviada?: string;
}