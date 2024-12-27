using System.Security.Claims;
using Learn.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Learn.StandardIdentity;

public class CustomUserClaimsPrincipalFactory
    : UserClaimsPrincipalFactory<IdentityUserIntKey, IdentityRoleIntKey>
{
    private UserManager<IdentityUserIntKey> _userManager;
    private RoleManager<IdentityRoleIntKey> _roleManager;

    public CustomUserClaimsPrincipalFactory(
        UserManager<IdentityUserIntKey> userManager,
        RoleManager<IdentityRoleIntKey> roleManager,
        IOptions<IdentityOptions> options
    )
        : base(userManager, roleManager, options)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public override async Task<ClaimsPrincipal> CreateAsync(IdentityUserIntKey user)
    {
        var principal = await base.CreateAsync(user);
        var identity = new ClaimsIdentity();

        var userRoles = await _userManager.GetRolesAsync(user);

        foreach (var role in userRoles)
        {
            Console.WriteLine("====================");
            Console.WriteLine($"Role: {role}");
            identity.AddClaim(new Claim(ClaimTypes.Role, role));
        }

        return principal;
    }
}
