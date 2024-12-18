using CalendarAppointmentApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalendarAppointmentApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
            var user = GetCurrentUser();
            var repo = new DashboardRepo(_connectionString);
            return repo.GetMonthlyAmount(user.Id);
        }

        [HttpGet]
        [Route("gettotalincome")]
        public List<Dashboard.TotalIncomeForYear> GetTotalIncome()
        {
            var user = GetCurrentUser();
            var repo = new DashboardRepo(_connectionString);
            return repo.GetTotalIncomeForYear(user.Id);
        }

        [HttpGet]
        [Route("gettotalclients")]
        public int GetTotalClients()
        {
            var user = GetCurrentUser();
            var repo = new DashboardRepo(_connectionString);
            return repo.GetTotalClients(user.Id);
        }

        [HttpGet]
        [Route("totalmonthlyappointments")]
        public List<Dashboard.TotalMonthlyAppointments> TotalMonthlyAppointments()
        {
            var user = GetCurrentUser();
            var repo = new DashboardRepo(_connectionString);
            return repo.GetTotalMonthlyAppointments(user.Id);
        }

        [HttpGet]
        [Route("currentmonthappointments")]
        public List<Dashboard.GetCurrentMonthsAppointments> GetCurrentMonthsAppointments()
        {
            var user = GetCurrentUser();
            var repo = new DashboardRepo(_connectionString);
            return repo.GetCurrentMonthsAppointments(user.Id);
        }

        //[HttpGet]
        //[Route("monthlydepositss")]
        //public List<Dashboard.MonthlyDeposits> GetMonthlyFaces()
        //{
        //    var repo = new DashboardRepo(_connectionString);
        //    return repo.GetMonthlyDeposits();
        //}

        [HttpGet]
        [Route("facesperappointment")]
        public List<Dashboard.MonthlyFacesPerAppointment> GetFacesPerAppointments()
        {
            var user = GetCurrentUser();
            var repo = new DashboardRepo(_connectionString);
            return repo.GetMonthlyFacesPerAppointments(user.Id);
        }

        [HttpGet]
        [Route("monthlydeposits")]
        public decimal GetMonthlyDeposits()
        {
            var user = GetCurrentUser();
            var repo = new DashboardApi(_connectionString);
            return repo.GetTotalDeposits(user);
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
