﻿// <auto-generated />
using System;
using CalendarAppointmentApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CalendarAppointmentApp.Data.Migrations
{
    [DbContext(typeof(AppointmentContext))]
    [Migration("20241126034754_Auth2")]
    partial class Auth2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("CalendarAppointmentApp.Data.Appointment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("Deposit")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("DepositDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("DepositType")
                        .HasColumnType("int");

                    b.Property<int>("Faces")
                        .HasColumnType("int");

                    b.Property<int>("PaymentType")
                        .HasColumnType("int");

                    b.Property<int>("PersonId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.Dashboard+CalculatedMonthlyAmount", b =>
                {
                    b.Property<string>("Month")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("MonthlyAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.ToTable("CalculatedMonthlyAmounts");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.Dashboard+GetCurrentMonthsAppointments", b =>
                {
                    b.Property<int>("MonthlyAppointments")
                        .HasColumnType("int");

                    b.ToTable("GetCurrentMonthsAppointments");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.Dashboard+MonthlyFacesPerAppointment", b =>
                {
                    b.Property<int>("Appointments")
                        .HasColumnType("int");

                    b.Property<int>("FacesPerAppointment")
                        .HasColumnType("int");

                    b.ToTable("MonthlyFacesPerAppointments");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.Dashboard+TotalIncome", b =>
                {
                    b.Property<decimal>("TotalAmount")
                        .HasColumnType("decimal(18,2)");

                    b.ToTable("TotalIncomes");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.Dashboard+TotalMonthlyAppointments", b =>
                {
                    b.Property<int>("AppointmentCount")
                        .HasColumnType("int");

                    b.Property<string>("Month")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.ToTable("TotalMonthlyAppointments");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.DashboardApi+MonthlyDeposits", b =>
                {
                    b.Property<decimal>("Deposits")
                        .HasColumnType("decimal(18,2)");

                    b.ToTable("MonthlyDeposits");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("People");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.Appointment", b =>
                {
                    b.HasOne("CalendarAppointmentApp.Data.Person", "Person")
                        .WithMany("Appointments")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Person");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.Person", b =>
                {
                    b.HasOne("CalendarAppointmentApp.Data.User", null)
                        .WithMany("People")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.Person", b =>
                {
                    b.Navigation("Appointments");
                });

            modelBuilder.Entity("CalendarAppointmentApp.Data.User", b =>
                {
                    b.Navigation("People");
                });
#pragma warning restore 612, 618
        }
    }
}