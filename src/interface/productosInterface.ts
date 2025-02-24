export interface ProductoInterface {
    id: string;
    sucursalId: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    activo: boolean;
    deleted: boolean;
    categoriaId: string;
    categoria?: string;
    marcaId: string;
    marca?:string;
    unidadMedidaId: string;
    unidadMedida?: string;
    unidadMedidaAbreviada?: string;
    createdAt: number;
    updatedAt: number;
}

export interface MarcaInterface {
    id: string;
    sucursalId: string;
    nombre: string;
    origen: string;
    deleted: boolean;
}

export interface CategoriaInterface {
    id: string;
    sucursalId: string;
    nombre: string;
    detalle: string;
    deleted: boolean;
}

export interface UnidadMedidaInterface {
    id: string;
    sucursalId: string;
    nombre: string;
    abreviatura: string;
    detalle: string;
    favorito: boolean;
}

export interface ProductoDetalladoInterface extends ProductoInterface{
    Categoria: CategoriaInterface;
    Marca: MarcaInterface;
    UnidadMedida: UnidadMedidaInterface;
}