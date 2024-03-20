import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Action } from "../../models/Action";

interface ActionState {
    actions: Action[];
}

const initialState: ActionState = {
    actions: [
        { id: 1, description: "Pre-Trim", isActive: true },
        { id: 2, description: "Animal Welfare", isActive: true },
        { id: 3, description: "Pre-Op", isActive: true },
        { id: 4, description: "Process Control", isActive: true },
    ],
};

export const actionSlice = createSlice({
    name: "action",
    initialState,
    reducers: {
        addAction: (state, action: PayloadAction<Action>) => {
            state.actions.push(action.payload);
        },
        updateAction: (state, action: PayloadAction<Action>) => {
            let itemIdex = state.actions.findIndex((i) => i.id === action.payload.id);
            //not found
            if (itemIdex === -1 || itemIdex === undefined) return;

            state.actions[itemIdex] = action.payload;
        },
    },
});

export const { addAction, updateAction } = actionSlice.actions;

export default actionSlice.reducer;
