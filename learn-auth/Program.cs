using Learn.AppAuthorization;
using Learn.Constant;
using Learn.InternalMigration;
using Learn.Model;
using Learn.Services;
using Learn.StandardIdentity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

var sqliteConnectionString = builder.Configuration.GetConnectionString("Sqlite");

// builder.Services.AddHttpsRedirection(opts =>
// {
//     opts.HttpsPort = 5136;
// });
builder.Services.AddControllers();

builder
    .Services.AddAuthentication()
    .AddCookie(IdentityConstants.BearerScheme)
    .AddGoogle(option =>
    {
        option.ClientId = configuration[GoogleConstant.ClientId]!;
        option.ClientSecret = configuration[GoogleConstant.ClientSecret]!;
    });

builder
    .Services.AddIdentity<IdentityUserIntKey, IdentityRoleIntKey>(option =>
    {
        option.Password.RequireDigit = false;
        option.Password.RequireLowercase = false;
        option.Password.RequireUppercase = false;
        option.Password.RequireNonAlphanumeric = false;
        option.SignIn.RequireConfirmedAccount = false;
    })
    .AddRoles<IdentityRoleIntKey>()
    .AddClaimsPrincipalFactory<CustomUserClaimsPrincipalFactory>()
    .AddStandardCustomIdentityStores()
    .AddDefaultTokenProviders();

// builder
//     .Services.AddDefaultIdentity<IdentityUserIntKey>()
//     .AddRoles<IdentityRoleIntKey>()
//     .AddStandardCustomIdentityStores()
//     .AddClaimsPrincipalFactory<CustomUserClaimsPrincipalFactory>();


// builder.Services.ConfigureApplicationCookie(option =>
// {
//     option.LoginPath = "/signin-google";
//     option.LogoutPath = "/Identity/SignOut";
//     option.AccessDeniedPath = "/Identity/Forbidden";
// });

builder.Services.AddAuthorization(option =>
{
    option.AddCustomPolicies();
});

builder.Services.AddFluentMigratorProvider(sqliteConnectionString);

builder.Services.AddConfigurationProvider(builder.Configuration);
builder.Services.AddServicesCollection();

builder.Services.AddEndpointsApiExplorer();
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

app.UseCors(option =>
{
    option.AllowAnyOrigin();
    option.AllowAnyMethod();
    option.AllowAnyHeader();
});

app.UseCookiePolicy(new CookiePolicyOptions() { MinimumSameSitePolicy = SameSiteMode.None });

app.UseAuthentication();
app.UseAuthorization();

app.MapGroup("IdentityAccount").MapIdentityApi<IdentityUserIntKey>();
app.MapControllers();

app.UseFluentMigrator();
await app.AddDefaultRoles();
app.Run();
