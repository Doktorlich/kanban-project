import Link from "next/link";

const NAV_ITEMS = [
    { itemLabel: "Home", href: "/home", count: 10 },
    { itemLabel: "Tasks", href: "/tasks", count: 2 },
    { itemLabel: "Users", href: "/users", count: 12 },
    { itemLabel: "Settings", href: "/settings" },
    { itemLabel: "Help & Support", href: "/help-&-support" },
];

export default function NavList() {
    return (
        <nav className="nav">
            <ul className="nav__list">
                {NAV_ITEMS.map(item => {
                    return (
                        <li key={item.itemLabel} className="nav__item">
                            <Link href={item.href}>{item.itemLabel}</Link>
                            {item.count && <span>{item.count}</span>}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
