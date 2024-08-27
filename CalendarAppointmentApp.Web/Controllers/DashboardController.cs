using CalendarAppointmentApp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalendarAppointmentApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly string _connectionString;

        public DashboardController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getmonthlyamount")]
        public List<Dashboard.CalculatedMonthlyAmount> GetMonthlyAmount()
        {
            var repo = new DashboardRepo(_connectionString);
            return repo.GetMonthlyAmount();
        }

        [HttpGet]
        [Route("gettotalincome")]
        public List<Dashboard.TotalIncome> GetTotalIncome()
        {
            var repo = new DashboardRepo(_connectionString);
            return repo.GetTotalIncome();
        }

        [HttpGet]
        [Route("gettotalclients")]
        public int GetTotalClients()
        {
            var repo = new DashboardRepo(_connectionString);
            return repo.GetTotalClients();
        }

        [HttpGet]
        [Route("totalmonthlyappointments")]
        public List<Dashboard.TotalMonthlyAppointments> TotalMonthlyAppointments()
        {
            var repo = new DashboardRepo(_connectionString);
            return repo.GetTotalMonthlyAppointments();
        }

        [HttpGet]
        [Route("currentmonthappointments")]
        public List<Dashboard.GetCurrentMonthsAppointments> GetCurrentMonthsAppointments()
        {
            var repo = new DashboardRepo(_connectionString);
            return repo.GetCurrentMonthsAppointments();
        }

        [HttpGet]
        [Route("monthlydeposits")]
        public List<Dashboard.MonthlyDeposits> GetMonthlyFaces()
        {
            var repo = new DashboardRepo(_connectionString);
            return repo.GetMonthlyDeposits();
        }

        [HttpGet]
        [Route("facesperappointment")]
        public List<Dashboard.MonthlyFacesPerAppointment> GetFacesPerAppointments()
        {
            var repo = new DashboardRepo(_connectionString);
            return repo.GetMonthlyFacesPerAppointments();
        }
    }
}
