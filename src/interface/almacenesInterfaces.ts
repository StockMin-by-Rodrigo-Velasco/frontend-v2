export interface AlmacenInterface {
    id: string;
    sucursalId: string;
    nombre: string;
    descripcion?: string,
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

export interface IngresoProductosAlmacenInterface {
    id: string;
    cantidad: number;
    ingresoAlmacenId: string;
    productoAlmacenId: string;
    ProductoAlmacen: ProductoAlmacenInterface[];
}
export interface IngresoAlmacenInterface {
    id: string;
    usuarioId: string;
    almacenId: string;
    detalle: string;
    createdAt: number;
    IngresoProductosAlmacen: IngresoProductosAlmacenInterface[];
}



// --------------------- DTOs ------------------------

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

export interface CreateIngresoProductoAlmacenDto {
    productoAlmacenId: string;
    cantidad: number;
}

export interface CreateIngresoProductosAlmacenDto {
    usuarioId: string;
    almacenId: string;
    detalle?: string;
    ingresoProductosAlmacen: CreateIngresoProductoAlmacenDto[]
}

// --------------------- Response ------------------------

