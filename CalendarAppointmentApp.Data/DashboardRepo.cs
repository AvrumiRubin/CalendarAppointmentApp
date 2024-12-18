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
    public class DashboardRepo
    {
        private readonly string _connectionString;

        public DashboardRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Dashboard.CalculatedMonthlyAmount> GetMonthlyAmount(int userId)
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<Dashboard.CalculatedMonthlyAmount>().FromSqlRaw($"EXEC dbo.CalculateMonthlyAmount @UserId = {userId}").ToList();
        }

        public List<Dashboard.TotalIncomeForYear> GetTotalIncomeForYear(int userId)
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<Dashboard.TotalIncomeForYear>().FromSqlRaw($"EXEC dbo.GetTotalIncomeForYear @UserId = {userId}").ToList();
        }

        public int GetTotalClients(int userId)
        {
            using var context = new AppointmentContext(_connectionString);
            //var result = context.Database.ExecuteSqlRaw("SELECT COUNT(*) FROM People");
            //return result;
            return context.People.Where(p => p.UserId == userId).Count();
        }

        public List<Dashboard.TotalMonthlyAppointments> GetTotalMonthlyAppointments(int userId)
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<Dashboard.TotalMonthlyAppointments>().FromSqlRaw($"EXEC dbo.GetMonthlyAppointmentCounts @UserId = {userId}").ToList();
        }

        public List<Dashboard.GetCurrentMonthsAppointments> GetCurrentMonthsAppointments(int userId)
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<Dashboard.GetCurrentMonthsAppointments>().FromSqlRaw($"EXEC dbo.GetCurrentMonthlyAppointments @UserId = {userId}").ToList();
        }

        //public List<Dashboard.MonthlyDeposits> GetMonthlyDeposits()
        //{
        //    using var context = new AppointmentContext(_connectionString);
        //    return context.Set<Dashboard.MonthlyDeposits>().FromSqlRaw("EXEC dbo.DepositsReceivedThisMonth").ToList();
        //}

        public List<Dashboard.MonthlyFacesPerAppointment> GetMonthlyFacesPerAppointments(int userId)
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<Dashboard.MonthlyFacesPerAppointment>().FromSqlRaw($"EXEC dbo.MonthlyFacesPerAppointment @UserId = {userId}").ToList();
        }
    }
}
