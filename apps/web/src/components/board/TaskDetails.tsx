import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

export default function TaskDetails() {
    return (
        <div className="task-card">
            {/* Верхняя панель управления */}
            <div className="task-card__actions">
                <p className="task-card__badge">[STATUS PRIORITY]</p>
                {/*<Button type="button">share</Button>*/}
                <Button type="button" className="task-card__close-btn">
                    X(CLOSE)
                </Button>
            </div>

            {/* Главный заголовок и навигация */}
            <div className="task-card__header">
                <h1 className="task-card__title">[TITLE CARD H1]</h1>
                <div className="task-card__breadcrumbs">
                    <p className="task-card__breadcrumb-item">
                        in board <span>[NAME PARENT BOARD]</span>
                    </p>
                    <p className="task-card__breadcrumb-item">
                        column <span>[NAME PARENT COLUMN]</span>
                    </p>
                </div>
            </div>

            {/* Мета-информация (исполнители и даты) */}
            <div className="task-card__meta">
                <div className="task-card__meta-item">
                    <span className="task-card__label">Assignees</span>
                    <div className="task-card__assignees-list">
                        <div className="task-card__avatars">[LIST AVATAR USERS]</div>
                        <Button type="button" className="task-card__add-btn">
                            +
                        </Button>
                    </div>
                </div>

                <div className="task-card__meta-item">
                    <span className="task-card__label">Due date</span>
                    <div className="task-card__date-display">
                        {/*Заглушка временная*/}
                        <svg className="task-card__date-icon">ICON CALENDAR</svg>
                        <time dateTime="2024-12-08" className="task-card__date-text">
                            [DATE UPDATE]Dec 8, 2024
                        </time>
                    </div>
                </div>
            </div>

            {/* Выбор статуса карточки */}
            <div className="task-card__field">
                <span className="task-card__label">Status</span>
                <Select options={[]} className="task-card__select" />
            </div>

            {/* Описание задачи */}
            <div className="task-card__field">
                <span className="task-card__label">Description</span>
                <Textarea className="task-card__textarea" placeholder="description">
                    [DESCRIPTION]
                </Textarea>
            </div>

            {/* Секция комментариев */}
            <div className="task-card__comments-section">
                <div className="task-card__comments-header">
                    <span className="task-card__label">Comments </span>
                    <span className="task-card__comments-count">[COUNT COMMENTS] </span>
                </div>

                <ul className="task-card__comments-list">
                    {/*Сделать для LI отдельный компонент, что бы можно было его формировать через map*/}
                    <li className="task-card__comment-item">
                        <img src="" alt="AVATAR" className="task-card__comment-avatar" />
                        <div className="task-card__comment-body">
                            <h4 className="task-card__comment-author">[FULL NAME USER]</h4>
                            <p className="task-card__comment-text">[USER COMMENTS]</p>
                        </div>
                    </li>
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
