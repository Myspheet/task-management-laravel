import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../helper/config";

export const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        status: "idle",
        selectedId: null,
        error: null,
    },
    reducers: {
        setId: (state, action) => {
            state.selectedId = action.payload;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
            state.status = "idle";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getTasks.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tasks = action.payload ?? [];
                state.error = null;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.status = "failed";
                console.log("action", action);
                state.error = action.error.message;
            })
            .addCase(deleteTask.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = "idle";
                state.error = null;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addTask.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.status = "idle";
                state.error = null;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateTask.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = "idle";
                state.error = null;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(completeTask.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(completeTask.fulfilled, (state, action) => {
                state.status = "idle";
                state.error = null;
            })
            .addCase(completeTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { setId, setTasks } = taskSlice.actions;

export default taskSlice.reducer;

export const getTasks = createAsyncThunk(
    "tasks/getTasks",
    async (accessToken) => {
        const response = await axios.get(`${config.baseUrl}/tasks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        });
        return response.data;
    }
);

export const getTask = createAsyncThunk("tasks/getTask", async (taskId) => {
    const response = await axios.get(`${config.baseUrl}/tasks/${taskId}`);
    return response.data;
});

export const completeTask = createAsyncThunk(
    "tasks/completeTask",
    async ({ taskId, completed, accessToken }) => {
        const response = await axios.patch(
            `${config.baseUrl}/tasks/${taskId}/completed`,
            {
                completed,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            }
        );
        return response.data;
    }
);

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ taskId, data, accessToken }) => {
        const response = await axios.patch(
            `${config.baseUrl}/tasks/${taskId}`,
            {
                ...data,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            }
        );
        return response.data;
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async ({ taskId, accessToken }) => {
        console.log(accessToken);
        const response = await axios.delete(
            `${config.baseUrl}/tasks/${taskId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            }
        );
        return response.data;
    }
);

export const addTask = createAsyncThunk(
    "tasks/addTask",
    async ({ title, description, due_date, accessToken }) => {
        const response = await axios.post(
            `${config.baseUrl}/tasks`,
            {
                title,
                description,
                due_date,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            }
        );
        return response.data;
    }
);

export const selectAllTasks = (state) => state.tasks.tasks;

export const selectTaskById = (state, taskId) =>
    state.tasks.tasks.find((task) => task.id === taskId);
