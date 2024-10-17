namespace Planerp.Extensions;

using System.Runtime.CompilerServices;

public static class UtilityExtension
{
    //  reference https://stackoverflow.com/a/16295702/19270838
    public static void ShowCurrentPosition(
        string message = "",
        [CallerFilePath] string file = "",
        [CallerMemberName] string member = "",
        [CallerLineNumber] int line = 0
    )
    {
        Console.WriteLine("-------------------------");
        Console.WriteLine($"{Path.GetFileName(file)}_{member}(line: {line}) -- \n{message}");
        Console.WriteLine("-------------------------");
    }

    // reference: https://stackoverflow.com/a/75958935/19270838
    // official docs: https://learn.microsoft.com/en-us/dotnet/api/system.runtime.compilerservices.callerargumentexpressionattribute.-ctor?view=net-7.0#system-runtime-compilerservices-callerargumentexpressionattribute-ctor(system-string)
    public static string FullNameof(
        string propertyName,
        [CallerArgumentExpression(nameof(propertyName))] string fullNameof = ""
    )
    {
        return fullNameof.Substring(7, fullNameof.Length - 8);
    }

    public static string GetLastWordAfterDot(string dotSeparatedString)
    {
        return dotSeparatedString.Split(".").Last();
    }
}
