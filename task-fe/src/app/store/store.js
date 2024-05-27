import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import userReducer from "./userSlice";

export default configureStore({
    reducer: {
        tasks: taskReducer,
        user: userReducer,
    },
});

const rootReducer = combineReducers({
    user: userReducer,
});

export function setupStore(preloadedState) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}
