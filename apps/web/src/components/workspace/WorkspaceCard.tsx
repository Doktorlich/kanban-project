import Link from "next/link";
import classes from "./WorkspaceCard.module.scss";
import { Owner } from "@/constants/mock-workspaces";

interface WorkspaceCardData {
    id: number;
    image: string;
    nameWorkspace: string;
    quantityBoards: number;
    owners: Owner[];
}

interface WorkspaceCardProps {
    card: WorkspaceCardData;
    href: string;
}

export default function WorkspaceCard({ card, href }: WorkspaceCardProps) {
    return (
        <li className={classes["cards__item"]}>
            <Link href={href} className={classes["link"]}>
                <div className={classes["cards__item-info"]}>
                    {/*<img className={classes["cards__item-image"]} src="" alt="board image" />*/}
                    <b className={classes["cards__item-image"]}>{card.image}</b>
                    <h3 className={classes["cards__item-title"]}>{card.nameWorkspace}</h3>
                    <p className={classes["cards__item-qty"]}>{card.quantityBoards} boards</p>
                </div>

                <hr />

                <div className={classes.owners}>
                    <ul className={classes["owners__list"]}>
                        {card.owners.map(item => (
                            <li key={item.id} className={classes["owners__item"]}>
                                {item.owner}
                            </li>
                        ))}
                    </ul>
                    <span className={classes["owners__span"]}>Owner</span>
                </div>
            </Link>
        </li>
    );
}
