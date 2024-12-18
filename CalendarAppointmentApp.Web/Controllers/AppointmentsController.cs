using CalendarAppointmentApp.Data;
using CalendarAppointmentApp.Data.Migrations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalendarAppointmentApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AppointmentsController : ControllerBase
    {
        private readonly string _connectionString;

        public AppointmentsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addappointment")]
        public void AddAppointment(Appointment appointment)
        {
            var user = GetCurrentUser();
            var repo = new AppointmentRepo(_connectionString);
            repo.AddAppointment(appointment, user);
        }

        [HttpGet]
        [Route("getappointments")]
        public List<Appointment> GetAppointments()
        {
            var user = GetCurrentUser();
            var repo = new AppointmentRepo(_connectionString);
            return repo.GetAppointments(user);
        }

        [HttpPost]
        [Route("updateappointment")]
        public void Update(Appointment appointment)
        {
            var user = GetCurrentUser();
            var repo = new AppointmentRepo(_connectionString);
            repo.UpdateAppointment(appointment, user);
        }

        [HttpPost]
        [Route("deleteappointment")]
        public void Delete(Appointment appointment)
        {
            var user = GetCurrentUser();
            var repo = new AppointmentRepo(_connectionString);
            repo.DeleteAppointment(appointment, user);
        }

        [HttpGet]
        [Route("getlistdeposittype")]
        public List<string> GetListDepositTypes()
        {
            var repo = new AppointmentRepo(_connectionString);
            return repo.GetListDepositType();
        }

        [HttpGet]
        [Route("getlistpaymenttype")]
        public List<string> GetListPaymentTypes()
        {
            var repo = new AppointmentRepo(_connectionString);
            return repo.GetListPaymentType();
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
