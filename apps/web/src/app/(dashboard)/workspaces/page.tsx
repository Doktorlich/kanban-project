import Button from "@/components/ui/Button/Button";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import { WORKSPACES } from "@/constants/mock-workspaces";

export default function WorkspacesPage() {
    return (
        <div className={"workspaces"}>
            <header className="workspaces-header">
                <div className="workspaces-header__title-block">
                    <h1>Your Workspaces</h1>
                    <p>{WORKSPACES.length} workspaces</p>
                </div>
                {/*Данная кнопка под вопросом, т к есть элемент создания внутри карточек workspaces*/}
                <Button type={"button"} className={"workspaces-header__add-workspace"}>
                    + New workspace
                </Button>
            </header>

            <section className={"workspaces-cards"}>
                <ul className={"workspaces-cards__list"}>
                    {WORKSPACES.map(card => (
                        <WorkspaceCard card={card} key={card.id} href={`/workspaces/${card.id}`} />
                    ))}
                </ul>

                <Button type={"button"} className={"workspaces-cards__add-workspace"}>
                    <span>+</span>
                    <p>Create workspace</p>
                </Button>
            </section>
        </div>
    );
}
