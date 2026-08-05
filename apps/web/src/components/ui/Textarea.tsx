import { ComponentPropsWithoutRef } from "react";

type TextareaProps = ComponentPropsWithoutRef<"textarea">;

export default function Textarea({ ...props }: TextareaProps) {
    return <textarea {...props}></textarea>;
}
