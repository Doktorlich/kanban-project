import Link from "next/link";
import classes from "./BoardCard.module.scss";
import { Board } from "@myapp/shared-types";

interface BoardCardProps {
    card: Board;
    href: string;
}

export default function BoardCard({ card, href }: BoardCardProps) {
    return (
        <li className={classes["cards__item"]}>
            <Link href={href} className={classes["cards__link"]}>
                <div className={classes["cards__item-info"]}>
                    <h3 className={classes["cards__item-title"]}>{card.title}</h3>
                    <p className={classes["cards__item-qty"]}>[QTY] tasks</p>
                </div>

                <hr className={classes["cards__divider"]} />
            </Link>
        </li>
    );
}
