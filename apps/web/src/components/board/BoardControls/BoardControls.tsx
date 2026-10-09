"use client";

import classes from "./BoardControls.module.scss";

import { useQuery } from "@tanstack/react-query";

import type { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { getPriorities, priorityKeys } from "@/lib/priority";
import { setPriorityFilter, setSearchQuery, setSortBy } from "@/store/boardFilters.slice";

interface BoardControlsProps {
    isDragDisabled?: boolean;
}
export default function BoardControls({ isDragDisabled }: BoardControlsProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { priorityId, sortBy, searchQuery } = useSelector((state: RootState) => state.boardFilters);
    const queryPriorities = useQuery({ queryKey: priorityKeys.all, queryFn: getPriorities, staleTime: Infinity });

    return (
        <>
            <div className={classes["board-controls"]}>
                <select
                    value={priorityId ?? ""}
                    onChange={event =>
                        dispatch(setPriorityFilter(event.target.value ? Number(event.target.value) : null))
                    }
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
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={event => dispatch(setSearchQuery(event.target.value))}
                />
            </div>
            {isDragDisabled && <p>Clear filters to enable drag and drop</p>}
        </>
    );
}
