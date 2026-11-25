import { describe, expect, it } from "vitest";
import { formatChatDate, isEdited } from "./format-date";

// Даты собираем в локальном времени, чтобы тесты не зависели от часового пояса машины.
// month обычный, от 1 до 12.
function local(year: number, month: number, day: number, hour = 0, minute = 0): Date {
    return new Date(year, month - 1, day, hour, minute);
}

// Фиксированное "сейчас": formatChatDate принимает его вторым аргументом именно для тестов
const NOW = local(2026, 11, 20, 18, 0);

describe("formatChatDate", () => {
    it("shows only the time for today", () => {
        expect(formatChatDate(local(2026, 11, 20, 13, 8).toISOString(), NOW)).toBe("13:08");
    });

    it("pads hours and minutes with zeros", () => {
        expect(formatChatDate(local(2026, 11, 20, 9, 5).toISOString(), NOW)).toBe("09:05");
    });

    it("shows Yesterday for the previous calendar day", () => {
        expect(formatChatDate(local(2026, 11, 19, 23, 50).toISOString(), NOW)).toBe("Yesterday, 23:50");
    });

    it("compares calendar days, not 24 hours", () => {
        // между сообщением и "сейчас" меньше 24 часов, но дни разные
        const earlyMorning = local(2026, 11, 20, 0, 30);

        expect(formatChatDate(local(2026, 11, 19, 23, 50).toISOString(), earlyMorning)).toBe("Yesterday, 23:50");
    });

    it("shows date and time for older dates of the current year", () => {
        expect(formatChatDate(local(2026, 11, 2, 13, 8).toISOString(), NOW)).toBe("Nov 2, 13:08");
    });

    it("adds the year for dates from other years", () => {
        expect(formatChatDate(local(2025, 11, 2, 13, 8).toISOString(), NOW)).toBe("Nov 2, 2025, 13:08");
    });

    it("shows midnight as 00:05, not 24:05", () => {
        expect(formatChatDate(local(2026, 11, 20, 0, 5).toISOString(), NOW)).toBe("00:05");
    });
});

describe("isEdited", () => {
    const created = "2026-11-02T13:08:00.000Z";

    it("is false when the dates are equal", () => {
        expect(isEdited(created, created)).toBe(false);
    });

    it("is false when the difference is below the threshold", () => {
        // createdAt ставит база, updatedAt Prisma: у нового комментария они различаются на миллисекунды
        expect(isEdited(created, "2026-11-02T13:08:00.500Z")).toBe(false);
    });

    it("is true when updated later than the threshold", () => {
        expect(isEdited(created, "2026-11-02T13:08:05.000Z")).toBe(true);
    });
});
