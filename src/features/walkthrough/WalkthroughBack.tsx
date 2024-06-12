import { useState, useEffect } from "react";
import { Walkthrough } from "../../models/Walkthrough";

import { RootState } from "../../app/store/configureStore";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import { departmentSelector } from "../department/departmentSlice";
import { addWalkthrough, removeWalkthrough, updateWalkthrough } from "./walkthroughSlice";

import { DataGrid, GridColDef, GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import { Button, Modal, Card, CardContent, CardActions, TextField, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

export default function WalkthroughBack() {
    const emptyWalkthrough: Walkthrough = {
        id: 0,
        date: "",
        species: "",
        departmentId: 1,
        departmentName: "Stock Yards",
        shift: "",
        time: "",
        auditorId: 1,
        auditorName: "MH",
        actionId: 1,
        actionDes: "Pre-Trim",
        compliant: "",
        status: "Open",
        comments: "",
        correctiveAction: "",

    };

    const [selectedWalkthrough, setSelectedWalkthrough] = useState<Walkthrough>(emptyWalkthrough);

    const walkthroughs = useAppSelector((state: RootState) => state.walkthrough.walkthroughs);
    const auditors = useAppSelector((state: RootState) => state.auditor.auditors);
    const actions = useAppSelector((state: RootState) => state.action.actions);
    const dispatch = useAppDispatch();

    const departments = useAppSelector(departmentSelector);

    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    // DataGrid
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "date", headerName: "Date", width: 90 },
        { field: "species", headerName: "Species", width: 120 },
        { field: "departmentName", headerName: "Department", width: 100 },
        { field: "shift", headerName: "Shift", width: 90 },
        { field: "time", headerName: "Time", width: 90 },
        { field: "auditorName", headerName: "Auditor", width: 90 },
        { field: "actionDes", headerName: "Procedure/Area Verified", width: 120 },
        { field: "compliant", headerName: "Compliant", width: 90 },
        { field: "status", headerName: "Status", width: 90 },
        { field: "comments", headerName: "Comments", width: 300 },
        { field: "correctiveAction", headerName: "Corrective Action", width: 300 },
        {
            field: 'actions', type: "actions", headerName: "Actions",
            width: 100,
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleSelect(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDelete(id)}
                        color="inherit"
                    />
                ]
            }
        }
    ];

    function newWalkthrough() {
        setOpen(true);
        setIsNew(true);
        let newId = walkthroughs.length + 1;

        setSelectedWalkthrough(Object.assign(selectedWalkthrough, { id: newId }));
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
                console.log(data["date"]);
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
            case "auditor":
                data["auditorId"] = Number(e.target.value);
                for (let i = 0; i < auditors.length; i++) {
                    if (auditors[i].id === Number(e.target.value)) data["auditorName"] = auditors[i].name;
                }
                break;
            case "action":
                data["actionId"] = Number(e.target.value);
                for (let i = 0; i < auditors.length; i++) {
                    if (actions[i].id === Number(e.target.value)) data["actionDes"] = actions[i].description;
                }
                break;
            case "time":
                data["time"] = e.target.value;
                console.log(data["time"]);
                break;
            case "compliant":
                data["compliant"] = e.target.value;
                if (data["compliant"] === "Yes") data["status"] = "Closed";
                break;
            case "status":
                data["status"] = e.target.value;
                break;
            case "comments":
                data["comments"] = e.target.value;
                break;
            case "correctiveAction":
                data["correctiveAction"] = e.target.value;
                break;
            default:
                console.log("Errors for handling change.");
        }
        setSelectedWalkthrough(data);
    }

    function handleConfirm() { // add, update, or delete
        // Update
        if (isEdit) {
            dispatch(updateWalkthrough(selectedWalkthrough));
        }

        // Delete
        else if (isDelete) {
            dispatch(removeWalkthrough(selectedWalkthrough.id));
        }

        // Add
        else {
            dispatch(addWalkthrough(selectedWalkthrough));
        }

        setSelectedWalkthrough(emptyWalkthrough);
        setOpen(false);
        setIsNew(false)
        setIsEdit(false);
        setIsDelete(false);
    }

    function handleSelect(id: GridRowId) {
        let editedWalkthrough = walkthroughs.find(w => w.id === id);
        if (editedWalkthrough !== undefined) {
            setSelectedWalkthrough(editedWalkthrough);
            setIsEdit(true);
            setOpen(true)
        }
    }

    function handleDelete(id: GridRowId) {
        let editedWalkthrough = walkthroughs.find(w => w.id === id);
        if (editedWalkthrough !== undefined) {
            setSelectedWalkthrough(editedWalkthrough);
            setIsDelete(true);
            setOpen(true)
        }
    }
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
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10, 20]}
                disableRowSelectionOnClick
                getRowHeight={() => "auto"}
            />

            <Modal open={open} onClose={closeModal} sx={{ position: "absolute", top: "10%", left: "10%" }}>
                <Card variant="outlined" sx={{ maxWidth: "80%" }}>
                    <CardContent>
                        {isNew && (<h4>Add a new Walkthrough</h4>)}
                        {isEdit && (<h4>Update this Walkthrough</h4>)}
                        {isDelete && (<h4>Please confirm to delete this Walkthrough</h4>)}
                        <TextField type="date" name="date" label="Date" value={selectedWalkthrough.date} onChange={handleChange} margin="normal" sx={{ marginRight: "10px" }} />
                        <TextField
                            select
                            name="species"
                            label="Species"
                            defaultValue="Ovine"
                            value={selectedWalkthrough.species}
                            onChange={handleChange}
                            margin="normal"
                            sx={{ marginRight: "10px", minWidth: "100px" }}
                        >
                            <MenuItem value="Bobby">Bobby</MenuItem>
                            <MenuItem value="Bovine">Bovine</MenuItem>
                            <MenuItem value="Cervine">Cervine</MenuItem>
                            <MenuItem value="Ovine">Ovine</MenuItem>
                        </TextField>
                        <TextField
                            select
                            name="department"
                            label="Department"
                            defaultValue={1}
                            value={selectedWalkthrough.departmentId}
                            onChange={handleChange}
                            margin="normal"
                            sx={{ marginRight: "10px", minWidth: "120px" }}
                        >
                            {departments.map((d) => (
                                <MenuItem key={d.id} value={d.id}>
                                    {d.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            name="shift"
                            label="Shift"
                            defaultValue="D/S"
                            value={selectedWalkthrough.shift}
                            onChange={handleChange}
                            margin="normal"
                            sx={{ marginRight: "10px", minWidth: "80px" }}
                        >
                            <MenuItem value="D/S">D/S</MenuItem>
                            <MenuItem value="N/S">N/S</MenuItem>
                        </TextField>
                        <TextField type="time" name="time" label="Time" value={selectedWalkthrough.time} onChange={handleChange} margin="normal" sx={{ marginRight: "10px", minWidth: "80px" }} />
                        <TextField
                            select
                            name="auditor"
                            label="Auditor"
                            defaultValue={1}
                            value={selectedWalkthrough.auditorId}
                            onChange={handleChange}
                            margin="normal"
                            sx={{ marginRight: "10px", minWidth: "120px" }}
                        >
                            {auditors.map((a) => (
                                <MenuItem key={a.id} value={a.id}>
                                    {a.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            name="action"
                            label="Procedure/Area Verified"
                            defaultValue={1}
                            value={selectedWalkthrough.actionId}
                            onChange={handleChange}
                            margin="normal"
                            sx={{ marginRight: "10px", minWidth: "180px" }}
                        >
                            {actions.map((a) => (
                                <MenuItem key={a.id} value={a.id}>
                                    {a.description}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            name="compliant"
                            label="Compliant"
                            defaultValue="Yes"
                            value={selectedWalkthrough.compliant}
                            onChange={handleChange}
                            margin="normal"
                            sx={{ marginRight: "10px", minWidth: "100px" }}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </TextField>
                        <TextField select name="status" label="Status" value={selectedWalkthrough.status} onChange={handleChange} margin="normal" sx={{ marginRight: "10px", minWidth: "80px" }}>
                            <MenuItem value="Open">Open</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>
                        </TextField>
                        <TextField name="comments" label="Comments" value={selectedWalkthrough.comments} onChange={handleChange} fullWidth multiline minRows={2} margin="normal" />
                        <TextField
                            name="correctiveAction"
                            label="Corrective Actions"
                            value={selectedWalkthrough.correctiveAction}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            minRows={2}
                            margin="normal"
                        />
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={handleConfirm}>
                            Confirm
                        </Button>
                        <Button variant="contained" color="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </div>
    );
}
