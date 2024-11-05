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

        public void AddAppointment(Appointment appointment)
        {
            using var context = new AppointmentContext(_connectionString);
            context.Appointments.Add(appointment);
            context.SaveChanges();
        }

        public List<Appointment> GetAppointments()
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Appointments.Include(p => p.Person).ToList();
        }

        public void UpdateAppointment(Appointment appointment)
        {
            using var context = new AppointmentContext(_connectionString);
            context.Appointments.Update(appointment);
            context.Entry(appointment).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.SaveChanges();
        }

        public void DeleteAppointment(int id)
        {
            using var context = new AppointmentContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"Delete from Appointments Where Id = {id}");
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
