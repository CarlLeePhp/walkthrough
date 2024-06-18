import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Department } from "../../models/Department";
import { RootState } from "../../app/store/configureStore";

interface DepartmentState {
    departments: Department[];
}

const initialState: DepartmentState = {
    departments: [
        { id: 1, name: 'Stock Yards', isActive: true },
        { id: 2, name: 'Slaughterboard', isActive: true },
        { id: 3, name: 'Chillers', isActive: true },
        { id: 4, name: 'FP 1', isActive: true },
        { id: 5, name: 'FP 2', isActive: true },
        { id: 6, name: 'FP 5', isActive: true }
    ],
};

export const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        setDepartments: (state, action: PayloadAction<Department[]>) => {
            state.departments = action.payload;
        },
        addDepartment: (state, action: PayloadAction<Department>) => {
            state.departments.push(action.payload);
        },
        updateDepartment: (state, action: PayloadAction<Department>) => {
            let itemIdex = state.departments.findIndex(i => i.id === action.payload.id);
            //not found
            if (itemIdex === -1 || itemIdex === undefined) return;

            state.departments[itemIdex].name = action.payload.name;
        },
        removeDepartment: (state, action: PayloadAction<number>) => {
            let itemIdex = state.departments.findIndex((i) => i.id === action.payload);
            //not found
            if (itemIdex === -1 || itemIdex === undefined) return;

            state.departments.splice(itemIdex, 1);
        }
    },
});

export const { addDepartment, updateDepartment, setDepartments, removeDepartment } = departmentSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const departmentSelector = (state: RootState) => state.department.departments;

export default departmentSlice.reducer;