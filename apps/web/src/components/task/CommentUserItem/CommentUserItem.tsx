import type { TaskComment } from "@myapp/shared-types";
import classes from "./CommentUserItem.module.scss";
import { formatChatDate } from "@/lib/format-date";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import { useRef, useState } from "react";
import Button from "@/components/ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";

interface CommentUserItemProps {
    comment: TaskComment;
}

export default function CommentUserItem({ comment }: CommentUserItemProps) {
    const [isVisibleMenu, setIsVisibleMenu] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setIsVisibleMenu(false));
    const { user, text, createdAt, isAuthor } = comment;

    function handleDelete() {
        setIsVisibleMenu(false);
        // setIsConfirmOpen(true);
    }
    function handleEdit() {
        setIsVisibleMenu(false);
        // setIsEditOpen(true);
    }
    return (
        <li className={classes["task-card__comment-item"]}>
            <time className={classes["task-card__date-create"]}>{formatChatDate(createdAt)}</time>
            <span className={classes["task-card__comment-avatar"]}>{user.username.charAt(0).toUpperCase()}</span>

            <div className={classes["task-card__comment-body"]}>
                {isAuthor && (
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
                <p className={classes["task-card__comment-text"]}>{text}</p>
            </div>
        </li>
    );
}
