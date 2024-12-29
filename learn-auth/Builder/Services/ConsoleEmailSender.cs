using System.Web;
using Learn.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Learn.Services;

public class ConsoleEmailSender : IEmailSender<IdentityUserIntKey>
{
    public Task SendConfirmationLinkAsync(
        IdentityUserIntKey user,
        string email,
        string confirmationLink
    )
    {
        Console.WriteLine("====================");
        Console.WriteLine("Sending Confirmation Email....");
        return Task.CompletedTask;
    }

    public Task SendEmailAsync(string emailAddress, string subject, string htmlMessage)
    {
        Console.WriteLine("====================");
        Console.WriteLine("Sending Email....");
        return Task.CompletedTask;
    }

    public Task SendPasswordResetCodeAsync(IdentityUserIntKey user, string email, string resetCode)
    {
        Console.WriteLine("====================");
        Console.WriteLine("Sending Password Reset Code....");
        return Task.CompletedTask;
    }

    public Task SendPasswordResetLinkAsync(IdentityUserIntKey user, string email, string resetLink)
    {
        Console.WriteLine("====================");
        Console.WriteLine("Sending Password Reset Link....");
        return Task.CompletedTask;
    }
}
