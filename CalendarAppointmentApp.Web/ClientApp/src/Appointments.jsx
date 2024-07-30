import { Checkbox, Container, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Appointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [groupByMonthly, setGroupByMonthly] = useState(false);

    const getAppointments = async () => {
        const { data } = await axios.get('/api/appointments/getappointments')
        setAppointments(data);
    }

    useEffect(() => {
        getAppointments();
    }, []);





    const groupByMonth = () => {
        const monthlys = [];

        for (let appointment of appointments) {
            const date = new Date(appointment.dateTime);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');;
            const year = date.getFullYear();

            const firstDayOfMonth = new Date(year, month, 1);
           
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
                <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '18px' }}>Name</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Faces</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Deposit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                        {appointment.person.name}
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>{appointment.dateTime}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>{appointment.faces}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>${appointment.amount}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>${appointment.deposit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                groupByMonth().map(({ date, appointments }) => (
                    <div key={date} sx={{ width: '80%', maxWidth: '80%' }}>
                        <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
                            {date}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: '18px' }}>Name</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Faces</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Deposit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {appointments.map((appointment) => (
                                        <TableRow key={appointment.id}>
                                            <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                                {appointment.person.name}
                                            </TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>{appointment.dateTime}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>{appointment.faces}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>${appointment.amount}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>${appointment.deposit}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))
            )}
        </Container>
    );
};

export default Appointments;