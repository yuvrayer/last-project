import { configureStore } from "@reduxjs/toolkit";
import { vacationsSlice } from "./vacationsSlice";
import { followingSlice } from "./followingSlice";

const vacationsStore = configureStore({
    reducer: { // i.e. slices
        // following: followingSlice.reducer, // i.e a single slice
        vacations: vacationsSlice.reducer,
        following: followingSlice.reducer
        // feed: feedSlice.reducer
    }
})

export default vacationsStore

export type RootState = ReturnType<typeof vacationsStore.getState>
export type AppDispatch = typeof vacationsStore.dispatch