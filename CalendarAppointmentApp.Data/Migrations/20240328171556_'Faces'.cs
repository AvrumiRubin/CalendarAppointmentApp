using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CalendarAppointmentApp.Data.Migrations
{
    public partial class Faces : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Faces",
                table: "Appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Faces",
                table: "Appointments");
        }
    }
}
