export interface Almacen {
    id: string;
    sucursalId: string;
    nombre: string;
    descripcion?: string,
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductoAlmacen {
    id: string;
    productoId: string;
    almacenId: string;
    cantidad: number;
    cantidadMinima: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProductoAlmacenDetallado extends ProductoAlmacen {
    codigo: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    categoria?: string;
    marca?:string;
    unidadMedida?: string;
    unidadMedidaAbreviada?: string;
}

export interface IngresoProductosAlmacen {
    id: string;
    cantidad: number;
    ingresoAlmacenId: string;
    productoAlmacenId: string;

    ProductoAlmacen: ProductoAlmacen;
}
export interface IngresoAlmacen {
    id: string;
    usuarioId: string;
    almacenId: string;
    detalle: string;
    createdAt: string;
    IngresoProductosAlmacen: IngresoProductosAlmacen[];
}

// --------------------- DTOs ------------------------

export interface CreateAlmacenDto {
    sucursalId: string;
    nombre: string;
    descripcion?: string;
}

export interface DeleteAlmacenDto {
    almacenId: string;
    sucursalId: string;
}

export interface UpdateAlmacenDto {
    almacenId: string;
    sucursalId: string;
    nombre?: string;
    descripcion?: string;
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
    // ----- DATOS PARA LOG -----
    almacenNombre: string;
}

export interface CreateIngresoProductoAlmacenDto {
    productoAlmacenId: string;
    cantidad: number;
}

export interface CreateIngresoAlmacenDto {
    usuarioId: string;
    almacenId: string;
    detalle?: string;
    ingresoProductosAlmacen: CreateIngresoProductoAlmacenDto[]
}

export interface DecrementProductoAlmacenDto{
    productoAlmacenId: string;
    cantidad: number;
}

export interface ListDecrementProductosAlmacenDto {
    productos: DecrementProductoAlmacenDto[]
}

