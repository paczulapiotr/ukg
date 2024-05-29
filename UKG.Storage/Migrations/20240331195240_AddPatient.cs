using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UKG.Storage.Migrations
{
    /// <inheritdoc />
    public partial class AddPatient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullName",
                table: "UKGSummaries");

            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "UKGSummaries");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "UKGSummaries");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "UKGSummaries");

            migrationBuilder.DropColumn(
                name: "Pesel",
                table: "UKGSummaries");

            migrationBuilder.AddColumn<int>(
                name: "PatientID",
                table: "UKGSummaries",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Patient",
                columns: table => new
                {
                    ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    Pesel = table.Column<string>(type: "TEXT", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    FullName = table.Column<string>(type: "TEXT", nullable: false, computedColumnSql: "FirstName || ' ' || LastName"),
                    Birthday = table.Column<DateOnly>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patient", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UKGSummaries_PatientID",
                table: "UKGSummaries",
                column: "PatientID");

            migrationBuilder.AddForeignKey(
                name: "FK_UKGSummaries_Patient_PatientID",
                table: "UKGSummaries",
                column: "PatientID",
                principalTable: "Patient",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UKGSummaries_Patient_PatientID",
                table: "UKGSummaries");

            migrationBuilder.DropTable(
                name: "Patient");

            migrationBuilder.DropIndex(
                name: "IX_UKGSummaries_PatientID",
                table: "UKGSummaries");

            migrationBuilder.DropColumn(
                name: "PatientID",
                table: "UKGSummaries");

            migrationBuilder.AddColumn<DateOnly>(
                name: "Birthday",
                table: "UKGSummaries",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "UKGSummaries",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "UKGSummaries",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Pesel",
                table: "UKGSummaries",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "UKGSummaries",
                type: "TEXT",
                nullable: false,
                computedColumnSql: "FirstName || ' ' || LastName");
        }
    }
}
