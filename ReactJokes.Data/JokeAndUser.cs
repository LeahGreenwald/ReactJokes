using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;

namespace ReactJokes.Data
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        [JsonIgnore]
        public List<UserLikedJoke> Liked { get; set; }

    }
    public class Joke
    {
        public int id { get; set; }
        public string type { get; set; }
        public string setup { get; set; }
        public string punchline { get; set; }
        //[JsonIgnore]
        public List<UserLikedJoke> Liked { get; set; }
    }
    public class UserLikedJoke
    {
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public int JokeId { get; set; }
        [JsonIgnore]
        public Joke Joke { get; set; }
        public DateTime Time { get; set; }
        public bool Liked { get; set; }
    }
}
