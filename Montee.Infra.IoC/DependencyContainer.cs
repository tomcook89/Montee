using Microsoft.Extensions.DependencyInjection;
using Montee.Infra.Data.Context;

namespace Montee.Infra.IoC;

public class DependencyContainer
{
    public static void RegisterServices(IServiceCollection services)
    {
        //Domain InMemoryBus MediatR

        //Domain Handlers

        //Application Layer 

        //Infra.Data Layer
        //services.AddScoped<ICourseRepository, CourseRepository>();
        //services.AddScoped<DBContext>();
    }

}