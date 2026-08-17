import Button from "@/components/ui/Button/Button";
import classes from "./Header.module.scss";
import { Share } from "lucide-react";
import SearchToggle from "@/components/layout/SearchToggle/SearchToggle";

export default function Header() {
    return (
        <header className={classes["header"]}>
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
