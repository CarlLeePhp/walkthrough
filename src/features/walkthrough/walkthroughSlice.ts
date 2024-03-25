import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Walkthrough } from "../../models/Walkthrough";

interface WalkthroughState {
    walkthroughs: Walkthrough[];
}

/*
{ id: 1, name: 'Stock Yards', isActive: true },
{ id: 2, name: 'Slaughterboard', isActive: true },
{ id: 3, name: 'Chillers', isActive: true },
{ id: 4, name: 'FP 1', isActive: true },
{ id: 5, name: 'FP 2', isActive: true },
{ id: 6, name: 'FP 5', isActive: true }
*/

const initialState: WalkthroughState = {
    walkthroughs: [
        {
            id: 1,
            date: "14/03/2024",
            species: "Ovine", // Ovine
            departmentId: 1,
            departmentName: "Stock Yards",
            shift: "DS", // D/S, N/S
            time: "9:40",
            auditorId: 4,
            auditorName: "CL",
            actionId: 1,
            actionDes: "Animal Welfare",
            compliant: "Yes",
            status: "Closed", // Open, Closed
            comments: "Obeserved animals unloaded by transporter, no slipings were identified. Nee more words to see filling the 3rd line. Maybe it is enough.",
            correctiveAction: "",
        },
        {
            id: 2,
            date: "14/03/2024",
            species: "Ovine", // Ovine
            departmentId: 4,
            departmentName: "FP 1",
            shift: "DS", // D/S, N/S
            time: "9:40",
            auditorId: 4,
            auditorName: "CL",
            actionId: 1,
            actionDes: "Pre-Trim",
            compliant: "Yes",
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
        },
        {
            id: 3,
            date: "14/03/2024",
            species: "Ovine", // Ovine
            departmentId: 5,
            departmentName: "FP 2",
            shift: "DS", // D/S, N/S
            time: "9:40",
            auditorId: 4,
            auditorName: "CL",
            actionId: 1,
            actionDes: "Pre-Trim",
            compliant: "Yes",
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
        },
        {
            id: 4,
            date: "14/03/2024",
            species: "Ovine", // Ovine
            departmentId: 4,
            departmentName: "FP 1",
            shift: "NS", // D/S, N/S
            time: "9:40",
            auditorId: 4,
            auditorName: "CL",
            actionId: 1,
            actionDes: "Pre-Trim",
            compliant: "Yes",
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
        },
        {
            id: 7,
            date: "14/03/2024",
            species: "Ovine", // Ovine
            departmentId: 5,
            departmentName: "FP 2",
            shift: "NS", // D/S, N/S
            time: "9:40",
            auditorId: 4,
            auditorName: "CL",
            actionId: 1,
            actionDes: "Pre-Trim",
            compliant: "Yes",
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
        },
    ],
};

export const walkthroughSlice = createSlice({
    name: "walkthrough",
    initialState,
    reducers: {
        addWalkthrough: (state, action: PayloadAction<Walkthrough>) => {
            state.walkthroughs.push(action.payload);
        },
        updateWalkthrough: (state, action: PayloadAction<Walkthrough>) => {
            let itemIdex = state.walkthroughs.findIndex((i) => i.id === action.payload.id);
            //not found
            if (itemIdex === -1 || itemIdex === undefined) return;

            // May have trouble
            state.walkthroughs[itemIdex] = action.payload;
        },
        removeWalkthrough: (state, action: PayloadAction<Number>) => {
            let itemIdex = state.walkthroughs.findIndex((i) => i.id === action.payload);
            //not found
            if (itemIdex === -1 || itemIdex === undefined) return;

            state.walkthroughs.splice(itemIdex, 1);
        }
    },
});

export const { addWalkthrough, updateWalkthrough, removeWalkthrough } = walkthroughSlice.actions;

export default walkthroughSlice.reducer;
