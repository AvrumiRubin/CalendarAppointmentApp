using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace CalendarAppointmentApp.Data
{
    public class AppointmentContext : DbContext
    {
        private readonly string _connectionString;

        public AppointmentContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Person> People { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Dashboard.CalculatedMonthlyAmount> CalculatedMonthlyAmounts { get; set; }
        public DbSet<Dashboard.TotalIncomeForYear> TotalIncomesForYear { get; set; }
        public DbSet<Dashboard.TotalMonthlyAppointments> TotalMonthlyAppointments { get; set; }
        public DbSet<Dashboard.GetCurrentMonthsAppointments> GetCurrentMonthsAppointments { get; set; }
        public DbSet<Dashboard.MonthlyFacesPerAppointment> MonthlyFacesPerAppointments { get; set; }
        public DbSet<DashboardApi.MonthlyDeposits> MonthlyDeposits { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
            modelBuilder.Entity<Dashboard.CalculatedMonthlyAmount>().HasNoKey();
            modelBuilder.Entity<Dashboard.TotalIncomeForYear>().HasNoKey();
            modelBuilder.Entity<Dashboard.TotalMonthlyAppointments>().HasNoKey();
            modelBuilder.Entity<Dashboard.GetCurrentMonthsAppointments>().HasNoKey();
            modelBuilder.Entity<Dashboard.MonthlyFacesPerAppointment>().HasNoKey();
            modelBuilder.Entity<DashboardApi.MonthlyDeposits>().HasNoKey();
        }

        public async Task AddNewObjectAsync<T>(T newObject) where T : class
        {
            var entries = this.ChangeTracker.Entries()
                .Where(e => e.Metadata.FindPrimaryKey() ==null).ToList();
            foreach(var entry in entries)
            {
                entry.State = EntityState.Detached;
            }

            this.Add(newObject);
            await this.SaveChangesAsync();
        }
    }
}
