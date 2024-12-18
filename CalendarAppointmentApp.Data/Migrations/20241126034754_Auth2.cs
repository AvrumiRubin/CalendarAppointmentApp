using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CalendarAppointmentApp.Data.Migrations
{
    public partial class Auth2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CalculatedMonthlyAmounts",
                columns: table => new
                {
                    Year = table.Column<int>(type: "int", nullable: false),
                    Month = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MonthlyAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "GetCurrentMonthsAppointments",
                columns: table => new
                {
                    MonthlyAppointments = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "MonthlyDeposits",
                columns: table => new
                {
                    Deposits = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "MonthlyFacesPerAppointments",
                columns: table => new
                {
                    Appointments = table.Column<int>(type: "int", nullable: false),
                    FacesPerAppointment = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "TotalIncomes",
                columns: table => new
                {
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "TotalMonthlyAppointments",
                columns: table => new
                {
                    Year = table.Column<int>(type: "int", nullable: false),
                    Month = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppointmentCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CalculatedMonthlyAmounts");

            migrationBuilder.DropTable(
                name: "GetCurrentMonthsAppointments");

            migrationBuilder.DropTable(
                name: "MonthlyDeposits");

            migrationBuilder.DropTable(
                name: "MonthlyFacesPerAppointments");

            migrationBuilder.DropTable(
                name: "TotalIncomes");

            migrationBuilder.DropTable(
                name: "TotalMonthlyAppointments");
        }
    }
}
