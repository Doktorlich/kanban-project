import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { attachmentKeys, getAttachments } from "@/lib/attachment";
import queryState from "@/lib/query-state";
import AttachmentItem from "@/components/task/AttachmentItem/AttachmentItem";
import AttachmentUpload from "@/components/task/AttachmentUpload/AttachmentUpload";
import classes from "./TaskAttachments.module.scss";

export default function TaskAttachments() {
    const { workspaceId, boardId, taskId } = useParams();

    const queryAttachments = useQuery({
        queryKey: attachmentKeys.list(Number(taskId)),
        queryFn: () => getAttachments(Number(workspaceId), Number(boardId), Number(taskId)),
    });

    // isEmpty: () => false, чтобы при пустом списке кнопка загрузки оставалась на экране
    const state = queryState(queryAttachments, { isEmpty: () => false });
    if (state) return state;

    const attachments = queryAttachments.data ?? [];

    return (
        <div className={classes["task-attachments"]}>
            <div className={classes["task-attachments__header"]}>Attachments ({attachments.length})</div>
            {attachments.length > 0 && (
                <ul className={classes["task-attachments__list"]}>
                    {attachments.map(item => (
                        <AttachmentItem key={item.id} attachment={item} />
                    ))}
                </ul>
            )}
            <AttachmentUpload />
        </div>
    );
}
