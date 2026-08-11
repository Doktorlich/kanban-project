import Button from "@/components/ui/Button/Button";
import Select from "@/components/ui/Select/Select";
import Textarea from "@/components/ui/Textarea/Textarea";
import { COLUMNS, TaskCard } from "@/constants/mock-workspaces";
import CommentUserItem from "@/components/task/CommentUserItem";
import CloseModalButton from "@/components/ui/CloseModalButton";
import classes from "./TaskDetails.module.scss";
import clsx from "clsx";

interface TaskDetailsProps {
    task: TaskCard;
}

export default function TaskDetails({ task }: TaskDetailsProps) {
    const statusOptions = COLUMNS.map(col => ({
        value: col.id,
        label: col.title,
    }));
    const priorityClassName = clsx(classes["task-card__priority"], classes[`task-card__priority--${task.priority}`]);

    return (
        <div className={classes["task-card"]}>
            <div className={classes["task-card__actions"]}>
                <p className={priorityClassName}>{task.priority}</p>
                {/*<Button type="button">share</Button>*/}

                <CloseModalButton className={classes["task-card__close-btn"]}>X</CloseModalButton>
            </div>

            <div className={classes["task-card__header"]}>
                <h1 className={classes["task-card__title"]}>{task.title}</h1>
                {/*ХЛЕБНЫЕ КРОШКИ, РЕАЛИЗОВАТЬ ПОЗЖЕ, ВЫЯСНИТЬ КАК ЛУЧШЕ*/}
                <div className={classes["task-card__breadcrumbs"]}>
                    <p className={classes["task-card__breadcrumb-item"]}>
                        in board <span>[NAME PARENT BOARD]</span>
                    </p>
                    <p className={classes["task-card__breadcrumb-item"]}>
                        column <span>[NAME PARENT COLUMN]</span>
                    </p>
                </div>
            </div>

            <div className={classes["task-card__meta"]}>
                <div className={classes["task-card__meta-item"]}>
                    <span className={classes["task-card__label"]}>Assignees</span>
                    <div className={classes["task-card__assignees-list"]}>
                        <div className={classes["task-card__avatars"]}>
                            {task.owners.map(owner => (
                                <span key={owner.id}>{owner.owner} </span>
                            ))}
                        </div>
                        <Button type="button" className={classes["task-card__add-btn"]}>
                            +
                        </Button>
                    </div>
                </div>

                <div className={classes["task-card__meta-item"]}>
                    <span className={classes["task-card__label"]}>Due date</span>
                    <div className={classes["task-card__date-display"]}>
                        {/*Заглушка временная*/}
                        <span className={classes["task-card__date-icon"]}>"ICON CALENDAR"</span>
                        <time dateTime="2024-12-08" className={classes["task-card__date-text"]}>
                            {/*! Преобразовать дату в формат Dec 8, 2024*/}
                            {task.dateCreated}
                        </time>
                    </div>
                </div>
            </div>

            <div className={classes["task-card__field"]}>
                <span className={classes["task-card__label"]}>Status</span>
                <Select options={statusOptions} defaultValue={task.status} className={classes["task-card__select"]} />
            </div>

            <div className={classes["task-card__field"]}>
                <span className={classes["task-card__label"]}>Description</span>
                <Textarea
                    className={classes["task-card__textarea"]}
                    placeholder="description"
                    defaultValue={task.description}
                />
            </div>

            <div className={classes["task-card__comments-section"]}>
                <div className={classes["task-card__comments-header"]}>
                    <span className={classes["task-card__label"]}>Comments </span>
                    <span className={classes["task-card__comments-count"]}>{task.commentsUser.length} </span>
                </div>

                <ul className={classes["task-card__comments-list"]}>
                    {task.commentsUser.map(item => (
                        <CommentUserItem key={item.id} comment={item} />
                    ))}
                </ul>

                <form action="" className={classes["task-card__comment-form"]}>
                    <Textarea placeholder="Write a comment..." className={classes["task-card__comment-input"]} />
                    <Button type="submit" className={classes["task-card__submit-btn"]}>
                        SEND
                    </Button>
                </form>
            </div>
            {/*Можно реализовать данную кнопку:
            при каком то изменении документа появляется блок Применить изменения или Отменить изменения
            */}
            <div className={classes["task-card__button-list"]}>
                <p>ДИНАМИЧЕСКИЙ БЛОК</p>
                <Button type={"button"}>Apply change</Button>
                <Button variant={"danger"} type={"button"}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
