using Microsoft.EntityFrameworkCore;
using Planerp.BuilderService;
using Planerp.Hosting;
using Planerp.PlanerpMigration;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var postgresConnectionString = builder.Configuration.GetConnectionString("postgresql");
var sqliteConnectionString = builder.Configuration.GetConnectionString("sqlite");
var sqlserverConnectionString = builder.Configuration.GetConnectionString("sqlserver");

//==================================================
//
//  Configure Builder
//
//==================================================

builder.Services.AddServiceCollectionExtension();
builder.Services.AddControllers();
builder.Services.AddAuthorization();

// builder.Services.AddSwaggerUI();
builder.Services.AddFluentMigratorProvider(postgresConnectionString);
builder.Services.AddHttpClient();
builder.Services.AddQuartzHosting();
builder.Services.AddOpenApiDocument();

//==================================================
//
// Turn off Authentication for now
// its request client id if run inside docker container
//
//==================================================
// builder.Services.AddAspNetDefaultIdentityProvider();
// builder.Services.AddExternalIdentityProvider(configuration);
// builder.Services.AddOpenIdDictProvider();

builder.Services.AddPostgresqlDbProvider(postgresConnectionString);
builder.Services.AddGraphQLProvider();
builder.Services.AddCors();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

//==================================================
//
//  Application Start
//
//==================================================


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseOpenApi();
    // ref: https://github.com/RicoSuter/NSwag/blob/1a6c959bdb41b41f2f534d3e61a311f1cf0de6f7/src/NSwag.Sample.NETCore20/Startup.cs#L104
    app.UseSwaggerUi(config =>
    {
        config.Path = "/swagger";
    });
    app.UseReDoc(config =>
    {
        config.Path = "/redoc";
        config.DocumentPath = "/swagger/v1/swagger.json";
    });
    // app.UseSwagger();
    // app.UseSwaggerUI(option =>
    // {
    //     option.EnableTryItOutByDefault();
    // });
    app.UseGraphQlProvider();

    app.UseCors(option =>
    {
        option.AllowAnyOrigin();
        option.AllowAnyMethod();
        option.AllowAnyHeader();
    });
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// app.MapGroup("identity").MapIdentityApi<CustomIdentityModel>();

app.Migrate();
app.Run();
