import { ReactNode } from "react";
import Button from "@/components/ui/Button/Button";
import classes from "./Column.module.scss";
import ColumnTitle from "./ColumnTitle/ColumnTitle";
import { type Column } from "@myapp/shared-types";

interface ColumnProps {
    children: ReactNode;
    column: Column;
    countTasks: number | undefined;
}

export default function Column({ children, countTasks, column }: ColumnProps) {
    return (
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
                </header>
            </div>
            {children}
        </section>
    );
}
