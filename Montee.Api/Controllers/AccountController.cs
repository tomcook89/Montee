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
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace Montee.Api.Controllers;

public class AccountController(DBContext context, ITokenService tokenService, UserManager<AppUser> userManager,
    IMapper mapper ) : BaseApiController
{
    [HttpPost("register")] // account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");
       
        var user = mapper.Map<AppUser>(registerDto);
        
        user.UserName = registerDto.Username.ToLower();

        var result = await userManager.CreateAsync(user, registerDto.Password);
        
        if (!result.Succeeded) return BadRequest(result.Errors);

        return new UserDto
        {
            Username = user.UserName,
            Token = await tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await userManager.Users
            .FirstOrDefaultAsync(x =>
            x.NormalizedUserName == loginDto.Username.ToUpper());

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        if (user == null || user.UserName == null) return Unauthorized(JsonSerializer.Serialize("Invalid username", options));

        var result = await userManager.CheckPasswordAsync(user, loginDto.Password);

        if (!result) return Unauthorized("Invalid password");

        return new UserDto
        {
            Username = user.UserName,
            Token = await tokenService.CreateToken(user)
        };
    }

    private async Task<bool> UserExists(string username)
    {
        return await userManager.Users.AnyAsync(x => x.NormalizedUserName == username.ToUpper());
    }
}