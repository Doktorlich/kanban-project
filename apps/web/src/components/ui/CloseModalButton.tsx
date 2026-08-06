"use client";

import { ComponentPropsWithoutRef } from "react";
import { useRouter } from "next/navigation";

type CloseModalButtonProps = ComponentPropsWithoutRef<"button">;

export default function CloseModalButton({ ...props }: CloseModalButtonProps) {
    const router = useRouter();
    return <button {...props} onClick={() => router.back()}></button>;
}
