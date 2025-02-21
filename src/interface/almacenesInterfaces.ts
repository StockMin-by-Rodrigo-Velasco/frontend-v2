export interface AlmacenInterface {
    id: string;
    sucursalId: string;
    nombre: string;
    descripcion: string | null,
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
}