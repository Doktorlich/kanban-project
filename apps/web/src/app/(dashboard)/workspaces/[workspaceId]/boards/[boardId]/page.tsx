"use client";

import Column from "@/components/board/Column/Column";
import TaskCard from "@/components/task/TaskCard/TaskCard";
import classes from "./page.module.scss";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { boardKeys, getBoardById } from "@/lib/board";
import queryState from "@/lib/query-state";
import { columnKeys, getColumns } from "@/lib/column";

// interface BoardsProps {}

export default function BoardsPage() {
    const { workspaceId, boardId } = useParams();

    const queryBoard = useQuery({
        queryKey: boardKeys.detail(Number(boardId)),
        queryFn: () => getBoardById(Number(workspaceId), Number(boardId)),
    });

    const queryColumns = useQuery({
        queryKey: columnKeys.list(Number(boardId)),
        queryFn: () => getColumns(Number(workspaceId), Number(boardId)),
    });

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
        if (!queryColumns.data) return null;
        return (
            <ul className={classes["column__list"]}>
                {queryColumns.data.map(col => {
                    return (
                        <li key={col.id} className={classes["column__item"]}>
                            <Column status={col.title} countTasks={col.tasks.length}>
                                <ul className={classes["board-column__list"]}>
                                    {col.tasks.length === 0 ? (
                                        <li className={columnItemClassName}>
                                            <p className={classes["board-column__empty-text"]}>No tasks</p>
                                        </li>
                                    ) : (
                                        col.tasks?.map(task => {
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
                </div>
            </header>
            {renderContent()}
        </div>
    );
}
