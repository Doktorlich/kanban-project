"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";

interface CloseModalButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "onClick"> {
    children?: ReactNode;
}

export default function CloseModalButton({ className, children, ...props }: CloseModalButtonProps) {
    const router = useRouter();

    return (
        <Button variant={"secondary"} type={"button"} className={className} {...props} onClick={() => router.back()}>
            {children}
        </Button>
    );
}
