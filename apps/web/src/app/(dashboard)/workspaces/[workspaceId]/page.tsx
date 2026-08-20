import Button from "@/components/ui/Button/Button";
import BoardCard from "@/components/board/BoardCard/BoardCard";
import { WORKSPACES } from "@/constants/mock-workspaces";
import classes from "./page.module.scss";

interface WorkspacePageProps {
    params: Promise<{ workspaceId: string }>;
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
    const { workspaceId } = await params;
    const workspace = WORKSPACES.find(card => card.id === +workspaceId);

    if (!workspace) {
        return <div className={classes["workspace"]}>Workspace not found</div>;
    }

    return (
        <div className={classes["workspace"]}>
            <header className={classes["workspace-header"]}>
                <div className={classes["workspace-header__title-block"]}>
                    <h1>Workspace:{workspace?.nameWorkspace}</h1>
                </div>
                <Button type={"button"} className={classes["workspace-header__add-board"]}>
                    + New board
                </Button>
            </header>

            <section className={classes["workspace-cards"]}>
                <ul className={classes["workspace-cards__list"]}>
                    {workspace.boards.length === 0 ? (
                        <p>There are no boards in this workspace yet. Create the first one!</p>
                    ) : (
                        workspace.boards.map(board => {
                            return (
                                <BoardCard
                                    card={board}
                                    key={board.id}
                                    href={`/workspaces/${workspaceId}/boards/${board.id}`}
                                />
                            );
                        })
                    )}
                </ul>
                <Button type={"button"} className={classes["workspace-cards__add-board"]}>
                    <span>+</span>
                    <p>Create board</p>
                </Button>
            </section>
        </div>
    );
}
