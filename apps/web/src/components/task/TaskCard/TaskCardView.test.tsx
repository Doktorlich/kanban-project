import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Task } from "@myapp/shared-types";
import TaskCardView from "./TaskCardView";

function makeTask(overrides: Partial<Task> = {}): Task {
    return {
        id: 1,
        title: "Fix login bug",
        description: "Users cannot sign in",
        position: 0,
        columnId: 1,
        priority: { id: 3, name: "high", color: "#ff0000", weight: 3 },
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        owners: [],
        ...overrides,
    };
}

const makeOwner = (id: number) => ({
    id,
    username: `user${id}`,
    firstName: "Ann",
    lastName: "Lee",
    avatarUrl: null,
});

describe("TaskCardView", () => {
    it("renders the title, description and priority", () => {
        render(<TaskCardView task={makeTask()} />);

        expect(screen.getByRole("heading", { name: "Fix login bug" })).toBeInTheDocument();
        expect(screen.getByText("Users cannot sign in")).toBeInTheDocument();
        expect(screen.getByText("high")).toBeInTheDocument();
    });

    it("paints the priority badge with the color from the data", () => {
        render(<TaskCardView task={makeTask()} />);

        expect(screen.getByText("high")).toHaveStyle({ backgroundColor: "#ff0000" });
    });

    it("renders one item per owner", () => {
        render(<TaskCardView task={makeTask({ owners: [makeOwner(1), makeOwner(2)] })} />);

        expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("renders no owner items when the task has no owners", () => {
        render(<TaskCardView task={makeTask({ owners: [] })} />);

        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("does not break without a description", () => {
        render(<TaskCardView task={makeTask({ description: null })} />);

        expect(screen.getByRole("heading", { name: "Fix login bug" })).toBeInTheDocument();
    });
});
