import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import classes from "./Select.module.scss";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
    options: SelectOption[];
}

export default function Select({ className,options, ...props }: SelectProps) {
    const selectClassName = clsx(classes.select, className);
    return (
        <select {...props} className={selectClassName}>
            {options.map(opt => {
                return (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                );
            })}
        </select>
    );
}
