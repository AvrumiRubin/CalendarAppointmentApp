using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CalendarAppointmentApp.Data.Migrations
{
    public partial class Types : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DepositDate",
                table: "Appointments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "DepositType",
                table: "Appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaymentType",
                table: "Appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DepositDate",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "DepositType",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "PaymentType",
                table: "Appointments");
        }
    }
}
