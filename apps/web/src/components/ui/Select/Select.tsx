import { ComponentPropsWithoutRef } from "react";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
    options: SelectOption[];
}

export default function Select({ options, ...props }: SelectProps) {
    return (
        <select {...props}>
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
