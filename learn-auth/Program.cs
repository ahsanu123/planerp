using Learn.Custom;
using Learn.InternalMigration;
using Learn.Model;
using Learn.Services;
using Learn.StandardIdentity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

var sqliteConnectionString = builder.Configuration.GetConnectionString("Sqlite");

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddIdentityCore<IdentityUser>();

// builder.Services.AddDbContext<LearnDbContext>();


builder
    .Services.AddIdentity<IntIdentityUser, IntIdentityRole>(option => { })
    .AddStandardCustomIdentityStores();

// builder
//     .Services.AddAuthentication()
//     .AddGoogle(option =>
//     {
//         option.ClientId = "";
//         option.ClientSecret = "";
//     });
//
// .AddCookie();

builder.Services.AddControllers();

// builder.Services.AddEndpointsApiExplorer();

builder.Services.AddFluentMigratorProvider(sqliteConnectionString);
builder.Services.AddHttpLogging(config => { });

builder.Services.AddConfigurationProvider(builder.Configuration);
builder.Services.AddServicesCollection();

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
// builder.Services.AddTransient<IAuthorizationHandler, CustomRequirementHandler>();

// builder.Services.AddCustomIdentityServiceCollection();
// builder.Services.AddIdentityCore<AppUser>();

builder.Services.AddAuthorization(option =>
{
    // CustomAuthorizationPolicies.AddPolicies(option);
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

// app.UseMiddleware<CustomAuthentication>();
app.UseAuthentication();

// app.UseMiddleware<RoleMemberships>();
// app.UseMiddleware<ClaimsReporter>();
app.UseRouting();
app.UseMiddleware<AuthorizationReporter>();
app.UseAuthorization();

app.MapControllers();

// app.UseHttpsRedirection();

app.UseFluentMigrator();
app.Run();
