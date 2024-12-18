import React, { useState } from "react";
import { Box, Button, Container, Link, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidLogin, setisValidLogin] = useState(true);
    const { setUser } = useAuth();

    const navigate = useNavigate();

    const LoginUser = async () => {
        const { data } = await axios.post('/api/account/login', {
            email: email,
            password: password
        });
        const isValidLogin = !!data;
        setUser(data);
        setisValidLogin(isValidLogin);
        navigate('/dashboard')
    }






    return (
        <Container maxWidth='sm' sx={{ minHeight: "80vh", display: "flex", alignItems: 'center' }}>
            <Paper elevation={3} sx={{ padding: "24px", width: "100%", borderRadius: "8px" }}>
                <Typography variant="h5" component='h3' gutterBottom>
                    Login to your account
                </Typography>
                <Box display="flex" flexDirection='column' gap={2}>
                    {!isValidLogin &&  'hi'}
                    <TextField label='Email' value={email} type="text" onChange={(e) => setEmail(e.target.value)} />

                    <TextField label='Password' value={password} type="password" onChange={(e) => setPassword(e.target.value)} />

                    <Button variant="contained" color="primary" onClick={LoginUser}>
                        Login
                    </Button>
                    <Link href='/signup'>Sign up for a new account</Link>
                </Box>
            </Paper>
        </Container>

    )
}

export default Login;
