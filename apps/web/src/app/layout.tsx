import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import "../styles/globals.scss";
import { AppProviders } from "@/providers/AppProviders";

export const metadata: Metadata = {
    title: "",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
