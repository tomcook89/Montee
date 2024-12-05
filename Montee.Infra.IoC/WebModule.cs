using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

namespace Montee.Infra.IoC;

public class WebModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        // Register controllers
        builder.RegisterAssemblyTypes(ThisAssembly)
            .Where(t => t.Name.EndsWith("Controller"))
            .InstancePerLifetimeScope();

        var services = new ServiceCollection();

        // Add CORS configuration
        services.AddCors(options =>
        {
            options.AddPolicy("DefaultPolicy", policy =>
            {
                policy.AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins("http://localhost:4200", "https://localhost:4200");
            });
        });

        builder.Populate(services);
    }
}