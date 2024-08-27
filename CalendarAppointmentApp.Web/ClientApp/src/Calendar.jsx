//import './components/Calendar.css';
import React, { useEffect, useState } from 'react';
import './components/Calendar.css'; // Import your CSS file for styling
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from '@mui/material';
import { getTime } from 'date-fns';
import { AccessTimeTwoTone, AccountCircle, AttachMoney } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Calendar = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());  // State to store the currently selected date
    const [open, setOpen] = useState(false);
    const [bannerOpen, setBannerOpen] = useState(false);
    const [names, setNames] = useState([]);
    const [time, setTime] = useState('');
    const [faces, setFaces] = useState('');
    const [amount, setAmount] = useState('');
    const [deposit, setDeposit] = useState('');
    const [editingSourceId, setEditingSourceId] = useState(null);
    const [isNewClient, setIsNewClient] = useState(false);
    const [nameValue, setNameValue] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [selectedDayAppointments, setSelectedDayAppointments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getNames = async () => {
            const { data } = await axios.get('/api/people/getpeople');
            setNames(data);
        }
        getNames();
        getAppointments();
    }, []);

    const getAppointments = async () => {
        const { data } = await axios.get('/api/appointments/getappointments');
        setAppointments(data);
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handeleClose = () => {
        setTime('');
        setFaces('');
        setAmount('');
        setDeposit('');
        setOpen(false);
        setNameValue(null);
        setIsNewClient(false);
    };

    const handleBannerOpen = (date) => {
        const dayAppointments = appointments.filter(appointment => new Date(appointment.dateTime).toDateString() === date.toDateString());
        setSelectedDayAppointments(dayAppointments);
        setSelectedDate(date);
        setBannerOpen(true);
    }

    const handleBannerClose = () => {
        setBannerOpen(false);
    }


    const updateDateWithTime = (selectedDate, time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const newDate = new Date(selectedDate);

        // Adjust for potential timezone issues by working with UTC methods
        newDate.setUTCHours(hours);
        newDate.setUTCMinutes(minutes);

        console.log(newDate);
        return newDate;
    };




    const handleNameChange = (e, value) => {
        const isNameInList = names.some(names => names.name === value);
        console.log(nameValue);
        if (isNameInList) {
            console.log(`${value} is in list`);
        } else {
            setIsNewClient(true)
            console.log(`${value} is not in list`);
        }
    }

    const handleAddAppointment = async () => {
        const x = updateDateWithTime(selectedDate, time);
        await axios.post('/api/appointments/addappointment', {
            personId: nameValue.id,
            dateTime: x,
            faces: faces,
            amount: amount,
            deposit: deposit
        });
        getAppointments();
        handeleClose();
    };






    // Function to handle clicking on a date
    const handleDateClick = (date) => {
        setSelectedDate(date);
        handleClickOpen(true);
        //updateDateWithTime();


        // You can add your logic here for handling the click event
    };

    const hasAppointment = (date) => {
        return appointments.some(appointment => new Date(appointment.dateTime).toDateString() === date.toDateString());
    };

    // const hi = () => {
    //     const name = names.phoneNumber;
    //     console.log(name);
    //     //return 'hi!'
    // }


    const getAppointmentName = (date) => {
        const dayAppointments = appointments.filter(appointment => new Date(appointment.dateTime).toDateString() === date.toDateString());
        if (dayAppointments.length > 1) {
            return dayAppointments[0].person.name;

        }
        else if (dayAppointments.length === 1) {
            return dayAppointments[0].person.name;
        }
        return '';
    };


    // Function to generate an array of days in a month
    const getDaysInMonth = (year, month) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };



    // Render days of the current month
    const renderDays = () => {
        const daysInMonth = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth());
        const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const startingDay = firstDayOfMonth.getDay(); // Get the index of the starting day

        // Create an array to hold blank placeholders for days before the starting day
        const blankPlaceholders = [...Array(startingDay)].map((_, id) => <div key={`blank-${id}`} className="calendar-day" />);

        return (
            <>
                {blankPlaceholders}
                {daysInMonth.map((day, id) => (
                    <div key={id} className={`calendar-day ${isToday(day) ? 'today' : ''}`} onClick={() => handleDateClick(day)}>
                        {day.getDate()}
                        {hasAppointment(day) && (
                            <div className='appointment-banner' onClick={(e) => { e.stopPropagation(); handleBannerOpen(day); }}>
                                <a href='' onClick={(e) => e.preventDefault()}>{getAppointmentName(day)}</a>
                            </div>
                        )}
                    </div>
                ))}
            </>
        );
    };


    // Function to get the names of the days
    const getDayNames = () => {
        const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return dayNames;
    };


    // Function to check if a date is today
    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

    };

    const navigateToClients = () => {
        navigate('/clients')
    }


    return (
        <div className="calendar">
            <div className="calendar-header">
                <div className="d-grid col-2">
                    <button className='btn btn-outline-info btn-lg' style={{ marginRight: 100 }} onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
                        Prev
                    </button>
                </div>
                <h2>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <div className="d-grid col-2">
                    <button className='btn btn-outline-primary btn-lg' style={{ marginLeft: 100 }} onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
                        Next
                    </button>
                </div>
            </div>
            <div className="calendar-day-names">
                {getDayNames().map((dayName, index) => (
                    <div key={index} className="calendar-day-name">
                        <p>{dayName}</p>
                    </div>
                ))}
            </div>
            <div className="calendar-body">
                <div className="calendar-days">{renderDays()}</div>

            </div>


            <Dialog
                open={open}
                onClose={handeleClose}
                fullWidth maxWidth="md">
                <DialogTitle>{editingSourceId ? 'Edit Appointment' : 'Add Appointment'} - {selectedDate.toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric' })} </DialogTitle>
                <DialogContent>

                    {isNewClient && (
                        <div>
                            <h6>If Client is not in list please click here to add new Client</h6>
                            <Button onClick={navigateToClients} variant='contained' color='primary' >
                                Clients
                            </Button>
                        </div>
                    )}
                    <br></br>

                    <Autocomplete
                        options={names}
                        getOptionLabel={(option) => option.name}
                        autoFocus margin='dense'
                        fullWidth
                        onInputChange={handleNameChange}
                        onChange={(e, value) => setNameValue(value)}
                        renderInput={(params) => (<TextField {...params} label="Name" variant="outlined"></TextField>)}
                    />
                    <br /> 
                    <TextField autoFocus margin='dense' label="Time" type='time'
                        value={time} onChange={(e) => setTime(e.target.value)} />
                    <br></br> <br></br>
                    <TextField autoFocus margin='dense' label="Faces" type='number'
                        value={faces} onChange={(e) => setFaces(e.target.value)} />
                    <br></br> <br></br>
                    <TextField InputProps={{ startAdornment: (<InputAdornment position='start'><AttachMoney /></InputAdornment>) }} autoFocus margin='dense' label="Amount" type='number'
                        value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <br></br> <br></br>
                    <TextField InputProps={{ startAdornment: (<InputAdornment position='start'><AttachMoney /></InputAdornment>) }} autoFocus margin='dense' label="Deposit" type='number'
                        value={deposit} onChange={(e) => setDeposit(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handeleClose} color='primary' variant='outlined'>
                        Cancel
                    </Button>
                    <Button onClick={handleAddAppointment} color='primary' variant='contained' >
                        Add Appointment
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={bannerOpen}
                onClose={handleBannerClose}
                fullWidth maxWidth="sm">
                <DialogTitle>Appointments for {selectedDate.toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric' })}</DialogTitle>
                <DialogContent>
                    {selectedDayAppointments.length > 0 ? (
                        selectedDayAppointments.map((appointment, id) => (
                            <div key={id}>
                                <h3>Name: {appointment.person.name}</h3>
                                <h3>Time: {new Date(appointment.dateTime).toLocaleTimeString()}</h3>
                                <h3>Faces: {appointment.faces}</h3>
                                <h3>Amount: {appointment.amount}</h3>
                                <h3>Deposit: {appointment.deposit}</h3>
                            </div>
                        ))
                    ) : ''}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBannerClose} color='primary'>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default Calendar;
