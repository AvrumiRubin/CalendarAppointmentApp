using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarAppointmentApp.Data
{
    public class PersonRepo
    {
        private readonly string _connectionString;

        public PersonRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddPerson(Person person)
        {
            using var context = new AppointmentContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public List<Person> GetPeople()
        {
            using var context = new AppointmentContext(_connectionString);
            return context.People.ToList();
        }

        public void UpdatePerson(int id, string name, string phoneNumber)
        {
            using var context = new AppointmentContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"Update People set Name = {name}, PhoneNumber = {phoneNumber} Where Id = {id}");
            context.SaveChanges();
        }

        public void DeletePerson(int id)
        {
            using var context = new AppointmentContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"Delete from People Where Id = {id}");
            context.SaveChanges();
        }

    }
}
