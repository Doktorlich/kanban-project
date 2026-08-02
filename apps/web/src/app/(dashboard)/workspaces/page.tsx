import Button from "@/components/ui/Button";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";

const WORKSPACE_CARDS = [
    {
        id: 1,
        image: "w",
        nameCard: "Work",
        quantityBoards: 3,
        owners: [
            { id: 11, owner: "JD" },
            { id: 12, owner: "MK" },
        ],
    },
    { id: 2, image: "L", nameCard: "My projects", quantityBoards: 2, owners: [{ id: 21, owner: "JD" }] },
];

export default function WorkspacesPage() {
    return (
        <div className={"workspaces"}>
            <header className="workspaces-header">
                <div className="workspaces-header__title-block">
                    <h1>Your Workspaces</h1>
                    <p>{WORKSPACE_CARDS.length} workspaces</p>
                </div>
                <Button type={"button"} className={"workspaces-header__add-workspace"}>
                    + New workspace
                </Button>
            </header>

            <section className={"cards"}>
                <ul className={"cards__list"}>
                    {WORKSPACE_CARDS.map(card => (
                        <WorkspaceCard key={card.id} card={card} />
                    ))}
                </ul>
            </section>
        </div>
    );
}
