using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarAppointmentApp.Data
{
    public class Appointment
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public DateTime DateTime {get;set;}
        public int Faces { get; set; }
        public decimal Amount { get; set; }
        public decimal Deposit { get; set; }

        public Person Person { get; set; }
    }
}
