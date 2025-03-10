export interface TipoMonedaVenta {
    id: string;
    nombre: string;
    abreviatura: string;
    deleted?: boolean;

    PrecioVenta: PrecioVenta[]
}

export interface PrecioVenta {
    id: string;
    sucursalId: string;
    codigo: string;
    modena: string;
    descripcion?: string;
    deleted?: boolean;

    tipoMonedaId: string;
    TipoMonedaVenta: TipoMonedaVenta;

    PrecioVenta: PrecioVenta[];
}


export interface PrecioProductoVenta {
    id: string;
    precio: string;

    precioId: string;
    PrecioVenta: PrecioVenta;

    productoId: string;
    ProductoVenta: ProductoVenta;
}

export interface ProductoVenta {
    id: string;
    sucursalId: string;
    productoId: string;

    createdAt?: string;
    updatedAt?: string;

    ProductoDetalleVenta: ProductoDetalleVenta[]
    PrecioProductoVenta: PrecioProductoVenta[]
}

export interface ProductoDetalleVenta {
    id: string;
    cantidad: number;
    precio: string;
    descuento?: string;

    ventaId: string;
    Venta: Venta;

    productoId: string;
    ProductoVenta: ProductoVenta;
}

export interface Venta {
    id: string;
    sucursalId: string;
    numero: number;
    total: number;
    detalle?: string;
    createdAt?: string;

    clienteId: string;
    ClienteVenta: ClienteVenta;

    ProductoDetalleVenta: ProductoDetalleVenta[]
}

export interface ClienteVenta {
    id: string;
    sucursalId: string;
    codigo: string;
    nombre: string;
    apellido: string;
    contacto?: string;
    direccion?: string;
}

//------------------- DTOs -----------------
export interface CreateClienteVentaDto{
    sucursalId: string;
    codigo : string;
    nombre: string;
    apellido: string;
    contacto?: string;
    direccion?: string;
}

export interface UpdateClienteVentaDto{
    clienteId: string;
    sucursalId: string;
    codigo? : string
    nombre?: string
    apellido?: string
    contacto?: string
    direccion?: string
}
