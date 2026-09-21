"use client";

import Column from "@/components/board/Column/Column";
import TaskCard from "@/components/task/TaskCard/TaskCard";
import classes from "./page.module.scss";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { boardKeys, getBoardById } from "@/lib/board";
import queryState from "@/lib/query-state";

// interface BoardsProps {}

export default function BoardsPage() {
    const { workspaceId, boardId } = useParams();

    const queryBoard = useQuery({
        queryKey: boardKeys.detail(Number(boardId)),
        queryFn: () => getBoardById(Number(workspaceId), Number(boardId)),
    });
    const stateBoards = queryState(queryBoard, {
        emptyMessage: "Board not found",
    });
    if (stateBoards) {
        return stateBoards;
    }

    const columnItemClassName = clsx(classes["board-column__item"], classes["board-column__item--empty"]);
    return (
        <div className={classes["board-page"]}>
            <header className={classes["board-page__header"]}>
                <div className={classes["board-page__title-wrapper"]}>
                    <h2 className={classes["board-page__title"]}>Board: {queryBoard.data?.title}</h2>
                </div>
            </header>
            <ul className={classes["column__list"]}>
                {COLUMNS.map(col => {
                    const filteredTasks = board?.tasks.filter(task => task.status === col.id);

                    return (
                        <li key={col.id} className={classes["column__item"]}>
                            <Column status={col.title} countTasks={filteredTasks?.length}>
                                <ul className={classes["board-column__list"]}>
                                    {filteredTasks?.length === 0 ? (
                                        <li className={columnItemClassName}>
                                            <p className={classes["board-column__empty-text"]}>No tasks</p>
                                        </li>
                                    ) : (
                                        filteredTasks?.map(task => {
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
        </div>
    );
}
