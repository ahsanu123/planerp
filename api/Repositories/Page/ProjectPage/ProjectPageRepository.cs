using Planerp.Extensions;
using Planerp.Model;
using Planerp.Services;
using SqlKata;
using static Planerp.Extensions.UtilityExtension;

namespace Planerp.Repository;

public interface IProjectPageRepository
{
    public Task<ProjectPageDetailInformation> GetProjectPageDetail(int id);
}

public class ProjectPageRepository : IProjectPageRepository
{
    private readonly PostgresqlConnectionProvider _connection;

    public ProjectPageRepository(PostgresqlConnectionProvider connection)
    {
        this._connection = connection;
    }

    public async Task<ProjectPageDetailInformation> GetProjectPageDetail(int id)
    {
        var projectDetailsQuery = new Query(nameof(Project));

        using (var conn = _connection.CreateConnection())
        {
            var resultProject = await conn.QuerySingleSqlKataAsync<Project>(
                projectDetailsQuery.Clone().SelectAllClassProperties(typeof(Project))
            );

            var resultLogger = await conn.QuerySqlKataAsync<LoggerModel>(
                projectDetailsQuery
                    .Clone()
                    .Join(
                        nameof(LoggerModel),
                        GetClassColumn<Project>(nameof(Project.Id)),
                        GetClassColumn<LoggerModel>(nameof(LoggerModel.ProjectId))
                    )
                    .SelectAllClassProperties(typeof(LoggerModel))
            );

            var resultComponent = await conn.QuerySqlKataAsync<Component>(
                projectDetailsQuery
                    .Clone()
                    .Join(
                        nameof(Component),
                        nameof(Project.ComponentId),
                        GetClassColumn<Component>(nameof(Component.Id))
                    )
                    .SelectAllClassProperties(typeof(Component))
            );

            var projectDetails = new ProjectPageDetailInformation
            {
                ListLog = resultLogger,
                Project = resultProject,
                ListComponent = resultComponent,
            };

            return projectDetails;
        }
    }
}
