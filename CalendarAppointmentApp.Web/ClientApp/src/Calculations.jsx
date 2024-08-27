import React,{useEffect, useState} from "react";
import axios from "axios";


const Calculations = () => {

    const [data, setData] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/dashboard/getmonthlyamount');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        getAppointments();
        getTotal();
        fetchData();
    }, []);

    const getAppointments = async () => {
        const {data} = await axios.get('/api/appointments/getappointments')
        setAppointments(data);
    }

    const getTotal = async () => {
        const {data} = await axios.get('/api/dashboard/gettotalincome')
        setTotal(data);
    }

    const calculateAllAppointmentAmounts = () => {
        const total = [];
        appointments.forEach(appointment => {
            total.push(appointment.amount);           
        });        
       setTotalAmount(total.reduce((acc, num) => acc + num, 0));
    }

    
    return (
        <div>
            <h1>Appointment Summaries</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        {item.year}, {item.month}, {item.monthlyAmount}
                    </li>
                ))}
            </ul>
            {<button onClick={calculateAllAppointmentAmounts}>hi</button>}
            <div>
            <h1>sum{totalAmount}</h1>
            <ul>
                {total.map((total,id) => (
                    <li key={id}>
                        {total.totalAmount}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );


}

export default Calculations;