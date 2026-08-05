import { TaskCard as TaskCardType } from "@/constants/mock-workspaces";

interface TaskCardProps {
    task: TaskCardType;
}

export default function TaskCard({ task }: TaskCardProps) {
    return (
        <li>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="owners">
                <ul className={"owners__list"}>
                    {task.owners.map(owner => (
                        <li key={owner.id} className={"owners__item"}>
                            {owner.owner}
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
}
