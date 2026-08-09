"use client";

import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef } from "react";
import classes from "./Modal.module.scss";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface ModalProps extends ComponentPropsWithoutRef<"dialog"> {
    children: ReactNode;
}

export default function Modal({ className, children, ...props }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const modalClassName = clsx(classes.modal, className);

    return (
        <dialog ref={dialogRef} onClose={() => router.back()} className={modalClassName} {...props}>
            {children}
        </dialog>
    );
}
