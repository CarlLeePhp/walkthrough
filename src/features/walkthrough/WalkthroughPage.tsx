import { useState, useEffect } from "react";
import { Walkthrough } from "../../models/Walkthrough";
import { Department } from "../../models/Department";

import { RootState } from "../../app/store/configureStore";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import { addDepartment, departmentSelector } from "../department/departmentSlice";
import { addWalkthrough, updateWalkthrough } from "./walkthroughSlice";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button, Modal, Card, CardContent, CardActions, TextField, MenuItem } from "@mui/material";

export default function WalkthroughPage() {
    const emptyWalkthrough: Walkthrough = {
        id: 0,
        date: "2024-03-18",
        species: "",
        departmentId: 1,
        departmentName: "",
        shift: "",
        time: "",
        auditorId: 0,
        auditorName: "",
        actionId: 0,
        actionDes: "",
        compliant: "",
        status: "",
        comments: "",
        correctiveAction: "",
    };
    const [selectedWalkthrough, setSelectedWalkthrough] = useState<Walkthrough>(emptyWalkthrough);

    const walkthroughs = useAppSelector((state: RootState) => state.walkthrough.walkthroughs);
    const dispatch = useAppDispatch();

    const departments = useAppSelector(departmentSelector);

    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    // DataGrid
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "date", headerName: "Date", width: 90 },
        { field: "species", headerName: "Species", width: 120 },
        { field: "departmentName", headerName: "Department", width: 100 },
        { field: "shift", headerName: "Shift", width: 90 },
        { field: "time", headerName: "Time", width: 90 },
        { field: "auditorName", headerName: "Auditor", width: 90 },
        { field: "actionDes", headerName: "Actions/Areas", width: 120 },
        { field: "compliant", headerName: "Compliant", width: 90 },
        { field: "status", headerName: "Status", width: 90 },
        { field: "comments", headerName: "Comments", width: 300 },
        { field: "correctiveAction", headerName: "Corrective Action", width: 300 },
    ];

    function newWalkthrough() {
        setOpen(true);
        setIsEdit(false);
    }

    // For Modal
    function closeModal() {
        setOpen(false);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let data = Object.assign({}, selectedWalkthrough);
        switch (e.target.name) {
            // Becarful the format of date
            case "date":
                data["date"] = e.target.value;
                break;
            case "species":
                data["species"] = e.target.value;
                break;
            case "shift":
                data["shift"] = e.target.value;
                break;
            case "department":
                data["departmentId"] = Number(e.target.value);
                for (let i = 0; i < departments.length; i++) {
                    if (departments[i].id === Number(e.target.value)) data["departmentName"] = departments[i].name;
                }
                break;
            default:
                console.log("Errors for handling change.");
        }
        setSelectedWalkthrough(data);
    }

    function handleAdd() {
        /*
        let newItem: Walkthrough = {
            id: walkthroughs.length + 1,
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
            comments: "Obeserved animals unloaded by transporter, no slipings were identified.",
            correctiveAction: "",
        }
        dispatch(addWalkthrough(newItem));
        */

        console.log(selectedWalkthrough);
    }

    function handleUpdate() { }
    // End for Modal

    return (
        <div>
            <h4>Walkthrough Page</h4>

            <h6>Data Grid</h6>

            <Button variant="contained" color="primary" onClick={newWalkthrough} sx={{ position: "fixed", top: "80px", right: "20px" }}>
                New
            </Button>

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
                getRowHeight={() => 'auto'}
            />

            <Modal open={open} onClose={closeModal} sx={{ position: "absolute", top: "10%", left: "10%" }}>
                <Card variant="outlined" sx={{ maxWidth: "1200px" }}>
                    <CardContent>
                        <TextField type="date" name="date" label="Date" value={selectedWalkthrough.date} onChange={handleChange} margin="normal" />
                        <TextField type="text" name="species" label="Species" value={selectedWalkthrough.species} onChange={handleChange} margin="normal" sx={{ marginLeft: "10px" }} />
                        <TextField
                            select
                            name="shift"
                            label="Shift"
                            defaultValue="D/S"
                            value={selectedWalkthrough.shift}
                            onChange={handleChange}
                            margin="normal" sx={{ marginLeft: "10px", minWidth: "80px" }}
                        >
                            <MenuItem value="D/S">D/S</MenuItem>
                            <MenuItem value="N/S">N/S</MenuItem>
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            name="department"
                            label="Department"
                            defaultValue={0}
                            value={selectedWalkthrough.departmentId}
                            onChange={handleChange}
                        >
                            {departments.map(d => (
                                <MenuItem key={d.id} value={d.id}>
                                    {d.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </CardContent>
                    <CardActions>
                        {isEdit ? (
                            <Button variant="contained" color="primary" onClick={handleUpdate}>
                                Update
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleAdd}>
                                Add
                            </Button>
                        )}
                        <Button variant="contained" color="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </div>
    );
}
