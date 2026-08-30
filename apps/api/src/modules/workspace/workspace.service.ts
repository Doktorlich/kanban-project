import { CreateWorkspaceDto, UpdateWorkspaceDto } from "./workspace.types";
import { prisma } from "../../prisma";

export async function createWorkspace(userId: number, dto: CreateWorkspaceDto) {
    return prisma.workspace.create({
        data: {
            title: dto.title,
            members: {
                create: {
                    userId,
                    role: "owner",
                },
            },
        },
    });
}

export async function getUserWorkspaces(userId: number) {
    return prisma.workspace.findMany({
        where: {
            members: {
                some: {
                    userId,
                },
            },
        },
    });
}

export async function getWorkspaceById(workspaceId: number) {
    const workspace = await prisma.workspace.findUnique({
        where: {
            id: workspaceId,
        },
    });
    if (!workspace) {
        throw new Error("Workspace not found");
    }
    return workspace;
}

export async function updateWorkspace(workspaceId: number, dto: UpdateWorkspaceDto) {
    return prisma.workspace.update({
        where: {
            id: workspaceId,
        },
        data: {
            title: dto.title,
        },
    });
}

export async function deleteWorkspace(workspaceId: number) {
    return prisma.workspace.delete({
        where: {
            id: workspaceId,
        },
    });
}
