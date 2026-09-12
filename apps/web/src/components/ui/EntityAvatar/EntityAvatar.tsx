import classes from "./EntityAvatar.module.scss";
import clsx from "clsx";
import { HTMLAttributes } from "react";

const PALETTE_SIZE = 7;

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

type EntityAvatarVariant = "card" | "user";

interface EntityAvatarProps extends HTMLAttributes<HTMLSpanElement> {
    str: string;
    variant?: EntityAvatarVariant;
}

export default function EntityAvatar({ str, variant = "card", className, ...props }: EntityAvatarProps) {
    const firstSymbol = str.charAt(0).toUpperCase();
    const colorIndex = hashString(str) % PALETTE_SIZE;

    const baseClassName = variant === "user" ? "owners__item" : "cards__workspace-board";
    const spanClasses = clsx(classes[baseClassName], classes[`${baseClassName}--${colorIndex}`], className);

    return (
        <span className={spanClasses} {...props}>
            {firstSymbol}
        </span>
    );
}
