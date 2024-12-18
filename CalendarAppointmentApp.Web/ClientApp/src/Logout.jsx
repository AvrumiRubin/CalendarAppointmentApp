import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Logout = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();


    const doLogout = async () => {
        await axios.post('/api/account/logout');
        setUser(null);
        navigate('/')
    }
    useEffect(() => {
        doLogout();
    }, []);

    return (<></>)
}

export default Logout;