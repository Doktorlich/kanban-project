import { useState, type KeyboardEvent } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskComment } from "@myapp/shared-types";
import { commentKeys, updateComment } from "@/lib/comment";
import Textarea from "@/components/ui/Textarea/Textarea";
import Button from "@/components/ui/Button/Button";
import classes from "@/components/task/CommentUserItem/CommentUserItem.module.scss";

interface CommentEditFormProps {
    comment: TaskComment;
    onClose: () => void;
}

export default function CommentEditForm({ comment, onClose }: CommentEditFormProps) {
    const { workspaceId, boardId, taskId } = useParams();
    const queryClient = useQueryClient();
    const [draft, setDraft] = useState(comment.text);

    const canSave = draft.trim().length > 0 && draft.trim() !== comment.text;

    const updateCommentMutation = useMutation({
        mutationFn: (text: string) =>
            updateComment(Number(workspaceId), Number(boardId), Number(taskId), comment.id, { text }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: commentKeys.list(Number(taskId)) });
            onClose();
        },
    });

    function handleSaveComment() {
        const text = draft.trim();
        if (text.length === 0) return;
        if (text === comment.text) {
            onClose();
            return;
        }
        updateCommentMutation.mutate(text);
    }

    function handleCancelEdit() {
        onClose();
    }

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSaveComment();
        }
        if (e.key === "Escape") {
            e.stopPropagation();
            handleCancelEdit();
        }
    }

    return (
        <div>
            <Textarea
                className={classes["task-card__comment-edit"]}
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
            />
            <div className={classes["task-card__comment-edit-actions"]}>
                <Button
                    type="button"
                    onClick={handleSaveComment}
                    disabled={!canSave || updateCommentMutation.isPending}
                >
                    Save
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleCancelEdit}
                    disabled={updateCommentMutation.isPending}
                >
                    Cancel
                </Button>
            </div>
            {updateCommentMutation.isError && (
                <p className={classes["task-card__comment-edit-error"]}>{updateCommentMutation.error.message}</p>
            )}
        </div>
    );
}
