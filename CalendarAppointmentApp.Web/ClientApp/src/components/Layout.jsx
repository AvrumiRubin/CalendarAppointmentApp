import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ flexBasis: '200px' }}>
                            <Typography variant="h6" component="div">
                                Appointments App
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                            <Button color="inherit" component={Link} to="/mycalendar">Test</Button>
                            <Button color="inherit" component={Link} to="/calendar">Calendar</Button> 
                            <Button color="inherit" component={Link} to="/appointments">Appointments</Button>
                            <Button color="inherit" component={Link} to="/clients">Clients</Button>
                            <Button color="inherit" component={Link} to="/calculations">Calculations</Button>
                            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>                         
                        </Box>
                        <Box sx={{ flexBasis: '200px' }} />
                    </Toolbar>
                </AppBar>
            </Box>
            {children}
        </>
    )
}

export default Layout;