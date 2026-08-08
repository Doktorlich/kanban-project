import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import classes from "./Input.module.scss";

type InputVariant = "form" | "search" | "checkbox";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
    variant?: InputVariant;
}

export default function Input({ variant = "form", className, ...props }: InputProps) {
    const inputClassName = clsx(classes.input, classes[`input--${variant}`], className);
    return <input className={inputClassName} {...props} />;
}
