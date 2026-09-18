import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import InputLabel from "@/components/ui/InputLabel/InputLabel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspace, updateWorkspace, workspaceKeys, type WorkspacePayload } from "@/lib/workspace";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./CreateWorkspaceModal.module.scss";
import { Workspace, workspaceSchema } from "@myapp/shared-types";

interface CreateWorkspaceModalProps {
    onClose: () => void;
    workspace?: Workspace;
}
export default function CreateWorkspaceModal({ onClose, workspace }: CreateWorkspaceModalProps) {
    const queryClient = useQueryClient();
    const isEditMode = Boolean(workspace);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(workspaceSchema.workspaceSchema),
        defaultValues: { title: workspace?.title ?? "" },
    });

    const createMutation = useMutation({
        mutationFn: createWorkspace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
            onClose();
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: WorkspacePayload) => updateWorkspace(workspace!.id, data),
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.detail(data.id) });
            queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
            onClose();
        },
    });

    const mutation = isEditMode ? updateMutation : createMutation;
    return (
        <Modal onClose={onClose}>
            <form onSubmit={handleSubmit(data => mutation.mutate(data))} className={classes.form}>
                <h3 className={classes["form__title"]}>{isEditMode ? "Update workspace" : "Create workspace"}</h3>
                <InputLabel type={"text"} id={"title"} {...register("title")} className={classes["form__input"]}>
                    Write name title workspace
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
