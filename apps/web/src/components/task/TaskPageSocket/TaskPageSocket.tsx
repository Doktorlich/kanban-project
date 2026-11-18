"use client";

import { useParams } from "next/navigation";
import useBoardSocket from "@/hooks/useBoardSocket";

export default function TaskPageSocket() {
    const { boardId } = useParams();
    useBoardSocket(Number(boardId), false);
    return null;
}
