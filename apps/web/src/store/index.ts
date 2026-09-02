import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        // Временная заглушка, чтобы Redux не ругался на пустой объект
        tmp: (state = {}) => state,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
