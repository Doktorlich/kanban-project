import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import classes from "./Textarea.module.scss";

type TextareaProps = ComponentPropsWithoutRef<"textarea">;

export default function Textarea({ className, ...props }: TextareaProps) {
    const textareaClassName = clsx(classes.textarea, className);
    return <textarea {...props} className={textareaClassName} />;
}
