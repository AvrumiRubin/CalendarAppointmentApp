import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Calendar from "./Calendar";
import Appointments from "./Appointments";
import Clients from "./Clients";
import Dashboard from "./Dashboard";
import Records from "./Records";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { AuthContextComponent } from "./AuthContext";
import Logout from "./Logout";
import Home from "./Home";


const RoutePage = () => {

    return (

        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route exact path="/" element={< Home />} />
                    <Route path="/signup" element={< Signup />} />
                    <Route path="/login" element={< Login />} />
                    <Route path="/logout" element={< Logout />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/records" element={<Records />} />
                </Routes>
            </Layout>
        </AuthContextComponent>


    );
}

export default RoutePage;