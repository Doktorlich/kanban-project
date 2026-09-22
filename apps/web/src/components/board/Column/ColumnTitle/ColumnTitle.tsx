import { KeyboardEvent, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import classes from "./ColumnTitle.module.scss";
import Input from "@/components/ui/Input/Input";
import { Check, X } from "lucide-react";
import { columnKeys, updateColumn } from "@/lib/column";
import Button from "@/components/ui/Button/Button";
import clsx from "clsx";

interface ColumnTitleProps {
    title: string;
    columnId: number;
}

export default function ColumnTitle({ title, columnId }: ColumnTitleProps) {
    const { workspaceId, boardId } = useParams();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(title);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateColumnMutation = useMutation({
        mutationFn: () => updateColumn(Number(workspaceId), Number(boardId), columnId, { title: value.trim() }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: columnKeys.list(Number(boardId)) });
            setIsEditing(false);
        },
    });

    function handleSaveTitle() {
        if (value.trim().length === 0) {
            handleCancelEdit();
            return;
        }
        if (value.trim() === title) {
            setIsEditing(false);
            return;
        }
        updateColumnMutation.mutate();
    }

    function handleCancelEdit() {
        setValue(title);
        setIsEditing(false);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") handleSaveTitle();
        if (e.key === "Escape") handleCancelEdit();
    }

    function handleStartEdit() {
        setValue(title);
        setIsEditing(true);
        requestAnimationFrame(() => inputRef.current?.focus());
    }

    return (
        <>
            {!isEditing && (
                <h3 className={classes["column__title-view"]} onClick={handleStartEdit}>
                    {title}
                </h3>
            )}
            {isEditing && (
                <div className={classes["column__title-edit"]}>
                    <Input
                        ref={inputRef}
                        className={classes["column__input"]}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className={classes["column__button-list"]}>
                        <Button
                            type="button"
                            variant={"secondary"}
                            className={classes["column__button"]}
                            onClick={handleSaveTitle}
                            aria-label="Save"
                        >
                            <Check size={16} />
                        </Button>
                        <Button
                            type="button"
                            variant={"secondary"}
                            className={clsx(classes["column__button"], classes["column__button--cancel"])}
                            onClick={handleCancelEdit}
                            aria-label="Cancel"
                        >
                            <X size={16} />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
