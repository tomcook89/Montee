using Montee.Domain.Models;

namespace Montee.Application.Interfaces;

public interface ITokenService
{
    Task<string> CreateToken(AppUser user);
}