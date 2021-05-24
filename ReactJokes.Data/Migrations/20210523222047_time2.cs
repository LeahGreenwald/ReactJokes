using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactJokes.Data.Migrations
{
    public partial class time2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Liked",
                newName: "Time");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Time",
                table: "Liked",
                newName: "Date");
        }
    }
}
