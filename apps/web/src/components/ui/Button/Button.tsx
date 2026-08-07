import { ComponentPropsWithoutRef } from "react";
import classes from "./Button.module.scss";
import clsx from "clsx";

// primary   -> Главное целевое действие (Войти, Создать, Сохранить)
// secondary -> Второстепенное действие (Отмена, Назад, Закрыть)
// ghost     -> Низкоприоритетное действие без фонового залива (Добавить задачу, Настройки)
// danger    -> Деструктивное необратимое действие (Удалить, Выйти из аккаунта)

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    variant?: ButtonVariant;
}

export default function Button({ variant = "primary", className, ...props }: ButtonProps) {
    const buttonClassName = clsx(classes.button, classes[`button--${variant}`], className);
    return <button className={buttonClassName} {...props}></button>;
}
