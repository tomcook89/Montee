using Autofac;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Montee.Domain.Interfaces;
using Montee.Infra.Data.Context;
using Montee.Infra.Data.Repositories;

namespace Montee.Infra.IoC;

public class InfrastructureModule(IConfiguration configuration) : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        // Register DbContext
        builder.Register(c =>
        {
            var optionsBuilder = new DbContextOptionsBuilder<DBContext>();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
                sqlServerOptions => sqlServerOptions.EnableRetryOnFailure()
                    .CommandTimeout(60)
                    .MigrationsAssembly("Montee.Infra.Data"));
            return new DBContext(optionsBuilder.Options);
        }).AsSelf().InstancePerLifetimeScope();

        // Register repositories
        builder.RegisterType<UserRepository>().As<IUserRepository>().InstancePerLifetimeScope();
    }
}