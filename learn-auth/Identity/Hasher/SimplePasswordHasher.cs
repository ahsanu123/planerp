using System.Security.Cryptography;
using System.Text;
using Learn.Model;
using Microsoft.AspNetCore.Identity;

namespace Learn.AppIdentity;

public class SimplePasswordHasher : IPasswordHasher<AppUser>
{
    public string HashPassword(AppUser user, string password)
    {
        HMACSHA256 hashAlgorithm = new HMACSHA256(Encoding.UTF8.GetBytes(user.Id.ToString()));
        return BitConverter.ToString(hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(password)));
    }

    public PasswordVerificationResult VerifyHashedPassword(
        AppUser user,
        string hashedPassword,
        string providedPassword
    )
    {
        var hashed = HashPassword(user, providedPassword);

        if (hashedPassword.Equals(hashed))
        {
            return PasswordVerificationResult.Success;
        }
        return PasswordVerificationResult.Failed;
    }
}
