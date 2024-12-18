import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const AddUser = async () => {
        await axios.post('/api/account/signup', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
        navigate('/login')
    }


    return (
        <Container maxWidth="sm" sx={{ minHeight: "80vh", display: "flex", alignItems: "center" }} >
            <Paper elevation={3} style={{ padding: "24px", width: "100%", borderRadius: "8px" }} >
                <Typography variant="h5" component="h3" gutterBottom>
                    Sign up for a new account
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

                    <TextField label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)}/>

                    <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>

                        <Button color="primary" variant="contained" onClick={AddUser}>
                            Sign Up
                        </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default Signup;

