using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarAppointmentApp.Data
{
    [NotMapped]
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

        public class MonthlyFacesPerAppointment
        {
            public int Appointments { get; set; }
            public int FacesPerAppointment { get; set; }
        }

    }
}
