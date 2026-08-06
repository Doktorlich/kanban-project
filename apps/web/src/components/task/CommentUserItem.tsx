import { CommentsTask } from "@/constants/mock-workspaces";

interface CommentUserItemProps {
    comment: CommentsTask;
}

export default function CommentUserItem({ comment }: CommentUserItemProps) {
    return (
        <li className="task-card__comment-item">
            {/*<img src="" alt="AVATAR" className="task-card__comment-avatar" />*/}
            <span>{comment.image}</span>
            <div className="task-card__comment-body">
                <h4 className="task-card__comment-author">{comment.fullName}</h4>
                <p className="task-card__comment-text">{comment.comment}</p>
            </div>
        </li>
    );
}