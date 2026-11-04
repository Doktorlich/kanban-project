const EDITED_THRESHOLD_MS = 1000;

export function formatChatDate(iso: string, now: Date = new Date()): string {
    const date = new Date(iso);
    const time = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

    const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const dayDiff = Math.round((startOfDay(now) - startOfDay(date)) / 86_400_000);

    if (dayDiff === 0) return time;
    if (dayDiff === 1) return `Yesterday, ${time}`;

    const sameYear = date.getFullYear() === now.getFullYear();
    const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        ...(sameYear ? {} : { year: "numeric" }),
    });
    return `${day}, ${time}`;
}

export function isEdited(createdAt: string, updatedAt: string): boolean {
    return new Date(updatedAt).getTime() - new Date(createdAt).getTime() > EDITED_THRESHOLD_MS;
}
