import { Categoria, Marca, UnidadMedida } from "./productosInterface";

export interface ProductoTienda {

    id: string;
    productoId: string;
    productoAlmacenId: string,
    codigo: string;
    nombre: string;
    descripcion: string;
    imagen: string;

    cantidad: number;
    cantidadCotizacion?: number;
    precio: string;

    Marca: Marca;
    Categoria: Categoria;
    UnidadMedida: UnidadMedida;

    createdAt?: string | undefined;
    updatedAt?: string | undefined;

    show: boolean;
    check: boolean;
}

export interface TipoMonedaVenta {
    id: string;
    nombre: string;
    abreviatura: string;
}

export interface PrecioVenta {
    id: string;
    sucursalId: string;
    codigo: string;
    descripcion?: string;
    deleted?: boolean;
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

export interface ProductoVenta {
    id: string;
    almacenId: string;
    productoId: string;
    precio: string;

    createdAt?: string;
    updatedAt?: string;

    precioVentaId: string;
    PrecioVenta: PrecioVenta;
}

export interface ProductoDetalleVenta {
    id: string;
    cantidad: number;
    precio: string;
    productoId: string;
    productoAlmacenId: string;
    ventaId?: string;
    cotizacionVentaId?: string;
}

export interface Venta {
    id: string;
    sucursalId: string;
    almacenId: string;
    numero: number;
    total: string;
    usuarioId: string;
    descuento?: string;
    detalle?: string;
    createdAt: string;

    precioVentaId: string;
    PrecioVenta: PrecioVenta;

    clienteVentaId: string;
    ClienteVenta: ClienteVenta;

    cotizacionVentaId?: string;
    CotizacionVenta?: CotizacionVenta;

    ProductoDetalleVenta: ProductoDetalleVenta[];
}

export interface CotizacionVenta {
    id: string;
    sucursalId: string;
    total: string;
    usuarioId: string;
    numero: number;
    descuento?: string;
    detalle?: string;
    createdAt: string;

    precioVentaId: string;
    PrecioVenta: PrecioVenta

    clienteVentaId: string;
    ClienteVenta: ClienteVenta

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

export interface OpcionesVenta {
    id: string;
    sucursalId: string;
    almacenId: string;
    precioVentaId: string;
    tipoMonedaVentaId: string; 

    PrecioVenta: PrecioVenta;
    TipoMonedaVenta: TipoMonedaVenta;
}



//* ------------------- DTOs -----------------
export interface CreateClienteVentaDto {
    sucursalId: string;
    codigo: string;
    nombre: string;
    apellido: string;
    contacto?: string;
    direccion?: string;
}

export interface UpdateClienteVentaDto {
    clienteId: string;
    sucursalId: string;
    codigo?: string
    nombre?: string
    apellido?: string
    contacto?: string
    direccion?: string
}

export interface CreatePrecioVentaDto {
    sucursalId: string;
    codigo: string
    descripcion?: string
}

export interface UpdatePrecioVentaDto {
    precioVentaId: string;
    sucursalId: string;
    tipoMonedaVentaId?: string;
    codigo?: string
    descripcion?: string
}

export interface DeletePrecioVentaDto {
    precioVentaId: string;
    sucursalId: string;
}

export interface CreateOpcionesVentaDto {
    sucursalId: string;
    almacenId: string;
    precioVentaId: string;
    tipoMonedaVentaId: string;
}

export interface UpdateOpcionesVentaDto {
    id: string;
    sucursalId: string;
    almacenId?: string;
    precioVentaId?: string;
}

export interface CreateProductoVentaDto {

    almacenId: string;
    productoId: string;
    precioVentaId: string;
    precio: string;

    // ---- LOG ----
    sucursalId: string;
    codigoProducto: string;
}

export interface UpdateProductoVentaDto{
    id: string;
    precio: string;
    // ---- LOG ----
    sucursalId: string;
    codigoProducto: string;
}

export interface CreateProductoDetalleVentaDto {
    cantidad: number;
    precio: string;
    productoId: string;
}

export interface CreateCotizacionVentaDto {
    sucursalId: string;
    total: string;
    usuarioId: string;
    numero?: number;
    descuento?: string;
    detalle?: string;
    precioVentaId: string;
    clienteVentaId: string;
    productoDetalleVenta: CreateProductoDetalleVentaDto[]
}

export interface CreateVentaDto {
    sucursalId: string;
    almacenId: string;
    usuarioId: string;
    numero?: number;
    total: string;
    descuento?: string;
    detalle?: string;
    precioVentaId: string;
    clienteVentaId: string;
    cotizacionVentaId?: string;

    productoDetalleVenta: CreateProductoDetalleVentaDto[]
}

export interface GetCotizacionesVentaDto {
    sucursalId: string;
    desde: string;
    hasta: string;
}