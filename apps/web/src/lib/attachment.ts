import type { TaskAttachment } from "@myapp/shared-types";
import { apiFetch, BASE_URL } from "@/lib/api";
export const attachmentKeys = {
    all: ["attachment"] as const,
    list: (taskId: number) => ["attachment", "task", taskId] as const,
};

function attachmentsPath(workspaceId: number, boardId: number, taskId: number): string {
    return `/workspaces/${workspaceId}/boards/${boardId}/tasks/${taskId}/attachments`;
}

export function getAttachments(workspaceId: number, boardId: number, taskId: number) {
    return apiFetch<TaskAttachment[]>(`${attachmentsPath(workspaceId, boardId, taskId)}/`, {
        method: "GET",
    });
}

export function uploadAttachment(workspaceId: number, boardId: number, taskId: number, file: File) {
    // Имя поля "file" должно совпадать с upload.single("file") на сервере
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch<TaskAttachment>(`${attachmentsPath(workspaceId, boardId, taskId)}/`, {
        method: "POST",
        body: formData,
    });
}

export function deleteAttachment(workspaceId: number, boardId: number, taskId: number, attachmentId: number) {
    return apiFetch<void>(`${attachmentsPath(workspaceId, boardId, taskId)}/${attachmentId}`, {
        method: "DELETE",
    });
}

// Полный адрес для <img src> и ссылки "Download": это не fetch, браузер открывает адрес сам
export function getAttachmentDownloadUrl(
    workspaceId: number,
    boardId: number,
    taskId: number,
    attachmentId: number,
): string {
    return `${BASE_URL}${attachmentsPath(workspaceId, boardId, taskId)}/${attachmentId}/download`;
}
