using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using MovieSite.Models;

namespace MovieSite.Models
{
    public partial class Context : DbContext
    {
        public Context()
        {
        }

        public Context(DbContextOptions<Context> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                throw new Exception(" No Connection string if (!optionsBuilder.IsConfigured)");
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
