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

    public static string GetClassColumn<T>(string propertyName)
        where T : class
    {
        var className = typeof(T).Name;
        return $"{className}.{propertyName}";
    }
}
