import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { addDepartment, departmentSelector, setDepartments, updateDepartment, removeDepartment } from "./departmentSlice";
import { useEffect, useState } from "react";
import { Department } from "../../models/Department";
import agent from "../../app/api/agent";
import { Button, Card, CardActions, CardContent, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";

export default function DepartmentPage() {
    const [isEdit, setIsEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedId, setSelectedId] = useState<number>(0);

    const departments = useAppSelector(departmentSelector);

    const dispatch = useAppDispatch();
    /***
    useEffect(() => {
        agent.Departments.list().then(data => {
            let initialDepartments: Department[] = data;
            dispatch(setDepartments(initialDepartments));
        })
    }, []);
    ***/


    function newDepartment() {
        setOpen(true);
        setIsEdit(false);
        setSelectedName("");
        setSelectedId(0);
    }

    function editDepartment(id: number) {
        setOpen(true);
        setIsEdit(true);
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].id === id) {
                setSelectedName(departments[i].name);
                setSelectedId(id);
            }
        }
    }

    function closeModal() {
        setOpen(false);
    }

    function handleAddDepartment() {
        let newDepartment: Department = {
            id: 0,
            name: selectedName,
            isActive: true
        }
        /*
        agent.Departments.addDepartment(newDepartment)
            .then(department => dispatch(addDepartment(department)))
            .catch(error => console.log(error))
            .finally(() => setOpen(false))
        */
        newDepartment.id = departments.length + 1;
        dispatch(addDepartment(newDepartment));
        setOpen(false);
    }

    function handleEditDepartment() {
        let editDepartment: Department = {
            id: selectedId,
            name: selectedName,
            isActive: true,
        };
        /*
        agent.Departments.update(editDepartment)
            .then(d => dispatch(updateDepartment(d)))
            .catch(error => console.log(error))
            .finally(() => setOpen(false));
        */
        dispatch(updateDepartment(editDepartment))
        setOpen(false)
    }

    const handleDeleteDepartment = (id: number) => {
        /*
        agent.Departments.remove(id)
            .then(() => dispatch(removeDepartment(id)))
            .catch(error => console.log(error))
        */
        dispatch(removeDepartment(id))
    }

    return (
        <div>
            <h2>Department Management</h2>

            <Button variant="contained" color="primary" onClick={newDepartment} sx={{ position: "fixed", top: "80px", right: "20px" }}>
                New
            </Button>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Department Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {departments.map((d) => (
                        <TableRow key={d.id}>
                            <TableCell>{d.name}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => editDepartment(d.id)}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="error" onClick={() => handleDeleteDepartment(d.id)} sx={{ marginLeft: "10px" }}>
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
                        <TextField type="text" label="Name" placeholder="Department Name" value={selectedName} onChange={(e) => setSelectedName(e.target.value)} />
                    </CardContent>
                    <CardActions>
                        {isEdit ? (
                            <Button variant="contained" color="primary" onClick={handleEditDepartment}>
                                Update
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleAddDepartment}>
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
