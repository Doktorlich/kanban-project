import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import InputLabel from "@/components/ui/InputLabel/InputLabel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspace } from "../../../../lib/workspace";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import classes from "./CreateWorkspaceModal.module.scss";
import { workspaceSchema } from "@myapp/shared-types";
interface CreateWorkspaceModalProps {
    onClose: () => void;
}
export default function CreateWorkspaceModal({ onClose }: CreateWorkspaceModalProps) {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(workspaceSchema.workspaceSchema) });

    const mutation = useMutation({
        mutationFn: createWorkspace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspace"] });
            onClose();
        },
    });
    return (
        <Modal onClose={onClose}>
            <form onSubmit={handleSubmit(data => mutation.mutate(data))} className={classes.form}>
                <h3 className={classes["form__title"]}>Create workspace</h3>
                <InputLabel type={"text"} id={"title"} {...register("title")} className={classes["form__input"]}>
                    Write name title workspace
                </InputLabel>
                {errors.title && <p>{errors.title.message}</p>}
                {mutation.isError && <p>{mutation.error.message}</p>}

                <div className={classes["form__button-list"]}>
                    <Button type={"submit"} variant={"primary"} disabled={mutation.isPending}>
                        Create
                    </Button>
                    <Button type={"button"} variant={"ghost"} onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
