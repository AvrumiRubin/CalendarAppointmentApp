using CalendarAppointmentApp.Data;
using CalendarAppointmentApp.Web.Pages.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalendarAppointmentApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            var repo = new PersonRepo(_connectionString);           
            repo.AddPerson(person);
        }

        [HttpGet]
        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var repo = new PersonRepo(_connectionString);
            return repo.GetPeople();
        }

        [HttpPost]
        [Route("updateperson")]
        public void UpdatePerson(UpdatePersonViewModel vm)
        {
            var repo = new PersonRepo(_connectionString);           
            repo.UpdatePerson(vm.Id, vm.Name, vm.PhoneNumber);
        }

        [HttpPost]
        [Route("deleteperson")]
        public void DeletePerson(DeletePersonViewModel vm)
        {
            var repo = new PersonRepo(_connectionString);
            repo.DeletePerson(vm.Id);
        }

    }
}
