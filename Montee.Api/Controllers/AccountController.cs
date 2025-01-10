using System.Security.Cryptography;
using System.Text;
using Montee.Infra.Data;
using Montee.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Montee.Application.Interfaces;
using Montee.Domain.DTOs;
using Montee.Infra.Data.Context;

namespace Montee.Api.Controllers;

public class AccountController(DBContext context, ITokenService tokenService //UserManager<AppUser> userManager
    ) : BaseApiController //IMapper mapper
{
    [HttpPost("register")] // account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        //if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");
        if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

        using var hmac = new HMACSHA512();
        //var user = mapper.Map<AppUser>(registerDto);
        var user = new AppUser()
        {
            UserName = registerDto.Username,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes((registerDto.Password))),
            PasswordSalt = hmac.Key
        };

        //user.UserName = registerDto.Username.ToLower();

        //var result = await userManager.CreateAsync(user, registerDto.Password);
        context.Users.Add(user);
        await context.SaveChangesAsync();

        //if (!result.Succeeded) return BadRequest(result.Errors);

        return new UserDto
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        //var user = await userManager.Users.FirstOrDefaultAsync(s =>
        //    s.UserName == loginDto.Username.ToLower());

        var user = await context.Users.FirstOrDefaultAsync(x =>
            x.UserName == loginDto.Username.ToLower());

        if (user == null || user.UserName == null) return Unauthorized(new { message = "Invalid username" });

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized(new { message = "Invalid password" });
        }


        return new UserDto
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user)
        };
    }

    private async Task<bool> UserExists(string username)
    {
        //return await userManager.Users.AnyAsync(x => x.NormalizedUserName == username.ToUpper()); // Bob != bob
        return await context.Users.AnyAsync(x => x.UserName == username);
    }
}