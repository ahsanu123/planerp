using Learn.Custom;
using Microsoft.AspNetCore.Authorization;

namespace Learn.Custom;

public class CustomRequirementHandler : IAuthorizationHandler
{
    public Task HandleAsync(AuthorizationHandlerContext context)
    {
        var pendingRequirements = context
            .PendingRequirements.OfType<CustomAuthorizationRequirement>()
            .ToList();
        foreach (var requirement in pendingRequirements)
        {
            var isNameInRequirement = context.User.Identities.Any(identity =>
                string.Equals(identity.Name, requirement.Name, StringComparison.OrdinalIgnoreCase)
            );

            if (isNameInRequirement)
                context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}
