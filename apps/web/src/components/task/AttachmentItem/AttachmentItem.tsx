import { useState } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileText, Trash } from "lucide-react";
import type { TaskAttachment } from "@myapp/shared-types";
import { attachmentKeys, deleteAttachment, getAttachmentDownloadUrl } from "@/lib/attachment";
import { formatFileSize } from "@/lib/format-file";
import { formatChatDate } from "@/lib/format-date";
import Button from "@/components/ui/Button/Button";
import ConfirmModal from "@/components/ui/ConfirmModal/ConfirmModal";
import classes from "@/components/task/TaskAttachments/TaskAttachments.module.scss";

interface AttachmentItemProps {
    attachment: TaskAttachment;
}

export default function AttachmentItem({ attachment }: AttachmentItemProps) {
    const { workspaceId, boardId, taskId } = useParams();
    const queryClient = useQueryClient();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const downloadUrl = getAttachmentDownloadUrl(Number(workspaceId), Number(boardId), Number(taskId), attachment.id);

    const deleteMutation = useMutation({
        mutationFn: () => deleteAttachment(Number(workspaceId), Number(boardId), Number(taskId), attachment.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: attachmentKeys.list(Number(taskId)) });
            setIsConfirmOpen(false);
        },
    });

    return (
        <li className={classes["attachment-item"]}>
            {isConfirmOpen && (
                <ConfirmModal
                    title={`Delete "${attachment.fileName}"?`}
                    message="This action cannot be undone."
                    onConfirm={() => deleteMutation.mutate()}
                    onClose={() => setIsConfirmOpen(false)}
                    isPending={deleteMutation.isPending}
                    errorMessage={deleteMutation.error?.message}
                />
            )}

            {attachment.isImage ? (
                <a href={downloadUrl} target="_blank" rel="noreferrer" className={classes["attachment-item__preview"]}>
                    {/* next/image не подходит: картинка отдаётся с авторизацией другого адреса */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={downloadUrl} alt={attachment.fileName} className={classes["attachment-item__image"]} />
                </a>
            ) : (
                <span className={classes["attachment-item__icon"]}>
                    <FileText size={28} />
                </span>
            )}

            <div className={classes["attachment-item__info"]}>
                <a href={downloadUrl} className={classes["attachment-item__name"]} title={attachment.fileName}>
                    {attachment.fileName}
                </a>
                <span className={classes["attachment-item__meta"]}>
                    {formatFileSize(attachment.fileSize)} · {formatChatDate(attachment.createdAt)}
                </span>
            </div>

            <Button
                type="button"
                variant="ghost"
                className={classes["attachment-item__delete"]}
                aria-label="Delete attachment"
                onClick={() => setIsConfirmOpen(true)}
            >
                <Trash size={18} />
            </Button>
        </li>
    );
}
