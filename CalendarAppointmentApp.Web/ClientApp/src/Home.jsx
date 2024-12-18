import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const Home = () => {


    return(
        <Container maxWidth="xl" sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', height: "80vh", alignItems: "center", textAlign: 'center'}}>
            <Typography variant="h2" component='h4' color='#5c6bc0' gutterBottom>
            Welcome To The MakeUp Appointment App
            </Typography>
            <Box sx={{margin: '20px 0'}}>      
            <Button variant="contained" component={Link} to="signup" style={{width: '250px', height: '40px'}} sx={{margin: '0 10px'}}>
                Signup
            </Button>
            <Button size="" variant="contained" component={Link} to='login' style={{width: '250px', height: '40px'}} sx={{margin: '0 10px'}} >
                Login
            </Button>
            </Box>
            
                
            
            
        </Container>
        

    )
}

export default Home;