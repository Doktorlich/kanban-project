"use client";

import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef } from "react";
import classes from "./Modal.module.scss";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface ModalProps extends ComponentPropsWithoutRef<"dialog"> {
    children: ReactNode;
    onClose?: () => void;
}

export default function Modal({ className, children, onClose, ...props }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const modalClassName = clsx(classes.modal, className);
    function handleClose() {
        if (onClose) {
            onClose();
        } else {
            router.back();
        }
    }
    return (
        <dialog ref={dialogRef} onClose={handleClose} className={modalClassName} {...props}>
            {children}
        </dialog>
    );
}
