using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.Extensions.Options;

namespace Learn.AppOAuth;

public class GithubHandler : OAuthHandler<GithubOptions>
{
    public GithubHandler(
        IOptionsMonitor<GithubOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder
    )
        : base(options, logger, encoder) { }
}
