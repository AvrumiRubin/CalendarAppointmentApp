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
        public Status Status { get; set; }
        public PaymentType PaymentType { get; set; }
        public DepositType DepositType { get; set; }
        public DateTime DepositDate { get; set; }

        public Person Person { get; set; }
    }
}
