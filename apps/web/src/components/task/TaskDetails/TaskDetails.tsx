"use client";

import Button from "@/components/ui/Button/Button";
import Textarea from "@/components/ui/Textarea/Textarea";
import CloseModalButton from "@/components/ui/CloseModalButton";
import classes from "./TaskDetails.module.scss";
import { Calendar, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, getTaskById, taskKeys } from "@/lib/task";
import { columnKeys, getColumnById } from "@/lib/column";
import queryState from "@/lib/query-state";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import ConfirmModal from "@/components/ui/ConfirmModal/ConfirmModal";
import CreateTaskModal from "@/components/task/CreateTaskModal/CreateTaskModal";

interface TaskDetailsProps {
    isModal: boolean;
}

export default function TaskDetails({ isModal }: TaskDetailsProps) {
    const router = useRouter();
    const { workspaceId, boardId, taskId } = useParams();
    const queryClient = useQueryClient();
    const [isVisibleMenu, setIsVisibleMenu] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setIsVisibleMenu(false));

    const mutationDelete = useMutation({
        mutationFn: () => deleteTask(Number(workspaceId), Number(boardId), Number(taskId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: columnKeys.list(Number(boardId)) });
            setIsConfirmOpen(false);
            if (isModal) {
                router.back();
            } else {
                router.push(`/workspaces/${workspaceId}/boards/${boardId}`);
            }
        },
    });

    const queryTask = useQuery({
        queryKey: taskKeys.detail(Number(taskId)),
        queryFn: () => getTaskById(Number(workspaceId), Number(boardId), Number(taskId)),
    });

    const queryColumn = useQuery({
        queryKey: columnKeys.detail(Number(queryTask.data?.columnId)),
        queryFn: () => getColumnById(Number(workspaceId), Number(boardId), Number(queryTask.data?.columnId)),
        enabled: !!queryTask.data?.columnId,
    });

    const stateTask = queryState(queryTask, {
        emptyMessage: "Task not found",
    });
    if (stateTask) {
        return stateTask;
    }

    const task = queryTask.data;
    if (!task) {
        return null;
    }

    const dateObj = new Date(task.createdAt);

    const formattedDate: string = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    function handleDelete() {
        setIsVisibleMenu(false);
        setIsConfirmOpen(true);
    }
    function handleEdit() {
        setIsVisibleMenu(false);
        setIsEditOpen(true);
    }
    return (
        <div className={classes["task-card"]}>
            {isConfirmOpen && (
                <ConfirmModal
                    title={`Delete task: "${task.title}"?`}
                    message="This action cannot be undone."
                    onConfirm={() => mutationDelete.mutate()}
                    onClose={() => setIsConfirmOpen(false)}
                    isPending={mutationDelete.isPending}
                    errorMessage={mutationDelete.error?.message}
                />
            )}
            {isEditOpen && <CreateTaskModal task={task} onClose={() => setIsEditOpen(false)} />}

            <div className={classes["three-dots"]} ref={ref}>
                <MoreVertical
                    onClick={() => setIsVisibleMenu(!isVisibleMenu)}
                    className={classes["three-dots__dots"]}
                />

                {isVisibleMenu && (
                    <div className={classes["three-dots__buttons-block"]}>
                        <Button variant={"ghost"} className={classes["three-dots__button"]} onClick={handleEdit}>
                            Edit
                        </Button>
                        <Button variant={"ghost"} className={classes["three-dots__button"]} onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className={classes["task-card__actions"]}>
                <p className={classes["task-card__priority"]}>{task.priority.name}</p>

                {isModal ? (
                    <CloseModalButton
                        className={classes["task-card__close-btn"]}
                        aria-label={"Close modal window"}
                    ></CloseModalButton>
                ) : (
                    <Link
                        href={`/workspaces/${workspaceId}/boards/${boardId}`}
                        className={classes["task-card__close-btn"]}
                    ></Link>
                )}
            </div>

            <div className={classes["task-card__header"]}>
                <h2 className={classes["task-card__title"]}>{task.title}</h2>
                {/*ХЛЕБНЫЕ КРОШКИ, РЕАЛИЗОВАТЬ ПОЗЖЕ, ВЫЯСНИТЬ КАК ЛУЧШЕ*/}
                <div className={classes["task-card__breadcrumbs"]}>
                    <p className={classes["task-card__breadcrumb-item"]}>
                        in board <span className={classes["task-card__breadcrumb-board"]}>BOARD</span>
                    </p>
                    <p className={classes["task-card__breadcrumb-item"]}>
                        column
                        <span className={classes["task-card__breadcrumb-column"]}>{queryColumn.data?.title}</span>
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
                                    <span>{owner.username} </span>
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
                    <span className={classes["task-card__label"]}>Created</span>
                    <div className={classes["task-card__date-display"]}>
                        {/*Заглушка временная*/}
                        {/*<span className={classes["task-card__date-icon"]}>"ICON CALENDAR"</span>*/}
                        <Calendar size={20} className={classes["task-card__date-icon"]} />
                        <time dateTime={task.createdAt} className={classes["task-card__date-text"]}>
                            {formattedDate}
                        </time>
                    </div>
                </div>
            </div>

            <div className={classes["task-card__field"]}>
                <span className={classes["task-card__label"]}>Status</span>
                {/*<Select options={statusOptions} defaultValue={task.status} className={classes["task-card__select"]} />*/}
                SELECT
            </div>

            <div className={classes["task-card__field"]}>
                <span className={classes["task-card__label"]}>Description</span>
                <Textarea
                    className={classes["task-card__textarea"]}
                    placeholder="description"
                    value={task?.description ?? ""}
                    disabled
                    readOnly
                />
            </div>
            <hr className={classes["task-card__line"]} />
            <div className={classes["task-card__comments-section"]}>
                COMMENTS BLOCK
                {/*<div className={classes["task-card__comments-header"]}>*/}
                {/*    <span className={classes["task-card__label"]}>Comments </span>*/}
                {/*    <span className={classes["task-card__comments-count"]}>({task.commentsUser.length}) </span>*/}
                {/*</div>*/}
                {/*<ul className={classes["task-card__comments-list"]}>*/}
                {/*    {task.commentsUser.map(item => (*/}
                {/*        <CommentUserItem key={item.id} comment={item} />*/}
                {/*    ))}*/}
                {/*</ul>*/}
                {/*<form action="" className={classes["task-card__comment-form"]}>*/}
                {/*    <Textarea placeholder="Write a comment..." className={classes["task-card__comment-input"]} />*/}
                {/*    <Button type="submit" className={classes["task-card__submit-btn"]} aria-label={"Send comment"}>*/}
                {/*        <Send size={20} className={classes["task-card__button-send"]} />*/}
                {/*    </Button>*/}
                {/*</form>*/}
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
