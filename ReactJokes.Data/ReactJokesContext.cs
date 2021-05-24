using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactJokes.Data
{
    public class ReactJokesContext : DbContext
    {
        private readonly string _connectionString;

        public ReactJokesContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //by default Entity Framework sets all foreign key relationship delete rules
            //to be Cascade delete. This code changes it to be Restrict which is more in line
            //of what we're used to in that it will fail deleting a parent, if there are still
            //any children
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<UserLikedJoke>()
                .HasKey(ulj => new { ulj.UserId, ulj.JokeId });

            modelBuilder.Entity<UserLikedJoke>()
                .HasOne(ulj => ulj.User)
                .WithMany(u => u.Liked)
                .HasForeignKey(l => l.UserId);

            modelBuilder.Entity<UserLikedJoke>()
                .HasOne(ulj => ulj.Joke)
                .WithMany(j => j.Liked)
                .HasForeignKey(l => l.JokeId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Joke> Jokes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserLikedJoke> Liked { get; set; }
    }
}
