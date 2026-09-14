"use client";

import Link from "next/link";
import classes from "./WorkspaceCard.module.scss";
import { Workspace } from "@myapp/shared-types";
import EntityAvatar from "@/components/ui/EntityAvatar/EntityAvatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkspace } from "../../../lib/workspace";
import { SquarePen, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { useState } from "react";
import ConfirmModal from "@/components/ui/ConfirmModal/ConfirmModal";

interface WorkspaceCardProps {
    card: Workspace;
    href: string;
}

export default function WorkspaceCard({ card, href }: WorkspaceCardProps) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: deleteWorkspace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspace"] });
            setIsConfirmOpen(false);
        },
    });
    return (
        <>
            {isConfirmOpen && (
                <ConfirmModal
                    title="Delete workspace"
                    message={`Are you sure you want to delete "${card.title}"? This action cannot be undone.`}
                    onConfirm={() => deleteMutation.mutate(card.id)}
                    onClose={() => setIsConfirmOpen(false)}
                    isPending={deleteMutation.isPending}
                    errorMessage={deleteMutation.error?.message}
                />
            )}

            <li className={classes["cards__item"]}>
                <Link href={href} className={classes["link"]}>
                    <div className={classes["cards__item-info"]}>
                        <EntityAvatar str={card.title} variant={"card"} />
                        <h3 className={classes["cards__item-title"]}>{card.title}</h3>
                        <p className={classes["cards__item-qty"]}>{card._count.boards} boards</p>
                    </div>

                    <hr />

                    <div className={classes.owners}>
                        <ul className={classes["owners__list"]}>
                            {card.members.map(member => (
                                <li key={member.id} className={classes["owners__item"]}>
                                    <EntityAvatar str={member.user.username} variant={"user"} />
                                </li>
                            ))}
                        </ul>
                        <span className={classes["owners__span"]}>{card.members.length > 1 ? "Owners" : "Owner"}</span>
                    </div>
                </Link>
                <div className={classes["buttons-action"]}>
                    <Button type={"button"} variant={"secondary"} className={classes["buttons-action__item"]}>
                        <SquarePen />
                    </Button>
                    <Button
                        type={"button"}
                        variant={"secondary"}
                        className={classes["buttons-action__item"]}
                        onClick={() => setIsConfirmOpen(true)}
                    >
                        <Trash2 />
                    </Button>
                </div>
            </li>
        </>
    );
}
