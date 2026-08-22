import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import classes from "./layout.module.scss";
import { SidebarProvider } from "@/components/layout/SidebarContext";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <div className={classes["dashboard-layout"]}>
                <div className={classes["dashboard-layout__sidebar-container"]}>
                    <Sidebar />
                </div>
                <div className={classes["dashboard-layout__main-container"]}>
                    <Header />
                    <main className={classes["dashboard-layout__content"]}>{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
}
