import Button from "@/components/ui/Button/Button";
import BoardCard from "@/components/board/BoardCard/BoardCard";
import { WORKSPACES } from "@/constants/mock-workspaces";

interface WorkspacePageProps {
    params: Promise<{ workspaceId: string }>;
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
    const { workspaceId } = await params;
    const workspace = WORKSPACES.find(card => card.id === +workspaceId);
    if (!workspace) {
        return <div className="workspace">Workspace not found</div>;
        // notFound();
    }
    return (
        <div className={"workspace"}>
            <header className="workspace-header">
                <div className="workspace-header__title-block">
                    <h1>Workspace:{workspace?.nameWorkspace}</h1>
                </div>
                {/*Данная кнопка под вопросом, т к есть элемент создания внутри карточек workspaces*/}
                <Button type={"button"} className={"workspace-header__add-board"}>
                    + New board
                </Button>
            </header>

            <section className={"workspace-cards"}>
                <ul>
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
                <Button type={"button"} className={"workspace-cards__add-workspace"}>
                    <span>+</span>
                    <p>Create board</p>
                </Button>
            </section>
        </div>
    );
}
