import { Categoria, Marca, UnidadMedida } from "./productosInterface";

export interface ProductoTienda {

    productoId: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    
    cantidad: number;
    precio: string;

    Marca: Marca;
    Categoria: Categoria;
    UnidadMedida: UnidadMedida;

    createdAt: string | undefined;
    updatedAt: string | undefined;

    show: boolean;
    check: boolean;
}

export interface TipoMonedaVenta {
    id: string;
    sucursalId: string;
    nombre: string;
    abreviatura: string;
    deleted?: boolean;
}

export interface PrecioVenta {
    id: string;
    sucursalId: string;
    codigo: string;
    descripcion?: string;
    deleted?: boolean;

    tipoMonedaVentaId: string;
    TipoMonedaVenta?: TipoMonedaVenta;
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

    ventaId?: string;
    Venta?: Venta;

    cotizacionVentaId?: string;
    CotizacionVenta?: CotizacionVenta;
}

export interface Venta {
    id: string;
    sucursalId: string;
    almacenId: string;
    numero: number;
    descuento: string;
    total: string;
    detalle?: string;
    createdAt?: string;

    precioVentaId: string;
    PrecioVenta: PrecioVenta;

    cotizacionVentaId?: string;
    CotizacionVenta?: CotizacionVenta;

    clienteVentaId: string;
    ClienteVenta: ClienteVenta;

    ProductoDetalleVenta: ProductoDetalleVenta[]
}

interface CotizacionVenta {
    id: string;
    sucursalId: string;
    numero: number;
    descuento?: string;
    total: string;
    detalle?: string;
    createdAt?: string;

    clienteVentaId: String
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

    PrecioVenta: PrecioVenta;
}

//------------------- DTOs -----------------
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

export interface CreateTipoMonedaVentaDto {
    sucursalId: string;
    nombre: string
    abreviatura: string
}
export interface CreatePrecioVentaDto {
    sucursalId: string;
    tipoMonedaVentaId: string;
    codigo: string
    descripcion?: string
    deleted?: boolean
}

export interface UpdateTipoMonedaVentaDto {
    tipoMonedaVentaId: string;
    sucursalId: string;
    nombre?: string
    abreviatura?: string
}
export interface UpdatePrecioVentaDto {
    precioVentaId: string;
    sucursalId: string;
    tipoMonedaVentaId?: string;
    codigo?: string
    descripcion?: string
}

export interface DeleteTipoMonedaVentaDto {
    tipoMonedaVentaId: string;
    sucursalId: string;
}
export interface DeletePrecioVentaDto {
    precioVentaId: string;
    sucursalId: string;
}

export interface CreateOpcionesVentaDto {
    sucursalId: string;
    almacenId: string;
    precioVentaId: string;
}

export interface UpdateOpcionesVentaDto {
    id: string;
    sucursalId: string;
    almacenId?: string;
    precioVentaId?: string;
}
