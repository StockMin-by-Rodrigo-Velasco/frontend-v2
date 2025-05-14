export interface Log {
    id: string;
    branchId: string;
    userId: string;
    module: string;
    title: string;
    description: string;
    createdAt: string;
}
export const initialLog:Log= {id: '', branchId: '', userId: '', module: '', title: '', description: '', createdAt: ''}