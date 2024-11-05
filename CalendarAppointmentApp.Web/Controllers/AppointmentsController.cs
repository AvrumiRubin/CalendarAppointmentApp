using CalendarAppointmentApp.Data;
using CalendarAppointmentApp.Data.Migrations;
using CalendarAppointmentApp.Web.Pages.ViewModels;
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

        [HttpPost]
        [Route("updateappointment")]
        public void Update(Appointment appointment)
        {
            var repo = new AppointmentRepo(_connectionString);
            repo.UpdateAppointment(appointment);
        }

        [HttpPost]
        [Route("deleteappointment")]
        public void Delete(DeleteAppointmentViewModel vm)
        {
            var repo = new AppointmentRepo(_connectionString);
            repo.DeleteAppointment(vm.Id);
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
    }
}
