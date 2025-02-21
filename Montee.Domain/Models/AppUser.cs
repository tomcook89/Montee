using Microsoft.AspNetCore.Identity;

namespace Montee.Domain.Models;

public class AppUser : IdentityUser<int>
{
    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
    public DateOnly DateOfBirth { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
}