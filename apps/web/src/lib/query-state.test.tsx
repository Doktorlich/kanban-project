import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import type { UseQueryResult } from "@tanstack/react-query";
import queryState from "./query-state";

// Минимальный "ответ useQuery": функция читает только isPending, isError и data
function fakeQuery<T>(state: { isPending?: boolean; isError?: boolean; data?: T }): UseQueryResult<T> {
    return { isPending: false, isError: false, data: undefined, ...state } as unknown as UseQueryResult<T>;
}

// queryState возвращает ReactNode, поэтому для проверки текста его нужно отрисовать
function show(node: ReactNode) {
    return render(<>{node}</>);
}

describe("queryState", () => {
    it("shows the loading state while the query is pending", () => {
        show(queryState(fakeQuery({ isPending: true })));

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("shows the error state when the query failed", () => {
        show(queryState(fakeQuery({ isError: true })));

        expect(screen.getByText("Error loading data")).toBeInTheDocument();
    });

    it("shows the default message for an empty list", () => {
        show(queryState(fakeQuery({ data: [] })));

        expect(screen.getByText("No data")).toBeInTheDocument();
    });

    it("shows a custom message for an empty list", () => {
        show(queryState(fakeQuery({ data: [] }), { emptyMessage: "No columns yet" }));

        expect(screen.getByText("No columns yet")).toBeInTheDocument();
    });

    it("shows the empty message when data is missing", () => {
        show(queryState(fakeQuery({}), { emptyMessage: "Board not found" }));

        expect(screen.getByText("Board not found")).toBeInTheDocument();
    });

    it("returns null when the list has items", () => {
        expect(queryState(fakeQuery({ data: [1, 2] }))).toBeNull();
    });

    it("returns null for a single entity that is not an array", () => {
        expect(queryState(fakeQuery({ data: { id: 1 } }))).toBeNull();
    });

    it("lets the caller decide what empty means", () => {
        // как у списка комментариев: пустой список не должен скрывать форму
        expect(queryState(fakeQuery({ data: [] }), { isEmpty: () => false })).toBeNull();
    });
});
