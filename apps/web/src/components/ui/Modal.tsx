import { ComponentPropsWithoutRef, ReactNode } from "react";


interface ModalProps extends ComponentPropsWithoutRef<"dialog"> {
    children: ReactNode;
}

export default function Modal({ children, ...props }: ModalProps) {

    return (
        <dialog open {...props}>
            {children}
        </dialog>
    );
}
