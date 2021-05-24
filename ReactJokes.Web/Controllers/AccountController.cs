using ReactJokes.web.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactJokes.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ReactJokes.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly string _connectionString;
        public AccountController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("signup")]
        public void Signup(SignupViewModel viewModel)
        {
            var repo = new UserRepository(_connectionString);
            repo.AddUser(viewModel, viewModel.Password);
        }

        [HttpPost]
        [Route("login")]
        public User Login(LoginViewModel vm)
        {
            var repo = new UserRepository(_connectionString);
            var user = repo.Login(vm.email, vm.password);
            if (user == null)
            {
                return null;
            }
            var claims = new List<Claim>
            {
                new Claim("user", vm.email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();
            return user;
        }

        [HttpGet]
        [Route("getcurrentuser")]
        public User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }
            var repo = new UserRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }

        [HttpPost]
        [Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }

    }
}

