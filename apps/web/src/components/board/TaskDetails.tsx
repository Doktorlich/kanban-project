import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { COLUMNS, TaskCard } from "@/constants/mock-workspaces";
import CommentUserItem from "@/components/task/CommentUserItem";
import CloseModalButton from "@/components/ui/CloseModalButton";

interface TaskDetailsProps {
    task: TaskCard;
}

export default function TaskDetails({ task }: TaskDetailsProps) {
    const statusOptions = COLUMNS.map(col => ({
        value: col.id,
        label: col.title,
    }));
    return (
        <div className="task-card">
            <div className="task-card__actions">
                <p className="task-card__badge">{task.priority}</p>
                {/*<Button type="button">share</Button>*/}

                <CloseModalButton className="task-card__close-btn"> X(CLOSE)</CloseModalButton>
            </div>

            <div className="task-card__header">
                <h1 className="task-card__title">{task.title}</h1>
                {/*ХЛЕБНЫЕ КРОШКИ, РЕАЛИЗОВАТЬ ПОЗЖЕ, ВЫЯСНИТЬ КАК ЛУЧШЕ*/}
                <div className="task-card__breadcrumbs">
                    <p className="task-card__breadcrumb-item">
                        in board <span>[NAME PARENT BOARD]</span>
                    </p>
                    <p className="task-card__breadcrumb-item">
                        column <span>[NAME PARENT COLUMN]</span>
                    </p>
                </div>
            </div>

            <div className="task-card__meta">
                <div className="task-card__meta-item">
                    <span className="task-card__label">Assignees</span>
                    <div className="task-card__assignees-list">
                        <div className="task-card__avatars">
                            {task.owners.map(owner => (
                                <span key={owner.id}>{owner.owner} </span>
                            ))}
                        </div>
                        <Button type="button" className="task-card__add-btn">
                            +
                        </Button>
                    </div>
                </div>

                <div className="task-card__meta-item">
                    <span className="task-card__label">Due date</span>
                    <div className="task-card__date-display">
                        {/*Заглушка временная*/}
                        <span className="task-card__date-icon">&#34;ICON CALENDAR&#34;</span>
                        <time dateTime="2024-12-08" className="task-card__date-text">
                            {/*! Преобразовать дату в формат Dec 8, 2024*/}
                            {task.dateCreated}
                        </time>
                    </div>
                </div>
            </div>

            <div className="task-card__field">
                <span className="task-card__label">Status</span>
                <Select options={statusOptions} defaultValue={task.status} className="task-card__select" />
            </div>

            <div className="task-card__field">
                <span className="task-card__label">Description</span>
                <Textarea className="task-card__textarea" placeholder="description" defaultValue={task.description} />
            </div>

            <div className="task-card__comments-section">
                <div className="task-card__comments-header">
                    <span className="task-card__label">Comments </span>
                    <span className="task-card__comments-count">{task.commentsUser.length} </span>
                </div>

                <ul className="task-card__comments-list">
                    {task.commentsUser.map(item => (
                        <CommentUserItem key={item.id} comment={item} />
                    ))}
                </ul>

                <form action="" className="task-card__comment-form">
                    <Textarea placeholder="Write a comment..." className="task-card__comment-input" />
                    <Button type="submit" className="task-card__submit-btn">
                        SEND
                    </Button>
                </form>
            </div>
        </div>
    );
}
