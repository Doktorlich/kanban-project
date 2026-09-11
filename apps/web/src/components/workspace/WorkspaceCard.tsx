import Link from "next/link";
import classes from "./WorkspaceCard.module.scss";
import { Workspace } from "@myapp/shared-types";

interface WorkspaceCardProps {
    card: Workspace;
    href: string;
}

export default function WorkspaceCard({ card, href }: WorkspaceCardProps) {
    return (
        <li className={classes["cards__item"]}>
            <Link href={href} className={classes["link"]}>
                <div className={classes["cards__item-info"]}>
                    {/*<img className={classes["cards__item-image"]} src="" alt="board image" />*/}
                    {/*Внедрить аналог картинки который будет формироваться по 1й букве title ->Смотри заметку номер 4<-*/}
                    <b className={classes["cards__item-image"]}>IMG</b>
                    <h3 className={classes["cards__item-title"]}>{card.title}</h3>
                    <p className={classes["cards__item-qty"]}>{card._count.boards} boards</p>
                </div>

                <hr />

                <div className={classes.owners}>
                    <ul className={classes["owners__list"]}>
                        {card.members.map(member => (
                            <li key={member.id} className={classes["owners__item"]}>
                                {member.user.username}
                            </li>
                        ))}
                    </ul>
                    <span className={classes["owners__span"]}>{card.members.length > 1 ? "Owners" : "Owner"}</span>
                </div>
            </Link>
        </li>
    );
}
