using System.Security.Claims;

namespace Learn.UserClaim;

public static class UsersAndClaims
{
    public static string[] Schemes = new string[] { "TestScheme" };

    public static Dictionary<string, IEnumerable<string>> UserData = new Dictionary<
        string,
        IEnumerable<string>
    >
    {
        { "Alice", new[] { "User", "Administrator" } },
        { "Bob", new[] { "User", "SpecialGuest" } },
        { "Charlie", new[] { "User" } },
    };

    public static string[] Users => UserData.Keys.ToArray();

    public static Dictionary<string, IEnumerable<Claim>> Claims =>
        UserData.ToDictionary(
            keyedClaim => keyedClaim.Key,
            keyedClaim => keyedClaim.Value.Select(role => new Claim(ClaimTypes.Role, role)),
            StringComparer.InvariantCultureIgnoreCase
        );

    public static IEnumerable<ClaimsPrincipal> GetUsers()
    {
        foreach (var scheme in Schemes)
        {
            foreach (var keyedClaim in Claims)
            {
                var identity = new ClaimsIdentity(scheme);

                var claim = new Claim(ClaimTypes.Name, keyedClaim.Key);

                identity.AddClaim(claim);
                identity.AddClaims(keyedClaim.Value);

                var principal = new ClaimsPrincipal(identity);

                yield return principal;
            }
        }
    }
}
