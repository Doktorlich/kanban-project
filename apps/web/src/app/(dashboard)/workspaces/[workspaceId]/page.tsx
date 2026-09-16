"use client";

import Button from "@/components/ui/Button/Button";
import BoardCard from "@/components/board/BoardCard/BoardCard";
import classes from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceById, workspaceKeys } from "@/lib/workspace";
import { useParams } from "next/navigation";
import { boardKeys, getBoards } from "@/lib/board";

export default function WorkspacePage() {
    const { workspaceId } = useParams();

    const queryWorkspace = useQuery({
        queryKey: workspaceKeys.detail(Number(workspaceId)),
        queryFn: () => getWorkspaceById(Number(workspaceId)),
    });

    const queryBoards = useQuery({
        queryKey: boardKeys.list(Number(workspaceId)),
        queryFn: () => getBoards(Number(workspaceId)),
    });
    function renderContent() {
        if (queryBoards.isPending) {
            return <p>Loading...</p>;
        }
        if (queryBoards.isError) {
            return <p>Error loading data</p>;
        }
        if (!queryBoards.data || queryBoards.data.length === 0) {
            return <p>No boards yet — create your first one</p>;
        }
        return (
            <ul className={classes["workspace-cards__list"]}>
                {queryBoards.data.map(board => {
                    return (
                        <BoardCard card={board} key={board.id} href={`/workspaces/${workspaceId}/boards/${board.id}`} />
                    );
                })}
                <li className={classes["cards__item"]}>
                    <Button type={"button"} className={classes["workspace-cards__add-board"]}>
                        <span>+</span>
                        <p>Create board</p>
                    </Button>
                </li>
            </ul>
        );
    }
    return (
        <div className={classes["workspace"]}>
            <header className={classes["workspace-header"]}>
                <div className={classes["workspace-header__title-block"]}>
                    <h1>Workspace:{queryWorkspace.data?.title}</h1>
                </div>
                <Button type={"button"} className={classes["workspace-header__add-board"]}>
                    + New board
                </Button>
            </header>

            <section className={classes["workspace-cards"]}>{renderContent()}</section>
        </div>
    );
}
