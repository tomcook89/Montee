using Microsoft.AspNetCore.Identity;

namespace Montee.Domain.Models;

public class AppUser : IdentityUser<int>
{
    public DateOnly DateOfBirth { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public ICollection<AppUserRole> UserRoles { get; set; } = [];
}