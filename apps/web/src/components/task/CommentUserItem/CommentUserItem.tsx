import { CommentsTask } from "@/constants/mock-workspaces";
import classes from "./CommentUserItem.module.scss";

interface CommentUserItemProps {
    comment: CommentsTask;
}

export default function CommentUserItem({ comment }: CommentUserItemProps) {
    return (
        <li className={classes["task-card__comment-item"]}>
            {/*<img src="" alt="AVATAR" className={classes["task-card__comment-avatar"]} />*/}
            <span className={classes["task-card__comment-avatar"]}>{comment.image}</span>
            <div className={classes["task-card__comment-body"]}>
                <h4 className={classes["task-card__comment-author"]}>{comment.fullName}</h4>
                <p className={classes["task-card__comment-text"]}>{comment.comment}</p>
            </div>
        </li>
    );
}