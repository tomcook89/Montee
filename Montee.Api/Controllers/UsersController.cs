using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Montee.Domain.Models;
using Montee.Infra.Data.Context;

namespace Montee.Api.Controllers;

[Authorize]
public class UsersController(DBContext context) : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await context.Users.ToListAsync();

        return users;
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        var currentUsername = User;
        var user = await context.Users.FindAsync(id);

        if (user == null) return NotFound();

        return user;
    }
}