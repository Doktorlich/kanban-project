// src/providers/AppProviders.tsx — пример структуры, не готовый код
import { QueryProvider } from "@/providers/QueryProvider";
import { ReactNode } from "react";
import { ReduxProvider } from "@/providers/ReduxProvider";

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <QueryProvider>
            <ReduxProvider>{children}</ReduxProvider>
        </QueryProvider>
    );
}
