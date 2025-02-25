using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Montee.Domain.Models;
using System.Text.Json;

namespace Montee.Infra.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        if (await userManager.Users.AnyAsync()) return;

        var path = Path.Combine(AppContext.BaseDirectory, "UserSeedData.json");

        if (!File.Exists(path))
        {
            throw new FileNotFoundException($"Could not find UserSeedData.json at {path}");
        }

        var userData = await File.ReadAllTextAsync(path);

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        if (users == null) return;

        var roles = new List<AppRole>
        {
            new() {Name = "Member"},
            new() {Name = "Admin"},
            new() {Name = "Moderator"},
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        foreach (var user in users)
        {
            user.UserName = user.UserName!.ToLower();
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");
        }

        var admin = new AppUser
        {
            UserName = "admin",
        };

        await userManager.CreateAsync(admin, "Pa$$w0rd");
        await userManager.AddToRolesAsync(admin, ["Admin", "Member"]);
    }
}