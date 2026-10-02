import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SortOption = "updatedAt-asc" | "updatedAt-desc" | null;

interface BoardFiltersState {
    priorityId: number | null;
    sortBy: SortOption;
    searchQuery: string;
}
const initialState: BoardFiltersState = {
    priorityId: null,
    sortBy: null,
    searchQuery: "",
};

const boardFiltersSlice = createSlice({
    name: "boardFilters",
    initialState,
    reducers: {
        setPriorityFilter: (state, action: PayloadAction<number | null>) => {
            state.priorityId = action.payload;
        },
        setSortBy: (state, action: PayloadAction<"updatedAt-asc" | "updatedAt-desc" | null>) => {
            state.sortBy = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setPriorityFilter, setSortBy, setSearchQuery } = boardFiltersSlice.actions;
export default boardFiltersSlice.reducer;
