import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header/Header";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className={"dashboard-layout"}>
            <Sidebar />
            <div className={"dashboard-layout__main-container"}>
                <Header />
                <main>{children}</main>
            </div>
        </div>
    );
}
