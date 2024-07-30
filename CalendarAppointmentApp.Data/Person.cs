namespace CalendarAppointmentApp.Data
{
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }

        public List<Appointment> Appointments { get; set; }
    }
}