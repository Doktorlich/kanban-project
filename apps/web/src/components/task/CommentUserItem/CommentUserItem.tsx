import type { TaskComment } from "@myapp/shared-types";
import classes from "./CommentUserItem.module.scss";
import { formatChatDate } from "@/lib/format-date";
import { MoreHorizontal } from "lucide-react";
import { useRef, useState } from "react";
import Button from "@/components/ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentKeys, deleteComment } from "@/lib/comment";
import ConfirmModal from "@/components/ui/ConfirmModal/ConfirmModal";
import CommentEditForm from "@/components/task/CommentEditForm/CommentEditForm";

interface CommentUserItemProps {
    comment: TaskComment;
}

export default function CommentUserItem({ comment }: CommentUserItemProps) {
    const { workspaceId, boardId, taskId } = useParams();
    const queryClient = useQueryClient();

    const [isVisibleMenu, setIsVisibleMenu] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setIsVisibleMenu(false));

    const { user, text, createdAt, isAuthor } = comment;

    const deleteCommentMutation = useMutation({
        mutationFn: () => deleteComment(Number(workspaceId), Number(boardId), Number(taskId), comment.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: commentKeys.list(Number(taskId)) });
            setIsConfirmOpen(false);
        },
    });

    function handleDelete() {
        setIsVisibleMenu(false);
        setIsConfirmOpen(true);
    }
    function handleEdit() {
        setIsVisibleMenu(false);
        setIsEditing(true);
    }
    return (
        <li className={classes["task-card__comment-item"]}>
            {isConfirmOpen && (
                <ConfirmModal
                    title="Delete comment?"
                    message="This action cannot be undone."
                    onConfirm={() => deleteCommentMutation.mutate()}
                    onClose={() => setIsConfirmOpen(false)}
                    isPending={deleteCommentMutation.isPending}
                    errorMessage={deleteCommentMutation.error?.message}
                />
            )}

            <time dateTime={createdAt} className={classes["task-card__date-create"]}>
                {formatChatDate(createdAt)}
            </time>
            <span className={classes["task-card__comment-avatar"]}>{user.username.charAt(0).toUpperCase()}</span>

            <div className={classes["task-card__comment-body"]}>
                {isAuthor && !isEditing && (
                    <div className={classes["three-dots"]} ref={ref}>
                        <MoreHorizontal
                            onClick={() => setIsVisibleMenu(!isVisibleMenu)}
                            className={classes["three-dots__dots"]}
                        />

                        {isVisibleMenu && (
                            <div className={classes["three-dots__buttons-block"]}>
                                <Button
                                    variant={"ghost"}
                                    className={classes["three-dots__button"]}
                                    onClick={handleEdit}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant={"ghost"}
                                    className={classes["three-dots__button"]}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                <h4 className={classes["task-card__comment-author"]}>
                    {user.firstName} {user.lastName}
                </h4>
                {isEditing ? (
                    <CommentEditForm comment={comment} onClose={() => setIsEditing(false)} />
                ) : (
                    <p className={classes["task-card__comment-text"]}>{text}</p>
                )}
            </div>
        </li>
    );
}
