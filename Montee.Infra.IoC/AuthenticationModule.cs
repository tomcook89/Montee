using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Montee.Domain.Models;
using Montee.Infra.Data.Context;

namespace Montee.Infra.IoC;

public class AuthenticationModule(IConfiguration configuration) : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        var services = new ServiceCollection();
        var tokenKey = configuration["TokenKey"] ?? throw new Exception("TokenKey not found");

        services.AddIdentity<AppUser, IdentityRole<int>>()
            .AddEntityFrameworkStores<DBContext>()
            .AddDefaultTokenProviders();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

        builder.Populate(services);
    }
}