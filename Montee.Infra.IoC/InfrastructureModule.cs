using Autofac;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Montee.Infra.Data.Context;

namespace Montee.Infra.IoC;

public class InfrastructureModule(IConfiguration configuration) : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        // Register DbContext
        builder.Register(c =>
        {
            var optionsBuilder = new DbContextOptionsBuilder<DBContext>();
            optionsBuilder.UseSqlite(configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly("Montee.Infra.Data"));
            return new DBContext(optionsBuilder.Options);
        }).AsSelf().InstancePerLifetimeScope();

        // Register repositories
    }
}