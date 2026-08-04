import Link from "next/link";

interface Owner {
    id: number;
    owner: string;
}

interface BoardCardData {
    id: number;
    nameBoard: string;
    quantityTasks: number;
    owners: Owner[];
}

interface BoardCardProps {
    card: BoardCardData;
    href:string;
}

export default function BoardCard({ card, href }: BoardCardProps) {
    return (
        <li className={"cards__item"}>
            <Link href={href}>
                <div className="cards__item-info">
                    {/*<img src="" alt="board image" />*/}
                    <h3>{card.nameBoard}</h3>
                    <p>{card.quantityTasks} tasks</p>
                </div>

                <hr />

                <div className="owners">
                    <ul className={"owners__list"}>
                        {card.owners.map(item => (
                            <li key={item.id} className={"owners__item"}>
                                {item.owner}
                            </li>
                        ))}
                    </ul>
                    <span>Owner</span>
                </div>
            </Link>
        </li>
    );
}
