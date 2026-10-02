import { configureStore } from "@reduxjs/toolkit";
import boardFiltersReducer from "@/store/boardFilters.slice";

export const store = configureStore({
    reducer: {
        boardFilters: boardFiltersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
