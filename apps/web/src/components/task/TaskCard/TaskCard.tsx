import Link from "next/link";
import type { TaskCard as TaskCardType } from "@/constants/mock-workspaces";
import clsx from "clsx";
import classes from "./TaskCard.module.scss";

interface TaskCardProps {
    task: TaskCardType;
    href: string;
}

export default function TaskCard({ task, href }: TaskCardProps) {
    const priorityClassName = clsx(classes["task-card__priority"], classes[`task-card__priority--${task.priority}`]);

    return (
        <li className={classes["task-card__item"]}>
            <Link href={href} className={classes["task-card__link"]}>
                <span className={priorityClassName}>{task.priority}</span>
                <h3 className={classes["task-card__title"]}>{task.title}</h3>
                <p className={classes["task-card__description"]}>{task.description}</p>
                <div className={classes["task-card__owners"]}>
                    <ul className={classes["owners__list"]}>
                        {task.owners.map(owner => (
                            <li key={owner.id} className={classes["owners__item"]}>
                                {owner.owner}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={classes["task-card__metrics"]}>
                    {/*Счетчики добавить позже*/}
                    <span className={classes["task-card__metric--comments"]}>[0]</span>
                    <span className={classes["task-card__metric--completed"]}>[0]</span>
                </div>
            </Link>
        </li>
    );
}
