using System.Text;
using Learn.Custom;
using Learn.InternalMigration;
using Learn.Middleware;
using Learn.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var sqliteConnectionString = builder.Configuration.GetConnectionString("sqlite");

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddIdentityCore<IdentityUser>();

// builder.Services.AddDbContext<LearnDbContext>();

builder.Services.AddAuthentication(option =>
{
    option.AddScheme<CustomAuthHandler>("qsv", "QueryStringValue");
    option.DefaultScheme = "qsv";
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddFluentMigratorProvider(sqliteConnectionString);
builder.Services.AddHttpLogging(config => { });

// builder.Services.AddAuthentication(option =>
// {
//     // option.AddScheme();
//     option.DefaultScheme = "qsv";
// });

builder.Services.AddSwaggerGen(option =>
{
    // look at this https://github.com/domaindrivendev/Swashbuckle.AspNetCore?tab=readme-ov-file#add-security-definitions-and-requirements
    // option.AddSecurityDefinition(
    //     "Bearer",
    //     new OpenApiSecurityScheme
    //     {
    //         In = ParameterLocation.Header,
    //         Description = "Please enter token",
    //         Name = "Authorization",
    //         Type = SecuritySchemeType.Http,
    //         BearerFormat = "JWT",
    //         Scheme = "bearer",
    //     }
    // );
});

// builder.Services.AddIdentityApiEndpoints<IdentityUser>().AddEntityFrameworkStores<LearnDbContext>();
// builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(option =>
    {
        option.EnableTryItOutByDefault();
    });
    // app.UseDumpRequestMiddleWare();
    app.UseHttpLogging();
}

// app.UseMiddleware<CustomAuthentication>();
app.UseAuthentication();
app.UseMiddleware<RoleMemberships>();

app.UseRouting();

app.UseMiddleware<ClaimsReporter>();
app.UseAuthorization();

app.UseHttpsRedirection();
app.MapControllers();

app.UseFluentMigrator();
app.Run();
