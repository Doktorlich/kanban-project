"use client";

import Button from "@/components/ui/Button/Button";
import classes from "./Header.module.scss";
import { Share, Menu } from "lucide-react";
import SearchToggle from "@/components/layout/SearchToggle/SearchToggle";
import { useSidebar } from "@/components/layout/SidebarContext";

export default function Header() {
    const { toggle } = useSidebar();

    return (
        <header className={classes["header"]}>
            <button type="button" className={classes["header__burger"]} onClick={toggle}>
                <Menu size={20} />
            </button>
            <h1 className={classes["header__title"]}>kanban dashboard</h1>
            <div className={classes["header__button-list"]}>
                <SearchToggle />
                <Button type={"button"} className={classes["header__share"]}>
                    Share
                    <Share size={14} />
                </Button>
            </div>
        </header>
    );
}
