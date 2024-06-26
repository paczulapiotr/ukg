using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UKG.Storage.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePatientTableName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UKGSummaries_Patient_PatientID",
                table: "UKGSummaries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Patient",
                table: "Patient");

            migrationBuilder.RenameTable(
                name: "Patient",
                newName: "Patients");

            migrationBuilder.AddColumn<int>(
                name: "SubmitterID",
                table: "Patients",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "Patients",
                type: "TEXT",
                nullable: true,
                computedColumnSql: "FirstName || ' ' || LastName",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldComputedColumnSql: "FirstName || ' ' || LastName");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Patients",
                table: "Patients",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_UKGSummaries_Patients_PatientID",
                table: "UKGSummaries",
                column: "PatientID",
                principalTable: "Patients",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UKGSummaries_Patients_PatientID",
                table: "UKGSummaries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Patients",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "SubmitterID",
                table: "Patients");

            migrationBuilder.RenameTable(
                name: "Patients",
                newName: "Patient");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "Patient",
                type: "TEXT",
                nullable: false,
                computedColumnSql: "FirstName || ' ' || LastName",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true,
                oldComputedColumnSql: "FirstName || ' ' || LastName");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Patient",
                table: "Patient",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_UKGSummaries_Patient_PatientID",
                table: "UKGSummaries",
                column: "PatientID",
                principalTable: "Patient",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
