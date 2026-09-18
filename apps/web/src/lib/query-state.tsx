import { ReactNode } from "react";
import { UseQueryResult } from "@tanstack/react-query";

interface QueryStateOptions<TData> {
    isEmpty?: (data: TData) => boolean;
    emptyMessage?: string;
}
export default function queryState<TData>(
    query: UseQueryResult<TData>,
    options?: QueryStateOptions<TData>,
): ReactNode | null {
    if (query.isPending) {
        return <p>Loading...</p>;
    }
    if (query.isError) {
        return <p>Error loading data</p>;
    }
    const isEmpty = options?.isEmpty ?? ((data: TData) => Array.isArray(data) && data.length === 0);

    if (!query.data || isEmpty(query.data)) {
        return <p>{options?.emptyMessage ?? "No data"}</p>;
    }
    return null;
}
