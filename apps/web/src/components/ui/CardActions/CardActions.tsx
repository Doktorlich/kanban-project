import classes from "./CardActions.module.scss";
import Button from "@/components/ui/Button/Button";
import { SquarePen, Trash2 } from "lucide-react";
import clsx from "clsx";

interface CardActionsProps {
    onEdit: () => void;
    onDelete: () => void;
    className?: string;
}

export default function CardActions({ onEdit, onDelete, className }: CardActionsProps) {
    const buttonsClasses = clsx(classes["buttons-action"], className);
    return (
        <div className={buttonsClasses}>
            <Button type={"button"} variant={"secondary"} className={classes["buttons-action__item"]} onClick={onEdit}>
                <SquarePen />
            </Button>

            <Button
                type={"button"}
                variant={"secondary"}
                className={classes["buttons-action__item"]}
                onClick={onDelete}
            >
                <Trash2 />
            </Button>
        </div>
    );
}
