import React, { useEffect, useState } from "react";
import { Button, Checkbox, Chip, Container, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Autocomplete } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";





const Appointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [groupByMonthly, setGroupByMonthly] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [listDepositTypes, setListDepositTypes] = useState([]);
    const [depositType, setDepositType] = useState('');
    const [faces, setFaces] = useState(0);
    const [amount, setAmount] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [deposit, setDeposit] = useState('');
    const [depositDate, setDepositDate] = useState('');

    const getAppointments = async () => {
        const { data } = await axios.get('/api/appointments/getappointments')
        setAppointments(data);
    }

    const getListDepositTypes = async () => {
        const { data } = await axios.get('/api/appointments/getlistdeposittype');
        setListDepositTypes(data);
    }

    useEffect(() => {
        getAppointments();
        getListDepositTypes();
    }, []);





    const groupByMonth = () => {
        const monthlys = [];

        for (let appointment of appointments) {
            const date = new Date(appointment.dateTime);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');;
            const year = date.getFullYear();

            const firstDayOfMonth = new Date(year, month, 0);

            const monthName = firstDayOfMonth.toLocaleString('default', { month: 'long' });


            const monthYear = `${monthName}-${year}`;

            const exists = monthlys.find(m => m.date === monthYear);

            if (!exists) {
                monthlys.push({ date: monthYear, appointments: [appointment] })
            } else {
                exists.appointments.push(appointment);
            }
        }
        return monthlys;
    }

    const getChipColor = (depositType) => {
        switch (depositType) {
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

    const onEditClick = appointment => {
        setOpen(true);
        setSelectedAppointment(appointment);
        setFaces(appointment.faces);
        setAmount(appointment.amount);
        setDeposit(appointment.deposit);
        setDepositDate(appointment.depositDate);
        setDepositType(appointment.depositType);
        setDateTime(appointment.dateTime);
    }

    const update = async () => {
        await axios.post('/api/appointments/updateappointment', {
            personId: selectedAppointment.personId,
            id: selectedAppointment.id,
            datetime: dateTime,
            faces: faces,
            amount: amount,
            deposit: deposit,
            depositType: depositType,
            depositDate: depositDate
        });
        setOpen(false);
        await getAppointments();
    }

    const onDeleteClick = async (id) => {
        await axios.post('/api/appointments/deleteappointment', { id });
        await getAppointments();
    }


    const handleClose = () => {
        setOpen(false);
        setFaces('');
        setAmount('');
        setDeposit('');
        setDepositDate('');
        setDateTime('');
        setDateTime('');
    }







    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Typography variant="h2" gutterBottom component="div">
                Appointments
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={groupByMonthly}
                        onChange={(e) => setGroupByMonthly(e.target.checked)}
                        name="checkedBox"
                        color="primary"
                    />
                }
                label="Group by Month"
            />

            {!groupByMonthly ? (
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
                                <TableCell align="center" sx={{ fontSize: '18px' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                        {appointment.person.name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontSize: '18px' }}>{dayjs(appointment.dateTime).format('dddd, MMM D, YYYY')}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '18px' }}>{dayjs(appointment.dateTime).format('h:mm a')}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '18px' }}>{appointment.faces}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '18px' }}>${appointment.amount}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '18px' }}>${appointment.deposit}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '18px' }}>{dayjs(appointment.depositDate).format('dddd, MMM D, YYYY - h:mm a')}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="column">
                                            <Chip color={getChipColor(appointment.depositType)} sx={{ fontSize: '18px', margin: '0 25px' }} label={appointment.depositType}></Chip>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontSize: '18px' }}>
                                        <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => onEditClick(appointment)}>Edit</Button>
                                        <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => onDeleteClick(appointment.id)}>Delete</Button>

                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                groupByMonth().map(({ date, appointments }) => (
                    <div key={date}>
                        <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
                            {date}
                        </Typography>
                        <TableContainer component={Paper}>
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
                                        <TableCell align="center" sx={{ fontSize: '18px' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {appointments.map((appointment) => (
                                        <TableRow key={appointment.id}>
                                            <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                                {appointment.person.name}
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontSize: '18px' }}>{dayjs(appointment.dateTime).format('dddd, MMM D, YYYY')}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '18px' }}>{dayjs(appointment.dateTime).format('h:mm a')}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '18px' }}>{appointment.faces}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '18px' }}>${appointment.amount}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '18px' }}>${appointment.deposit}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '18px' }}>{dayjs(appointment.depositDate).format('dddd, MMM D, YYYY - h:mm a')}</TableCell>
                                            <TableCell align="center">
                                                <Stack direction="column">
                                                    <Chip color={getChipColor(appointment.depositType)} sx={{ fontSize: '18px', margin: '0 25px' }} label={appointment.depositType}></Chip>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontSize: '18px' }} >
                                                <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => onEditClick(appointment)}>Edit</Button>
                                                <br /> <br />
                                                <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => onDeleteClick(appointment.id)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))
            )}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xl'>
                <DialogTitle align="center" sx={{ fontSize: '25px' }} > {dayjs(selectedAppointment.dateTime).format('dddd, MMM D, YYYY')} {dayjs(selectedAppointment.dateTime).format('h:mm a')}
                    <br />
                    Editing Appointment For {selectedAppointment.person?.name}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label='Date & Time' type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)}></TextField>
                    <br /> <br />
                    <TextField autoFocus margin="dense" label='Faces' type="number" value={faces} onChange={(e) => setFaces(e.target.value)}></TextField>
                    <br /> <br />
                    <TextField autoFocus margin="dense" label='Amount' type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></TextField>
                    <br /> <br />
                    <TextField autoFocus margin="dense" label='Deposit' type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)}></TextField>
                    <br /> <br />
                    <Autocomplete
                        options={listDepositTypes}
                        getOptionLabel={(option) => option}
                        autoFocus margin='dense'
                        value={depositType}
                        onChange={(e, newValue) => setDepositType(newValue)}
                        renderInput={(params) => <TextField {...params} label='Deposit Type' variant="outlined" sx={{ width: 225 }} />}
                    />
                    <br />
                    <TextField autoFocus margin="dense" label='DepositDate' type="datetime-local" value={depositDate} onChange={(e) => setDepositDate(e.target.value)}></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={update} color="success" >
                        Save
                    </Button>
                </DialogActions>

            </Dialog>
        </Container>
    );
};

export default Appointments;