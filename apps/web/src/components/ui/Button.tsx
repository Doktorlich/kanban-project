import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">

export default function Button({ ...props }: ButtonProps) {
  return <button {...props}></button>;
}
