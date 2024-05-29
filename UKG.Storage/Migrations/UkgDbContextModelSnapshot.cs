﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace UKG.Storage.Migrations
{
    [DbContext(typeof(UkgDbContext))]
    partial class UkgDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.0");

            modelBuilder.Entity("UKG.Storage.Models.Patient", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("Birthday")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("TEXT")
                        .HasComputedColumnSql("FirstName || ' ' || LastName");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Pesel")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.HasKey("ID");

                    b.ToTable("Patient");
                });

            modelBuilder.Entity("UKG.Storage.Models.UkgSummary", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ACS")
                        .HasColumnType("TEXT");

                    b.Property<string>("Ao")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("DopplerAortalna")
                        .HasColumnType("TEXT");

                    b.Property<string>("DopplerMitralna")
                        .HasColumnType("TEXT");

                    b.Property<string>("DopplerPnia")
                        .HasColumnType("TEXT");

                    b.Property<string>("DopplerTrojdzielna")
                        .HasColumnType("TEXT");

                    b.Property<string>("EF")
                        .HasColumnType("TEXT");

                    b.Property<string>("GmaxAortalna")
                        .HasColumnType("TEXT");

                    b.Property<string>("GmaxMitralna")
                        .HasColumnType("TEXT");

                    b.Property<string>("GmaxTrojdzielna")
                        .HasColumnType("TEXT");

                    b.Property<string>("IVSd")
                        .HasColumnType("TEXT");

                    b.Property<string>("IVSs")
                        .HasColumnType("TEXT");

                    b.Property<string>("Kurczliwosc")
                        .HasColumnType("TEXT");

                    b.Property<string>("LA")
                        .HasColumnType("TEXT");

                    b.Property<string>("LVPWd")
                        .HasColumnType("TEXT");

                    b.Property<string>("LVPWs")
                        .HasColumnType("TEXT");

                    b.Property<string>("LVd")
                        .HasColumnType("TEXT");

                    b.Property<string>("LVs")
                        .HasColumnType("TEXT");

                    b.Property<string>("Osierdzie")
                        .HasColumnType("TEXT");

                    b.Property<int>("PatientID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("RV")
                        .HasColumnType("TEXT");

                    b.Property<int>("SubmitterID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Summary")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("VmaxAortalna")
                        .HasColumnType("TEXT");

                    b.Property<string>("VmaxMitralna")
                        .HasColumnType("TEXT");

                    b.Property<string>("VmaxTrojdzielna")
                        .HasColumnType("TEXT");

                    b.Property<string>("ZastawkaAortalna")
                        .HasColumnType("TEXT");

                    b.Property<string>("ZastawkaMitralna")
                        .HasColumnType("TEXT");

                    b.Property<string>("ZastawkaPnia")
                        .HasColumnType("TEXT");

                    b.Property<string>("ZastawkaTrojdzielna")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.HasIndex("PatientID");

                    b.ToTable("UKGSummaries");
                });

            modelBuilder.Entity("UKG.Storage.Models.UkgSummary", b =>
                {
                    b.HasOne("UKG.Storage.Models.Patient", "Patient")
                        .WithMany("Ukgs")
                        .HasForeignKey("PatientID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("UKG.Storage.Models.Patient", b =>
                {
                    b.Navigation("Ukgs");
                });
#pragma warning restore 612, 618
        }
    }
}
