import Column from "@/components/board/Column/Column";
import { Board, COLUMNS, Workspace, WORKSPACES } from "@/constants/mock-workspaces";
import TaskCard from "@/components/task/TaskCard/TaskCard";
import classes from "./page.module.scss";
import clsx from "clsx";

interface BoardsProps {
    params: Promise<{ workspaceId: string; boardId: string }>;
}

export default async function BoardsPage({ params }: BoardsProps) {
    const { workspaceId, boardId } = await params;
    const workspace: Workspace | undefined = WORKSPACES.find(workspace => workspace.id === +workspaceId);
    const board: Board | undefined = workspace?.boards.find(board => board.id === +boardId);

    if (!board) {
        return <div className={classes["workspace"]}>Board not found</div>;
    }
    const columnItemClassName = clsx(classes["board-column__item"], classes["board-column__item--empty"]);
    return (
        <div className={classes["board-page"]}>
            <header className={classes["board-page__header"]}>
                <div className={classes["board-page__title-wrapper"]}>
                    <h1 className={classes["board-page__title"]}>Board: {board.nameBoard}</h1>
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
