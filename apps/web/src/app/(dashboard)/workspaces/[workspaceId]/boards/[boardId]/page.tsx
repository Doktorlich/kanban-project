"use client";

import Column from "@/components/board/Column/Column";
import TaskCard from "@/components/task/TaskCard/TaskCard";
import classes from "./page.module.scss";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boardKeys, getBoardById } from "@/lib/board";
import queryState from "@/lib/query-state";
import { columnKeys, createColumn, getColumns } from "@/lib/column";
import Button from "@/components/ui/Button/Button";
import { Plus } from "lucide-react";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

import { filterTasksByPriority, filterTasksBySearch, sortTasksByUpdatedAt } from "@/lib/task-filters";
import BoardControls from "@/components/board/BoardControls/BoardControls";
import { useState } from "react";
import { ColumnWithTasks } from "@myapp/shared-types";

// interface BoardsProps {}
const DEFAULT_COLUMN_TITLE = { title: "NEW COLUMN" };
export default function BoardsPage() {
    const [localColumns, setLocalColumns] = useState<ColumnWithTasks[] | null>(null);
    const [prevColumnsData, setPrevColumnsData] = useState<ColumnWithTasks[] | null>(null);

    const { workspaceId, boardId } = useParams();
    const queryClient = useQueryClient();
    const { priorityId, sortBy, searchQuery } = useSelector((state: RootState) => state.boardFilters);

    const queryBoard = useQuery({
        queryKey: boardKeys.detail(Number(boardId)),
        queryFn: () => getBoardById(Number(workspaceId), Number(boardId)),
    });

    const createColumnMutation = useMutation({
        mutationFn: () => createColumn(Number(workspaceId), Number(boardId), DEFAULT_COLUMN_TITLE),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: columnKeys.list(Number(boardId)) });
        },
    });

    const queryColumns = useQuery({
        queryKey: columnKeys.list(Number(boardId)),
        queryFn: () => getColumns(Number(workspaceId), Number(boardId)),
    });

    if (queryColumns.data !== prevColumnsData) {
        setPrevColumnsData(queryColumns.data ?? null);
        setLocalColumns(queryColumns.data ?? null);
    }

    const stateBoard = queryState(queryBoard, {
        emptyMessage: "Board not found",
    });
    if (stateBoard) {
        return stateBoard;
    }
    const columnItemClassName = clsx(classes["board-column__item"], classes["board-column__item--empty"]);
    function renderContent() {
        const stateColumn = queryState(queryColumns, {
            emptyMessage: "No columns yet — create your first one",
        });
        if (stateColumn) {
            return stateColumn;
        }

        if (!localColumns) return null;

        return (
            <ul className={classes["column__list"]}>
                {localColumns.map(col => {
                    const searchedTasks = filterTasksBySearch(col.tasks, searchQuery);
                    const filteredTasks = filterTasksByPriority(searchedTasks, priorityId);
                    const sortedTasks = sortTasksByUpdatedAt(filteredTasks, sortBy);
                    return (
                        <li key={col.id} className={classes["column__item"]}>
                            <Column countTasks={sortedTasks.length} column={col}>
                                <ul className={classes["board-column__list"]}>
                                    {sortedTasks.length === 0 ? (
                                        <li className={columnItemClassName}>
                                            <p className={classes["board-column__empty-text"]}>No tasks</p>
                                        </li>
                                    ) : (
                                        sortedTasks.map(task => {
                                            return (
                                                <TaskCard
                                                    key={task.id}
                                                    task={task}
                                                    href={`/workspaces/${workspaceId}/boards/${boardId}/tasks/${task.id}`}
                                                />
                                            );
                                        })
                                    )}
                                </ul>
                            </Column>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <div className={classes["board-page"]}>
            <header className={classes["board-page__header"]}>
                <div className={classes["board-page__title-wrapper"]}>
                    <h2 className={classes["board-page__title"]}>{queryBoard.data?.title}</h2>

                    <Button type={"button"} variant={"primary"} onClick={() => createColumnMutation.mutate()}>
                        Add New Column
                        <Plus size={24} />
                    </Button>
                </div>
                <BoardControls />
            </header>
            {renderContent()}
        </div>
    );
}
