import Button from "@/components/ui/Button/Button";
import Select from "@/components/ui/Select/Select";
import Textarea from "@/components/ui/Textarea/Textarea";
import {Board, COLUMNS, TaskCard, Workspace} from "@/constants/mock-workspaces";
import CommentUserItem from "@/components/task/CommentUserItem/CommentUserItem";
import CloseModalButton from "@/components/ui/CloseModalButton";
import classes from "./TaskDetails.module.scss";
import clsx from "clsx";
import { Calendar, Send } from "lucide-react";
import Link from "next/link";

interface TaskDetailsProps {
    board: Board;
    task: TaskCard;
    workspace:Workspace;
    isModal: boolean;
}

export default async function TaskDetails({ workspace, board, task, isModal }: TaskDetailsProps) {
    const statusOptions = COLUMNS.map(col => ({
        value: col.id,
        label: col.title,
    }));

    const column = COLUMNS.find(col => col.id === task.status);
    const priorityClassName = clsx(classes["task-card__priority"], classes[`task-card__priority--${task.priority}`]);
    const dateObj = new Date(task.dateCreated);

    const formattedDate: string = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    return (
        <div className={classes["task-card"]}>
            <div className={classes["task-card__actions"]}>
                <p className={priorityClassName}>{task.priority}</p>
                {/*<Button type="button">share</Button>*/}
                {isModal ? (
                    <CloseModalButton
                        className={classes["task-card__close-btn"]}
                        aria-label={"Close modal window"}
                    ></CloseModalButton>
                ) : (
                    <Link
                        href={`/workspaces/${workspace.id}/boards/${board.id}`}
                        className={classes["task-card__close-btn"]}
                    ></Link>
                )}
            </div>

            <div className={classes["task-card__header"]}>
                <h2 className={classes["task-card__title"]}>{task.title}</h2>
                {/*ХЛЕБНЫЕ КРОШКИ, РЕАЛИЗОВАТЬ ПОЗЖЕ, ВЫЯСНИТЬ КАК ЛУЧШЕ*/}
                <div className={classes["task-card__breadcrumbs"]}>
                    <p className={classes["task-card__breadcrumb-item"]}>
                        in board <span className={classes["task-card__breadcrumb-board"]}>{board?.nameBoard}</span>
                    </p>
                    <p className={classes["task-card__breadcrumb-item"]}>
                        column <span className={classes["task-card__breadcrumb-column"]}>{column?.title}</span>
                    </p>
                </div>
            </div>

            <div className={classes["task-card__meta"]}>
                <div className={classes["task-card__meta-item"]}>
                    <span className={classes["task-card__label"]}>Assignees</span>
                    <div className={classes["task-card__assignees-list"]}>
                        <ul className={classes["task-card__avatars"]}>
                            {task.owners.map(owner => (
                                <li key={owner.id} className={classes["task-card__avatars-item"]}>
                                    <span>{owner.owner} </span>
                                </li>
                            ))}
                        </ul>
                        <Button
                            variant={"ghost"}
                            type="button"
                            className={classes["task-card__add-btn"]}
                            aria-label={"Add assignees"}
                        ></Button>
                    </div>
                </div>

                <div className={classes["task-card__meta-item"]}>
                    <span className={classes["task-card__label"]}>Due date</span>
                    <div className={classes["task-card__date-display"]}>
                        {/*Заглушка временная*/}
                        {/*<span className={classes["task-card__date-icon"]}>"ICON CALENDAR"</span>*/}
                        <Calendar size={20} className={classes["task-card__date-icon"]} />
                        <time dateTime={task.dateCreated} className={classes["task-card__date-text"]}>
                            {formattedDate}
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
                    disabled
                />
            </div>
            <hr className={classes["task-card__line"]} />
            <div className={classes["task-card__comments-section"]}>
                <div className={classes["task-card__comments-header"]}>
                    <span className={classes["task-card__label"]}>Comments </span>
                    <span className={classes["task-card__comments-count"]}>({task.commentsUser.length}) </span>
                </div>

                <ul className={classes["task-card__comments-list"]}>
                    {task.commentsUser.map(item => (
                        <CommentUserItem key={item.id} comment={item} />
                    ))}
                </ul>

                <form action="" className={classes["task-card__comment-form"]}>
                    <Textarea placeholder="Write a comment..." className={classes["task-card__comment-input"]} />
                    <Button type="submit" className={classes["task-card__submit-btn"]} aria-label={"Send comment"}>
                        <Send size={20} className={classes["task-card__button-send"]} />
                    </Button>
                </form>
            </div>
            {/*Можно реализовать данную кнопку:
            при каком то изменении документа появляется блок Применить изменения или Отменить изменения
            */}
            {/*<div className={classes["task-card__button-list"]}>*/}
            {/*    <p>ДИНАМИЧЕСКИЙ БЛОК</p>*/}
            {/*    <Button type={"button"}>Apply change</Button>*/}
            {/*    <Button variant={"danger"} type={"button"}>*/}
            {/*        Cancel*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </div>
    );
}
