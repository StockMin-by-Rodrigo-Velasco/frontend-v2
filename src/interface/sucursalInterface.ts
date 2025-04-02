export interface LoginSucursalDto {
    nit: string;
    password: string;
}

export interface LoginSucursalUserInterface {
    id: string;
    sucursalId: string;
    password: string;
}

export interface Sucursal {
    id: string;
    nit: string;
    password: string;
    adminPassword: string;
    nombre: string;
    propietario: string;
    logo: string;
    direccion: string;
    contacto: string;
    deleted: boolean;
}

export interface User {
    id: string
    sucursalId: string
    nombre: string
    apellido: string
    ci: string
    imagen: string
    contacto: string
    direccion: string
    password: string
    deleted: boolean
    UsuarioPermiso: UsuarioPermiso[]
}

export interface Permiso {
    id: string;
    codigo: string;
    modulo: string;
    permiso: string;
    descripcion: string;
}

export interface UsuarioPermiso {
    id: string;
    userId: string;
    permisoId: string;
}


// ------------- DTOs ----------------
export interface CreateSucursalUserDto {
    sucursalId: string;
    nombre: string;
    apellido: string;
    ci: string;
    imagen: string;
    contacto: string;
    direccion: string;
    password: string;
}

export interface UpdateSucursalUserDto {
    id: string;
    sucursalId: string;
    nombre?: string;
    apellido?: string;
    ci?: string;
    imagen?: string;
    contacto?: string;
    direccion?: string;
    oldPassword?: string;
    password?: string;
    rePassword?: string;
}

export interface HandlePermisoUserDto {
    userId: string;
    permisoId: string;
}