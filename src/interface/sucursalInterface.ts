export interface LoginSucursalInterface{
    nit: string;
    password: string;
}

export interface LoginSucursalUserInterface{
    id: string;
    sucursalId: string;
    password: string;
}

export interface UpdateSucursalUserInterface{
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

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  ci: string;
  imagen: string;
  sucursalId: string;
}