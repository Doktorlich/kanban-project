import { prisma } from "../prisma";

export async function isBoardMember(userId: number, boardId: number): Promise<boolean> {
    const member = await prisma.workspaceMember.findFirst({
        where: { userId, workspace: { boards: { some: { id: boardId } } } },
        select: { id: true },
    });
    return member !== null;
}
