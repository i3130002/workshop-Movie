using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using MovieSite.Models;

namespace MovieSite.Models
{
    public partial class DPROJECTWEBASP_COREMOVIESITEDATABASEDBMDFContext : DbContext
    {
        public DPROJECTWEBASP_COREMOVIESITEDATABASEDBMDFContext()
        {
        }

        public DPROJECTWEBASP_COREMOVIESITEDATABASEDBMDFContext(DbContextOptions<DPROJECTWEBASP_COREMOVIESITEDATABASEDBMDFContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=D:\\project\\web\\ASP_Core\\MovieSite\\DataBase\\DB.mdf;Integrated Security=True;Connect Timeout=30");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");
            modelBuilder.Entity<Movie>()
                .HasKey(c => new { c.Name, c.Published });
        }

        public DbSet<MovieSite.Models.Movie> Movie { get; set; }

        public DbSet<MovieSite.Models.Users> Users { get; set; }
    }
}
