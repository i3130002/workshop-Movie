using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using MovieSite.Models;

namespace MovieSite.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options): base(options)
        {
        }

        // Entities        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");
            modelBuilder.Entity<Movie>()
                .HasKey(c => new { c.Name, c.Published });
        }

        public DbSet<Movie> Movie { get; set; }

        public DbSet<Users> Users { get; set; }
    }

}
