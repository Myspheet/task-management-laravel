import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../helper/axios";
import { config } from "../helper/config";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        status: "idle",
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
