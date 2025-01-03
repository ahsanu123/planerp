using System.Text;

namespace AMS.Middleware;

public class DumpRequestMiddleWare
{
    private readonly RequestDelegate _next;

    public DumpRequestMiddleWare(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        string msg =
            context.Request.Protocol + " " + context.Request.Method + " : " + context.Request.Path;

        string sep = new String('-', msg.Length);

        Console.WriteLine(sep + Environment.NewLine + msg + Environment.NewLine + sep);

        foreach (string key in context.Request.Headers.Keys)
        {
            Console.WriteLine(key + " = " + context.Request.Headers[key]);
        }

        foreach (string key in context.Request.Cookies.Keys)
        {
            Console.WriteLine(key + " : " + context.Request.Cookies[key]);
        }

        if (context.Request.Body != null)
        {
            string body = String.Empty;

            using (StreamReader sr = new StreamReader(context.Request.Body))
            {
                body = sr.ReadToEndAsync().Result;
            }

            Console.WriteLine(body);
            context.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes(body));
            context.Request.Body.Position = 0;
        }
        await _next(context);
    }
}

public static class DumpRequestMiddleWareExtension
{
    public static IApplicationBuilder UseDumpRequestMiddleWare(this IApplicationBuilder appBuilder)
    {
        appBuilder.UseMiddleware<DumpRequestMiddleWare>();
        return appBuilder;
    }
}
