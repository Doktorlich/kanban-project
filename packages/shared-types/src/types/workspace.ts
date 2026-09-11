export interface WorkspaceMemberUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
}
export interface WorkspaceMember {
    id: number;
    role: string;
    createdAt: string;
    user: WorkspaceMemberUser;
}
export interface Workspace {
    id: number;
    title: string;
    _count: {
        boards: number;
    };
    members: WorkspaceMember[];
}
