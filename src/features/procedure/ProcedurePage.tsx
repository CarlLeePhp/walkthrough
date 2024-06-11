import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { RootState } from "../../app/store/configureStore";
import { addProcedure, setProcedures, updateProcedure, removeProcedure } from "./procedureSlice";
import { useEffect, useState } from "react";
import { Procedure } from "../../models/Procedure";
import agent from "../../app/api/agent";
import { Button, Card, CardActions, CardContent, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";

export default function ProcedurePage() {
    const [isEdit, setIsEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState<string>("");
    const [selectedId, setSelectedId] = useState<number>(0);

    const procedures = useAppSelector((state: RootState) => state.procedure.procedures);

    const dispatch = useAppDispatch();

    useEffect(() => {
        agent.Procedures.list().then(data => {
            let initialProcedures: Procedure[] = data;
            dispatch(setProcedures(initialProcedures));
        })
    }, []);

    function newProcedure() {
        setOpen(true);
        setIsEdit(false);
        setSelectedProcedure("");
        setSelectedId(0);
    }

    function editProcedure(id: number) {
        setOpen(true);
        setIsEdit(true);
        for (let i = 0; i < procedures.length; i++) {
            if (procedures[i].id === id) {
                setSelectedProcedure(procedures[i].description);
                setSelectedId(id);
            }
        }
    }

    function closeModal() {
        setOpen(false);
    }

    function handleAddProcedure() {
        let newProcedure: Procedure = {
            id: 0,
            description: selectedProcedure,
            isActive: true
        }
        agent.Procedures.addProcedure(newProcedure)
            .then(procedure => dispatch(addProcedure(procedure)))
            .catch(error => console.log(error))
            .finally(() => setOpen(false))
    }

    function handleEditProcedure() {
        let editProcedure: Procedure = {
            id: selectedId,
            description: selectedProcedure,
            isActive: true,
        };
        dispatch(updateProcedure(editProcedure));
        setOpen(false);
    }

    const handleDeleteProcedure = (id: number) => {
        agent.Procedures.removeProcedure(id)
            .then(() => dispatch(removeProcedure(id)))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <h2>Procedure/Area Verified Management</h2>

            <Button variant="contained" color="primary" onClick={newProcedure} sx={{ position: "fixed", top: "80px", right: "20px" }}>
                New
            </Button>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {procedures.map((i) => (
                        <TableRow key={i.id}>
                            <TableCell>{i.description}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => editProcedure(i.id)}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="error" onClick={() => handleDeleteProcedure(i.id)} sx={{ marginLeft: "10px" }}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal open={open} onClose={closeModal} sx={{ position: "absolute", top: "40%", left: "40%" }}>
                <Card variant="outlined" sx={{ maxWidth: "400px" }}>
                    <CardContent>
                        <TextField type="text" label="Description" placeholder="Procedure/Area Verified" value={selectedProcedure} onChange={(e) => setSelectedProcedure(e.target.value)} />
                    </CardContent>
                    <CardActions>
                        {isEdit ? (
                            <Button variant="contained" color="primary" onClick={handleEditProcedure}>
                                Update
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleAddProcedure}>
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
