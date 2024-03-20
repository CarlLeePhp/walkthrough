import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "../../features/department/departmentSlice";
import walkthroughReducer from "../../features/walkthrough/walkthroughSlice";
import auditorReducer from "../../features/auditor/auditorSlice";
import actionReducer from "../../features/action/actionSlice";

export const store = configureStore({
    reducer: {
        department: departmentReducer,
        walkthrough: walkthroughReducer,
        auditor: auditorReducer,
        action: actionReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
