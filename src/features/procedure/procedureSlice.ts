import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Procedure } from "../../models/Procedure";

interface ProcedureState {
    procedures: Procedure[];
}

const initialState: ProcedureState = {
    procedures: [
        { id: 1, description: "Animal Welfare", isActive: true },
        { id: 2, description: "Y-Cut", isActive: true },
        { id: 3, description: "Pre-Op", isActive: true },
        { id: 4, description: "Pre-Trim", isActive: true },
    ],
};

export const procedureSlice = createSlice({
    name: "procedure",
    initialState,
    reducers: {
        setProcedures: (state, action: PayloadAction<Procedure[]>) => {
            state.procedures = action.payload;
        },
        addProcedure: (state, action: PayloadAction<Procedure>) => {
            state.procedures.push(action.payload);
        },
        updateProcedure: (state, action: PayloadAction<Procedure>) => {
            let itemIdex = state.procedures.findIndex((i) => i.id === action.payload.id);
            //not found
            if (itemIdex === -1 || itemIdex === undefined) return;

            state.procedures[itemIdex] = action.payload;
        },
        removeProcedure: (state, action: PayloadAction<number>) => {
            let itemIdex = state.procedures.findIndex((i) => i.id === action.payload);
            //not found
            if (itemIdex === -1 || itemIdex === undefined) return;

            state.procedures.splice(itemIdex, 1);
        }
    },
});

export const { addProcedure, updateProcedure, setProcedures, removeProcedure } = procedureSlice.actions;

export default procedureSlice.reducer;
