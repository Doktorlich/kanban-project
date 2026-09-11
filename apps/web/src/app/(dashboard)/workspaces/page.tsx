"use client";
import Button from "@/components/ui/Button/Button";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import classes from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "../../../../lib/workspace";

export default function WorkspacesPage() {
    const query = useQuery({ queryKey: ["workspace"], queryFn: getWorkspaces });

    return (
        <div className={classes.workspaces}>
            <header className={classes["workspaces-header"]}>
                <div className={classes["workspaces-header__title-block"]}>
                    <h1>Your Workspaces</h1>
                    <p>{query.data?.length} workspaces</p>
                </div>
                {/*Данная кнопка под вопросом, т к есть элемент создания внутри карточек workspaces*/}
                <Button type={"button"} className={classes["workspaces-header__add-workspace"]}>
                    + New workspace
                </Button>
            </header>

            <section className={classes["workspaces-cards"]}>
                <ul className={classes["workspaces-cards__list"]}>
                    {query.data?.map(card => (
                        <WorkspaceCard card={card} key={card.id} href={`/workspaces/${card.id}`} />
                    ))}
                </ul>

                <Button type={"button"} className={classes["workspaces-cards__add-workspace"]}>
                    <span>+</span>
                    <p>
                        Create <br /> workspace
                    </p>
                </Button>
            </section>
        </div>
    );
}
