import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { commentSchema } from "@myapp/shared-types";
import { commentKeys, createComment, type CommentPayloadCreate } from "@/lib/comment";
import Textarea from "@/components/ui/Textarea/Textarea";
import Button from "@/components/ui/Button/Button";
import classes from "@/components/task/TaskDetails/TaskDetails.module.scss";

export default function CommentForm() {
    const { workspaceId, boardId, taskId } = useParams();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ resolver: zodResolver(commentSchema.createCommentSchema), defaultValues: { text: "" } });

    const mutation = useMutation({
        mutationFn: (data: CommentPayloadCreate) =>
            createComment(Number(workspaceId), Number(boardId), Number(taskId), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: commentKeys.list(Number(taskId)) });
            setValue("text", "");
        },
    });

    return (
        <form onSubmit={handleSubmit(data => mutation.mutate(data))} className={classes["task-card__comment-form"]}>
            <Textarea
                placeholder="Write a comment..."
                className={classes["task-card__comment-input"]}
                {...register("text")}
            />
            <Button
                type="submit"
                className={classes["task-card__submit-btn"]}
                aria-label={"Send comment"}
                disabled={mutation.isPending}
            >
                <Send size={20} className={classes["task-card__button-send"]} />
            </Button>
            {errors.text && <p>{errors.text.message}</p>}
            {mutation.isError && <p>{mutation.error.message}</p>}
        </form>
    );
}
