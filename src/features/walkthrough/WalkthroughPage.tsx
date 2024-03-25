import { useState } from "react";
import { Walkthrough } from "../../models/Walkthrough";

import { RootState } from "../../app/store/configureStore";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import { departmentSelector } from "../department/departmentSlice";
import { addWalkthrough, removeWalkthrough, updateWalkthrough } from "./walkthroughSlice";

import {
    DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowModesModel,
    GridRowId,
    GridRowModes,
    GridRowsProp,
    GridRowModel
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { Department } from "../../models/Department";



export default function WalkthroughPage() {

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



    const walkthroughs = useAppSelector((state: RootState) => state.walkthrough.walkthroughs);
    const auditors = useAppSelector((state: RootState) => state.auditor.auditors);
    const actions = useAppSelector((state: RootState) => state.action.actions);
    const dispatch = useAppDispatch();

    const departments = useAppSelector(departmentSelector);

    // DataGrid
    const initialRows: GridRowsProp = [
        {
            id: 1,
            date: new Date(),
            species: "Ovine", // Ovine
            departmentId: 1,
            departmentName: "Stock Yards",
            shift: "D/S", // D/S, N/S
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
            date: new Date("2024-03-27"),
            species: "Ovine", // Ovine
            departmentId: 4,
            departmentName: "FP 1",
            shift: "D/S", // D/S, N/S
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
            date: new Date("2024-03-27"),
            species: "Ovine", // Ovine
            departmentId: 5,
            departmentName: "FP 2",
            shift: "D/S", // D/S, N/S
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
            date: new Date("2024-03-27"),
            species: "Ovine", // Ovine
            departmentId: 4,
            departmentName: "FP 1",
            shift: "N/S", // D/S, N/S
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
            date: new Date("2024-03-27"),
            species: "Ovine", // Ovine
            departmentId: 5,
            departmentName: "FP 2",
            shift: "N/S", // D/S, N/S
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
    ];

    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleNewClick = () => {
        let newId = walkthroughs.length + 5;
        emptyWalkthrough.id = newId;
        setRows([...rows, emptyWalkthrough])
        setRowModesModel({ ...rowModesModel, [newId]: { mode: GridRowModes.Edit } });
        dispatch(addWalkthrough(emptyWalkthrough));

    }
    const handleEditClick = (id: GridRowId) => () => {
        console.log("Row ID is: " + id);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    }

    const handleDeleteClick = (id: GridRowId) => () => {
        let deleteId = typeof (id) === "number" ? id : parseInt(id);
        dispatch(removeWalkthrough(deleteId));
    }

    const handleCanceClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } })
        let editedId = typeof (id) === "number" ? id : parseInt(id);
        let editedRow = rows.find(r => r.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter(row => row.id !== id));
            dispatch(removeWalkthrough(editedId));
        }
    }

    const processRowUpdate = (newRow: GridRowModel) => {

        let updatedRow = { ...newRow, isNew: false };
        setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    }

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "date", headerName: "Date", width: 90, editable: true, type: "date" },
        { field: "species", headerName: "Species", width: 120, editable: true, type: "string" },
        {
            field: "departmentName", headerName: "Department", width: 100, editable: true, type: "singleSelect",
            getOptionValue: (value: any) => value.name,
            getOptionLabel: (value: any) => value.name,
            valueOptions: departments
        },
        { field: "shift", headerName: "Shift", width: 90, editable: true, type: "singleSelect", valueOptions: ['D/S', 'N/S'] },
        { field: "time", headerName: "Time", width: 90, editable: true, type: "string" },
        {
            field: "auditorId", headerName: "Auditor", width: 90, editable: true, type: "singleSelect",
            getOptionValue: (value: any) => value.id,
            getOptionLabel: (value: any) => value.name,
            valueOptions: auditors
        },
        {
            field: "actionDes", headerName: "Procedure/Area Verified", width: 120, editable: true, type: "singleSelect",
            getOptionValue: (value: any) => value.description,
            getOptionLabel: (value: any) => value.description,
            valueOptions: actions
        },
        { field: "compliant", headerName: "Compliant", width: 90, editable: true, type: "singleSelect", valueOptions: ['Yes', 'No'] },
        { field: "status", headerName: "Status", width: 90, editable: true, type: "singleSelect", valueOptions: ['Open', 'Closed'] },
        { field: "comments", headerName: "Comments", width: 300, editable: true, type: "string" },
        { field: "correctiveAction", headerName: "Corrective Action", width: 300, editable: true, type: "string" },
        {
            field: 'actions', type: "actions", headerName: "Actions",
            width: 100,
            getActions: ({ id }) => {
                let isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main'
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCanceClick(id)}
                            color="inherit"
                        />
                    ]
                }
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ]
            }
        }
    ];

    return (
        <div>
            <h4>Walkthrough Page</h4>

            <h6>Data Grid</h6>

            <Button variant="contained" color="primary" onClick={handleNewClick} sx={{ position: "fixed", top: "80px", right: "20px" }}>
                New
            </Button>

            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5, 10]}
                getRowHeight={() => "auto"}
            />
        </div>
    );
}
