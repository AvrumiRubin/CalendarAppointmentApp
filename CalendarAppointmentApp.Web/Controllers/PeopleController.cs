using CalendarAppointmentApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalendarAppointmentApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var user = GetCurrentUser();
            var repo = new PersonRepo(_connectionString);           
            repo.AddPerson(person, user);
        }

        [HttpGet]
        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var user = GetCurrentUser();
            var repo = new PersonRepo(_connectionString);
            return repo.GetPeople(user.Id);
        }

        [HttpPost]
        [Route("updateperson")]
        public void UpdatePerson(Person person)
        {
            var user = GetCurrentUser();
            var repo = new PersonRepo(_connectionString);           
            repo.UpdatePerson(person, user.Id);
        }

        [HttpPost]
        [Route("deleteperson")]
        public void DeletePerson(Person person)
        {
            var user = GetCurrentUser();
            var repo = new PersonRepo(_connectionString);
            repo.DeletePerson(person, user.Id);
        }

        private User GetCurrentUser()
        {
            var userRepo = new UserRepo(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            return user;
        }

    }
}
