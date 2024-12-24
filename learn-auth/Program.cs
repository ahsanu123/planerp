using Learn.Custom;
using Learn.InternalMigration;
using Learn.Model;
using Learn.Services;
using Learn.StandardIdentity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var sqliteConnectionString = builder.Configuration.GetConnectionString("Sqlite");

builder
    .Services.AddIdentity<IdentityUserIntKey, IdentityRoleIntKey>()
    .AddStandardCustomIdentityStores();

builder
    .Services.AddAuthentication()
    .AddGoogle(option =>
    {
        option.ClientId = "";
        option.ClientSecret = "";
    })
    .AddCookie();

// builder.Services.ConfigureApplicationCookie(option =>
// {
// option.LoginPath = "/signin-google";
// opts.LogoutPath = "/Identity/SignOut";
// opts.AccessDeniedPath = "/Identity/Forbidden";
// });

builder.Services.AddAuthorization(option =>
{
    // CustomAuthorizationPolicies.AddPolicies(option);
});

builder.Services.AddControllers();

builder.Services.AddFluentMigratorProvider(sqliteConnectionString);
builder.Services.AddHttpLogging(config => { });

builder.Services.AddConfigurationProvider(builder.Configuration);
builder.Services.AddServicesCollection();

// builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    // look at this https://github.com/domaindrivendev/Swashbuckle.AspNetCore?tab=readme-ov-file#add-security-definitions-and-requirements
    option.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please enter token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = "bearer",
        }
    );
});

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
    // app.UseHttpLogging();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();

// app.UseMiddleware<AuthorizationReporter>();
app.UseAuthorization();

// app.UseEndpoints(endpoint => endpoint.MapControllers());

app.MapControllers();

app.UseFluentMigrator();
app.Run();
