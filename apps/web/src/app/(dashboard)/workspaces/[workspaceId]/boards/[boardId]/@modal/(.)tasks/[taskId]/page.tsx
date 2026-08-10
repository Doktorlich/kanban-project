import TaskDetails from "@/components/task/TaskDetails";
import { Board, TaskCard, Workspace, WORKSPACES } from "@/constants/mock-workspaces";

import Modal from "@/components/ui/Modal/Modal";
import CloseModalButton from "@/components/ui/CloseModalButton";
interface TaskDetailsModalPageProps {
    params: Promise<{ workspaceId: string; boardId: string; taskId: string }>;
}
export default async function TaskDetailsModalPage({ params }: TaskDetailsModalPageProps) {
    const { workspaceId, boardId, taskId } = await params;
    const workspace: Workspace | undefined = WORKSPACES.find(workspace => workspace.id === +workspaceId);
    const board: Board | undefined = workspace?.boards.find(board => board.id === +boardId);
    const task: TaskCard | undefined = board?.tasks.find(task => task.id === +taskId);

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <Modal>
            <h2>Modal window: {task.id}</h2>
            <TaskDetails task={task} />
            <CloseModalButton type={"button"}>Close</CloseModalButton>
        </Modal>
    );
}
