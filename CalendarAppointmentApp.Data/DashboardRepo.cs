using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarAppointmentApp.Data
{
    public class DashboardRepo
    {
        private readonly string _connectionString;

        public DashboardRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Dashboard.CalculatedMonthlyAmount> GetMonthlyAmount()
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<Dashboard.CalculatedMonthlyAmount>().FromSqlRaw("EXEC dbo.CalculateMonthlyAmount").ToList();
        }

        public List<Dashboard.TotalIncome> GetTotalIncome()
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<Dashboard.TotalIncome>().FromSqlRaw("EXEC dbo.GetTotalIncomeforYear").ToList();
        }

        public int GetTotalClients()
        {
            using var context = new AppointmentContext(_connectionString);
            //var result = context.Database.ExecuteSqlRaw("SELECT COUNT(*) FROM People");
            //return result;
            return context.People.Count();
        }

        public List<Dashboard.TotalMonthlyAppointments> GetTotalMonthlyAppointments()
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<Dashboard.TotalMonthlyAppointments>().FromSqlRaw("EXEC dbo.GetMonthlyAppointmentCounts").ToList();
        }

        public List<Dashboard.GetCurrentMonthsAppointments> GetCurrentMonthsAppointments()
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<Dashboard.GetCurrentMonthsAppointments>().FromSqlRaw("EXEC dbo.GetCurrentMonthlyAppointments").ToList();
        }

        public List<Dashboard.MonthlyDeposits> GetMonthlyDeposits()
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<Dashboard.MonthlyDeposits>().FromSqlRaw("EXEC dbo.DepositsReceivedThisMonth").ToList();
        }

        public List<Dashboard.MonthlyFacesPerAppointment> GetMonthlyFacesPerAppointments()
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<Dashboard.MonthlyFacesPerAppointment>().FromSqlRaw("EXEC dbo.MonthlyFacesPerAppointment").ToList();
        }
    }
}
