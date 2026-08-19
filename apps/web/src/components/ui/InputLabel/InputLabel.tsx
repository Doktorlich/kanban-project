import { ComponentPropsWithoutRef, ReactNode } from "react";
import Input from "@/components/ui/Input/Input";
import classes from "./InputLabel.module.scss";
import clsx from "clsx";

type InputVariant = "form" | "search" | "checkbox";

interface InputLabelProps extends ComponentPropsWithoutRef<"input"> {
    children: ReactNode;
    labelClassName?: string;
    variant?: InputVariant;
}

export default function InputLabel({ children, variant, labelClassName, ...props }: InputLabelProps) {
    const inputId = props.id;
    const labelClass = clsx(classes.label, labelClassName);
    return (
        <label htmlFor={inputId} className={labelClass}>
            {children}
            <Input variant={variant} {...props} />
        </label>
    );
}
