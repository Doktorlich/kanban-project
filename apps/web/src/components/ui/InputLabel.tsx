import { ComponentPropsWithoutRef, ReactNode } from "react";

interface InputLabelProps extends ComponentPropsWithoutRef<"input"> {
  children: ReactNode;
  labelClassName?: string;
}

export default function InputLabel({ children, labelClassName, ...props }: InputLabelProps) {
  const inputId = props.id;

  return (
    <label htmlFor={inputId} className={labelClassName}>
      {children}
      <input {...props} />
    </label>
  );
}
