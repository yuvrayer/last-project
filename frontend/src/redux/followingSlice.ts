import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Likes from "../models/likes/Likes";

interface FollowingState {
    likes: Likes[],
}

const initialState: FollowingState = {
    likes: [],
}

export const followingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Likes[]>) => {
            state.likes = action.payload
        },
        unlike: (state, action: PayloadAction<Likes>) => {
            const objectIndex = state.likes.findIndex(f => (f.userId === action.payload.userId && f.vacationId === action.payload.vacationId))
            state.likes.splice(objectIndex)
        },
        like: (state, action: PayloadAction<Likes>) => {
            state.likes.push(action.payload)
        }
    }
})

export const { init, unlike, like } = followingSlice.actions

export default followingSlice.reducer