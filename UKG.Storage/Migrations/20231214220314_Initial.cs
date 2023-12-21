using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UKG.Storage.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UKGSummaries",
                columns: table => new
                {
                    ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SubmitterID = table.Column<int>(type: "INTEGER", nullable: false),
                    PESEL = table.Column<string>(type: "TEXT", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    FullName = table.Column<string>(type: "TEXT", nullable: false, computedColumnSql: "FirstName || ' ' || LastName"),
                    Birthday = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    Ao = table.Column<string>(type: "TEXT", nullable: true),
                    ACS = table.Column<string>(type: "TEXT", nullable: true),
                    LA = table.Column<string>(type: "TEXT", nullable: true),
                    RV = table.Column<string>(type: "TEXT", nullable: true),
                    LVs = table.Column<string>(type: "TEXT", nullable: true),
                    LVd = table.Column<string>(type: "TEXT", nullable: true),
                    IVSs = table.Column<string>(type: "TEXT", nullable: true),
                    IVSd = table.Column<string>(type: "TEXT", nullable: true),
                    LVPWs = table.Column<string>(type: "TEXT", nullable: true),
                    LVPWd = table.Column<string>(type: "TEXT", nullable: true),
                    EF = table.Column<string>(type: "TEXT", nullable: true),
                    Kurczliwosc = table.Column<string>(type: "TEXT", nullable: true),
                    Osierdzie = table.Column<string>(type: "TEXT", nullable: true),
                    ZastawkaMitralna = table.Column<string>(type: "TEXT", nullable: true),
                    DopplerMitralna = table.Column<string>(type: "TEXT", nullable: true),
                    VmaxMitralna = table.Column<string>(type: "TEXT", nullable: true),
                    GmaxMitralna = table.Column<string>(type: "TEXT", nullable: true),
                    ZastawkaAortalna = table.Column<string>(type: "TEXT", nullable: true),
                    DopplerAortalna = table.Column<string>(type: "TEXT", nullable: true),
                    VmaxAortalna = table.Column<string>(type: "TEXT", nullable: true),
                    GmaxAortalna = table.Column<string>(type: "TEXT", nullable: true),
                    ZastawkaTrojdzielna = table.Column<string>(type: "TEXT", nullable: true),
                    DopplerTrojdzielna = table.Column<string>(type: "TEXT", nullable: true),
                    VmaxTrojdzielna = table.Column<string>(type: "TEXT", nullable: true),
                    GmaxTrojdzielna = table.Column<string>(type: "TEXT", nullable: true),
                    ZastawkaPnia = table.Column<string>(type: "TEXT", nullable: true),
                    DopplerPnia = table.Column<string>(type: "TEXT", nullable: true),
                    Summary = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UKGSummaries", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UKGSummaries");
        }
    }
}
