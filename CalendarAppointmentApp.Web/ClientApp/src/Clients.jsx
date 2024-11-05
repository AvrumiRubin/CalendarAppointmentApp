import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const Clients = () => {

    const [clients, setClients] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [open, setOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState('');
    const [editingClient, setEditingClient] = useState(null);


    const getClients = async () => {
        const { data } = await axios.get('/api/people/getpeople');
        setClients(data);
    };

    useEffect(() => {
        getClients();
    }, []);

    const addClient = async () => {
        await axios.post('/api/people/addperson', {
            name: selectedClient,
            phoneNumber: phoneNumber
        });
        await getClients();
        handleClose();
    }

    const updateClient = async () => {
        await axios.post('/api/people/updateperson', {
            id: editingClient,
            name: selectedClient,
            phoneNumber: phoneNumber
        });
        getClients();
        handleClose();
    }

    const handleDelete = async (id) => {
        await axios.post('/api/people/deleteperson', { id })
        await getClients();
        handleClose();
    }

    // const deleteClient = async (id) => {
    //     await axios.post('/api/people/deleteperson', { id })
    //     await getClients();
    //     handleClose();
    // }


    const handleAddClient = (client = '') => {
        setOpen(true);
        setSelectedClient(client);
        setEditingClient(client);
    }

    const handleClose = () => {
        setOpen(false);
        setSelectedClient('');
        setPhoneNumber('');
        setEditingClient(null);
    }

    const Edit = client => {
        setOpen(true);
        setSelectedClient(client.name);
        setEditingClient(client.id);
        setPhoneNumber(client.phoneNumber);
    }

    const handleAddEdit = () => {
        if (editingClient) {
            updateClient(editingClient, selectedClient, phoneNumber);
        }
        else {
            addClient(selectedClient, phoneNumber);
        };
    }



    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Button onClick={() => handleAddClient()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
                    Add Client
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '25px' }}>Clients</TableCell>
                            <TableCell align="center" sx={{ fontSize: '25px' }}>Phone Number</TableCell>
                            <TableCell align="right" sx={{ fontSize: '25px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell sx={{ fontSize: '18px' }}>{client.name}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '18px' }}>{client.phoneNumber}</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>
                                    <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => Edit(client)}>Edit</Button>
                                    <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(client.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{editingClient ? 'Edit Client' : 'Add Client'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Client" type="text" fullWidth value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} />
                    <TextField autoFocus margin="dense" label="Phone Number" type="tel" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEdit} color="secondary">
                        {editingClient ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );







}

export default Clients;