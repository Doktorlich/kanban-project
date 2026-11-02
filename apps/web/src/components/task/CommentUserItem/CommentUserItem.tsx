import type { TaskComment } from "@myapp/shared-types";
import classes from "./CommentUserItem.module.scss";

interface CommentUserItemProps {
    comment: TaskComment;
}

export default function CommentUserItem({ comment }: CommentUserItemProps) {
    const { user, text } = comment;

    return (
        <li className={classes["task-card__comment-item"]}>
            <span className={classes["task-card__comment-avatar"]}>{user.username.charAt(0).toUpperCase()}</span>
            <div className={classes["task-card__comment-body"]}>
                <h4 className={classes["task-card__comment-author"]}>
                    {user.firstName} {user.lastName}
                </h4>
                <p className={classes["task-card__comment-text"]}>{text}</p>
            </div>
        </li>
    );
}
