using Learn.AppIdentity;
using Learn.Custom;
using Learn.InternalMigration;
using Learn.Model;
using Learn.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

var sqliteConnectionString = builder.Configuration.GetConnectionString("Sqlite");

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddIdentityCore<IdentityUser>();

// builder.Services.AddDbContext<LearnDbContext>();

builder
    .Services.AddAuthentication(option =>
    {
        option.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        option.AddScheme<CustomExternalAuthHandler>("demoAuth", "Demo Service");
        // option.AddScheme<CustomAuthHandler>("qsv", "QueryStringValue");
        // option.DefaultScheme = "qsv";
    })
    .AddCookie(opts =>
    {
        // opts.LoginPath = "/sign-in";
        // opts.AccessDeniedPath = "/signin/403";
    })
    .AddCookie(IdentityConstants.ExternalScheme);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddFluentMigratorProvider(sqliteConnectionString);
builder.Services.AddHttpLogging(config => { });
builder.Services.AddConfigurationProvider(builder.Configuration);
builder.Services.AddServicesCollection();

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

// builder.Services.AddTransient<IAuthorizationHandler, CustomRequirementHandler>();

builder.Services.AddSingleton<IUserStore<AppUser>, UserStore>();
builder.Services.AddIdentityCore<AppUser>();

builder.Services.AddAuthorization(option =>
{
    CustomAuthorizationPolicies.AddPolicies(option);
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

app.UseMiddleware<RoleMemberships>();

app.UseRouting();

// app.UseMiddleware<ClaimsReporter>();
// app.UseMiddleware<AuthorizationReporter>();
app.UseAuthorization();

// app.UseHttpsRedirection();
app.MapControllers();

app.UseFluentMigrator();
app.Run();
