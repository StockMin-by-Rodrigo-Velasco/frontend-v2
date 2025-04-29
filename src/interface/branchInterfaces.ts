export interface Branch {
    id: string;
    nit: string;
    code: string;
    password: string;
    adminPassword: string;
    name: string;
    owner: string;
    logo: string;
    address: string;
    contact: string;
    deleted: boolean;

    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    branchId: string;
    name: string;
    lastName: string;
    ci: string;
    profile: string;
    contact: string;
    address: string;
    password: string;
    deleted: boolean;

    UserPermission: UserPermission[];
}

export interface Permission {
    id: string;
    code: string;
    module: string;
    description: string;
}

export interface UserPermission {
    id: string;
    userId: string;
    permissionId: string;
}


// ------------- DTOs ----------------
export interface LoginBranchDto {
    code: string;
    password: string;
}

export interface LoginSuperUserDto {
    branchId: string;
    adminPassword: string;
}

export interface LoginUserDto {
    id: string;
    branchId: string;
    password: string;
}


export interface CreateUserDto {
    branchId: string;
    name: string;
    lastName: string;
    ci: string;
    profile: string;
    contact: string;
    address: string;
    password: string;
}

export interface UpdateUserDto {
    id: string;
    branchId: string;
    name?: string;
    lastName?: string;
    ci?: string;
    profile?: string;
    contact?: string;
    address?: string;
    password?: string;
    oldPassword?: string;
}

export interface HandlePermissionUserDto {
    userId: string;
    permisoId: string;
}