import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import InputLabel from "@/components/ui/InputLabel/InputLabel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspace } from "../../../lib/workspace";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
            <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
                <h3>Create Workspace</h3>
                <InputLabel type={"text"} id={"title"} {...register("title")}>
                    Write name title workspace
                </InputLabel>
                {errors.title && <p>{errors.title.message}</p>}
                {mutation.isError && <p>{mutation.error.message}</p>}

                <Button type={"submit"} variant={"primary"} disabled={mutation.isPending}>
                    Create
                </Button>
                <Button type={"button"} variant={"ghost"} onClick={onClose}>
                    Cancel
                </Button>
            </form>
        </Modal>
    );
}
