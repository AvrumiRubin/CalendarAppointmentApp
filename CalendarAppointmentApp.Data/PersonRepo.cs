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

        public void AddPerson(Person person, User user)
        {
            using var context = new AppointmentContext(_connectionString);
            person.UserId = user.Id;
            if (user == null)
            {
                throw new UnauthorizedAccessException("You are not authorized to add a new client.");
            }

            context.People.Add(person);
            context.SaveChanges();
        }

        public List<Person> GetPeople(int userId)
        {
            using var context = new AppointmentContext(_connectionString);
            return context.People.Where(p => p.UserId == userId).ToList();
        }

        public void UpdatePerson(Person person, int userId)
        {
            using var context = new AppointmentContext(_connectionString);
            var existingPerson = context.People.FirstOrDefault(p => p.Id == person.Id && p.UserId == userId);
            if (existingPerson == null)
            {
                throw new UnauthorizedAccessException("User is not authorized to update this person");
            }

            existingPerson.Name = person.Name;
            existingPerson.PhoneNumber = person.PhoneNumber;
            //context.Database.ExecuteSqlInterpolated($"Update People set Name = {person.Name}, PhoneNumber = {person.PhoneNumber} Where Id = {person.Id} and UserId = {userId}");
            //context.Entry(person).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.SaveChanges();
        }

        public void DeletePerson(Person person, int userId)
        {
            using var context = new AppointmentContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"Delete from People Where Id = {person.Id} and UserId = {userId}");
            context.SaveChanges();
        }

    }
}
