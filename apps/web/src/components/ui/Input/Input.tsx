import { ComponentPropsWithoutRef, Ref } from "react";
import clsx from "clsx";
import classes from "./Input.module.scss";

type InputVariant = "form" | "search" | "checkbox";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
    variant?: InputVariant;
    ref?: Ref<HTMLInputElement>;
}

export default function Input({ variant = "form", className, ref, ...props }: InputProps) {
    const inputClassName = clsx(classes.input, classes[`input--${variant}`], className);
    return <input ref={ref} className={inputClassName} {...props} />;
}
