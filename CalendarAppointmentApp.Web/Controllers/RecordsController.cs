using CalendarAppointmentApp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalendarAppointmentApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            var repo = new RecordsApi(_connectionString);
            return repo.GetPastRecords();
        }

        [HttpPost]
        [Route("updaterecord")]
        public void UpdateRecord(Appointment appointment)
        {
            var repo = new RecordsApi(_connectionString);
            repo.UpdateAppointment(appointment);
        }

    }
}
