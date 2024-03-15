import { useState, useEffect } from "react";
import { Walkthrough } from "../../models/Walkthrough";
import { Department } from "../../models/Department";

import { useAppSelector } from "../../app/store/hooks"
import { addDepartment, departmentSelector } from "../department/departmentSlice";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export default function WalkthroughPage() {
    const [departments, setDepartments] = useState<Array<Department>>([]);
    const [walkthroughs, setWalkthroughts] = useState<Array<Walkthrough>>([
        {
            id: 1,
            date: "14/03.2024",
            species: "Ovine", // Ovine
            department: { id: 1, name: "Slaughterboard", isActive: true },
            shift: "DS", // D/S, N/S
            time: "9:40",
            auditor: { id: 1, name: "CL", isActive: true },
            action: { id: 1, description: "Pre-Trim", isActive: true },
            compliant: true,
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
            followups: []
        },
        {
            id: 2,
            date: "14/03.2024",
            species: "Ovine", // Ovine
            department: { id: 1, name: "Slaughterboard", isActive: true },
            shift: "DS", // D/S, N/S
            time: "9:40",
            auditor: { id: 1, name: "CL", isActive: true },
            action: { id: 1, description: "Pre-Trim", isActive: true },
            compliant: true,
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
            followups: []
        },
        {
            id: 3,
            date: "14/03.2024",
            species: "Ovine", // Ovine
            department: { id: 1, name: "Slaughterboard", isActive: true },
            shift: "NS", // D/S, N/S
            time: "9:40",
            auditor: { id: 1, name: "CL", isActive: true },
            action: { id: 1, description: "Pre-Trim", isActive: true },
            compliant: true,
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
            followups: []
        },
        {
            id: 4,
            date: "14/03.2024",
            species: "Ovine", // Ovine
            department: { id: 1, name: "Slaughterboard", isActive: true },
            shift: "DS", // D/S, N/S
            time: "9:40",
            auditor: { id: 1, name: "CL", isActive: true },
            action: { id: 1, description: "Pre-Trim", isActive: true },
            compliant: true,
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
            followups: []
        },
        {
            id: 5,
            date: "14/03.2024",
            species: "Ovine", // Ovine
            department: { id: 1, name: "Slaughterboard", isActive: true },
            shift: "DS", // D/S, N/S
            time: "9:40",
            auditor: { id: 1, name: "CL", isActive: true },
            action: { id: 1, description: "Pre-Trim", isActive: true },
            compliant: true,
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
            followups: []
        },
        {
            id: 6,
            date: "14/03.2024",
            species: "Ovine", // Ovine
            department: { id: 1, name: "Slaughterboard", isActive: true },
            shift: "NS", // D/S, N/S
            time: "9:40",
            auditor: { id: 1, name: "CL", isActive: true },
            action: { id: 1, description: "Pre-Trim", isActive: true },
            compliant: true,
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
            followups: []
        },
        {
            id: 7,
            date: "14/03.2024",
            species: "Ovine", // Ovine
            department: { id: 1, name: "Slaughterboard", isActive: true },
            shift: "DS", // D/S, N/S
            time: "9:40",
            auditor: { id: 1, name: "CL", isActive: true },
            action: { id: 1, description: "Pre-Trim", isActive: true },
            compliant: true,
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
            followups: []
        },
        {
            id: 8,
            date: "14/03.2024",
            species: "Ovine", // Ovine
            department: { id: 1, name: "Slaughterboard", isActive: true },
            shift: "DS", // D/S, N/S
            time: "9:40",
            auditor: { id: 1, name: "CL", isActive: true },
            action: { id: 1, description: "Pre-Trim", isActive: true },
            compliant: true,
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
            followups: []
        },
        {
            id: 9,
            date: "14/03.2024",
            species: "Ovine", // Ovine
            department: { id: 1, name: "Slaughterboard", isActive: true },
            shift: "NS", // D/S, N/S
            time: "9:40",
            auditor: { id: 1, name: "CL", isActive: true },
            action: { id: 1, description: "Pre-Trim", isActive: true },
            compliant: true,
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
            followups: []
        },
        {
            id: 10,
            date: "14/03.2024",
            species: "Ovine", // Ovine
            department: { id: 1, name: "Slaughterboard", isActive: true },
            shift: "DS", // D/S, N/S
            time: "9:40",
            auditor: { id: 1, name: "CL", isActive: true },
            action: { id: 1, description: "Pre-Trim", isActive: true },
            compliant: true,
            status: "Closed", // Open, Closed
            comments: "Checked 10 carcasses post pre-trim, no defects were identified",
            correctiveAction: "",
            followups: []
        },
    ]);

    const selectedDepartments = useAppSelector(departmentSelector);

    useEffect(() => {
        setDepartments(selectedDepartments);
        // what this below for?
        return () => {
            console.log("department component unmounting ...")
        };
    }, [selectedDepartments]);

    // DataGrid
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'date', headerName: 'Date', width: 90 },
        { field: 'species', headerName: 'Species', width: 120 },
        { field: 'shift', headerName: 'Shift', width: 90 },
    ]

    return (
        <div>
            <h4>Walkthrough Page</h4>

            <h6>Data Grid</h6>
            <DataGrid
                rows={walkthroughs}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>

    )
}