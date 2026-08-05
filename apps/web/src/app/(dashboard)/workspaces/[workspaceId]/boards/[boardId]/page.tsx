import Column from "@/components/board/Column";
import { Board, COLUMNS, Workspace, WORKSPACES } from "@/constants/mock-workspaces";
import TaskCard from "@/components/board/TaskCard";

interface BoardsProps {
    params: Promise<{ workspaceId: string; boardId: string }>;
}
export default async function BoardsPage({ params }: BoardsProps) {
    // В Next.js params является асинхронным объектом
    const dataUrl = await params;
    //[BoardsPage] — ты получил boardId из params, но нигде его не используешь — заголовок всё ещё жёстко выводит Workspace:
    // {workspaceId}, хотя эта страница уже должна показывать конкретную доску, а не воркспейс.
    // Стоит поправить заголовок на что-то вроде названия доски (пока хардкодом, раз данных ещё нет),
    // и в принципе задуматься — используешь ли ты workspaceId/boardId для того, чтобы найти конкретный мок-объект доски в данных
    // (как ты уже делал в WorkspacePage через .find())? Сейчас STATUS_BARS статичен и никак не привязан к конкретной доске.
    const workspace: Workspace | undefined = WORKSPACES.find(workspace => workspace.id === +dataUrl.workspaceId);
    const board: Board | undefined = workspace?.boards.find(board => board.id === +dataUrl.boardId);
    if (!board) {
        return <div className="workspace">Board not found</div>;
    }
    return (
        <div className={"workspace"}>
            <header>
                <div>
                    <h1>Board: {board?.nameBoard}</h1>
                </div>
            </header>
            <div>
                {COLUMNS.map(col => {
                    const filteredTasks = board?.tasks.filter(task => task.status === col.id);

                    return (
                        <Column key={col.id} status={col.title} countTasks={filteredTasks?.length}>
                            <ul>
                                {filteredTasks?.length === 0 ? (
                                    <li>
                                        <p className="board-column__empty">No tasks</p>
                                    </li>
                                ) : (
                                    filteredTasks?.map(task => {
                                        return <TaskCard key={task.id} task={task} />;
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
