export interface Producto {
    id: string;
    sucursalId: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    categoriaId: string;
    marcaId: string;
    unidadMedidaId: string;

    Marca: Marca;
    Categoria: Categoria;
    UnidadMedida: UnidadMedida;
}

export interface Marca {
    id: string;
    sucursalId: string;
    nombre: string;
    origen: string;
    deleted: boolean;
}

export interface Categoria {
    id: string;
    sucursalId: string;
    nombre: string;
    detalle: string;
    deleted: boolean;
}

export interface UnidadMedida {
    id: string;
    nombre: string;
    abreviatura: string;
    detalle: string;
}


export interface UnidadMedidaSucursal {
    id: string;
    sucursalId: string;
    unidadMedidaId: string;
    deleted: boolean;
    UnidadMedida: UnidadMedida;
}