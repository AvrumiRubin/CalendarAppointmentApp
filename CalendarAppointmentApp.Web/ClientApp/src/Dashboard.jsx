import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CardHeader, CardMedia, Container, Icon, IconButton, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axios from 'axios';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';



export default function Dashboard() {

    const [totalIncome, setTotalIncome] = useState(0);
    const [clients, setClients] = useState(0);
    const [currentMonthlyAppointments, setcurrentMonthlyAppointments] = useState(0);
    const [deposits, setDeposits] = useState(0);
    const [totalMonthlyAppointments, setTotalMonthlyAppointments] = useState([]);
    const [facesPerAppointment, setFacesPerAppointment] = useState([]);

    useEffect(() => {
        getTotalIncome();
        getTotalClients();
        getTotalMonthlyAppointments();
        getCurrentMonthlyAppointments();
        getCurrentMonthlyDeposits();
        getCurrentMonthlyFacesPerAppointment();
    }, [])


    const getTotalIncome = async () => {
        const { data } = await axios.get('/api/dashboard/gettotalincome')
        setTotalIncome(data[0].totalAmount);
    }

    const getTotalClients = async () => {
        const { data } = await axios.get('/api/dashboard/gettotalclients')
        setClients(data);
    }

    const getTotalMonthlyAppointments = async () => {
        const { data } = await axios.get('/api/dashboard/totalmonthlyappointments')
        setTotalMonthlyAppointments(data);
    }

    const getCurrentMonthlyAppointments = async () => {
        const { data } = await axios.get('/api/dashboard/currentmonthappointments')
        setcurrentMonthlyAppointments(data[0].monthlyAppointments);
    }

    const getCurrentMonthlyDeposits = async () => {
        const { data } = await axios.get('/api/dashboard/monthlydeposits')
        setDeposits(data[0].deposits);
    }

    const getCurrentMonthlyFacesPerAppointment = async () => {
        const { data } = await axios.get('/api/dashboard/facesperappointment')
        setFacesPerAppointment(data);
    }

    const DollarSign = ({ size = 42, color = "#207bdc" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>);
    const Users = ({ size = 42, color = "#51dc20" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);
    const Calendar = ({ size = 46, color = "#76babd" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>);

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const months = totalMonthlyAppointments.map(i => i.month);
    const counts = totalMonthlyAppointments.map(i => i.appointmentCount)

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Appointments per month',
                data: counts,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18,
                    },
                },
            },
        },

    };

    const pieData1 = [
        { label: 'Group A', value: 400, color: '#0088FE' },
        { label: 'Group B', value: 300, color: '#00C49F' },
        { label: 'Group C', value: 300, color: '#FFBB28' },
        { label: 'Group D', value: 200, color: '#FF8042' },
    ];

    const pieData = facesPerAppointment.map((i, faces) => {
        const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

        return {
            label: `${i.facesPerAppointment} Faces`, // Label for pie chart segment
            value: i.appointments, // Value from appointments
            color: colors[faces % colors.length],
        }
    });

    const sizing = {
        margin: { right: 5 },
        width: 300,
        height: 300,
        legend: { hidden: true,},
    };
    const TOTAL = pieData.map((i) => i.value).reduce((a, b) => a + b, 0);

    const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };


    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Box p={2}>
                    <Card sx={{ borderRadius: 10, display: 'flex', flexDirection: 'column', width: 300, height: 200 }} elevation={3}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography variant='h6' color="text.secondary" gutterBottom>
                                    Total Income
                                </Typography>
                                <Typography variant='h3'  >
                                    ${totalIncome}
                                </Typography>
                                <br />
                                <Typography>
                                    <NorthRoundedIcon sx={{ color: 'blue' }} />
                                    12% from last month
                                </Typography>
                            </Box>
                            <CardMedia sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2, mb: 10 }}>
                                <DollarSign />
                            </CardMedia>
                        </CardContent>
                    </Card>
                </Box>
                <Box p={2}>
                    <Card sx={{ borderRadius: 10, display: 'flex', flexDirection: 'column', width: 300, height: 200 }} elevation={3}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography variant='h6' color="text.secondary" gutterBottom>
                                    Clients
                                </Typography>
                                <Typography variant='h3' >
                                    {clients}
                                </Typography>
                            </Box>
                            <CardMedia sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2, }}>
                                <Users />
                            </CardMedia>
                        </CardContent>
                        <Typography variant="h5"></Typography>
                    </Card>
                </Box>
                <Box p={2}>
                    <Card sx={{ borderRadius: 10, display: 'flex', flexDirection: 'column', width: 300, height: 200 }} elevation={3}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography variant='h6' color="text.secondary" gutterBottom>
                                    Appointments
                                </Typography>
                                <Typography variant='h3' >
                                    {currentMonthlyAppointments}
                                </Typography>
                            </Box>
                            <CardMedia sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2, }}>
                                <Calendar />
                            </CardMedia>
                        </CardContent>
                        <Typography variant="h5"></Typography>
                    </Card>
                </Box>
                <Box p={2}>
                    <Card sx={{ borderRadius: 10, display: 'flex', flexDirection: 'column', width: 300, height: 200 }} elevation={3}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography variant='h6' color="text.secondary" gutterBottom>
                                    Deposits
                                </Typography>
                                <Typography variant='h3' >
                                    ${deposits}
                                </Typography>
                            </Box>
                            <CardMedia sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2, }}>
                                <DollarSign />
                            </CardMedia>
                        </CardContent>
                        <Typography variant="h5"></Typography>
                    </Card>
                </Box>
            </Box>


            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box p={2}>
                    <Card sx={{ borderRadius: 10, display: 'flex', flexDirection: 'column', height: 600, width: 900 }} elevation={3}>
                        <CardContent sx={{ mt: 14 }}>
                            <Bar data={data} options={options} />
                        </CardContent>
                    </Card>
                </Box>
                <Box p={2} sx={{ flexGrow: 1 }}>
                    <Card sx={{ borderRadius: 10, display: 'flex', flexDirection: 'column', height: 600, width: 415 }} elevation={3}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 10 }}>
                           <Typography variant='h5' gutterBottom>
                            Faces Per Appointment
                           </Typography>
                           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <PieChart
                                series={[
                                    {
                                        outerRadius: 150,
                                        data: pieData,
                                        arcLabel: getArcLabel,
                                        legend: {positon: 'bottom'}
                                    },
                                ]}
                                sx={{
                                    [`& .${pieArcLabelClasses.root}`]: {
                                        fill: 'white',
                                        fontSize: 25,
                                    },
                                }}
                                {...sizing}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
      {pieData.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          <Box sx={{ width: 5, height: 10, backgroundColor: item.color, marginRight: 1 }} />
          <Typography variant="body2">{item.label}</Typography>
        </Box>
      ))}
    </Box>
    </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

        </Container>

    );
}

