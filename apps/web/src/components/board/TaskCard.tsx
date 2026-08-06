import Link from "next/link";
import type { TaskCard as TaskCardType } from "@/constants/mock-workspaces";

interface TaskCardProps {
    task: TaskCardType;
    href: string;
}

export default function TaskCard({ task, href }: TaskCardProps) {
    return (
        <li className="board-column__item task-card">
            <Link href={href} className="task-card__link">
                <span className={`task-card__priority task-card__priority--${task.priority}`}>{task.priority}</span>
                <h3 className="task-card__title">{task.title}</h3>
                <p className="task-card__description">{task.description}</p>
                <div className="task-card__owners owners">
                    <ul className="owners__list">
                        {task.owners.map(owner => (
                            <li key={owner.id} className="owners__item">
                                {owner.owner}
                            </li>
                        ))}
                    </ul>
                </div>
            </Link>
        </li>
    );
}
