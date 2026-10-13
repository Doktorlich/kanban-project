import Link from "next/link";
import classes from "./TaskCard.module.scss";
import { Task } from "@myapp/shared-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import TaskCardView from "@/components/task/TaskCard/TaskCardView";

interface TaskCardProps {
    task: Task;
    href: string;
    isDragDisabled?: boolean;
}

export default function TaskCard({ task, href, isDragDisabled }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: { type: "task" },
        disabled: isDragDisabled,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };
    return (
        <li className={classes["task-card__item"]} ref={setNodeRef} style={style} onDragStart={e => e.preventDefault()}>
            {!isDragDisabled && (
                <GripVertical size={36} className={classes["task-card__grip"]} {...attributes} {...listeners} />
            )}
            <Link href={href} className={classes["task-card__link"]}>
                <TaskCardView task={task} />
            </Link>
        </li>
    );
}
