import { ReactNode, useState } from "react";
import Button from "@/components/ui/Button/Button";
import classes from "./Column.module.scss";
import ColumnTitle from "./ColumnTitle/ColumnTitle";
import { type Column } from "@myapp/shared-types";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { columnKeys, deleteColumn } from "@/lib/column";
import { useParams } from "next/navigation";
import ConfirmModal from "@/components/ui/ConfirmModal/ConfirmModal";

interface ColumnProps {
    children: ReactNode;
    column: Column;
    countTasks: number | undefined;
}

export default function Column({ children, countTasks, column }: ColumnProps) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const { workspaceId, boardId } = useParams();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => deleteColumn(Number(workspaceId), Number(boardId), column.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: columnKeys.list(Number(boardId)) });
            setIsConfirmOpen(false);
        },
    });
    return (
        <>
            {isConfirmOpen && (
                <ConfirmModal
                    title={`Delete column "${column.title}"?`}
                    message="All tasks inside this column will be deleted as well."
                    onConfirm={() => mutation.mutate()}
                    onClose={() => setIsConfirmOpen(false)}
                    isPending={mutation.isPending}
                    errorMessage={mutation.error?.message}
                />
            )}
            <section className={classes.column}>
                <div className={classes["container"]}>
                    <header className={classes["column__header"]}>
                        <span className={classes["column__header-count"]}>
                            <b>{countTasks}</b>
                        </span>
                        <ColumnTitle title={column.title} columnId={column.id} />

                        <Button
                            variant={"ghost"}
                            type={"button"}
                            className={classes["column__create-board"]}
                            aria-label={"Add task"}
                        ></Button>
                        <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
                            <Trash size={24} />
                        </Button>
                    </header>
                </div>
                {children}
            </section>
        </>
    );
}
