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


        public List<Appointment> GetAppointments(User user)
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Appointments.Include(p => p.Person).Where(p => p.Person.UserId == user.Id).ToList();
        } 

        public List<Appointment> GetPastRecords(User user)
        {
            var appointments = GetAppointments(user);
            List<Appointment> records = new();
            for(int i = 0; i < appointments.Count; i++)
            {
                if(appointments[i].DateTime < DateTime.Now)
                {
                    records.Add(appointments[i]);
                }               
            }
  
            return records;
        }

        public void UpdateAppointment(Appointment appointment, User user)
        {
            using var context = new AppointmentContext(_connectionString);
            var existingAppointment = context.Appointments.Include(a => a.Person).FirstOrDefault(a => a.Id == appointment.Id && a.Person.UserId == user.Id);
                

            if (existingAppointment != null)
            {
                if (appointment.Status != default)
                {
                    existingAppointment.Status = appointment.Status;
                }
                if (appointment.Amount != default)
                {
                    existingAppointment.Amount = appointment.Amount;
                }
                if (appointment.PaymentType != default)
                {
                    existingAppointment.PaymentType = appointment.PaymentType;
                }
                else
                {
                    throw new UnauthorizedAccessException("You are not authorized to update this appointment.");
                }
            }
            
            context.SaveChanges();
        }
    }
}
