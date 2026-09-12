import Link from "next/link";
import classes from "./WorkspaceCard.module.scss";
import { Workspace } from "@myapp/shared-types";
import EntityAvatar from "@/components/ui/EntityAvatar/EntityAvatar";

interface WorkspaceCardProps {
    card: Workspace;
    href: string;
}

export default function WorkspaceCard({ card, href }: WorkspaceCardProps) {
    return (
        <li className={classes["cards__item"]}>
            <Link href={href} className={classes["link"]}>
                <div className={classes["cards__item-info"]}>
                    {/*Внедрить аналог картинки который будет формироваться по 1й букве title ->Смотри заметку номер 4<-*/}
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
        </li>
    );
}
