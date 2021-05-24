using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactJokes.Data;
using System.Net.Http;
using Newtonsoft.Json;

namespace ReactJokes.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JokesController : ControllerBase
    {
        private readonly string _connectionString;
        public JokesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("getjoke")]
        public Joke GetJoke()
        {
            var client = new HttpClient();
            string json = client.GetStringAsync("https://official-joke-api.appspot.com/jokes/programming/random").Result;
            var jokes = JsonConvert.DeserializeObject<List<Joke>>(json);
            var newJoke = jokes[0];
            var repo = new JokesRepository(_connectionString);
            var joke = repo.GetJoke(newJoke);
            if (joke == null)
            {
                newJoke.id = 0;
                repo.AddJoke(newJoke);
                joke = newJoke;
            }
            return joke;
        }
        [HttpGet]
        [Route("getalljokes")]
        public List<Joke> GetAllJokes()
        {
            var repo = new JokesRepository(_connectionString);
            return repo.GetAllJokes();
        }
        [HttpPost]
        [Route("addlike")]
        public Joke AddLike (int UserId, int JokeId, bool Like)
        {
            var like = new UserLikedJoke
            {
                UserId = UserId,
                JokeId = JokeId,
                Liked = Like,
                Time = DateTime.Now
            };
            var repo = new JokesRepository(_connectionString);
            return repo.AddLike(like);
        }
        [HttpGet]
        [Route("getupdatedjoke")]
        public Joke GetUpdatedJoke(int jokeId)
        {
            var repo = new JokesRepository(_connectionString);
            return repo.GetJokeById(jokeId);
        }
        [HttpGet]
        [Route("isRecent")]
        public bool IsRecent (DateTime time)
        {
            var time2 = time.AddMinutes(5);
            var now = DateTime.Now.ToLocalTime();
            return time2 > now;
        }
        [HttpPost]
        [Route("updatelike")]
        public Joke UpdateLike(int UserId, int JokeId, bool Like)
        {
            var like = new UserLikedJoke
            {
                UserId = UserId,
                JokeId = JokeId,
                Liked = Like,
                Time = DateTime.Now
            };
            var repo = new JokesRepository(_connectionString);
            return repo.UpdateLike(like);
        }
    }
}
