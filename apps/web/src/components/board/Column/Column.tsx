import { ReactNode } from "react";
import Button from "@/components/ui/Button/Button";
import classes from "./Column.module.scss";


interface ColumnProps {
    children: ReactNode;
    status: string;
    countTasks: number | undefined;
}

export default function Column({ children, status, countTasks }: ColumnProps) {
    return (
        <section className={classes.column}>
            <div className={classes["container"]}>
                <header className={classes["column__header"]}>
                    <span className={classes["column__header-count"]}>
                        <b>{countTasks}</b>
                    </span>
                    <h3 className={classes["column__header-title"]}>{status}</h3>
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
