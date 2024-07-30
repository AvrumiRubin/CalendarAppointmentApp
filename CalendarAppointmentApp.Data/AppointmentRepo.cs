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

        public List<Calculations> GetMonthlyAmount()
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Calculations.FromSqlRaw("EXEC dbo.CalculateMonthlyAmount").ToList();           
        }

    }
}
