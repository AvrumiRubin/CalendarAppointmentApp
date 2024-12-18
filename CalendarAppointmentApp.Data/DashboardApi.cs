using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarAppointmentApp.Data
{
    public class DashboardApi
    {
        private readonly string _connectionString;

        public DashboardApi(string connectionString)
        {
            _connectionString = connectionString;
        }
        public class MonthlyDeposits
        {
            public decimal Deposits { get; set; }
        }

        public List<MonthlyDeposits> GetMonthlyDeposits(User user)
        {
            using var context = new AppointmentContext(_connectionString);
            return context.Set<MonthlyDeposits>().FromSqlRaw($"EXEC dbo.DepositsReceivedThisMonth @UserId = {user.Id}").ToList();
        }

        public decimal GetTotalDeposits(User user)
        {
            var deposits = GetMonthlyDeposits(user);
            //decimal totalDeposit = 0;
            //for (int i = 0; i < deposits.Count; i++)
            //{
            //    totalDeposit += deposits[i].Deposits;
            //}
            //return totalDeposit;
            return deposits.Sum(d => d.Deposits);
        }
    }
}
