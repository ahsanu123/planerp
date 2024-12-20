using Microsoft.AspNetCore.Authentication;

namespace Learn.AppOAuth;

public static class GithubExtension
{
    public static AuthenticationBuilder AddGithub(
        this AuthenticationBuilder builder,
        Action<GithubOptions> builderOption
    )
    {
        builder.AddOAuth<GithubOptions, GithubHandler>(
            GithubDefaults.AuthenticationScheme,
            GithubDefaults.DisplayName,
            builderOption
        );

        return builder;
    }
}
