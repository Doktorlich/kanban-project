"use client";

import classes from "./BoardControls.module.scss";

import { useQuery } from "@tanstack/react-query";

import type { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { getPriorities, priorityKeys } from "@/lib/priority";
import { setPriorityFilter, setSortBy } from "@/store/boardFilters.slice";

export default function BoardControls() {
    const dispatch = useDispatch<AppDispatch>();
    const { priorityId, sortBy } = useSelector((state: RootState) => state.boardFilters);
    const queryPriorities = useQuery({ queryKey: priorityKeys.all, queryFn: getPriorities, staleTime: Infinity });

    return (
        <div className={classes["board-controls"]}>
            <select
                value={priorityId ?? ""}
                onChange={event => dispatch(setPriorityFilter(event.target.value ? Number(event.target.value) : null))}
            >
                <option value="">All priorities</option>
                {queryPriorities.data?.map(priority => (
                    <option key={priority.id} value={priority.id}>
                        {priority.name}
                    </option>
                ))}
            </select>
            <select
                value={sortBy ?? ""}
                onChange={event =>
                    dispatch(
                        setSortBy(
                            event.target.value === ""
                                ? null
                                : (event.target.value as "updatedAt-asc" | "updatedAt-desc"),
                        ),
                    )
                }
            >
                <option value="">No sorting</option>
                <option value="updatedAt-desc">Newest first</option>
                <option value="updatedAt-asc">Oldest first</option>
            </select>
        </div>
    );
}
