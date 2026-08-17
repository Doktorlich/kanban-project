import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import NavList from "@/components/layout/NavList/NavList";
import classes from "./Sidebar.module.scss";
import { LogOut } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className={classes.sidebar}>
            <div className={classes["sidebar__nav-menu"]}>
                <Link href={"/workspaces"} className={classes["top-logo"]}>
                    {/*<img src="EMPTY" alt="logo image" className={classes["top-logo__logo-img"]} />*/}
                    <span className={classes["top-logo__logo-img"]}>K</span>
                    <span className={classes["top-logo__name"]}>Kanban</span>
                </Link>

                {/*Данный вид поиска отложить на конец разработки приложения */}
                <Input type={"search"} className={classes.search} placeholder={"Search..."} variant={"search"} />

                <NavList />
            </div>

            <div className={classes["user-block"]}>
                <div className={classes["user-block__container"]}>
                    <hr className={classes["user-block__line"]} />

                    {/*<img src="PHOTO_USER" alt="user photo" className={classes["user-block__photo"]} />*/}
                    <span className={classes["user-block__photo"]}>USER</span>

                    <div className={classes["user-block__user-info"]}>
                        <p className={classes["user-block__full-name"]}>My nickname</p>
                        <p className={classes["user-block__role"]}>My role</p>
                    </div>
                </div>

                <Button type={"submit"} className={classes["user-block__button-exit"]} variant={"secondary"}>
                    {/*<img src="" alt="button exit image" />*/}
                    <LogOut size={16} />
                </Button>
            </div>
        </aside>
    );
}
