import TaskDetails from "@/components/task/TaskDetails/TaskDetails";
import { Board, TaskCard, Workspace, WORKSPACES } from "@/constants/mock-workspaces";
import Link from "next/link";

interface TaskDetailsPageProps {
    params: Promise<{ workspaceId: string; boardId: string; taskId: string }>;
}
export default async function TaskDetailsPage({ params }: TaskDetailsPageProps) {
    const { workspaceId, boardId, taskId } = await params;
    const workspace: Workspace | undefined = WORKSPACES.find(workspace => workspace.id === +workspaceId);
    const board: Board | undefined = workspace?.boards.find(board => board.id === +boardId);
    const task: TaskCard | undefined = board?.tasks.find(task => task.id === +taskId);

    if (!task || !board || !workspace)  {
        return <div>Task or Board or workspace not found</div>;
    }

    return <TaskDetails workspace={workspace} task={task} board={board} isModal={false} />;
}
