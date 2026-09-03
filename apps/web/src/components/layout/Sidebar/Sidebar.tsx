"use client";

import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import NavList from "@/components/layout/NavList/NavList";
import classes from "./Sidebar.module.scss";
import { LogOut } from "lucide-react";
import clsx from "clsx";
import { useSidebar } from "@/components/layout/SidebarContext";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../../../lib/auth";

export default function Sidebar() {
    const { isOpen, close } = useSidebar();
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            router.push("/login");
        },
    });
    function handleSubmit() {
        mutation.mutate();
    }
    return (
        <>
            <aside className={clsx(classes.sidebar, isOpen && classes["sidebar--open"])}>
                <div className={classes["sidebar__nav-menu"]}>
                    <Link href={"/workspaces"} className={classes["top-logo"]}>
                        <span className={classes["top-logo__logo-img"]}>K</span>
                        <span className={classes["top-logo__name"]}>Kanban</span>
                    </Link>
                    <Input type={"search"} className={classes.search} placeholder={"Search..."} variant={"search"} />
                    <NavList />
                </div>
                <div className={classes["user-block"]}>
                    <div className={classes["user-block__container"]}>
                        <hr className={classes["user-block__line"]} />
                        <span className={classes["user-block__photo"]}>USER</span>
                        <div className={classes["user-block__user-info"]}>
                            <p className={classes["user-block__full-name"]}>My nickname</p>
                            <p className={classes["user-block__role"]}>My role</p>
                        </div>
                    </div>
                    <Button
                        type={"button"}
                        className={classes["user-block__button-exit"]}
                        variant={"secondary"}
                        onClick={handleSubmit}
                        disabled={mutation.isPending}
                    >
                        <LogOut size={16} />
                    </Button>
                </div>
            </aside>
            {isOpen && <div className={classes.overlay} onClick={close} />}
        </>
    );
}
