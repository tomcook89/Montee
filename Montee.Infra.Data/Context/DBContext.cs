using Microsoft.EntityFrameworkCore;
using Montee.Domain.Models;

namespace Montee.Infra.Data.Context;

public class DBContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
}