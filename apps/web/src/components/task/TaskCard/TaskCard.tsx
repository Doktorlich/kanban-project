import Link from "next/link";
import classes from "./TaskCard.module.scss";
import { Task } from "@myapp/shared-types";

interface TaskCardProps {
    task: Task;
    href: string;
}

export default function TaskCard({ task, href }: TaskCardProps) {
    return (
        <li className={classes["task-card__item"]}>
            <Link href={href} className={classes["task-card__link"]}>
                <span className={classes["task-card__priority"]} style={{ backgroundColor: task.priority.color }}>
                    {task.priority.name}
                </span>
                <h3 className={classes["task-card__title"]}>{task.title}</h3>
                <p className={classes["task-card__description"]}>{task.description}</p>
                <div className={classes["task-card__owners"]}>
                    <ul className={classes["owners__list"]}>
                        {task.owners.map(owner => (
                            <li key={owner.id} className={classes["owners__item"]}>
                                USER
                            </li>
                        ))}
                    </ul>
                </div>
                {/*<div className={classes["task-card__metrics"]}>*/}
                {/*    /!*Счетчики добавить позже*!/*/}

                {/*    <span className={classes["task-card__metric--comments"]}>[0]</span>*/}
                {/*    <span className={classes["task-card__metric--completed"]}>[0]</span>*/}
                {/*</div>*/}
            </Link>
        </li>
    );
}
