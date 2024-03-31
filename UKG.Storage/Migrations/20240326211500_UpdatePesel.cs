using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UKG.Storage.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePesel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PESEL",
                table: "UKGSummaries",
                newName: "Pesel");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "UKGSummaries",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "UKGSummaries",
                type: "datetime",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "UKGSummaries");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "UKGSummaries");

            migrationBuilder.RenameColumn(
                name: "Pesel",
                table: "UKGSummaries",
                newName: "PESEL");
        }
    }
}
