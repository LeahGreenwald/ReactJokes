using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ReactJokes.Data
{
    public class JokesRepository
    {
        private readonly string _connectionString;
        public JokesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public Joke GetJokeById(int jokeId)
        {
            using var ctx = new ReactJokesContext(_connectionString);
            return ctx.Jokes.Include(j => j.Liked).FirstOrDefault(j => j.id == jokeId);
        }
        public Joke GetJoke(Joke joke)
        {
            using var ctx = new ReactJokesContext(_connectionString);
            return ctx.Jokes.Include(j => j.Liked).FirstOrDefault(j => j.setup == joke.setup);
        }
        public void AddJoke(Joke joke)
        {
            var ctx = new ReactJokesContext(_connectionString);
            ctx.Jokes.Add(joke);
            ctx.SaveChanges();
        }
        public List<Joke> GetAllJokes()
        {
            var ctx = new ReactJokesContext(_connectionString);
            return ctx.Jokes.Include(j => j.Liked).ToList();
        }
        public Joke AddLike(UserLikedJoke like)
        {
            var ctx = new ReactJokesContext(_connectionString);
            ctx.Liked.Add(like);
            ctx.SaveChanges();
            return ctx.Jokes.FirstOrDefault(j => j.id == like.JokeId);
        }
        public Joke UpdateLike(UserLikedJoke like)
        {
            var ctx = new ReactJokesContext(_connectionString);
            ctx.Liked.Attach(like);
            ctx.Entry(like).State = EntityState.Modified;
            ctx.SaveChanges();
            return ctx.Jokes.FirstOrDefault(j => j.id == like.JokeId);
        }
    }
}
