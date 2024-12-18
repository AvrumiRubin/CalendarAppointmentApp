import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Layout = ({ children }) => {
    const { user } = useAuth();
    const isLoggedIn = !!user;
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ flexBasis: '200px' }}>
                            <Button variant="h6" component={Link} to="/">
                                Appointments App
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                             {isLoggedIn && <Button color="inherit" component={Link} to="/calendar">Calendar</Button>}
                            {isLoggedIn && <Button color="inherit" component={Link} to="/appointments">Appointments</Button>}
                            {isLoggedIn && <Button color="inherit" component={Link} to="/clients">Clients</Button>}
                            {isLoggedIn && <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>}
                            {isLoggedIn && <Button color='inherit' component={Link} to="/records">Records</Button>}
                             {!isLoggedIn && <Button color='inherit' component={Link} to="/signup">Signup</Button>}
                            {!isLoggedIn && <Button color='inherit' component={Link} to="/login">Login</Button>}
                             {isLoggedIn && <Button color='inherit' component={Link} to="/logout">Logout</Button>}
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