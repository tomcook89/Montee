using Microsoft.AspNetCore.Identity;

namespace Montee.Domain.Models;

public class AppRole : IdentityRole<int>
{
    public ICollection<AppUserRole> UserRoles { get; set; } = [];
}