using System.Security.Claims;
using Learn.Constant;
using Microsoft.AspNetCore.Authorization;

namespace Learn.AppAuthorization;

public class SuperAdminAuthorizationHandler
    : AuthorizationHandler<SuperAdminAuthorizationRequirement>
{
    private readonly ILogger<SuperAdminAuthorizationRequirement> _logger;

    public SuperAdminAuthorizationHandler(ILogger<SuperAdminAuthorizationRequirement> logger)
    {
        _logger = logger;
    }

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        SuperAdminAuthorizationRequirement requirement
    )
    {
        if (String.IsNullOrWhiteSpace(requirement.Email))
        {
            throw new Exception(
                $"Please Set Super Admin Email On Environment Variable: {AuthorizationConstant.SuperAdminEmail}"
            );
        }

        var currentUserEmail = context.User.Claims.First(claim => claim.Type == ClaimTypes.Email);

        if (String.Equals(requirement.Email, currentUserEmail.Value))
        {
            context.Succeed(requirement);
        }
        else
        {
            _logger.LogInformation(
                $"Email Miss Match, Super Admin Email : {requirement.Email}, User Email : {currentUserEmail.Value ?? "notfound"}"
            );
            context.Fail();
        }

        return Task.CompletedTask;
    }
}
