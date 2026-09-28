"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal/Modal";
import TaskDetails from "@/components/task/TaskDetails/TaskDetails";

export default function TaskDetailsModalPage() {
    const router = useRouter();

    return (
        <Modal onClose={() => router.back()}>
            <TaskDetails isModal={true} />
        </Modal>
    );
}
