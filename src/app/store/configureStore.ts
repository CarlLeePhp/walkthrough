import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "../../features/department/departmentSlice";
import walkthroughReducer from "../../features/walkthrough/walkthroughSlice";

export const store = configureStore({
    reducer: {
        department: departmentReducer,
        walkthrough: walkthroughReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
