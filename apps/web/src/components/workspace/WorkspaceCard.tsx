interface Owner {
    id: number;
    owner: string;
}

interface WorkspaceCardData {
    id: number;
    image: string;
    nameCard: string;
    quantityBoards: number;
    owners: Owner[];
}

interface WorkspaceCardProps {
    card: WorkspaceCardData;
}

export default function WorkspaceCard({ card }: WorkspaceCardProps) {
    return (
        <li className={"cards__item"}>
            <div className="cards__item-info">
                {/*<img src="" alt="board image" />*/}
                <b>{card.image}</b>
                <h3>{card.nameCard}</h3>
                <p>{card.quantityBoards} boards</p>
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
        </li>
    );
}
