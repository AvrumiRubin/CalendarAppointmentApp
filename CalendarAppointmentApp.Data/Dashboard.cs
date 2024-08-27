using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarAppointmentApp.Data
{
    public class Dashboard
    {
        
        public class CalculatedMonthlyAmount
    {            
        public int Year { get; set; }
        public string Month { get; set; }
        public decimal MonthlyAmount { get; set; }
    }
        
        public class TotalIncome
    {
        public decimal TotalAmount { get; set; }
    }
    
        public class TotalClient
    {
            public int TotalClients { get; set; }
    }

        public class TotalMonthlyAppointments
        {
            public int Year { get; set; }
            public string Month { get; set; }
            public int AppointmentCount { get; set; }
        }

        public class GetCurrentMonthsAppointments
        {
            public int MonthlyAppointments { get; set; }
        }

        public class MonthlyDeposits
        {
            public decimal Deposits { get; set; }
        }

        public class MonthlyFacesPerAppointment
        {
            public int Appointments { get; set; }
            public int FacesPerAppointment { get; set; }
        }

    }
}
