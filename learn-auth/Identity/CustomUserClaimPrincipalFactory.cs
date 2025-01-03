using System.Security.Claims;
using AMS.Constant;
using AMS.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace AMS.StandardIdentity;

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

    private bool _isSuperAdmin(string userEmail)
    {
        bool isSuperAdmin = false;
        var superAdminEmail = Environment.GetEnvironmentVariable(
            AuthorizationConstant.SuperAdminEmail
        );

        Console.WriteLine(
            $"SuperAdminEmail: {superAdminEmail?.ToLower()}, userEmail: {userEmail.ToLower()}"
        );
        if (String.Equals(superAdminEmail?.ToLower(), userEmail.ToLower()))
            isSuperAdmin = true;

        return isSuperAdmin;
    }

    public override async Task<ClaimsPrincipal> CreateAsync(IdentityUserIntKey user)
    {
        var principal = await base.CreateAsync(user);
        var identity = new ClaimsIdentity();

        if (_isSuperAdmin(user.Email ?? ""))
        {
            var superAdminRole = await _roleManager.FindByNameAsync(
                AuthorizationConstant.SuperAdminClaim
            );
            if (superAdminRole != null)
                await _userManager.AddToRoleAsync(user, superAdminRole.Name!);
        }
        if (
            !_isSuperAdmin(user.Email ?? "")
            && (await _userManager.IsInRoleAsync(user, AuthorizationConstant.SuperAdminClaim))
        )
        {
            await _userManager.RemoveFromRoleAsync(user, AuthorizationConstant.SuperAdminClaim);
        }

        var userRoles = await _userManager.GetRolesAsync(user);

        foreach (var role in userRoles)
        {
            identity.AddClaim(new Claim(ClaimTypes.Role, role));
        }

        return principal;
    }
}
