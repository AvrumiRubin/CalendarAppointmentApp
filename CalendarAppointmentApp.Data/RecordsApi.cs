using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace CalendarAppointmentApp.Data
{
    public class RecordsApi
    {
        private readonly string _connectionString;

        public RecordsApi(string connectionString)
        {
            _connectionString = connectionString;
        }


        public List<Appointment> GetAppointments()
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Appointments.Include(p => p.Person).ToList();
        } 

        public List<Appointment> GetPastRecords()
        {
            var appointments = GetAppointments();
            List<Appointment> records = new List<Appointment>();
            for(int i = 0; i < appointments.Count; i++)
            {
                if(appointments[i].DateTime < DateTime.Now)
                {
                    records.Add(appointments[i]);
                }               
            }
  
            return records;
        }

        public void UpdateAppointment(Appointment appointment)
        {
            using var context = new AppointmentContext(_connectionString);
            var existingAppointment = context.Appointments.Find(appointment.Id);
                

            if (existingAppointment != null)
            {
                if (appointment.Status != null)
                {
                    existingAppointment.Status = appointment.Status;
                }
                if (appointment.Amount != default)
                {
                    existingAppointment.Amount = appointment.Amount;
                }
                if (appointment.PaymentType != null)
                {
                    existingAppointment.PaymentType = appointment.PaymentType;
                }
            }
            
            context.SaveChanges();
        }
    }
}
