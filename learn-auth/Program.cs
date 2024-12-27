using Learn.InternalMigration;
using Learn.Model;
using Learn.Services;
using Learn.StandardIdentity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var sqliteConnectionString = builder.Configuration.GetConnectionString("Sqlite");

builder.Services.AddControllers();

builder
    .Services.AddIdentity<IdentityUserIntKey, IdentityRoleIntKey>()
    .AddStandardCustomIdentityStores();

builder.Services.AddIdentityCore<IdentityUserIntKey>();

builder
    .Services.AddAuthentication(option =>
    {
        option.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
        option.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddGoogle(option =>
    {
    })
    .AddCookie();

builder.Services.ConfigureApplicationCookie(option =>
{
    option.LoginPath = "/signin-google";
    option.LogoutPath = "/Identity/SignOut";
    option.AccessDeniedPath = "/Identity/Forbidden";
});

builder.Services.AddAuthorization(option =>
{
    // CustomAuthorizationPolicies.AddPolicies(option);
});

builder.Services.AddFluentMigratorProvider(sqliteConnectionString);

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
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(option =>
    {
        option.EnableTryItOutByDefault();
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseFluentMigrator();
app.Run();
