using Autofac;
using Montee.Application.Interfaces;
using Montee.Application.Services;

namespace Montee.Infra.IoC;

public class CoreModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        // Register core business services
        builder.RegisterType<TokenService>().As<ITokenService>().InstancePerLifetimeScope();
    }
}