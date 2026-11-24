import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";

// vi.mock поднимается выше импортов, поэтому заглушки создаём через vi.hoisted
const mocks = vi.hoisted(() => ({
    findBoard: vi.fn(),
    findMember: vi.fn(),
}));

// Подменяем модуль с настоящим Prisma: база и переменные окружения в тестах не нужны
vi.mock("../prisma", () => ({
    prisma: {
        board: { findUnique: mocks.findBoard },
        workspaceMember: { findFirst: mocks.findMember },
    },
}));

import { requireRole } from "./rbac.middleware";

type FakeReq = { userId?: number; params: Record<string, string> };

// Запускает middleware с поддельными req/res/next и возвращает res и next для проверок
async function callMiddleware(resourceType: "workspace" | "board", allowedRoles: string[], req: FakeReq) {
    const res = { status: vi.fn(), json: vi.fn() };
    res.status.mockReturnValue(res); // res.status(...).json(...) должен работать цепочкой
    const next = vi.fn();

    await requireRole(resourceType, allowedRoles)(
        req as unknown as Request,
        res as unknown as Response,
        next as unknown as NextFunction,
    );

    return { res, next };
}

describe("requireRole", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    describe("resourceType: board", () => {
        it("returns 401 when the user is not authenticated", async () => {
            const { res, next } = await callMiddleware("board", ["owner"], { params: { boardId: "1" } });

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "Not authenticated" });
            expect(next).not.toHaveBeenCalled();
            expect(mocks.findMember).not.toHaveBeenCalled();
        });

        it.each([["abc"], [""], [undefined]])("returns 400 for invalid board id %j", async boardId => {
            const params: Record<string, string> = boardId === undefined ? {} : { boardId };
            const { res, next } = await callMiddleware("board", ["owner"], { userId: 1, params });

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Invalid board id" });
            expect(next).not.toHaveBeenCalled();
        });

        it("returns 404 when the board does not exist", async () => {
            mocks.findBoard.mockResolvedValue(null);

            const { res, next } = await callMiddleware("board", ["owner"], { userId: 1, params: { boardId: "7" } });

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Resource not found" });
            expect(next).not.toHaveBeenCalled();
        });

        it("returns 403 when the user is not a member of the workspace", async () => {
            mocks.findBoard.mockResolvedValue({ workspaceId: 5 });
            mocks.findMember.mockResolvedValue(null);

            const { res, next } = await callMiddleware("board", ["owner"], { userId: 1, params: { boardId: "7" } });

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: "You are not a member of this workspace" });
            expect(next).not.toHaveBeenCalled();
        });

        it("looks up the membership by the workspace of the board and the current user", async () => {
            mocks.findBoard.mockResolvedValue({ workspaceId: 5 });
            mocks.findMember.mockResolvedValue({ role: "owner" });

            await callMiddleware("board", ["owner"], { userId: 1, params: { boardId: "7" } });

            expect(mocks.findMember).toHaveBeenCalledWith({ where: { workspaceId: 5, userId: 1 } });
        });

        // Матрица ролей: какая роль проходит при каком списке разрешённых
        it.each([
            { role: "owner", allowed: ["owner"], passes: true },
            { role: "owner", allowed: ["owner", "member"], passes: true },
            { role: "member", allowed: ["owner", "member"], passes: true },
            { role: "member", allowed: ["owner"], passes: false },
        ])("role $role with allowed $allowed -> passes: $passes", async ({ role, allowed, passes }) => {
            mocks.findBoard.mockResolvedValue({ workspaceId: 5 });
            mocks.findMember.mockResolvedValue({ role });

            const { res, next } = await callMiddleware("board", allowed, { userId: 1, params: { boardId: "7" } });

            if (passes) {
                expect(next).toHaveBeenCalledTimes(1);
                expect(res.status).not.toHaveBeenCalled();
            } else {
                expect(res.status).toHaveBeenCalledWith(403);
                expect(res.json).toHaveBeenCalledWith({ message: "Insufficient permissions" });
                expect(next).not.toHaveBeenCalled();
            }
        });
    });

    describe("resourceType: workspace", () => {
        it("uses the workspace id from params and does not query the board", async () => {
            mocks.findMember.mockResolvedValue({ role: "owner" });

            const { next } = await callMiddleware("workspace", ["owner"], { userId: 1, params: { workspaceId: "3" } });

            expect(mocks.findBoard).not.toHaveBeenCalled();
            expect(mocks.findMember).toHaveBeenCalledWith({ where: { workspaceId: 3, userId: 1 } });
            expect(next).toHaveBeenCalledTimes(1);
        });

        it("returns 400 for an invalid workspace id", async () => {
            const { res, next } = await callMiddleware("workspace", ["owner"], {
                userId: 1,
                params: { workspaceId: "abc" },
            });

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Invalid workspace id" });
            expect(next).not.toHaveBeenCalled();
        });

        it("returns 403 for a member when only owner is allowed", async () => {
            mocks.findMember.mockResolvedValue({ role: "member" });

            const { res, next } = await callMiddleware("workspace", ["owner"], {
                userId: 1,
                params: { workspaceId: "3" },
            });

            expect(res.status).toHaveBeenCalledWith(403);
            expect(next).not.toHaveBeenCalled();
        });
    });
});
