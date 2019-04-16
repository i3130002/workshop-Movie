﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MovieSite.Models;

namespace MovieSite.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20190415211458_2")]
    partial class CreateUsers
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MovieSite.Models.Movie", b =>
                {
                    b.Property<string>("Name");

                    b.Property<DateTime>("Published");

                    b.Property<string>("Description");

                    b.Property<string>("Director");

                    b.HasKey("Name", "Published");

                    b.ToTable("Movie");
                });

            modelBuilder.Entity("MovieSite.Models.Users", b =>
                {
                    b.Property<string>("Username")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<bool>("IsAdmin");

                    b.Property<string>("Phone");

                    b.HasKey("Username");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
