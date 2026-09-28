import classes from "./CreateTaskModal.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task, taskSchema } from "@myapp/shared-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createTask, taskKeys, TaskPayloadCreate, TaskPayloadUpdate, updateTask } from "@/lib/task";
import Modal from "@/components/ui/Modal/Modal";
import InputLabel from "@/components/ui/InputLabel/InputLabel";
import Button from "@/components/ui/Button/Button";
import Textarea from "@/components/ui/Textarea/Textarea";
import { columnKeys } from "@/lib/column";
import { getPriorities, priorityKeys } from "@/lib/priority";

interface CreateTaskModalProps {
    onClose: () => void;
    columnId?: number;
    task?: Task;
}

export default function CreateTaskModal({ onClose, columnId, task }: CreateTaskModalProps) {
    const queryClient = useQueryClient();
    const { workspaceId, boardId } = useParams();
    const isEditMode = Boolean(task);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(isEditMode ? taskSchema.updateTaskSchema : taskSchema.createTaskSchema),
        defaultValues: {
            title: task?.title ?? "",
            description: task?.description ?? "",
            priorityId: task?.priority.id,
        },
    });
    const queryPriorities = useQuery({
        queryKey: priorityKeys.all,
        queryFn: getPriorities,
        staleTime: Infinity,
    });
    const mutation = useMutation({
        mutationFn: (data: TaskPayloadCreate | TaskPayloadUpdate) => {
            return isEditMode
                ? updateTask(Number(workspaceId), Number(boardId), task!.id, data)
                : createTask(Number(workspaceId), Number(boardId), Number(columnId), data as TaskPayloadCreate);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: columnKeys.list(Number(boardId)) });
            if (task) {
                queryClient.invalidateQueries({ queryKey: taskKeys.detail(task.id) });
            }
            onClose();
        },
    });
    return (
        <Modal onClose={onClose}>
            <form onSubmit={handleSubmit(data => mutation.mutate(data))} className={classes.form}>
                <h3 className={classes["form__title"]}>{isEditMode ? "Update task" : "Create task"}</h3>
                <InputLabel type={"text"} id={"title"} {...register("title")} className={classes["form__input"]}>
                    Write name title task
                </InputLabel>

                <select
                    id="priorityId"
                    defaultValue={task?.priority.id ?? ""}
                    {...register("priorityId", { valueAsNumber: true })}
                    className={classes["form__select"]}
                >
                    <option value="" disabled>
                        Select priority
                    </option>
                    {queryPriorities.data?.map(priority => (
                        <option key={priority.id} value={priority.id}>
                            {priority.name}
                        </option>
                    ))}
                </select>

                <Textarea id={"description"} {...register("description")} className={classes["form__description"]} />
                {errors.title && <p>{errors.title.message}</p>}
                {errors.description && <p>{errors.description.message}</p>}
                {errors.priorityId && <p>{errors.priorityId.message}</p>}

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
