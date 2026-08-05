import { ReactNode } from "react";
import Button from "@/components/ui/Button";


interface ColumnProps {
    children: ReactNode;
    status: string;
    countTasks: number | undefined;
}

export default function Column({ children, status, countTasks }: ColumnProps) {
    return (
        <section className={"column"}>
            <header className={"column__header"}>
                <span className={"column__header-count"}>
                    COUNT:<b>{countTasks}</b>
                </span>
                <h3 className={"column__header-title"}>{status}</h3>
                <Button type={"button"} className={"column__create-board"}>
                    +PLUS
                </Button>
            </header>
            {children}
        </section>
    );
}
