"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
    children: ReactNode;
}

export function QueryProvider({ children }: ProvidersProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 5 * 60 * 1000,
                        retry: 2,
                        refetchOnWindowFocus: true,
                    },
                },
            }),
    );
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
