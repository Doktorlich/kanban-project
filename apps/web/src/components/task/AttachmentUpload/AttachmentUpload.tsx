import { useRef, useState, type ChangeEvent } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Paperclip } from "lucide-react";
import { ALLOWED_ATTACHMENT_TYPES, MAX_ATTACHMENT_SIZE_BYTES } from "@myapp/shared-types";
import { attachmentKeys, uploadAttachment } from "@/lib/attachment";
import Button from "@/components/ui/Button/Button";
import classes from "@/components/task/TaskAttachments/TaskAttachments.module.scss";

// Для атрибута accept: разрешённые mime-типы через запятую
const ACCEPT = Object.keys(ALLOWED_ATTACHMENT_TYPES).join(",");
const MAX_SIZE_MB = MAX_ATTACHMENT_SIZE_BYTES / 1024 / 1024;

export default function AttachmentUpload() {
    const { workspaceId, boardId, taskId } = useParams();
    const queryClient = useQueryClient();
    const inputRef = useRef<HTMLInputElement>(null);
    const [clientError, setClientError] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: (file: File) => uploadAttachment(Number(workspaceId), Number(boardId), Number(taskId), file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: attachmentKeys.list(Number(taskId)) });
        },
    });

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        // Сбрасываем значение, иначе повторный выбор того же файла не вызовет onChange
        event.target.value = "";
        if (!file) return;

        // Проверки до отправки: быстрее, чем ждать ответ сервера (сервер всё равно проверит ещё раз)
        if (!Object.prototype.hasOwnProperty.call(ALLOWED_ATTACHMENT_TYPES, file.type)) {
            setClientError("File type is not allowed");
            return;
        }
        if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
            setClientError(`File is too large (max ${MAX_SIZE_MB} MB)`);
            return;
        }

        setClientError(null);
        mutation.mutate(file);
    }

    const error = clientError ?? (mutation.isError ? mutation.error.message : null);

    return (
        <div className={classes["attachment-upload"]}>
            <input ref={inputRef} type="file" accept={ACCEPT} onChange={handleFileChange} hidden />
            <Button
                type="button"
                variant="ghost"
                onClick={() => inputRef.current?.click()}
                disabled={mutation.isPending}
            >
                <Paperclip size={16} />
                {mutation.isPending ? "Uploading..." : "Attach file"}
            </Button>
            {error && <p className={classes["attachment-upload__error"]}>{error}</p>}
        </div>
    );
}
