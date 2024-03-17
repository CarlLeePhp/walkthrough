import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Auditor } from "../../models/Auditor";

interface AuditorState {
    auditors: Auditor[];
}

const initialState: AuditorState = {
    auditors: [
        { id: 1, name: "MH", isActive: true },
        { id: 2, name: "LK", isActive: true },
        { id: 3, name: "SO", isActive: true },
        { id: 4, name: "CL", isActive: true },
    ],
};

export const auditorSlice = createSlice({
    name: "auditor",
    initialState,
    reducers: {
        addAuditor: (state, action: PayloadAction<Auditor>) => {
            state.auditors.push(action.payload);
        },
        updateAuditor: (state, action: PayloadAction<Auditor>) => {
            let itemIdex = state.auditors.findIndex((i) => i.id === action.payload.id);
            //not found
            if (itemIdex === -1 || itemIdex === undefined) return;

            state.auditors[itemIdex] = action.payload;
        },
    },
});

export const { addAuditor, updateAuditor } = auditorSlice.actions;

export default auditorSlice.reducer;
