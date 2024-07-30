using CalendarAppointmentApp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalendarAppointmentApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            var repo = new AppointmentRepo(_connectionString);
            repo.AddAppointment(appointment);
        }

        [HttpGet]
        [Route("getappointments")]
        public List<Appointment> GetPeople()
        {
            var repo = new AppointmentRepo(_connectionString);
            return repo.GetAppointments();
        }

        [HttpGet]
        [Route("getmonthlyamount")]
        public List<Calculations> GetMonthlyAmount()
        {
            var repo = new AppointmentRepo(_connectionString);
            return repo.GetMonthlyAmount();
        }
         
    }
}
