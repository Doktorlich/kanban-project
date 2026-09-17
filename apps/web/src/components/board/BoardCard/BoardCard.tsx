"use client";

import Link from "next/link";
import classes from "./BoardCard.module.scss";
import { Board } from "@myapp/shared-types";
import CreateBoardModal from "@/components/board/CreateBoardModal/CreateBoardModal";
import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import { SquarePen, Trash2 } from "lucide-react";

interface BoardCardProps {
    card: Board;
    href: string;
}

export default function BoardCard({ card, href }: BoardCardProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    return (
        <>
            {isEditOpen && <CreateBoardModal board={card} onClose={() => setIsEditOpen(false)} />}
            <li className={classes["cards__item"]}>
                <Link href={href} className={classes["cards__link"]}>
                    <div className={classes["cards__item-info"]}>
                        <h3 className={classes["cards__item-title"]}>{card.title}</h3>
                        <p className={classes["cards__item-qty"]}>{card.taskCount} tasks</p>
                    </div>

                    <hr className={classes["cards__divider"]} />
                </Link>
                <div className={classes["buttons-action"]}>
                    <Button
                        type={"button"}
                        variant={"secondary"}
                        className={classes["buttons-action__item"]}
                        onClick={() => setIsEditOpen(true)}
                    >
                        <SquarePen />
                    </Button>

                    <Button
                        type={"button"}
                        variant={"secondary"}
                        className={classes["buttons-action__item"]}
                        // onClick={() => setIsConfirmOpen(true)}
                    >
                        <Trash2 />
                    </Button>
                </div>
            </li>
        </>
    );
}
