import { ReactNode } from "react";
import Button from "@/components/ui/Button";

interface IStatusBars {
    title: string;
    count: number;
}

interface ColumnProps {
    children: ReactNode;
    statusBars: IStatusBars;
}

export default function Column({ children, statusBars }: ColumnProps) {
    return (
        <section className={"column"}>
            <header className={"column-header"}>
                <span className={"column-header__count"}>COUNT{statusBars.count}</span>
                <h3 className={"column-header__title"}>{statusBars.title}</h3>
                <Button type={"button"} className={"column-header__create-board"}>
                    +PLUS
                </Button>
            </header>
            {children}
        </section>
    );
}
