using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarAppointmentApp.Data
{
    public class AppointmentRepo
    {
        private readonly string _connectionString;

        public AppointmentRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddAppointment(Appointment appointment, User user)
        {
            using var context = new AppointmentContext(_connectionString);
            var person = context.People.FirstOrDefault(p => p.Id == appointment.PersonId && p.UserId == user.Id);

            if (person == null)
            {
                throw new UnauthorizedAccessException("You are not authorized to add an appointment for this person.");
            }
            context.Appointments.Add(appointment);
            context.SaveChanges();
        }

        public List<Appointment> GetAppointments(User user)
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Appointments.Include(p => p.Person).Where(a => a.Person.UserId == user.Id).ToList();
        }

        public void UpdateAppointment(Appointment appointment, User user)
        {
            using var context = new AppointmentContext(_connectionString);
            var existingAppointment = context.Appointments.Include(a => a.Person).FirstOrDefault(a => a.Id == appointment.Id && a.Person.UserId == user.Id);
            if (existingAppointment == null)
            {
                throw new UnauthorizedAccessException("You are not authorized to update this appointment.");
            }
            existingAppointment.DateTime = appointment.DateTime != default ? appointment.DateTime : existingAppointment.DateTime;
            existingAppointment.Faces = appointment.Faces != default ? appointment.Faces : existingAppointment.Faces;
            existingAppointment.Amount = appointment.Amount != default ? appointment.Amount : existingAppointment.Amount;
            existingAppointment.Deposit = appointment.Deposit != default ? appointment.Deposit : existingAppointment.Deposit;
            existingAppointment.Status = appointment.Status != default ? appointment.Status : existingAppointment.Status;
            existingAppointment.PaymentType = appointment.PaymentType != default ? appointment.PaymentType : existingAppointment.PaymentType;

            //context.Appointments.Update(appointment);
            //context.Entry(appointment).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.SaveChanges();
        }

        public void DeleteAppointment(Appointment appointment, User user)
        {
            using var context = new AppointmentContext(_connectionString);
            var appointmentToDelete = context.Appointments.Include(a => a.Person).FirstOrDefault(a => a.Id == appointment.Id && a.Person.UserId == user.Id);
            if (appointmentToDelete == null)
            {
                throw new UnauthorizedAccessException("You are not authorized to delete this appointment.");
            }
            //context.Appointments.Remove(appointmentToDelete);

            context.Database.ExecuteSqlInterpolated($"Delete from Appointments Where Id = {appointment.Id} AND PersonId IN (SELECT Id FROM People WHERE UserId = {user.Id})");
        }

        public List<string> GetListDepositType()
        {
            return Enum.GetNames(typeof(DepositType)).ToList();
        }

        public List<string> GetListPaymentType()
        {
            return Enum.GetNames(typeof(PaymentType)).ToList();
        }
    }
}
