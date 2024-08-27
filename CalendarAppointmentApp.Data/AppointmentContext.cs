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
        public DbSet<Dashboard> Dashboards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Dashboard>().HasNoKey();
            modelBuilder.Entity<Dashboard.CalculatedMonthlyAmount>().HasNoKey();
            modelBuilder.Entity<Dashboard.TotalIncome>().HasNoKey();
            modelBuilder.Entity<Dashboard.TotalMonthlyAppointments>().HasNoKey();
            modelBuilder.Entity<Dashboard.GetCurrentMonthsAppointments>().HasNoKey();
            modelBuilder.Entity<Dashboard.MonthlyDeposits>().HasNoKey();
            modelBuilder.Entity<Dashboard.MonthlyFacesPerAppointment>().HasNoKey();
        }
    }
}
