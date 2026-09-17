import Modal from "@/components/ui/Modal/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardKeys, BoardPayload, createBoard, updateBoard } from "@/lib/board";
import { useParams } from "next/navigation";
import { Board, boardSchema } from "@myapp/shared-types";
import classes from "./CreateBoardModal.module.scss";
import InputLabel from "@/components/ui/InputLabel/InputLabel";
import Button from "@/components/ui/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateBoardModalProps {
    onClose: () => void;
    board?: Board;
}

export default function CreateBoardModal({ onClose, board }: CreateBoardModalProps) {
    const queryClient = useQueryClient();
    const { workspaceId } = useParams();
    const isEditMode = Boolean(board);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(boardSchema.boardSchema), defaultValues: { title: board?.title ?? "" } });

    const mutation = useMutation({
        mutationFn: (data: BoardPayload) =>
            isEditMode ? updateBoard(Number(workspaceId), board!.id, data) : createBoard(Number(workspaceId), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: boardKeys.list(Number(workspaceId)) });
            onClose();
        },
    });

    return (
        <Modal onClose={onClose}>
            <form onSubmit={handleSubmit(data => mutation.mutate(data))} className={classes.form}>
                <h3 className={classes["form__title"]}>{isEditMode ? "Update board" : "Create board"}</h3>
                <InputLabel type={"text"} id={"title"} {...register("title")} className={classes["form__input"]}>
                    Write name title board
                </InputLabel>
                {errors.title && <p>{errors.title.message}</p>}
                {mutation.isError && <p>{mutation.error.message}</p>}

                <div className={classes["form__button-list"]}>
                    <Button type={"submit"} variant={"primary"} disabled={mutation.isPending}>
                        {isEditMode ? "Save" : "Create"}
                    </Button>
                    <Button type={"button"} variant={"ghost"} onClick={onClose} disabled={mutation.isPending}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
