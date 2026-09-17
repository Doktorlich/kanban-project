"use client";

import Link from "next/link";
import classes from "./BoardCard.module.scss";
import { Board } from "@myapp/shared-types";
import CreateBoardModal from "@/components/board/CreateBoardModal/CreateBoardModal";
import { useState } from "react";
import CardActions from "@/components/ui/CardActions/CardActions";
import ConfirmModal from "@/components/ui/ConfirmModal/ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardKeys, deleteBoard } from "@/lib/board";
import { useParams } from "next/navigation";

interface BoardCardProps {
    card: Board;
    href: string;
}

export default function BoardCard({ card, href }: BoardCardProps) {
    const { workspaceId } = useParams();
    const queryClient = useQueryClient();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const deleteMutation = useMutation({
        mutationFn: (boardId: number) => deleteBoard(Number(workspaceId), Number(boardId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: boardKeys.list(Number(workspaceId)) });
            setIsConfirmOpen(false);
        },
    });

    return (
        <>
            {isEditOpen && <CreateBoardModal board={card} onClose={() => setIsEditOpen(false)} />}
            {isConfirmOpen && (
                <ConfirmModal
                    title={"Delete board"}
                    message={`Are you sure you want to delete "${card.title}"? This action cannot be undone.`}
                    onConfirm={() => deleteMutation.mutate(card.id)}
                    onClose={() => setIsConfirmOpen(false)}
                    isPending={deleteMutation.isPending}
                    errorMessage={deleteMutation.error?.message}
                />
            )}
            <li className={classes["cards__item"]}>
                <Link href={href} className={classes["cards__link"]}>
                    <div className={classes["cards__item-info"]}>
                        <h3 className={classes["cards__item-title"]}>{card.title}</h3>
                        <p className={classes["cards__item-qty"]}>{card.taskCount} tasks</p>
                    </div>

                    <hr className={classes["cards__divider"]} />
                </Link>
                <CardActions
                    onEdit={() => setIsEditOpen(true)}
                    onDelete={() => setIsConfirmOpen(true)}
                    className={classes["buttons-action"]}
                />
            </li>
        </>
    );
}
