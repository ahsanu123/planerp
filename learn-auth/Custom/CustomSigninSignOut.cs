using System.Security.Claims;

namespace Learn.Custom;

public class CustomSignInAndSignOut
{
    public static async Task SignIn(HttpContext context)
    {
        string user = context.Request.Query["user"];
        if (user != null)
        {
            var claim = new Claim(ClaimTypes.Name, user);
            var identity = new ClaimsIdentity("qsv");

            identity.AddClaim(claim);

            context.Response.Cookies.Append("authUser", user);
            await context.Response.WriteAsync($"Authenticated user: {user}");
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        }
    }

    public static async Task SignOut(HttpContext context)
    {
        context.Response.Cookies.Delete("authUser");
        await context.Response.WriteAsync("Signed out");
    }
}
