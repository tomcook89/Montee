using Montee.Domain.Models;

namespace Montee.Application.Interfaces;

public interface ITokenService
{
    string CreateToken(AppUser user); //Task<string>
}