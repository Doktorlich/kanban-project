import { DragOverlay } from "@dnd-kit/core";
import TaskCardView from "@/components/task/TaskCard/TaskCardView";
import { Task } from "@myapp/shared-types";
import taskClasses from "@/components/task/TaskCard/TaskCard.module.scss";
interface TaskCardOverlayProps {
    task: Task | null;
}
export default function TaskCardOverlay({ task }: TaskCardOverlayProps) {
    return (
        <DragOverlay>
            {task ? (
                <div className={taskClasses["task-card__item"]}>
                    <div className={taskClasses["task-card__link"]}>
                        <TaskCardView task={task} />
                    </div>
                </div>
            ) : null}
        </DragOverlay>
    );
}
