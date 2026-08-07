import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import "../styles/globals.scss"

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
            <body>{children}</body>
        </html>
    );
}
