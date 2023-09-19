import {liked, trackQueue, userPreferences} from '../reducers/index'
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        trackQueue: trackQueue,
        userPreferences: userPreferences,
        liked: liked,
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
