import React, { useEffect, useState } from "react";
import { Autocomplete, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Menu, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";


const Records = () => {

    const [records, setRecords] = useState([]);
    const [anchorE1, setAnchorE1] = useState(null);
    const [status, setStatus] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState({})
    const [updatedAmount, setUpdatedAmount] = useState(0);
    const [open, setOpen] = useState(false);
    const [listPaymentType, setListPaymentTypes] = useState([]);
    const [paymentType, setPaymentType] = useState('');


    const GetRecords = async () => {
        const { data } = await axios.get('/api/records/getrecords');
        setRecords(data);
    }

    const getListPaymentTypes = async () => {
        const { data } = await axios.get('/api/appointments/getlistpaymenttype');
        setListPaymentTypes(data);
    }

    useEffect(() => {
        GetRecords();
        getListPaymentTypes();
    }, []);

    const UpdateRecord = async () => {
        await axios.post('/api/records/updaterecord', {
            personId: selectedAppointment.personId,
            id: selectedAppointment.id,
            status: status,
            amount: updatedAmount,
            paymentType: paymentType
        });
        handleClose();
        await GetRecords();
    }


    const getChipColor = (depositType) => {
        switch (depositType) {
            case 'Pending':
                return 'warning';
            case 'None':
                return 'error';
            case 'Cash':
                return 'success';
            case 'Check':
                return 'primary';
            case 'QP':
                return 'secondary'
        }
    }

    const getStatusChipColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'warning';
            case 'Paid':
                return 'info';
            case 'Unpaid':
                return 'error';
            case 'Cancelled':
                return 'default'
        }
    }

    const handleClick = (e) => {
        setAnchorE1(e.currentTarget)
    }

    const handleMenuClose = selectedAppointment => {
        setOpen(true);
        setPaymentType(selectedAppointment.paymentType)
        setAnchorE1(null);
    }

    const menuCancel = () => {
        setAnchorE1(null);
    }

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setUpdatedAmount(0);
            setStatus('');
            setPaymentType(null);
        }, 0);

    }

    const handleAmountChange = (e, selectedAppointment) => {
        const amount = selectedAppointment.amount;
        setUpdatedAmount(e.target.value);
        setSelectedAppointment(
            {
                ...selectedAppointment, amount: e.target.value

            });
    }


    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Typography variant="h2" gutterBottom component="div">
                Records
            </Typography>

            <TableContainer component={Paper} sx={{ maxWidth: '150%', width: '150%' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px' }}>Name</TableCell>
                            <TableCell align="center" sx={{ fontSize: '18px' }}>Date</TableCell>
                            <TableCell align="center" sx={{ fontSize: '18px' }}>Time</TableCell>
                            <TableCell align="center" sx={{ fontSize: '18px' }}>Faces</TableCell>
                            <TableCell align="center" sx={{ fontSize: '18px' }}>Amount</TableCell>
                            <TableCell align="center" sx={{ fontSize: '18px' }}>Deposit</TableCell>
                            <TableCell align="center" sx={{ fontSize: '18px' }}>Deposit Date</TableCell>
                            <TableCell align="center" sx={{ fontSize: '18px' }}>Deposit Type</TableCell>
                            <TableCell align="center" sx={{ fontSize: '18px' }}>Status</TableCell>
                            <TableCell align="center" sx={{ fontSize: '18px' }}>Payment Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {records.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                    {record.person.name}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '18px' }}>{dayjs(record.dateTime).format('dddd, MMM D, YYYY')}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '18px' }}>{dayjs(record.dateTime).format('h:mm a')}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '18px' }}>{record.faces}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '18px' }}>${record.amount}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '18px' }}>${record.deposit}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '18px' }}>{dayjs(record.depositDate).format('dddd, MMM D, YYYY - h:mm a')}</TableCell>
                                <TableCell align="center">
                                    <Stack direction="column">
                                        <Chip color={getChipColor(record.depositType)} sx={{ fontSize: '18px', margin: '0 25px' }} label={record.depositType}></Chip>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="column">
                                        <Chip color={getStatusChipColor(record.status)} sx={{ fontSize: '18px', margin: '0 25px' }} label={record.status} onClick={(e) => { handleClick(e); setSelectedAppointment(record) }} />

                                        <Menu
                                            anchorEl={anchorE1}
                                            open={Boolean(anchorE1)}
                                            onClose={menuCancel}
                                            sx={{
                                                '& .MuiPaper-root': {
                                                    boxShadow: 'none'
                                                },
                                                '& .MuiMenuItem-root': {
                                                    backgroundColor: 'transparent',
                                                    color: 'black',
                                                },
                                                '& .MuiMenuItem-root:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                                                }
                                            }}
                                        >
                                            <MenuItem onClick={() => { setStatus('Paid'); handleMenuClose(selectedAppointment) }}>Paid</MenuItem>
                                            <MenuItem onClick={() => { setStatus('Unpaid'); handleMenuClose(selectedAppointment) }}>Unpaid</MenuItem>
                                            <MenuItem onClick={() => { setStatus('Cancelled'); handleMenuClose(selectedAppointment) }}>Cancelled</MenuItem>
                                        </Menu>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="column">
                                        <Chip color={getChipColor(record.paymentType)} sx={{ fontSize: '18px', margin: '0 25px' }} label={record.paymentType}></Chip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle sx={{ fontSize: '30px' }}>Updating Status To '{status}'</DialogTitle>
                <DialogContent>

                    <h6 hidden={status === 'Cancelled' || status === 'Unpaid'}>Please Update Total Amount if it has changed & set Payment Type </h6>
                    <TextField hidden={status === 'Cancelled' || status === 'Unpaid'} label='Amount' onChange={(e) => handleAmountChange(e, selectedAppointment)} value={selectedAppointment.amount}></TextField>
                    <br /> <br />
                    <Autocomplete
                        hidden={status === 'Cancelled' || status === 'Unpaid'}
                        sx={{ width: '223px' }}
                        options={listPaymentType}
                        getOptionLabel={(option) => option}
                        value={paymentType}
                        onChange={(e, newValue) => setPaymentType(newValue)}
                        renderInput={(params) => (<TextField {...params} label="Payment Type" variant="outlined"></TextField>)}
                    >

                    </Autocomplete>
                </DialogContent>
                <br></br>
                <DialogActions>
                    <h4>Click Update to Confirm changes </h4>
                    <Button onClick={handleClose} color='primary' variant='outlined'>
                        Cancel
                    </Button>
                    <Button onClick={UpdateRecord} color='info' variant='contained' >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    )
}

export default Records;
