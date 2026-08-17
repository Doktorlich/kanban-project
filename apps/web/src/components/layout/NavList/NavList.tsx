import Link from "next/link";
import { Home, ListTodo, Users, Box, CreditCard, Settings, HelpCircle } from "lucide-react";
import classes from "./NavList.module.scss";

const ICON_MAP = {
    home: Home,
    tasks: ListTodo,
    users: Users,
    apis: Box,
    subscription: CreditCard,
    settings: Settings,
    help: HelpCircle,
};

// 1. Создаем строгий тип для элементов навигации
interface NavItem {
    itemLabel: string;
    href: string;
    count?: number;
    // keyof typeof означает: "только ключи, которые есть внутри ICON_MAP"
    iconKey: keyof typeof ICON_MAP;
}

// 2. Явно типизируем массив данных
const NAV_ITEMS: NavItem[] = [
    { itemLabel: "Home", href: "/home", count: 10, iconKey: "home" },
    { itemLabel: "Tasks", href: "/tasks", count: 2, iconKey: "tasks" },
    { itemLabel: "Users", href: "/users", count: 12, iconKey: "users" },
    { itemLabel: "APIs", href: "/apis", iconKey: "apis" },
    { itemLabel: "Subscription", href: "/subscription", iconKey: "subscription" },
    { itemLabel: "Settings", href: "/settings", iconKey: "settings" },
    { itemLabel: "Help & Support", href: "/help-&-support", iconKey: "help" },
];

export default function NavList() {
    return (
        <nav className={classes["nav"]}>
            <ul className={classes["nav__list"]}>
                {NAV_ITEMS.map(item => {
                    const IconComponent = ICON_MAP[item.iconKey];

                    return (
                        <li key={item.itemLabel} className={classes["nav__item"]}>
                            <Link href={item.href} className={classes["nav__link"]}>
                                <div className={classes["nav__icon-text"]}>
                                    {IconComponent && <IconComponent size={20} className={classes["nav__icon"]} />}
                                    <span>{item.itemLabel}</span>
                                </div>
                                {item.count !== undefined && (
                                    <span className={classes["nav__count"]}>{item.count}</span>
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
