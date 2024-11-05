import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyCalendar from "./MyCalendar";
import Layout from "./components/Layout";
import Calendar from "./Calendar";
import Appointments from "./Appointments";
import Clients from "./Clients";
import Dashboard from "./Dashboard";
import Records from "./Records";


const RoutePage = () => {

    return (

        <Router>
            <Layout>
                <Routes>
                    <Route path="/mycalendar" element={<MyCalendar />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/records" element={<Records />} />
                </Routes>
            </Layout>
        </Router>


    );
}

export default RoutePage;