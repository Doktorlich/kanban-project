import Button from "@/components/ui/Button/Button";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import { WORKSPACES } from "@/constants/mock-workspaces";
import classes from "./page.module.scss";

export default function WorkspacesPage() {
    return (
        <div className={classes.workspaces}>
            <header className={classes["workspaces-header"]}>
                <div className={classes["workspaces-header__title-block"]}>
                    <h1>Your Workspaces</h1>
                    <p>{WORKSPACES.length} workspaces</p>
                </div>
                {/*Данная кнопка под вопросом, т к есть элемент создания внутри карточек workspaces*/}
                <Button type={"button"} className={classes["workspaces-header__add-workspace"]}>
                    + New workspace
                </Button>
            </header>

            <section className={classes["workspaces-cards"]}>
                <ul className={classes["workspaces-cards__list"]}>
                    {WORKSPACES.map(card => (
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
