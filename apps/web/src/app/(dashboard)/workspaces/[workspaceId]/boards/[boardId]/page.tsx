import Column from "@/components/board/Column";
import { Board, COLUMNS, Workspace, WORKSPACES } from "@/constants/mock-workspaces";
import TaskCard from "@/components/task/TaskCard";

interface BoardsProps {
    params: Promise<{ workspaceId: string; boardId: string }>;
}

export default async function BoardsPage({ params }: BoardsProps) {
    // В Next.js params является асинхронным объектом
    const { workspaceId, boardId } = await params;
    const workspace: Workspace | undefined = WORKSPACES.find(workspace => workspace.id === +workspaceId);
    const board: Board | undefined = workspace?.boards.find(board => board.id === +boardId);
    if (!board) {
        return <div className="workspace">Board not found</div>;
    }
    return (
        <div className="board-page">
            <header className="board-page__header">
                <div className="board-page__title-wrapper">
                    <h1 className="board-page__title">Board: {board.nameBoard}</h1>
                </div>
            </header>
            <div>
                {COLUMNS.map(col => {
                    const filteredTasks = board?.tasks.filter(task => task.status === col.id);

                    return (
                        <Column key={col.id} status={col.title} countTasks={filteredTasks?.length}>
                            <ul className="board-column__list">
                                {filteredTasks?.length === 0 ? (
                                    <li className="board-column__item board-column__item--empty">
                                        <p className="board-column__empty-text">No tasks</p>
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
                    );
                })}
            </div>
        </div>
    );
}
