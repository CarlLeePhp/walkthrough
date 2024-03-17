import { useState, useEffect } from "react";
import { Walkthrough } from "../../models/Walkthrough";
import { Department } from "../../models/Department";

import { RootState } from "../../app/store/configureStore";

import { useAppSelector } from "../../app/store/hooks";
import { addDepartment, departmentSelector } from "../department/departmentSlice";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button, Modal, Card, CardContent, CardActions, TextField } from "@mui/material";

export default function WalkthroughPage() {
    const emptyWalkthrough: Walkthrough = {
        id: 0,
        date: "",
        species: "",
        departmentId: 0,
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
    const [departments, setDepartments] = useState<Array<Department>>([]);
    const [selectedWalkthrough, setSelectedWalkthrough] = useState<Walkthrough>(emptyWalkthrough);

    const walkthroughs = useAppSelector((state: RootState) => state.walkthrough.walkthroughs);

    const selectedDepartments = useAppSelector(departmentSelector);

    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setDepartments(selectedDepartments);
        // Is this for testing?
        return () => {
            console.log("department component unmounting ...");
        };
    }, [selectedDepartments]);

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
            default:
                console.log("Errors for handling change.");
        }
        setSelectedWalkthrough(data);
    }

    function addWalkthrough() {
        console.log(selectedWalkthrough);
    }

    function updateWalkthrough() {}
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
                autoHeight={true}
            />

            <Modal open={open} onClose={closeModal} sx={{ position: "absolute", top: "10%", left: "10%" }}>
                <Card variant="outlined" sx={{ maxWidth: "400px" }}>
                    <CardContent>
                        <TextField type="date" name="date" label="Date" value={selectedWalkthrough.date} onChange={handleChange} margin="normal" />
                        <TextField type="text" name="species" label="Species" value={selectedWalkthrough.species} onChange={handleChange} margin="normal" />
                        <TextField variant="standard" type="text" name="shift" label="Shift" value={selectedWalkthrough.shift} onChange={handleChange} margin="normal" />
                    </CardContent>
                    <CardActions>
                        {isEdit ? (
                            <Button variant="contained" color="primary">
                                Update
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={addWalkthrough}>
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
