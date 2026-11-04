import classes from "@/components/task/TaskDetails/TaskDetails.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { commentKeys, getComments } from "@/lib/comment";
import queryState from "@/lib/query-state";
import CommentUserItem from "@/components/task/CommentUserItem/CommentUserItem";
import CommentForm from "@/components/task/CommentForm/CommentForm";
import { useState } from "react";

export default function TaskComments() {
    const { workspaceId, boardId, taskId } = useParams();
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

    const queryComments = useQuery({
        queryKey: commentKeys.list(Number(taskId)),
        queryFn: () => getComments(Number(workspaceId), Number(boardId), Number(taskId)),
    });

    const state = queryState(queryComments, { isEmpty: () => false });
    if (state) return state;

    const comments = queryComments.data ?? [];

    return (
        <div className={classes["task-card__comments-section"]}>
            <div className={classes["task-card__comments-header"]}>
                <span className={classes["task-card__label"]}>Comments </span>
                <span className={classes["task-card__comments-count"]}>({comments.length}) </span>
            </div>
            <ul className={classes["task-card__comments-list"]}>
                {comments.map(item => (
                    <CommentUserItem
                        key={item.id}
                        comment={item}
                        isEditing={editingCommentId === item.id}
                        onStartEdit={() => setEditingCommentId(item.id)}
                        onStopEdit={() => setEditingCommentId(null)}
                    />
                ))}
            </ul>
            <CommentForm />
        </div>
    );
}
