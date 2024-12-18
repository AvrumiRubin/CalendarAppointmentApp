using CalendarAppointmentApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalendarAppointmentApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RecordsController : ControllerBase
    {
        private readonly string _connectionString;

        public RecordsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getrecords")]
        public List<Appointment> GetRecords()
        {
            var user = GetCurrentUser();
            var repo = new RecordsApi(_connectionString);
            return repo.GetPastRecords(user);
        }

        [HttpPost]
        [Route("updaterecord")]
        public void UpdateRecord(Appointment appointment)
        {
            var user = GetCurrentUser();
            var repo = new RecordsApi(_connectionString);
            repo.UpdateAppointment(appointment, user);
        }

        private User GetCurrentUser()
        {
            var userRepo = new UserRepo(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            if (user == null)
            {
                throw new UnauthorizedAccessException("User is not Authenticated");
            }
            return user;
        }

    }
}
