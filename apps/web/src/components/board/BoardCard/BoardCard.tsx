import Link from "next/link";
import classes from "./BoardCard.module.scss";
import { Owner } from "@/constants/mock-workspaces";

interface BoardCardData {
    id: number;
    nameBoard: string;
    quantityTasks: number;
    owners: Owner[];
}

interface BoardCardProps {
    card: BoardCardData;
    href: string;
}

export default function BoardCard({ card, href }: BoardCardProps) {
    return (
        <li className={classes["cards__item"]}>
            <Link href={href} className={classes["cards__link"]}>
                <div className={classes["cards__item-info"]}>
                    {/*<img src="" alt="board image" />*/}
                    <h3 className={classes["cards__item-title"]}>{card.nameBoard}</h3>
                    <p className={classes["cards__item-qty"]}>{card.quantityTasks} tasks</p>
                </div>

                <hr className={classes["cards__divider"]} />

                <div className={classes.owners}>
                    <ul className={classes["owners__list"]}>
                        {card.owners.map(item => (
                            <li key={item.id} className={classes["owners__item"]}>
                                {item.owner}
                            </li>
                        ))}
                    </ul>
                    <span className={classes["owners__title"]}>Owner</span>
                </div>
            </Link>
        </li>
    );
}
