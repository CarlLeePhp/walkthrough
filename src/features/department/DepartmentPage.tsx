import { useAppDispatch, useAppSelector } from "../../app/store/hooks"
import { addDepartment, departmentSelector, updateDepartment } from "./departmentSlice"
import { useEffect, useState } from "react";
import { Department } from "../../models/Department"
import { Button, Card, CardActions, CardContent, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";

export default function DepartmentPage() {
    const [departments, setDepartments] = useState<Array<Department>>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedId, setSelectedId] = useState<number>(0);

    const selectedDepartments = useAppSelector(departmentSelector);


    const dispatch = useAppDispatch();

    useEffect(() => {
        setDepartments(selectedDepartments);
        // what this below for?
        return () => {
            console.log("department component unmounting ...")
        };
    }, [selectedDepartments]);

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
            id: (departments.length + 1),
            name: selectedName,
            isActive: true
        };
        dispatch(addDepartment(newDepartment));
        setOpen(false);
    }

    function handleEditDepartment() {
        let editDepartment: Department = {
            id: selectedId,
            name: selectedName,
            isActive: true
        };
        dispatch(updateDepartment(editDepartment));
        setOpen(false);
    }

    return (
        <div>
            <h2>Department Manage Page</h2>

            <Button variant="contained" color="primary" onClick={newDepartment} sx={{ position: "fixed", bottom: "20px", right: "20px" }}>New</Button>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Department Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {departments.map(d => (
                        <TableRow key={d.id}>
                            <TableCell>{d.name}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => editDepartment(d.id)}>Edit</Button>
                                <Button variant="contained" color="error" onClick={closeModal} sx={{ marginLeft: "10px" }}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal
                open={open}
                onClose={closeModal}
                sx={{ position: "absolute", top: "40%", left: "40%" }}
            >
                <>
                    <Card variant="outlined" sx={{ maxWidth: "400px" }}>
                        <CardContent>
                            <TextField type="text" label="Name" placeholder="Department Name" value={selectedName} onChange={(e) => setSelectedName(e.target.value)} />
                        </CardContent>
                        <CardActions>
                            {isEdit ? (
                                <Button variant="contained" color="primary" onClick={handleEditDepartment}>Update</Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleAddDepartment}>Add</Button>
                            )}
                            <Button variant="contained" color="secondary" onClick={closeModal}>Cancel</Button>
                        </CardActions>
                    </Card>
                </>

            </Modal>
        </div>

    )
}